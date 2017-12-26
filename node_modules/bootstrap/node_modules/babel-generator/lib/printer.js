"use strict";

exports.__esModule = true;
exports.default = undefined;

var _isInteger = require("lodash/isInteger");

var _isInteger2 = _interopRequireDefault(_isInteger);

var _repeat = require("lodash/repeat");

var _repeat2 = _interopRequireDefault(_repeat);

var _buffer = require("./buffer");

var _buffer2 = _interopRequireDefault(_buffer);

var _node = require("./node");

var n = _interopRequireWildcard(_node);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _generators = require("./generators");

var generatorFunctions = _interopRequireWildcard(_generators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCIENTIFIC_NOTATION = /e/i;
var ZERO_DECIMAL_INTEGER = /\.0+$/;
var NON_DECIMAL_LITERAL = /^0[box]/;

var Printer = function () {
  function Printer(format, map) {
    this.inForStatementInitCounter = 0;
    this._printStack = [];
    this._indent = 0;
    this._insideAux = false;
    this._printedCommentStarts = {};
    this._parenPushNewlineState = null;
    this._noLineTerminator = false;
    this._printAuxAfterOnNextUserNode = false;
    this._printedComments = new WeakSet();
    this._endsWithInteger = false;
    this._endsWithWord = false;
    this.format = format || {};
    this._buf = new _buffer2.default(map);
  }

  Printer.prototype.generate = function generate(ast) {
    this.print(ast);

    this._maybeAddAuxComment();

    return this._buf.get();
  };

  Printer.prototype.indent = function indent() {
    if (this.format.compact || this.format.concise) return;
    this._indent++;
  };

  Printer.prototype.dedent = function dedent() {
    if (this.format.compact || this.format.concise) return;
    this._indent--;
  };

  Printer.prototype.semicolon = function semicolon(force) {
    if (force === void 0) {
      force = false;
    }

    this._maybeAddAuxComment();

    this._append(";", !force);
  };

  Printer.prototype.rightBrace = function rightBrace() {
    if (this.format.minified) {
      this._buf.removeLastSemicolon();
    }

    this.token("}");
  };

  Printer.prototype.space = function space(force) {
    if (force === void 0) {
      force = false;
    }

    if (this.format.compact) return;

    if (this._buf.hasContent() && !this.endsWith(" ") && !this.endsWith("\n") || force) {
      this._space();
    }
  };

  Printer.prototype.word = function word(str) {
    if (this._endsWithWord) this._space();

    this._maybeAddAuxComment();

    this._append(str);

    this._endsWithWord = true;
  };

  Printer.prototype.number = function number(str) {
    this.word(str);
    this._endsWithInteger = (0, _isInteger2.default)(+str) && !NON_DECIMAL_LITERAL.test(str) && !SCIENTIFIC_NOTATION.test(str) && !ZERO_DECIMAL_INTEGER.test(str) && str[str.length - 1] !== ".";
  };

  Printer.prototype.token = function token(str) {
    if (str === "--" && this.endsWith("!") || str[0] === "+" && this.endsWith("+") || str[0] === "-" && this.endsWith("-") || str[0] === "." && this._endsWithInteger) {
      this._space();
    }

    this._maybeAddAuxComment();

    this._append(str);
  };

  Printer.prototype.newline = function newline(i) {
    if (this.format.retainLines || this.format.compact) return;

    if (this.format.concise) {
      this.space();
      return;
    }

    if (this.endsWith("\n\n")) return;
    if (typeof i !== "number") i = 1;
    i = Math.min(2, i);
    if (this.endsWith("{\n") || this.endsWith(":\n")) i--;
    if (i <= 0) return;

    for (var j = 0; j < i; j++) {
      this._newline();
    }
  };

  Printer.prototype.endsWith = function endsWith(str) {
    return this._buf.endsWith(str);
  };

  Printer.prototype.removeTrailingNewline = function removeTrailingNewline() {
    this._buf.removeTrailingNewline();
  };

  Printer.prototype.source = function source(prop, loc) {
    this._catchUp(prop, loc);

    this._buf.source(prop, loc);
  };

  Printer.prototype.withSource = function withSource(prop, loc, cb) {
    this._catchUp(prop, loc);

    this._buf.withSource(prop, loc, cb);
  };

  Printer.prototype._space = function _space() {
    this._append(" ", true);
  };

  Printer.prototype._newline = function _newline() {
    this._append("\n", true);
  };

  Printer.prototype._append = function _append(str, queue) {
    if (queue === void 0) {
      queue = false;
    }

    this._maybeAddParen(str);

    this._maybeIndent(str);

    if (queue) this._buf.queue(str);else this._buf.append(str);
    this._endsWithWord = false;
    this._endsWithInteger = false;
  };

  Printer.prototype._maybeIndent = function _maybeIndent(str) {
    if (this._indent && this.endsWith("\n") && str[0] !== "\n") {
      this._buf.queue(this._getIndent());
    }
  };

  Printer.prototype._maybeAddParen = function _maybeAddParen(str) {
    var parenPushNewlineState = this._parenPushNewlineState;
    if (!parenPushNewlineState) return;
    this._parenPushNewlineState = null;
    var i = void 0;

    for (i = 0; i < str.length && str[i] === " "; i++) {
      continue;
    }

    if (i === str.length) return;
    var cha = str[i];
    var chaPost = str[i + 1];

    if (cha === "\n" || cha === "/" && (chaPost === "/" || chaPost === "*")) {
      this.token("(");
      this.indent();
      parenPushNewlineState.printed = true;
    }
  };

  Printer.prototype._catchUp = function _catchUp(prop, loc) {
    if (!this.format.retainLines) return;
    var pos = loc ? loc[prop] : null;

    if (pos && pos.line !== null) {
      var count = pos.line - this._buf.getCurrentLine();

      for (var i = 0; i < count; i++) {
        this._newline();
      }
    }
  };

  Printer.prototype._getIndent = function _getIndent() {
    return (0, _repeat2.default)(this.format.indent.style, this._indent);
  };

  Printer.prototype.startTerminatorless = function startTerminatorless(isLabel) {
    if (isLabel === void 0) {
      isLabel = false;
    }

    if (isLabel) {
      this._noLineTerminator = true;
      return null;
    } else {
      return this._parenPushNewlineState = {
        printed: false
      };
    }
  };

  Printer.prototype.endTerminatorless = function endTerminatorless(state) {
    this._noLineTerminator = false;

    if (state && state.printed) {
      this.dedent();
      this.newline();
      this.token(")");
    }
  };

  Printer.prototype.print = function print(node, parent) {
    var _this = this;

    if (!node) return;
    var oldConcise = this.format.concise;

    if (node._compact) {
      this.format.concise = true;
    }

    var printMethod = this[node.type];

    if (!printMethod) {
      throw new ReferenceError("unknown node of type " + JSON.stringify(node.type) + " with constructor " + JSON.stringify(node && node.constructor.name));
    }

    this._printStack.push(node);

    var oldInAux = this._insideAux;
    this._insideAux = !node.loc;

    this._maybeAddAuxComment(this._insideAux && !oldInAux);

    var needsParens = n.needsParens(node, parent, this._printStack);

    if (this.format.retainFunctionParens && node.type === "FunctionExpression" && node.extra && node.extra.parenthesized) {
      needsParens = true;
    }

    if (needsParens) this.token("(");

    this._printLeadingComments(node, parent);

    var loc = t.isProgram(node) || t.isFile(node) ? null : node.loc;
    this.withSource("start", loc, function () {
      _this[node.type](node, parent);
    });

    this._printTrailingComments(node, parent);

    if (needsParens) this.token(")");

    this._printStack.pop();

    this.format.concise = oldConcise;
    this._insideAux = oldInAux;
  };

  Printer.prototype._maybeAddAuxComment = function _maybeAddAuxComment(enteredPositionlessNode) {
    if (enteredPositionlessNode) this._printAuxBeforeComment();
    if (!this._insideAux) this._printAuxAfterComment();
  };

  Printer.prototype._printAuxBeforeComment = function _printAuxBeforeComment() {
    if (this._printAuxAfterOnNextUserNode) return;
    this._printAuxAfterOnNextUserNode = true;
    var comment = this.format.auxiliaryCommentBefore;

    if (comment) {
      this._printComment({
        type: "CommentBlock",
        value: comment
      });
    }
  };

  Printer.prototype._printAuxAfterComment = function _printAuxAfterComment() {
    if (!this._printAuxAfterOnNextUserNode) return;
    this._printAuxAfterOnNextUserNode = false;
    var comment = this.format.auxiliaryCommentAfter;

    if (comment) {
      this._printComment({
        type: "CommentBlock",
        value: comment
      });
    }
  };

  Printer.prototype.getPossibleRaw = function getPossibleRaw(node) {
    var extra = node.extra;

    if (extra && extra.raw != null && extra.rawValue != null && node.value === extra.rawValue) {
      return extra.raw;
    }
  };

  Printer.prototype.printJoin = function printJoin(nodes, parent, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!nodes || !nodes.length) return;
    if (opts.indent) this.indent();
    var newlineOpts = {
      addNewlines: opts.addNewlines
    };

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (!node) continue;
      if (opts.statement) this._printNewline(true, node, parent, newlineOpts);
      this.print(node, parent);

      if (opts.iterator) {
        opts.iterator(node, i);
      }

      if (opts.separator && i < nodes.length - 1) {
        opts.separator.call(this);
      }

      if (opts.statement) this._printNewline(false, node, parent, newlineOpts);
    }

    if (opts.indent) this.dedent();
  };

  Printer.prototype.printAndIndentOnComments = function printAndIndentOnComments(node, parent) {
    var indent = node.leadingComments && node.leadingComments.length > 0;
    if (indent) this.indent();
    this.print(node, parent);
    if (indent) this.dedent();
  };

  Printer.prototype.printBlock = function printBlock(parent) {
    var node = parent.body;

    if (!t.isEmptyStatement(node)) {
      this.space();
    }

    this.print(node, parent);
  };

  Printer.prototype._printTrailingComments = function _printTrailingComments(node, parent) {
    this._printComments(this._getComments(false, node, parent));
  };

  Printer.prototype._printLeadingComments = function _printLeadingComments(node, parent) {
    this._printComments(this._getComments(true, node, parent));
  };

  Printer.prototype.printInnerComments = function printInnerComments(node, indent) {
    if (indent === void 0) {
      indent = true;
    }

    if (!node.innerComments || !node.innerComments.length) return;
    if (indent) this.indent();

    this._printComments(node.innerComments);

    if (indent) this.dedent();
  };

  Printer.prototype.printSequence = function printSequence(nodes, parent, opts) {
    if (opts === void 0) {
      opts = {};
    }

    opts.statement = true;
    return this.printJoin(nodes, parent, opts);
  };

  Printer.prototype.printList = function printList(items, parent, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (opts.separator == null) {
      opts.separator = commaSeparator;
    }

    return this.printJoin(items, parent, opts);
  };

  Printer.prototype._printNewline = function _printNewline(leading, node, parent, opts) {
    if (this.format.retainLines || this.format.compact) return;

    if (this.format.concise) {
      this.space();
      return;
    }

    var lines = 0;

    if (this._buf.hasContent()) {
      if (!leading) lines++;
      if (opts.addNewlines) lines += opts.addNewlines(leading, node) || 0;
      var needs = leading ? n.needsWhitespaceBefore : n.needsWhitespaceAfter;
      if (needs(node, parent)) lines++;
    }

    this.newline(lines);
  };

  Printer.prototype._getComments = function _getComments(leading, node) {
    return node && (leading ? node.leadingComments : node.trailingComments) || [];
  };

  Printer.prototype._printComment = function _printComment(comment) {
    var _this2 = this;

    if (!this.format.shouldPrintComment(comment.value)) return;
    if (comment.ignore) return;
    if (this._printedComments.has(comment)) return;

    this._printedComments.add(comment);

    if (comment.start != null) {
      if (this._printedCommentStarts[comment.start]) return;
      this._printedCommentStarts[comment.start] = true;
    }

    var isBlockComment = comment.type === "CommentBlock";
    this.newline(this._buf.hasContent() && !this._noLineTerminator && isBlockComment ? 1 : 0);
    if (!this.endsWith("[") && !this.endsWith("{")) this.space();
    var val = !isBlockComment && !this._noLineTerminator ? "//" + comment.value + "\n" : "/*" + comment.value + "*/";

    if (isBlockComment && this.format.indent.adjustMultilineComment) {
      var offset = comment.loc && comment.loc.start.column;

      if (offset) {
        var newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
        val = val.replace(newlineRegex, "\n");
      }

      var indentSize = Math.max(this._getIndent().length, this._buf.getCurrentColumn());
      val = val.replace(/\n(?!$)/g, "\n" + (0, _repeat2.default)(" ", indentSize));
    }

    if (this.endsWith("/")) this._space();
    this.withSource("start", comment.loc, function () {
      _this2._append(val);
    });
    this.newline(isBlockComment && !this._noLineTerminator ? 1 : 0);
  };

  Printer.prototype._printComments = function _printComments(comments) {
    if (!comments || !comments.length) return;

    for (var _iterator = comments, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _comment2 = _ref;

      this._printComment(_comment2);
    }
  };

  return Printer;
}();

exports.default = Printer;
Object.assign(Printer.prototype, generatorFunctions);

function commaSeparator() {
  this.token(",");
  this.space();
}