"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = loadConfig;

var _optionManager = require("./option-manager");

var _optionManager2 = _interopRequireDefault(_optionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadConfig(opts) {
  if (opts != null && _typeof(opts) !== "object") {
    throw new Error("Babel options must be an object, null, or undefined");
  }

  return (0, _optionManager2.default)(opts || {});
}