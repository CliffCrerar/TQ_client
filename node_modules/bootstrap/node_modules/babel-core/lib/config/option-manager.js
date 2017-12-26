"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = manageOptions;

var _index = require("../index");

var context = _interopRequireWildcard(_index);

var _plugin = require("./plugin");

var _plugin2 = _interopRequireDefault(_plugin);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _defaults = require("lodash/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _removed = require("./removed");

var _removed2 = _interopRequireDefault(_removed);

var _buildConfigChain = require("./build-config-chain");

var _buildConfigChain2 = _interopRequireDefault(_buildConfigChain);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _clone = require("lodash/clone");

var _clone2 = _interopRequireDefault(_clone);

var _files = require("./loading/files");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var optionNames = new Set(["relative", "filename", "filenameRelative", "inputSourceMap", "env", "mode", "retainLines", "highlightCode", "suppressDeprecationMessages", "presets", "plugins", "ignore", "only", "code", "metadata", "ast", "extends", "comments", "shouldPrintComment", "wrapPluginVisitorMethod", "compact", "minified", "sourceMaps", "sourceMapTarget", "sourceFileName", "sourceRoot", "babelrc", "sourceType", "auxiliaryCommentBefore", "auxiliaryCommentAfter", "resolveModuleSource", "getModuleId", "moduleRoot", "moduleIds", "moduleId", "passPerPreset", "parserOpts", "generatorOpts"]);
var ALLOWED_PLUGIN_KEYS = new Set(["name", "manipulateOptions", "pre", "post", "visitor", "inherits"]);

function manageOptions(opts) {
  return new OptionManager().init(opts);
}

var OptionManager = function () {
  function OptionManager() {
    this.options = createInitialOptions();
    this.passes = [[]];
  }

  OptionManager.prototype.mergeOptions = function mergeOptions(config, pass) {
    var _this = this;

    var result = loadConfig(config);
    var plugins = result.plugins.map(function (descriptor) {
      return loadPluginDescriptor(descriptor);
    });
    var presets = result.presets.map(function (descriptor) {
      return loadPresetDescriptor(descriptor);
    });

    if (config.options.passPerPreset != null && typeof config.options.passPerPreset !== "boolean") {
      throw new Error(".passPerPreset must be a boolean or undefined");
    }

    var passPerPreset = config.options.passPerPreset;
    pass = pass || this.passes[0];

    if (presets.length > 0) {
      var presetPasses = null;

      if (passPerPreset) {
        var _passes;

        presetPasses = presets.map(function () {
          return [];
        });

        (_passes = this.passes).splice.apply(_passes, [1, 0].concat(presetPasses));
      }

      presets.forEach(function (presetConfig, i) {
        _this.mergeOptions(presetConfig, presetPasses ? presetPasses[i] : pass);
      });
    }

    if (plugins.length > 0) {
      var _pass;

      (_pass = pass).unshift.apply(_pass, plugins);
    }

    (0, _merge2.default)(this.options, result.options);
  };

  OptionManager.prototype.init = function init(opts) {
    var configChain = (0, _buildConfigChain2.default)(opts);
    if (!configChain) return null;

    try {
      for (var _iterator = configChain, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var _config = _ref;
        this.mergeOptions(_config);
      }
    } catch (e) {
      if (!/^\[BABEL\]/.test(e.message)) {
        var filename = typeof opts.filename === "string" ? opts.filename : null;
        e.message = "[BABEL] " + (filename || "unknown") + ": " + e.message;
      }

      throw e;
    }

    opts = this.options;
    opts.plugins = this.passes[0];
    opts.presets = this.passes.slice(1).filter(function (plugins) {
      return plugins.length > 0;
    }).map(function (plugins) {
      return {
        plugins: plugins
      };
    });

    if (opts.inputSourceMap) {
      opts.sourceMaps = true;
    }

    if (opts.moduleId) {
      opts.moduleIds = true;
    }

    (0, _defaults2.default)(opts, {
      moduleRoot: opts.sourceRoot
    });
    (0, _defaults2.default)(opts, {
      sourceRoot: opts.moduleRoot
    });
    (0, _defaults2.default)(opts, {
      filenameRelative: opts.filename
    });

    var basenameRelative = _path2.default.basename(opts.filenameRelative);

    if (_path2.default.extname(opts.filenameRelative) === ".mjs") {
      opts.sourceType = "module";
    }

    (0, _defaults2.default)(opts, {
      sourceFileName: basenameRelative,
      sourceMapTarget: basenameRelative
    });
    return {
      options: opts,
      passes: this.passes
    };
  };

  return OptionManager;
}();

function loadConfig(config) {
  var options = normalizeOptions(config);

  if (config.options.plugins != null && !Array.isArray(config.options.plugins)) {
    throw new Error(".plugins should be an array, null, or undefined");
  }

  var plugins = (config.options.plugins || []).map(function (plugin, index) {
    var _normalizePair = normalizePair(plugin, _files.loadPlugin, config.dirname),
        filepath = _normalizePair.filepath,
        value = _normalizePair.value,
        options = _normalizePair.options;

    return {
      alias: filepath || config.loc + "$" + index,
      loc: filepath || config.loc,
      value: value,
      options: options,
      dirname: config.dirname
    };
  });

  if (config.options.presets != null && !Array.isArray(config.options.presets)) {
    throw new Error(".presets should be an array, null, or undefined");
  }

  var presets = (config.options.presets || []).map(function (preset, index) {
    var _normalizePair2 = normalizePair(preset, _files.loadPreset, config.dirname),
        filepath = _normalizePair2.filepath,
        value = _normalizePair2.value,
        options = _normalizePair2.options;

    return {
      alias: filepath || config.loc + "$" + index,
      loc: filepath || config.loc,
      value: value,
      options: options,
      dirname: config.dirname
    };
  });
  return {
    options: options,
    plugins: plugins,
    presets: presets
  };
}

function loadDescriptor(descriptor, skipOptions) {
  if (typeof descriptor.value !== "function") {
    return {
      value: descriptor.value,
      descriptor: descriptor
    };
  }

  var value = descriptor.value,
      options = descriptor.options;
  var item = void 0;

  try {
    if (skipOptions) {
      item = value(context);
    } else {
      item = value(context, options, {
        dirname: descriptor.dirname
      });
    }
  } catch (e) {
    if (descriptor.alias) {
      e.message += " (While processing: " + JSON.stringify(descriptor.alias) + ")";
    }

    throw e;
  }

  if (!item || _typeof(item) !== "object") {
    throw new Error("Plugin/Preset did not return an object.");
  }

  return {
    value: item,
    descriptor: descriptor
  };
}

var PLUGIN_CACHE = new WeakMap();

function loadPluginDescriptor(descriptor) {
  if (descriptor.value instanceof _plugin2.default) {
    return [descriptor.value, descriptor.options];
  }

  var result = PLUGIN_CACHE.get(descriptor.value);

  if (!result) {
    result = instantiatePlugin(loadDescriptor(descriptor, true));
    PLUGIN_CACHE.set(descriptor.value, result);
  }

  return [result, descriptor.options];
}

function instantiatePlugin(_ref2) {
  var pluginObj = _ref2.value,
      descriptor = _ref2.descriptor;
  Object.keys(pluginObj).forEach(function (key) {
    if (!ALLOWED_PLUGIN_KEYS.has(key)) {
      throw new Error(messages.get("pluginInvalidProperty", descriptor.alias, key));
    }
  });

  if (pluginObj.visitor && (pluginObj.visitor.enter || pluginObj.visitor.exit)) {
    throw new Error("Plugins aren't allowed to specify catch-all enter/exit handlers. " + "Please target individual nodes.");
  }

  var plugin = Object.assign({}, pluginObj, {
    visitor: (0, _clone2.default)(pluginObj.visitor || {})
  });

  _babelTraverse2.default.explode(plugin.visitor);

  var inheritsDescriptor = void 0;
  var inherits = void 0;

  if (plugin.inherits) {
    inheritsDescriptor = {
      alias: descriptor.loc + "$inherits",
      loc: descriptor.loc,
      value: plugin.inherits,
      options: descriptor.options,
      dirname: descriptor.dirname
    };
    inherits = loadPluginDescriptor(inheritsDescriptor)[0];
    plugin.pre = chain(inherits.pre, plugin.pre);
    plugin.post = chain(inherits.post, plugin.post);
    plugin.manipulateOptions = chain(inherits.manipulateOptions, plugin.manipulateOptions);
    plugin.visitor = _babelTraverse2.default.visitors.merge([inherits.visitor, plugin.visitor]);
  }

  return new _plugin2.default(plugin, descriptor.alias);
}

function loadPresetDescriptor(descriptor) {
  return {
    type: "preset",
    options: loadDescriptor(descriptor).value,
    alias: descriptor.alias,
    loc: descriptor.loc,
    dirname: descriptor.dirname
  };
}

function normalizeOptions(config) {
  var alias = config.alias || "foreign";
  var type = config.type;

  if (_typeof(config.options) !== "object" || Array.isArray(config.options)) {
    throw new TypeError("Invalid options type for " + alias);
  }

  var options = Object.assign({}, config.options);

  if (type !== "arguments") {
    if (options.filename !== undefined) {
      throw new Error(alias + ".filename is only allowed as a root argument");
    }

    if (options.babelrc !== undefined) {
      throw new Error(alias + ".babelrc is only allowed as a root argument");
    }
  }

  if (type === "preset") {
    if (options.only !== undefined) {
      throw new Error(alias + ".only is not supported in a preset");
    }

    if (options.ignore !== undefined) {
      throw new Error(alias + ".ignore is not supported in a preset");
    }

    if (options.extends !== undefined) {
      throw new Error(alias + ".extends is not supported in a preset");
    }

    if (options.env !== undefined) {
      throw new Error(alias + ".env is not supported in a preset");
    }
  }

  if (options.sourceMap !== undefined) {
    if (options.sourceMaps !== undefined) {
      throw new Error("Both " + alias + ".sourceMap and .sourceMaps have been set");
    }

    options.sourceMaps = options.sourceMap;
    delete options.sourceMap;
  }

  for (var key in options) {
    if (!optionNames.has(key)) {
      if (_removed2.default[key]) {
        throw new ReferenceError("Using removed Babel 5 option: " + alias + "." + key + " - " + _removed2.default[key].message);
      } else {
        var unknownOptErr = "Unknown option: " + alias + "." + key + ". Check out http://babeljs.io/docs/usage/options/ for more information about options.";
        throw new ReferenceError(unknownOptErr);
      }
    }
  }

  if (options.parserOpts && typeof options.parserOpts.parser === "string") {
    options.parserOpts = Object.assign({}, options.parserOpts);
    options.parserOpts.parser = (0, _files.loadParser)(options.parserOpts.parser, config.dirname).value;
  }

  if (options.generatorOpts && typeof options.generatorOpts.generator === "string") {
    options.generatorOpts = Object.assign({}, options.generatorOpts);
    options.generatorOpts.generator = (0, _files.loadGenerator)(options.generatorOpts.generator, config.dirname).value;
  }

  delete options.passPerPreset;
  delete options.plugins;
  delete options.presets;
  return options;
}

function normalizePair(pair, resolver, dirname) {
  var options = void 0;
  var value = pair;

  if (Array.isArray(pair)) {
    if (pair.length > 2) {
      throw new Error("Unexpected extra options " + JSON.stringify(pair.slice(2)) + ".");
    }

    value = pair[0];
    options = pair[1];
  }

  var filepath = null;

  if (typeof value === "string") {
    var _resolver = resolver(value, dirname);

    filepath = _resolver.filepath;
    value = _resolver.value;
  }

  if (!value) {
    throw new Error("Unexpected falsy value: " + String(value));
  }

  if (_typeof(value) === "object" && value.__esModule) {
    if (value.default) {
      value = value.default;
    } else {
      throw new Error("Must export a default export when using ES6 modules.");
    }
  }

  if (_typeof(value) !== "object" && typeof value !== "function") {
    throw new Error("Unsupported format: " + _typeof(value) + ". Expected an object or a function.");
  }

  if (options != null && _typeof(options) !== "object") {
    throw new Error("Plugin/Preset options must be an object, null, or undefined");
  }

  return {
    filepath: filepath,
    value: value,
    options: options
  };
}

function chain(a, b) {
  var fns = [a, b].filter(Boolean);
  if (fns.length <= 1) return fns[0];
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    for (var _iterator2 = fns, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var _fn = _ref3;

      _fn.apply(this, args);
    }
  };
}

function createInitialOptions() {
  return {
    sourceType: "module",
    babelrc: true,
    filename: "unknown",
    code: true,
    metadata: true,
    ast: true,
    comments: true,
    compact: "auto",
    highlightCode: true
  };
}