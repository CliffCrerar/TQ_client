"use strict";

exports.__esModule = true;
exports.DEFAULT_EXTENSIONS = exports.transformFileSync = exports.transformFile = exports.transformFromAst = exports.analyse = exports.transform = exports.OptionManager = exports.template = exports.traverse = exports.types = exports.messages = exports.getEnv = exports.version = exports.resolvePreset = exports.resolvePlugin = exports.buildExternalHelpers = exports.File = undefined;

var _files = require("./config/loading/files");

Object.defineProperty(exports, "resolvePlugin", {
  enumerable: true,
  get: function get() {
    return _files.resolvePlugin;
  }
});
Object.defineProperty(exports, "resolvePreset", {
  enumerable: true,
  get: function get() {
    return _files.resolvePreset;
  }
});

var _package = require("../package");

Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function get() {
    return _package.version;
  }
});

var _environment = require("./config/helpers/environment");

Object.defineProperty(exports, "getEnv", {
  enumerable: true,
  get: function get() {
    return _environment.getEnv;
  }
});
exports.loadOptions = loadOptions;
exports.Plugin = Plugin;

var _pipeline = require("./transformation/pipeline");

Object.defineProperty(exports, "transform", {
  enumerable: true,
  get: function get() {
    return _pipeline.transform;
  }
});
Object.defineProperty(exports, "analyse", {
  enumerable: true,
  get: function get() {
    return _pipeline.analyse;
  }
});
Object.defineProperty(exports, "transformFromAst", {
  enumerable: true,
  get: function get() {
    return _pipeline.transformFromAst;
  }
});
Object.defineProperty(exports, "transformFile", {
  enumerable: true,
  get: function get() {
    return _pipeline.transformFile;
  }
});
Object.defineProperty(exports, "transformFileSync", {
  enumerable: true,
  get: function get() {
    return _pipeline.transformFileSync;
  }
});

var _file = require("./transformation/file");

var _file2 = _interopRequireDefault(_file);

var _buildExternalHelpers2 = require("./tools/build-external-helpers");

var _buildExternalHelpers3 = _interopRequireDefault(_buildExternalHelpers2);

var _babelMessages = require("babel-messages");

var _messages = _interopRequireWildcard(_babelMessages);

var _babelTypes = require("babel-types");

var _types = _interopRequireWildcard(_babelTypes);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.File = _file2.default;
exports.buildExternalHelpers = _buildExternalHelpers3.default;
exports.messages = _messages;
exports.types = _types;
exports.traverse = _babelTraverse2.default;
exports.template = _babelTemplate2.default;

function loadOptions(opts) {
  var config = (0, _config2.default)(opts);
  return config ? config.options : null;
}

var OptionManager = exports.OptionManager = function () {
  function OptionManager() {}

  OptionManager.prototype.init = function init(opts) {
    return loadOptions(opts);
  };

  return OptionManager;
}();

function Plugin(alias) {
  throw new Error("The (" + alias + ") Babel 5 plugin is being run with Babel 6.");
}

var DEFAULT_EXTENSIONS = exports.DEFAULT_EXTENSIONS = Object.freeze([".js", ".jsx", ".es6", ".es", ".mjs"]);