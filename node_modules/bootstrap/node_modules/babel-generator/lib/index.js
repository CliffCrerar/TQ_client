"use strict";

exports.__esModule = true;
exports.CodeGenerator = undefined;

exports.default = function (ast, opts, code) {
  var gen = new Generator(ast, opts, code);
  return gen.generate();
};

var _sourceMap = require("./source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _printer = require("./printer");

var _printer2 = _interopRequireDefault(_printer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Generator = function (_Printer) {
  _inheritsLoose(Generator, _Printer);

  function Generator(ast, opts, code) {
    var _this;

    if (opts === void 0) {
      opts = {};
    }

    var format = normalizeOptions(code, opts);
    var map = opts.sourceMaps ? new _sourceMap2.default(opts, code) : null;
    _this = _Printer.call(this, format, map) || this;
    _this.ast = ast;
    return _this;
  }

  Generator.prototype.generate = function generate() {
    return _Printer.prototype.generate.call(this, this.ast);
  };

  return Generator;
}(_printer2.default);

function normalizeOptions(code, opts) {
  var format = {
    auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
    auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
    shouldPrintComment: opts.shouldPrintComment,
    retainLines: opts.retainLines,
    retainFunctionParens: opts.retainFunctionParens,
    comments: opts.comments == null || opts.comments,
    compact: opts.compact,
    minified: opts.minified,
    concise: opts.concise,
    quotes: "double",
    jsonCompatibleStrings: opts.jsonCompatibleStrings,
    indent: {
      adjustMultilineComment: true,
      style: "  ",
      base: 0
    }
  };

  if (format.minified) {
    format.compact = true;

    format.shouldPrintComment = format.shouldPrintComment || function () {
      return format.comments;
    };
  } else {
    format.shouldPrintComment = format.shouldPrintComment || function (value) {
      return format.comments || value.indexOf("@license") >= 0 || value.indexOf("@preserve") >= 0;
    };
  }

  if (format.compact === "auto") {
    format.compact = code.length > 500000;

    if (format.compact) {
      console.error("[BABEL] " + messages.get("codeGeneratorDeopt", opts.filename, "500KB"));
    }
  }

  if (format.compact) {
    format.indent.adjustMultilineComment = false;
  }

  return format;
}

var CodeGenerator = exports.CodeGenerator = function () {
  function CodeGenerator(ast, opts, code) {
    this._generator = new Generator(ast, opts, code);
  }

  CodeGenerator.prototype.generate = function generate() {
    return this._generator.generate();
  };

  return CodeGenerator;
}();