"use strict";

exports.__esModule = true;
exports.default = undefined;

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

var _file5 = require("./file");

var _file6 = _interopRequireDefault(_file5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var PluginPass = function (_Store) {
  _inheritsLoose(PluginPass, _Store);

  function PluginPass(file, key, options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Store.call(this) || this;
    _this.key = key;
    _this.file = file;
    _this.opts = options;
    return _this;
  }

  PluginPass.prototype.addHelper = function addHelper() {
    var _file;

    return (_file = this.file).addHelper.apply(_file, arguments);
  };

  PluginPass.prototype.addImport = function addImport() {
    var _file2;

    return (_file2 = this.file).addImport.apply(_file2, arguments);
  };

  PluginPass.prototype.getModuleName = function getModuleName() {
    var _file3;

    return (_file3 = this.file).getModuleName.apply(_file3, arguments);
  };

  PluginPass.prototype.buildCodeFrameError = function buildCodeFrameError() {
    var _file4;

    return (_file4 = this.file).buildCodeFrameError.apply(_file4, arguments);
  };

  return PluginPass;
}(_store2.default);

exports.default = PluginPass;