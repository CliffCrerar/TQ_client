"use strict";

exports.__esModule = true;
exports.File = exports.default = undefined;
exports.debug = debug;

var _babelHelpers = require("babel-helpers");

var _babelHelpers2 = _interopRequireDefault(_babelHelpers);

var _metadata = require("./metadata");

var metadataVisitor = _interopRequireWildcard(_metadata);

var _convertSourceMap = require("convert-source-map");

var _convertSourceMap2 = _interopRequireDefault(_convertSourceMap);

var _pluginPass = require("../plugin-pass");

var _pluginPass2 = _interopRequireDefault(_pluginPass);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _sourceMap = require("source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _babelGenerator = require("babel-generator");

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _babelCodeFrame = require("babel-code-frame");

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _babylon = require("babylon");

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _config = require("../../config");

var _config2 = _interopRequireDefault(_config);

var _blockHoist = require("../internal-plugins/block-hoist");

var _blockHoist2 = _interopRequireDefault(_blockHoist);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var babelDebug = (0, _debug2.default)("babel:file");

function debug(opts, msg) {
  babelDebug((opts.filename || "unknown") + ": " + msg);
}

var shebangRegex = /^#!.*/;
var INTERNAL_PLUGINS = void 0;
var errorVisitor = {
  enter: function enter(path, state) {
    var loc = path.node.loc;

    if (loc) {
      state.loc = loc;
      path.stop();
    }
  }
};

var File = function (_Store) {
  _inheritsLoose(File, _Store);

  function File(_ref) {
    var _this;

    var options = _ref.options,
        passes = _ref.passes;

    if (!INTERNAL_PLUGINS) {
      INTERNAL_PLUGINS = (0, _config2.default)({
        babelrc: false,
        plugins: [_blockHoist2.default]
      }).passes[0];
    }

    _this = _Store.call(this) || this;
    _this.pluginPasses = passes;
    _this.opts = options;
    _this.parserOpts = {
      sourceType: _this.opts.sourceType,
      sourceFileName: _this.opts.filename,
      plugins: []
    };

    for (var _iterator = passes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var _pluginPairs = _ref2;

      for (var _iterator2 = _pluginPairs, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref4 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref4 = _i2.value;
        }

        var _ref5 = _ref4;
        var _plugin = _ref5[0];

        if (_plugin.manipulateOptions) {
          _plugin.manipulateOptions(_this.opts, _this.parserOpts, _this);
        }
      }
    }

    _this.metadata = {
      usedHelpers: [],
      marked: [],
      modules: {
        imports: [],
        exports: {
          exported: [],
          specifiers: []
        }
      }
    };
    _this.dynamicImportTypes = {};
    _this.dynamicImportIds = {};
    _this.dynamicImports = [];
    _this.declarations = {};
    _this.usedHelpers = {};
    _this.path = null;
    _this.ast = {};
    _this.code = "";
    _this.shebang = "";
    _this.hub = new _babelTraverse.Hub(_this);
    return _this;
  }

  File.prototype.getMetadata = function getMetadata() {
    var has = false;
    var _arr = this.ast.program.body;

    for (var _i3 = 0; _i3 < _arr.length; _i3++) {
      var node = _arr[_i3];

      if (t.isModuleDeclaration(node)) {
        has = true;
        break;
      }
    }

    if (has) {
      this.path.traverse(metadataVisitor, this);
    }
  };

  File.prototype.getModuleName = function getModuleName() {
    var opts = this.opts;

    if (!opts.moduleIds) {
      return null;
    }

    if (opts.moduleId != null && !opts.getModuleId) {
      return opts.moduleId;
    }

    var filenameRelative = opts.filenameRelative;
    var moduleName = "";

    if (opts.moduleRoot != null) {
      moduleName = opts.moduleRoot + "/";
    }

    if (!opts.filenameRelative) {
      return moduleName + opts.filename.replace(/^\//, "");
    }

    if (opts.sourceRoot != null) {
      var sourceRootRegEx = new RegExp("^" + opts.sourceRoot + "/?");
      filenameRelative = filenameRelative.replace(sourceRootRegEx, "");
    }

    filenameRelative = filenameRelative.replace(/\.(\w*?)$/, "");
    moduleName += filenameRelative;
    moduleName = moduleName.replace(/\\/g, "/");

    if (opts.getModuleId) {
      return opts.getModuleId(moduleName) || moduleName;
    } else {
      return moduleName;
    }
  };

  File.prototype.resolveModuleSource = function resolveModuleSource(source) {
    var resolveModuleSource = this.opts.resolveModuleSource;

    if (resolveModuleSource) {
      source = resolveModuleSource(source, this.opts.filename);
    }

    return source;
  };

  File.prototype.addImport = function addImport(source, imported, name) {
    var _this2 = this;

    if (imported === void 0) {
      imported = "";
    }

    if (name === void 0) {
      name = imported;
    }

    var prependDeclaration = function prependDeclaration(specifiers) {
      var declar = t.importDeclaration(specifiers, t.stringLiteral(source));
      declar._blockHoist = 3;

      _this2.path.unshiftContainer("body", declar);
    };

    if (!imported) {
      prependDeclaration([]);
      return null;
    }

    var alias = source + ":" + imported;
    var id = this.dynamicImportIds[alias];

    if (!id) {
      source = this.resolveModuleSource(source);
      id = this.dynamicImportIds[alias] = this.scope.generateUidIdentifier(name);
      var specifiers = [];

      if (imported === "*") {
        specifiers.push(t.importNamespaceSpecifier(id));
      } else if (imported === "default") {
        specifiers.push(t.importDefaultSpecifier(id));
      } else {
        specifiers.push(t.importSpecifier(id, t.identifier(imported)));
      }

      prependDeclaration(specifiers);
    }

    return t.identifier(id.name);
  };

  File.prototype.addHelper = function addHelper(name) {
    var _this3 = this;

    var declar = this.declarations[name];
    if (declar) return declar;

    if (!this.usedHelpers[name]) {
      this.metadata.usedHelpers.push(name);
      this.usedHelpers[name] = true;
    }

    var generator = this.get("helperGenerator");
    var runtime = this.get("helpersNamespace");

    if (generator) {
      var res = generator(name);
      if (res) return res;
    } else if (runtime) {
      return t.memberExpression(runtime, t.identifier(name));
    }

    var ownBindingNames = Object.keys(this.scope.getAllBindings());
    var uid = this.declarations[name] = this.scope.generateUidIdentifier(name);

    var _getHelper = (0, _babelHelpers2.default)(name, uid, ownBindingNames),
        nodes = _getHelper.nodes,
        globals = _getHelper.globals;

    globals.forEach(function (name) {
      if (_this3.path.scope.hasBinding(name, true)) {
        _this3.path.scope.rename(name);
      }
    });
    nodes.forEach(function (node) {
      node._compact = true;
    });
    this.path.unshiftContainer("body", nodes);
    return uid;
  };

  File.prototype.addTemplateObject = function addTemplateObject() {
    throw new Error("This function has been moved into the template literal transform itself.");
  };

  File.prototype.buildCodeFrameError = function buildCodeFrameError(node, msg, Error) {
    if (Error === void 0) {
      Error = SyntaxError;
    }

    var loc = node && (node.loc || node._loc);
    var err = new Error(msg);

    if (loc) {
      err.loc = loc.start;
    } else {
      (0, _babelTraverse2.default)(node, errorVisitor, this.scope, err);
      err.message += " (This is an error on an internal node. Probably an internal error";

      if (err.loc) {
        err.message += ". Location has been estimated.";
      }

      err.message += ")";
    }

    return err;
  };

  File.prototype.mergeSourceMap = function mergeSourceMap(map) {
    var inputMap = this.opts.inputSourceMap;

    if (inputMap) {
      var inputMapConsumer = new _sourceMap2.default.SourceMapConsumer(inputMap);
      var outputMapConsumer = new _sourceMap2.default.SourceMapConsumer(map);
      var mergedGenerator = new _sourceMap2.default.SourceMapGenerator({
        file: inputMapConsumer.file,
        sourceRoot: inputMapConsumer.sourceRoot
      });
      var source = outputMapConsumer.sources[0];
      inputMapConsumer.eachMapping(function (mapping) {
        var generatedPosition = outputMapConsumer.generatedPositionFor({
          line: mapping.generatedLine,
          column: mapping.generatedColumn,
          source: source
        });

        if (generatedPosition.column != null) {
          mergedGenerator.addMapping({
            source: mapping.source,
            original: mapping.source == null ? null : {
              line: mapping.originalLine,
              column: mapping.originalColumn
            },
            generated: generatedPosition,
            name: mapping.name
          });
        }
      });
      var mergedMap = mergedGenerator.toJSON();
      inputMap.mappings = mergedMap.mappings;
      return inputMap;
    } else {
      return map;
    }
  };

  File.prototype.parse = function parse(code) {
    var parseCode = _babylon.parse;
    var parserOpts = this.opts.parserOpts;

    if (parserOpts) {
      parserOpts = Object.assign({}, this.parserOpts, parserOpts);

      if (parserOpts.parser) {
        parseCode = parserOpts.parser;
        parserOpts.parser = {
          parse: function parse(source) {
            return (0, _babylon.parse)(source, parserOpts);
          }
        };
      }
    }

    debug(this.opts, "Parse start");
    var ast = parseCode(code, parserOpts || this.parserOpts);
    debug(this.opts, "Parse stop");
    return ast;
  };

  File.prototype._addAst = function _addAst(ast) {
    this.path = _babelTraverse.NodePath.get({
      hub: this.hub,
      parentPath: null,
      parent: ast,
      container: ast,
      key: "program"
    }).setContext();
    this.scope = this.path.scope;
    this.ast = ast;
    this.getMetadata();
  };

  File.prototype.addAst = function addAst(ast) {
    debug(this.opts, "Start set AST");

    this._addAst(ast);

    debug(this.opts, "End set AST");
  };

  File.prototype.transform = function transform() {
    for (var _iterator3 = this.pluginPasses, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref6;

      if (_isArray3) {
        if (_i4 >= _iterator3.length) break;
        _ref6 = _iterator3[_i4++];
      } else {
        _i4 = _iterator3.next();
        if (_i4.done) break;
        _ref6 = _i4.value;
      }

      var _pluginPairs2 = _ref6;
      var passPairs = [];
      var passes = [];
      var visitors = [];

      for (var _iterator4 = _pluginPairs2.concat(INTERNAL_PLUGINS), _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref8;

        if (_isArray4) {
          if (_i5 >= _iterator4.length) break;
          _ref8 = _iterator4[_i5++];
        } else {
          _i5 = _iterator4.next();
          if (_i5.done) break;
          _ref8 = _i5.value;
        }

        var _ref11 = _ref8;
        var _plugin4 = _ref11[0];
        var _pluginOpts = _ref11[1];

        var _pass2 = new _pluginPass2.default(this, _plugin4.key, _pluginOpts);

        passPairs.push([_plugin4, _pass2]);
        passes.push(_pass2);
        visitors.push(_plugin4.visitor);
      }

      for (var _i6 = 0; _i6 < passPairs.length; _i6++) {
        var _ref9 = passPairs[_i6];
        var _plugin2 = _ref9[0];
        var pass = _ref9[1];
        var fn = _plugin2.pre;
        if (fn) fn.call(pass, this);
      }

      debug(this.opts, "Start transform traverse");

      var visitor = _babelTraverse2.default.visitors.merge(visitors, passes, this.opts.wrapPluginVisitorMethod);

      (0, _babelTraverse2.default)(this.ast, visitor, this.scope);
      debug(this.opts, "End transform traverse");

      for (var _i7 = 0; _i7 < passPairs.length; _i7++) {
        var _ref10 = passPairs[_i7];
        var _plugin3 = _ref10[0];
        var _pass = _ref10[1];
        var fn = _plugin3.post;
        if (fn) fn.call(_pass, this);
      }
    }

    return this.generate();
  };

  File.prototype.wrap = function wrap(code, callback) {
    code = code + "";

    try {
      return callback();
    } catch (err) {
      if (err._babel) {
        throw err;
      } else {
        err._babel = true;
      }

      var message = err.message = this.opts.filename + ": " + err.message;
      var loc = err.loc;

      if (loc) {
        var location = {
          start: {
            line: loc.line,
            column: loc.column + 1
          }
        };
        err.codeFrame = (0, _babelCodeFrame.codeFrameColumns)(code, location, this.opts);
        message += "\n" + err.codeFrame;
      }

      if (process.browser) {
        err.message = message;
      }

      if (err.stack) {
        var newStack = err.stack.replace(err.message, message);
        err.stack = newStack;
      }

      throw err;
    }
  };

  File.prototype.addCode = function addCode(code) {
    code = (code || "") + "";
    code = this.parseInputSourceMap(code);
    this.code = code;
  };

  File.prototype.parseCode = function parseCode() {
    this.parseShebang();
    var ast = this.parse(this.code);
    this.addAst(ast);
  };

  File.prototype.parseInputSourceMap = function parseInputSourceMap(code) {
    var opts = this.opts;

    if (opts.inputSourceMap !== false) {
      var inputMap = _convertSourceMap2.default.fromSource(code);

      if (inputMap) {
        opts.inputSourceMap = inputMap.toObject();
        code = _convertSourceMap2.default.removeComments(code);
      }
    }

    return code;
  };

  File.prototype.parseShebang = function parseShebang() {
    var shebangMatch = shebangRegex.exec(this.code);

    if (shebangMatch) {
      this.shebang = shebangMatch[0];
      this.code = this.code.replace(shebangRegex, "");
    }
  };

  File.prototype.makeResult = function makeResult(_ref12) {
    var code = _ref12.code,
        map = _ref12.map,
        ast = _ref12.ast,
        ignored = _ref12.ignored;
    var result = {
      metadata: null,
      options: this.opts,
      ignored: !!ignored,
      code: null,
      ast: null,
      map: map || null
    };

    if (this.opts.code) {
      result.code = code;
    }

    if (this.opts.ast) {
      result.ast = ast;
    }

    if (this.opts.metadata) {
      result.metadata = this.metadata;
    }

    return result;
  };

  File.prototype.generate = function generate() {
    var opts = this.opts;
    var ast = this.ast;
    var result = {
      ast: ast
    };
    if (!opts.code) return this.makeResult(result);
    var gen = _babelGenerator2.default;

    if (opts.generatorOpts && opts.generatorOpts.generator) {
      gen = opts.generatorOpts.generator;
    }

    debug(this.opts, "Generation start");

    var _result = gen(ast, opts.generatorOpts ? Object.assign(opts, opts.generatorOpts) : opts, this.code);

    result.code = _result.code;
    result.map = _result.map;
    debug(this.opts, "Generation end");

    if (this.shebang) {
      result.code = this.shebang + "\n" + result.code;
    }

    if (result.map) {
      result.map = this.mergeSourceMap(result.map);
    }

    if (opts.sourceMaps === "inline" || opts.sourceMaps === "both") {
      result.code += "\n" + _convertSourceMap2.default.fromObject(result.map).toComment();
    }

    if (opts.sourceMaps === "inline") {
      result.map = null;
    }

    return this.makeResult(result);
  };

  return File;
}(_store2.default);

exports.default = File;
exports.File = File;