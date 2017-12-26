"use strict";

exports.__esModule = true;
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _sourceMap = require("source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SourceMap = function () {
  function SourceMap(opts, code) {
    this._cachedMap = null;
    this._code = code;
    this._opts = opts;
    this._rawMappings = [];
  }

  SourceMap.prototype.get = function get() {
    if (!this._cachedMap) {
      var map = this._cachedMap = new _sourceMap2.default.SourceMapGenerator({
        file: this._opts.sourceMapTarget,
        sourceRoot: this._opts.sourceRoot
      });
      var code = this._code;

      if (typeof code === "string") {
        map.setSourceContent(this._opts.sourceFileName, code);
      } else if (_typeof(code) === "object") {
        Object.keys(code).forEach(function (sourceFileName) {
          map.setSourceContent(sourceFileName, code[sourceFileName]);
        });
      }

      this._rawMappings.forEach(map.addMapping, map);
    }

    return this._cachedMap.toJSON();
  };

  SourceMap.prototype.getRawMappings = function getRawMappings() {
    return this._rawMappings.slice();
  };

  SourceMap.prototype.mark = function mark(generatedLine, generatedColumn, line, column, identifierName, filename) {
    if (this._lastGenLine !== generatedLine && line === null) return;

    if (this._lastGenLine === generatedLine && this._lastSourceLine === line && this._lastSourceColumn === column) {
      return;
    }

    this._cachedMap = null;
    this._lastGenLine = generatedLine;
    this._lastSourceLine = line;
    this._lastSourceColumn = column;

    this._rawMappings.push({
      name: identifierName || undefined,
      generated: {
        line: generatedLine,
        column: generatedColumn
      },
      source: line == null ? undefined : filename || this._opts.sourceFileName,
      original: line == null ? undefined : {
        line: line,
        column: column
      }
    });
  };

  return SourceMap;
}();

exports.default = SourceMap;