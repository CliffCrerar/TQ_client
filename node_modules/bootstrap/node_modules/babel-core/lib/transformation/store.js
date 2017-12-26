"use strict";

exports.__esModule = true;

var Store = function () {
  function Store() {
    this._map = new Map();
  }

  Store.prototype.set = function set(key, val) {
    this._map.set(key, val);
  };

  Store.prototype.get = function get(key) {
    if (this._map.has(key)) {
      return this._map.get(key);
    }
  };

  return Store;
}();

exports.default = Store;