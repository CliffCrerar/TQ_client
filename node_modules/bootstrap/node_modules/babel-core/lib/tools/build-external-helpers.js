"use strict";

exports.__esModule = true;

exports.default = function (whitelist, outputType) {
  if (outputType === void 0) {
    outputType = "global";
  }

  var namespace = t.identifier("babelHelpers");

  var builder = function builder(body) {
    return buildHelpers(body, namespace, whitelist);
  };

  var tree = void 0;
  var build = {
    global: buildGlobal,
    module: buildModule,
    umd: buildUmd,
    var: buildVar
  }[outputType];

  if (build) {
    tree = build(namespace, builder);
  } else {
    throw new Error(messages.get("unsupportedOutputType", outputType));
  }

  return (0, _babelGenerator2.default)(tree).code;
};

var _babelHelpers = require("babel-helpers");

var helpers = _interopRequireWildcard(_babelHelpers);

var _babelGenerator = require("babel-generator");

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var keywordHelpers = ["typeof", "extends", "instanceof"];
var buildUmdWrapper = (0, _babelTemplate2.default)("\n  (function (root, factory) {\n    if (typeof define === \"function\" && define.amd) {\n      define(AMD_ARGUMENTS, factory);\n    } else if (typeof exports === \"object\") {\n      factory(COMMON_ARGUMENTS);\n    } else {\n      factory(BROWSER_ARGUMENTS);\n    }\n  })(UMD_ROOT, function (FACTORY_PARAMETERS) {\n    FACTORY_BODY\n  });\n");

function buildGlobal(namespace, builder) {
  var body = [];
  var container = t.functionExpression(null, [t.identifier("global")], t.blockStatement(body));
  var tree = t.program([t.expressionStatement(t.callExpression(container, [t.conditionalExpression(t.binaryExpression("===", t.unaryExpression("typeof", t.identifier("global")), t.stringLiteral("undefined")), t.identifier("self"), t.identifier("global"))]))]);
  body.push(t.variableDeclaration("var", [t.variableDeclarator(namespace, t.assignmentExpression("=", t.memberExpression(t.identifier("global"), namespace), t.objectExpression([])))]));
  builder(body);
  return tree;
}

function buildModule(namespace, builder) {
  var body = [];
  builder(body);
  var module = body.map(function (helperNode) {
    var possibleAssignment = t.isExpressionStatement(helperNode) ? helperNode.expression : helperNode;
    var isExportedHelper = t.isAssignmentExpression(possibleAssignment) && t.isMemberExpression(possibleAssignment.left) && possibleAssignment.left.object.name === namespace.name;

    if (!isExportedHelper) {
      return helperNode;
    }

    var exportedHelper = possibleAssignment;
    var identifier = exportedHelper.left.property.name;
    var isKeywordHelper = keywordHelpers.indexOf(identifier) !== -1;

    if (isKeywordHelper) {
      return t.exportNamedDeclaration(null, [t.exportSpecifier(t.identifier("_" + identifier), t.identifier(identifier))]);
    }

    return t.exportNamedDeclaration(t.variableDeclaration("var", [t.variableDeclarator(t.identifier(identifier), exportedHelper.right)]), []);
  });
  return t.program(module);
}

function buildUmd(namespace, builder) {
  var body = [];
  body.push(t.variableDeclaration("var", [t.variableDeclarator(namespace, t.identifier("global"))]));
  builder(body);
  return t.program([buildUmdWrapper({
    FACTORY_PARAMETERS: t.identifier("global"),
    BROWSER_ARGUMENTS: t.assignmentExpression("=", t.memberExpression(t.identifier("root"), namespace), t.objectExpression([])),
    COMMON_ARGUMENTS: t.identifier("exports"),
    AMD_ARGUMENTS: t.arrayExpression([t.stringLiteral("exports")]),
    FACTORY_BODY: body,
    UMD_ROOT: t.identifier("this")
  })]);
}

function buildVar(namespace, builder) {
  var body = [];
  body.push(t.variableDeclaration("var", [t.variableDeclarator(namespace, t.objectExpression([]))]));
  var tree = t.program(body);
  builder(body);
  body.push(t.expressionStatement(namespace));
  return tree;
}

function buildHelpers(body, namespace, whitelist) {
  helpers.list.forEach(function (name) {
    if (whitelist && whitelist.indexOf(name) < 0) return;

    var _helpers$get = helpers.get(name, t.memberExpression(namespace, t.identifier(name))),
        nodes = _helpers$get.nodes;

    body.push.apply(body, nodes);
  });
}