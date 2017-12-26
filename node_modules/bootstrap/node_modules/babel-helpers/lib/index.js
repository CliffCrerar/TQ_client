"use strict";

exports.__esModule = true;
exports.list = undefined;
exports.get = get;

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _helpers = require("./helpers");

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makePath(path) {
  var parts = [];

  for (; path.parentPath; path = path.parentPath) {
    parts.push(path.key);
    if (path.inList) parts.push(path.listKey);
  }

  return parts.reverse().join(".");
}

function getHelperMetadata(file) {
  var globals = new Set();
  var localBindingNames = new Set();
  var exportName = void 0;
  var exportPath = void 0;
  var exportBindingAssignments = [];
  (0, _babelTraverse2.default)(file, {
    ImportDeclaration: function ImportDeclaration(child) {
      throw child.buildCodeFrameError("Helpers may not import anything.");
    },
    ExportDefaultDeclaration: function ExportDefaultDeclaration(child) {
      var decl = child.get("declaration");

      if (decl.isFunctionDeclaration()) {
        if (!decl.node.id) {
          throw decl.buildCodeFrameError("Helpers should give names to their exported func declaration");
        }

        exportName = decl.node.id.name;
      }

      exportPath = makePath(child);
    },
    ExportAllDeclaration: function ExportAllDeclaration(child) {
      throw child.buildCodeFrameError("Helpers can only export default");
    },
    ExportNamedDeclaration: function ExportNamedDeclaration(child) {
      throw child.buildCodeFrameError("Helpers can only export default");
    },
    Statement: function Statement(child) {
      if (child.isModuleDeclaration()) return;
      child.skip();
    }
  });
  (0, _babelTraverse2.default)(file, {
    Program: function Program(path) {
      var bindings = path.scope.getAllBindings();
      Object.keys(bindings).forEach(function (name) {
        if (name === exportName) return;
        localBindingNames.add(name);
      });
    },
    ReferencedIdentifier: function ReferencedIdentifier(child) {
      var name = child.node.name;
      var binding = child.scope.getBinding(name);
      if (!binding) globals.add(name);
    },
    AssignmentExpression: function AssignmentExpression(child) {
      var left = child.get("left");
      if (!(exportName in left.getBindingIdentifiers())) return;

      if (!left.isIdentifier()) {
        throw left.buildCodeFrameError("Only simple assignments to exports are allowed in helpers");
      }

      var binding = child.scope.getBinding(exportName);

      if (binding && binding.scope.path.isProgram()) {
        exportBindingAssignments.push(makePath(child));
      }
    }
  });
  if (!exportPath) throw new Error("Helpers must default-export something.");
  exportBindingAssignments.reverse();
  return {
    globals: Array.from(globals),
    localBindingNames: Array.from(localBindingNames),
    exportBindingAssignments: exportBindingAssignments,
    exportPath: exportPath,
    exportName: exportName
  };
}

function permuteHelperAST(file, metadata, id, localBindings) {
  if (localBindings && !id) {
    throw new Error("Unexpected local bindings for module-based helpers.");
  }

  if (!id) return;
  var localBindingNames = metadata.localBindingNames,
      exportBindingAssignments = metadata.exportBindingAssignments,
      exportPath = metadata.exportPath,
      exportName = metadata.exportName;
  var toRename = {};
  var bindings = new Set(localBindings || []);
  localBindingNames.forEach(function (name) {
    var newName = name;

    while (bindings.has(newName)) {
      newName = "_" + newName;
    }

    if (newName !== name) toRename[name] = newName;
  });

  if (id.type === "Identifier" && exportName !== id.name) {
    toRename[exportName] = id.name;
  }

  (0, _babelTraverse2.default)(file, {
    Program: function Program(path) {
      var exp = path.get(exportPath);
      var decl = exp.get("declaration");

      if (id.type === "Identifier") {
        if (decl.isFunctionDeclaration()) {
          exp.replaceWith(decl);
        } else {
          exp.replaceWith(t.variableDeclaration("var", [t.variableDeclarator(id, decl.node)]));
        }
      } else if (id.type === "MemberExpression") {
        if (decl.isFunctionDeclaration()) {
          exportBindingAssignments.forEach(function (assignPath) {
            var assign = path.get(assignPath);
            assign.replaceWith(t.assignmentExpression("=", id, assign.node));
          });
          exp.replaceWith(decl);
          path.pushContainer("body", t.assignmentExpression("=", id, t.identifier(exportName)));
        } else {
          exp.replaceWith(t.assignmentExpression("=", id, decl.node));
        }
      } else {
        throw new Error("Unexpected helper format.");
      }

      Object.keys(toRename).forEach(function (name) {
        path.scope.rename(name, toRename[name]);
      });
      path.stop();
    }
  });
}

var helperData = {};

function loadHelper(name) {
  if (!helperData[name]) {
    if (!_helpers2.default[name]) throw new ReferenceError("Unknown helper " + name);

    var fn = function fn() {
      var ast = _helpers2.default[name]();

      return t.file(t.program(Array.isArray(ast) ? ast : [ast]));
    };

    var metadata = getHelperMetadata(fn());

    helperData[name] = function (id, localBindings) {
      var file = fn();
      permuteHelperAST(file, metadata, id, localBindings);
      return {
        nodes: file.program.body,
        globals: metadata.globals
      };
    };
  }

  return helperData[name];
}

function get(name, id, localBindings) {
  var helper = loadHelper(name);
  return helper(id, localBindings);
}

var list = exports.list = Object.keys(_helpers2.default).map(function (name) {
  return name.replace(/^_/, "");
}).filter(function (name) {
  return name !== "__esModule";
});
exports.default = get;