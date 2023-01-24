"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../../node_modules/.pnpm/shopify-buy@2.15.1/node_modules/shopify-buy/index.js
  var require_shopify_buy = __commonJS({
    "../../node_modules/.pnpm/shopify-buy@2.15.1/node_modules/shopify-buy/index.js"(exports, module) {
      "use strict";
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      var classCallCheck$1 = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var createClass$1 = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      var inherits$1 = function(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      };
      var possibleConstructorReturn$1 = function(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      };
      function join() {
        for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
          fields[_key] = arguments[_key];
        }
        return fields.join(" ");
      }
      function isObject(value) {
        return Boolean(value) && Object.prototype.toString.call(value.valueOf()) === "[object Object]";
      }
      function deepFreezeCopyExcept(predicate, structure) {
        if (predicate(structure)) {
          return structure;
        } else if (isObject(structure)) {
          return Object.freeze(Object.keys(structure).reduce(function(copy, key) {
            copy[key] = deepFreezeCopyExcept(predicate, structure[key]);
            return copy;
          }, {}));
        } else if (Array.isArray(structure)) {
          return Object.freeze(structure.map(function(item) {
            return deepFreezeCopyExcept(predicate, item);
          }));
        } else {
          return structure;
        }
      }
      function schemaForType(typeBundle, typeName) {
        var typeSchema = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        var type = typeBundle.types[typeName];
        if (type) {
          return type;
        } else if (typeSchema && typeSchema.kind === "INTERFACE") {
          return typeSchema;
        }
        throw new Error("No type of " + typeName + " found in schema");
      }
      var classCallCheck = function classCallCheck2(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      var inherits = function inherits2(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      };
      var possibleConstructorReturn = function possibleConstructorReturn2(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
      };
      var slicedToArray = function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"])
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        }
        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();
      var toConsumableArray = function toConsumableArray2(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }
          return arr2;
        } else {
          return Array.from(arr);
        }
      };
      var VariableDefinition = function() {
        function VariableDefinition2(name, type, defaultValue) {
          classCallCheck(this, VariableDefinition2);
          this.name = name;
          this.type = type;
          this.defaultValue = defaultValue;
          Object.freeze(this);
        }
        createClass(VariableDefinition2, [{
          key: "toInputValueString",
          value: function toInputValueString() {
            return "$" + this.name;
          }
        }, {
          key: "toString",
          value: function toString() {
            var defaultValueString = this.defaultValue ? " = " + formatInputValue(this.defaultValue) : "";
            return "$" + this.name + ":" + this.type + defaultValueString;
          }
        }]);
        return VariableDefinition2;
      }();
      function isVariable(value) {
        return VariableDefinition.prototype.isPrototypeOf(value);
      }
      function variable(name, type, defaultValue) {
        return new VariableDefinition(name, type, defaultValue);
      }
      var Enum = function() {
        function Enum2(key) {
          classCallCheck(this, Enum2);
          this.key = key;
        }
        createClass(Enum2, [{
          key: "toString",
          value: function toString() {
            return this.key;
          }
        }, {
          key: "valueOf",
          value: function valueOf() {
            return this.key.valueOf();
          }
        }]);
        return Enum2;
      }();
      var enumFunction = function enumFunction2(key) {
        return new Enum(key);
      };
      var Scalar = function() {
        function Scalar2(value) {
          classCallCheck(this, Scalar2);
          this.value = value;
        }
        createClass(Scalar2, [{
          key: "toString",
          value: function toString() {
            return this.value.toString();
          }
        }, {
          key: "valueOf",
          value: function valueOf() {
            return this.value.valueOf();
          }
        }, {
          key: "unwrapped",
          get: function get$$1() {
            return this.value;
          }
        }]);
        return Scalar2;
      }();
      function formatInputValue(value) {
        if (VariableDefinition.prototype.isPrototypeOf(value)) {
          return value.toInputValueString();
        } else if (Enum.prototype.isPrototypeOf(value)) {
          return String(value);
        } else if (Scalar.prototype.isPrototypeOf(value)) {
          return JSON.stringify(value.valueOf());
        } else if (Array.isArray(value)) {
          return "[" + join.apply(void 0, toConsumableArray(value.map(formatInputValue))) + "]";
        } else if (isObject(value)) {
          return formatObject(value, "{", "}");
        } else {
          return JSON.stringify(value);
        }
      }
      function formatObject(value) {
        var openChar = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        var closeChar = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
        var argPairs = Object.keys(value).map(function(key) {
          return key + ": " + formatInputValue(value[key]);
        });
        return "" + openChar + join.apply(void 0, toConsumableArray(argPairs)) + closeChar;
      }
      function formatArgs(args) {
        if (!Object.keys(args).length) {
          return "";
        }
        return " (" + formatObject(args) + ")";
      }
      function formatDirectives(directives) {
        if (!Object.keys(directives).length) {
          return "";
        }
        var directiveStrings = Object.keys(directives).map(function(key) {
          var directiveArgs = directives[key];
          var arg = directiveArgs && Object.keys(directiveArgs).length ? "(" + formatObject(directiveArgs) + ")" : "";
          return "@" + key + arg;
        });
        return " " + join.apply(void 0, toConsumableArray(directiveStrings));
      }
      var noop = function noop2() {
      };
      var Profiler = {
        trackTypeDependency: noop,
        trackFieldDependency: noop
      };
      var trackTypeDependency = Profiler.trackTypeDependency;
      var trackFieldDependency = Profiler.trackFieldDependency;
      function parseFieldCreationArgs(creationArgs) {
        var callback = noop;
        var options = {};
        var selectionSet = null;
        if (creationArgs.length === 2) {
          if (typeof creationArgs[1] === "function") {
            var _creationArgs = slicedToArray(creationArgs, 2);
            options = _creationArgs[0];
            callback = _creationArgs[1];
          } else {
            var _creationArgs2 = slicedToArray(creationArgs, 2);
            options = _creationArgs2[0];
            selectionSet = _creationArgs2[1];
          }
        } else if (creationArgs.length === 1) {
          if (SelectionSet.prototype.isPrototypeOf(creationArgs[0])) {
            selectionSet = creationArgs[0];
          } else if (typeof creationArgs[0] === "function") {
            callback = creationArgs[0];
          } else {
            options = creationArgs[0];
          }
        }
        return { options, selectionSet, callback };
      }
      var emptyArgs = Object.freeze({});
      var emptyDirectives = Object.freeze({});
      var Field = function() {
        function Field2(name, options, selectionSet) {
          classCallCheck(this, Field2);
          this.name = name;
          this.alias = options.alias || null;
          this.responseKey = this.alias || this.name;
          this.args = options.args ? deepFreezeCopyExcept(isVariable, options.args) : emptyArgs;
          this.directives = options.directives ? deepFreezeCopyExcept(isVariable, options.directives) : emptyDirectives;
          this.selectionSet = selectionSet;
          Object.freeze(this);
        }
        createClass(Field2, [{
          key: "toString",
          value: function toString() {
            var aliasPrefix = this.alias ? this.alias + ": " : "";
            return "" + aliasPrefix + this.name + formatArgs(this.args) + formatDirectives(this.directives) + this.selectionSet;
          }
        }]);
        return Field2;
      }();
      var Spread = function Spread2() {
        classCallCheck(this, Spread2);
      };
      var InlineFragment = function(_Spread) {
        inherits(InlineFragment2, _Spread);
        function InlineFragment2(typeName, selectionSet) {
          classCallCheck(this, InlineFragment2);
          var _this = possibleConstructorReturn(this, (InlineFragment2.__proto__ || Object.getPrototypeOf(InlineFragment2)).call(this));
          _this.typeName = typeName;
          _this.selectionSet = selectionSet;
          Object.freeze(_this);
          return _this;
        }
        createClass(InlineFragment2, [{
          key: "toString",
          value: function toString() {
            return "... on " + this.typeName + this.selectionSet;
          }
        }]);
        return InlineFragment2;
      }(Spread);
      var FragmentSpread = function(_Spread2) {
        inherits(FragmentSpread2, _Spread2);
        function FragmentSpread2(fragmentDefinition) {
          classCallCheck(this, FragmentSpread2);
          var _this2 = possibleConstructorReturn(this, (FragmentSpread2.__proto__ || Object.getPrototypeOf(FragmentSpread2)).call(this));
          _this2.name = fragmentDefinition.name;
          _this2.selectionSet = fragmentDefinition.selectionSet;
          Object.freeze(_this2);
          return _this2;
        }
        createClass(FragmentSpread2, [{
          key: "toString",
          value: function toString() {
            return "..." + this.name;
          }
        }, {
          key: "toDefinition",
          value: function toDefinition() {
            return new FragmentDefinition(this.name, this.selectionSet.typeSchema.name, this.selectionSet);
          }
        }]);
        return FragmentSpread2;
      }(Spread);
      var FragmentDefinition = function() {
        function FragmentDefinition2(name, typeName, selectionSet) {
          classCallCheck(this, FragmentDefinition2);
          this.name = name;
          this.typeName = typeName;
          this.selectionSet = selectionSet;
          this.spread = new FragmentSpread(this);
          Object.freeze(this);
        }
        createClass(FragmentDefinition2, [{
          key: "toString",
          value: function toString() {
            return "fragment " + this.name + " on " + this.typeName + " " + this.selectionSet;
          }
        }]);
        return FragmentDefinition2;
      }();
      function selectionsHaveIdField(selections) {
        return selections.some(function(fieldOrFragment) {
          if (Field.prototype.isPrototypeOf(fieldOrFragment)) {
            return fieldOrFragment.name === "id";
          } else if (Spread.prototype.isPrototypeOf(fieldOrFragment) && fieldOrFragment.selectionSet.typeSchema.implementsNode) {
            return selectionsHaveIdField(fieldOrFragment.selectionSet.selections);
          }
          return false;
        });
      }
      function selectionsHaveTypenameField(selections) {
        return selections.some(function(fieldOrFragment) {
          if (Field.prototype.isPrototypeOf(fieldOrFragment)) {
            return fieldOrFragment.name === "__typename";
          } else if (Spread.prototype.isPrototypeOf(fieldOrFragment) && fieldOrFragment.selectionSet.typeSchema.implementsNode) {
            return selectionsHaveTypenameField(fieldOrFragment.selectionSet.selections);
          }
          return false;
        });
      }
      function indexSelectionsByResponseKey(selections) {
        function assignOrPush(obj, key, value) {
          if (Array.isArray(obj[key])) {
            obj[key].push(value);
          } else {
            obj[key] = [value];
          }
        }
        var unfrozenObject = selections.reduce(function(acc, selection) {
          if (selection.responseKey) {
            assignOrPush(acc, selection.responseKey, selection);
          } else {
            var responseKeys = Object.keys(selection.selectionSet.selectionsByResponseKey);
            responseKeys.forEach(function(responseKey) {
              assignOrPush(acc, responseKey, selection);
            });
          }
          return acc;
        }, {});
        Object.keys(unfrozenObject).forEach(function(key) {
          Object.freeze(unfrozenObject[key]);
        });
        return Object.freeze(unfrozenObject);
      }
      var SelectionSet = function() {
        function SelectionSet2(typeBundle, type, builderFunction) {
          classCallCheck(this, SelectionSet2);
          if (typeof type === "string") {
            this.typeSchema = schemaForType(typeBundle, type);
          } else {
            this.typeSchema = type;
          }
          trackTypeDependency(this.typeSchema.name);
          this.typeBundle = typeBundle;
          this.selections = [];
          if (builderFunction) {
            builderFunction(new SelectionSetBuilder(this.typeBundle, this.typeSchema, this.selections));
          }
          if (this.typeSchema.implementsNode || this.typeSchema.name === "Node") {
            if (!selectionsHaveIdField(this.selections)) {
              this.selections.unshift(new Field("id", {}, new SelectionSet2(typeBundle, "ID")));
            }
          }
          if (this.typeSchema.kind === "INTERFACE") {
            if (!selectionsHaveTypenameField(this.selections)) {
              this.selections.unshift(new Field("__typename", {}, new SelectionSet2(typeBundle, "String")));
            }
          }
          this.selectionsByResponseKey = indexSelectionsByResponseKey(this.selections);
          Object.freeze(this.selections);
          Object.freeze(this);
        }
        createClass(SelectionSet2, [{
          key: "toString",
          value: function toString() {
            if (this.typeSchema.kind === "SCALAR" || this.typeSchema.kind === "ENUM") {
              return "";
            } else {
              return " { " + join(this.selections) + " }";
            }
          }
        }]);
        return SelectionSet2;
      }();
      var SelectionSetBuilder = function() {
        function SelectionSetBuilder2(typeBundle, typeSchema, selections) {
          classCallCheck(this, SelectionSetBuilder2);
          this.typeBundle = typeBundle;
          this.typeSchema = typeSchema;
          this.selections = selections;
        }
        createClass(SelectionSetBuilder2, [{
          key: "hasSelectionWithResponseKey",
          value: function hasSelectionWithResponseKey(responseKey) {
            return this.selections.some(function(field) {
              return field.responseKey === responseKey;
            });
          }
        }, {
          key: "add",
          value: function add(selectionOrFieldName) {
            var selection = void 0;
            if (Object.prototype.toString.call(selectionOrFieldName) === "[object String]") {
              trackFieldDependency(this.typeSchema.name, selectionOrFieldName);
              for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
              }
              selection = this.field.apply(this, [selectionOrFieldName].concat(rest));
            } else {
              if (Field.prototype.isPrototypeOf(selectionOrFieldName)) {
                trackFieldDependency(this.typeSchema.name, selectionOrFieldName.name);
              }
              selection = selectionOrFieldName;
            }
            if (selection.responseKey && this.hasSelectionWithResponseKey(selection.responseKey)) {
              throw new Error("The field name or alias '" + selection.responseKey + "' has already been added.");
            }
            this.selections.push(selection);
          }
        }, {
          key: "field",
          value: function field(name) {
            for (var _len2 = arguments.length, creationArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              creationArgs[_key2 - 1] = arguments[_key2];
            }
            var parsedArgs = parseFieldCreationArgs(creationArgs);
            var options = parsedArgs.options, callback = parsedArgs.callback;
            var selectionSet = parsedArgs.selectionSet;
            if (!selectionSet) {
              if (!this.typeSchema.fieldBaseTypes[name]) {
                throw new Error('No field of name "' + name + '" found on type "' + this.typeSchema.name + '" in schema');
              }
              var fieldBaseType = schemaForType(this.typeBundle, this.typeSchema.fieldBaseTypes[name]);
              selectionSet = new SelectionSet(this.typeBundle, fieldBaseType, callback);
            }
            return new Field(name, options, selectionSet);
          }
        }, {
          key: "inlineFragmentOn",
          value: function inlineFragmentOn(typeName) {
            var builderFunctionOrSelectionSet = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
            var selectionSet = void 0;
            if (SelectionSet.prototype.isPrototypeOf(builderFunctionOrSelectionSet)) {
              selectionSet = builderFunctionOrSelectionSet;
            } else {
              selectionSet = new SelectionSet(this.typeBundle, schemaForType(this.typeBundle, typeName), builderFunctionOrSelectionSet);
            }
            return new InlineFragment(typeName, selectionSet);
          }
        }, {
          key: "addField",
          value: function addField(name) {
            for (var _len3 = arguments.length, creationArgs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              creationArgs[_key3 - 1] = arguments[_key3];
            }
            this.add.apply(this, [name].concat(creationArgs));
          }
        }, {
          key: "addConnection",
          value: function addConnection(name) {
            for (var _len4 = arguments.length, creationArgs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
              creationArgs[_key4 - 1] = arguments[_key4];
            }
            var _parseFieldCreationAr = parseFieldCreationArgs(creationArgs), options = _parseFieldCreationAr.options, callback = _parseFieldCreationAr.callback, selectionSet = _parseFieldCreationAr.selectionSet;
            this.add(name, options, function(connection) {
              connection.add("pageInfo", {}, function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              connection.add("edges", {}, function(edges) {
                edges.add("cursor");
                edges.addField("node", {}, selectionSet || callback);
              });
            });
          }
        }, {
          key: "addInlineFragmentOn",
          value: function addInlineFragmentOn(typeName) {
            var fieldTypeCb = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
            this.add(this.inlineFragmentOn(typeName, fieldTypeCb));
          }
        }, {
          key: "addFragment",
          value: function addFragment(fragmentSpread) {
            this.add(fragmentSpread);
          }
        }]);
        return SelectionSetBuilder2;
      }();
      function parseArgs(args) {
        var name = void 0;
        var variables = void 0;
        var selectionSetCallback = void 0;
        if (args.length === 3) {
          var _args = slicedToArray(args, 3);
          name = _args[0];
          variables = _args[1];
          selectionSetCallback = _args[2];
        } else if (args.length === 2) {
          if (Object.prototype.toString.call(args[0]) === "[object String]") {
            name = args[0];
            variables = null;
          } else if (Array.isArray(args[0])) {
            variables = args[0];
            name = null;
          }
          selectionSetCallback = args[1];
        } else {
          selectionSetCallback = args[0];
          name = null;
        }
        return { name, variables, selectionSetCallback };
      }
      var VariableDefinitions = function() {
        function VariableDefinitions2(variableDefinitions) {
          classCallCheck(this, VariableDefinitions2);
          this.variableDefinitions = variableDefinitions ? [].concat(toConsumableArray(variableDefinitions)) : [];
          Object.freeze(this.variableDefinitions);
          Object.freeze(this);
        }
        createClass(VariableDefinitions2, [{
          key: "toString",
          value: function toString() {
            if (this.variableDefinitions.length === 0) {
              return "";
            }
            return " (" + join(this.variableDefinitions) + ") ";
          }
        }]);
        return VariableDefinitions2;
      }();
      var Operation = function() {
        function Operation2(typeBundle, operationType) {
          classCallCheck(this, Operation2);
          for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }
          var _parseArgs = parseArgs(args), name = _parseArgs.name, variables = _parseArgs.variables, selectionSetCallback = _parseArgs.selectionSetCallback;
          this.typeBundle = typeBundle;
          this.name = name;
          this.variableDefinitions = new VariableDefinitions(variables);
          this.operationType = operationType;
          if (operationType === "query") {
            this.selectionSet = new SelectionSet(typeBundle, typeBundle.queryType, selectionSetCallback);
            this.typeSchema = schemaForType(typeBundle, typeBundle.queryType);
          } else {
            this.selectionSet = new SelectionSet(typeBundle, typeBundle.mutationType, selectionSetCallback);
            this.typeSchema = schemaForType(typeBundle, typeBundle.mutationType);
          }
          Object.freeze(this);
        }
        createClass(Operation2, [{
          key: "toString",
          value: function toString() {
            var nameString = this.name ? " " + this.name : "";
            return "" + this.operationType + nameString + this.variableDefinitions + this.selectionSet;
          }
        }, {
          key: "isAnonymous",
          get: function get$$1() {
            return !this.name;
          }
        }]);
        return Operation2;
      }();
      var Query = function(_Operation) {
        inherits(Query2, _Operation);
        function Query2(typeBundle) {
          var _ref;
          classCallCheck(this, Query2);
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return possibleConstructorReturn(this, (_ref = Query2.__proto__ || Object.getPrototypeOf(Query2)).call.apply(_ref, [this, typeBundle, "query"].concat(args)));
        }
        return Query2;
      }(Operation);
      var Mutation = function(_Operation) {
        inherits(Mutation2, _Operation);
        function Mutation2(typeBundle) {
          var _ref;
          classCallCheck(this, Mutation2);
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return possibleConstructorReturn(this, (_ref = Mutation2.__proto__ || Object.getPrototypeOf(Mutation2)).call.apply(_ref, [this, typeBundle, "mutation"].concat(args)));
        }
        return Mutation2;
      }(Operation);
      function isAnonymous(operation) {
        return operation.isAnonymous;
      }
      function hasAnonymousOperations(operations) {
        return operations.some(isAnonymous);
      }
      function hasDuplicateOperationNames(operations) {
        var names = operations.map(function(operation) {
          return operation.name;
        });
        return names.reduce(function(hasDuplicates, name, index) {
          return hasDuplicates || names.indexOf(name) !== index;
        }, false);
      }
      function extractOperation(typeBundle, operationType) {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }
        if (Operation.prototype.isPrototypeOf(args[0])) {
          return args[0];
        }
        if (operationType === "query") {
          return new (Function.prototype.bind.apply(Query, [null].concat([typeBundle], args)))();
        } else {
          return new (Function.prototype.bind.apply(Mutation, [null].concat([typeBundle], args)))();
        }
      }
      function isInvalidOperationCombination(operations) {
        if (operations.length === 1) {
          return false;
        }
        return hasAnonymousOperations(operations) || hasDuplicateOperationNames(operations);
      }
      function fragmentNameIsNotUnique(existingDefinitions, name) {
        return existingDefinitions.some(function(definition) {
          return definition.name === name;
        });
      }
      var Document = function() {
        function Document2(typeBundle) {
          classCallCheck(this, Document2);
          this.typeBundle = typeBundle;
          this.definitions = [];
        }
        createClass(Document2, [{
          key: "toString",
          value: function toString() {
            return join(this.definitions);
          }
        }, {
          key: "addOperation",
          value: function addOperation(operationType) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            var operation = extractOperation.apply(void 0, [this.typeBundle, operationType].concat(args));
            if (isInvalidOperationCombination(this.operations.concat(operation))) {
              throw new Error("All operations must be uniquely named on a multi-operation document");
            }
            this.definitions.push(operation);
          }
        }, {
          key: "addQuery",
          value: function addQuery() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }
            this.addOperation.apply(this, ["query"].concat(args));
          }
        }, {
          key: "addMutation",
          value: function addMutation() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }
            this.addOperation.apply(this, ["mutation"].concat(args));
          }
        }, {
          key: "defineFragment",
          value: function defineFragment(name, onType, builderFunction) {
            if (fragmentNameIsNotUnique(this.fragmentDefinitions, name)) {
              throw new Error("All fragments must be uniquely named on a multi-fragment document");
            }
            var selectionSet = new SelectionSet(this.typeBundle, onType, builderFunction);
            var fragment = new FragmentDefinition(name, onType, selectionSet);
            this.definitions.push(fragment);
            return fragment.spread;
          }
        }, {
          key: "operations",
          get: function get$$1() {
            return this.definitions.filter(function(definition) {
              return Operation.prototype.isPrototypeOf(definition);
            });
          }
        }, {
          key: "fragmentDefinitions",
          get: function get$$1() {
            return this.definitions.filter(function(definition) {
              return FragmentDefinition.prototype.isPrototypeOf(definition);
            });
          }
        }]);
        return Document2;
      }();
      var GraphModel = function GraphModel2(attrs) {
        var _this = this;
        classCallCheck(this, GraphModel2);
        Object.defineProperty(this, "attrs", { value: attrs, enumerable: false });
        Object.keys(this.attrs).filter(function(key) {
          return !(key in _this);
        }).forEach(function(key) {
          var descriptor = void 0;
          if (attrs[key] === null) {
            descriptor = {
              enumerable: true,
              get: function get$$1() {
                return null;
              }
            };
          } else {
            descriptor = {
              enumerable: true,
              get: function get$$1() {
                return this.attrs[key].valueOf();
              }
            };
          }
          Object.defineProperty(_this, key, descriptor);
        });
      };
      var ClassRegistry = function() {
        function ClassRegistry2() {
          classCallCheck(this, ClassRegistry2);
          this.classStore = {};
        }
        createClass(ClassRegistry2, [{
          key: "registerClassForType",
          value: function registerClassForType(constructor, type) {
            this.classStore[type] = constructor;
          }
        }, {
          key: "unregisterClassForType",
          value: function unregisterClassForType(type) {
            delete this.classStore[type];
          }
        }, {
          key: "classForType",
          value: function classForType(type) {
            return this.classStore[type] || GraphModel;
          }
        }]);
        return ClassRegistry2;
      }();
      function isValue(arg) {
        return Object.prototype.toString.call(arg) !== "[object Null]" && Object.prototype.toString.call(arg) !== "[object Undefined]";
      }
      function isNodeContext(context) {
        return context.selection.selectionSet.typeSchema.implementsNode;
      }
      function isConnection(context) {
        return context.selection.selectionSet.typeSchema.name.endsWith("Connection");
      }
      function nearestNode(context) {
        if (context == null) {
          return null;
        } else if (isNodeContext(context)) {
          return context;
        } else {
          return nearestNode(context.parent);
        }
      }
      function contextsFromRoot(context) {
        if (context.parent) {
          return contextsFromRoot(context.parent).concat(context);
        } else {
          return [context];
        }
      }
      function contextsFromNearestNode(context) {
        if (context.selection.selectionSet.typeSchema.implementsNode) {
          return [context];
        } else {
          return contextsFromNearestNode(context.parent).concat(context);
        }
      }
      function initializeDocumentAndVars(currentContext, contextChain) {
        var lastInChain = contextChain[contextChain.length - 1];
        var first = lastInChain.selection.args.first;
        var variableDefinitions = Object.keys(lastInChain.selection.args).filter(function(key) {
          return isVariable(lastInChain.selection.args[key]);
        }).map(function(key) {
          return lastInChain.selection.args[key];
        });
        var firstVar = variableDefinitions.find(function(definition) {
          return definition.name === "first";
        });
        if (!firstVar) {
          if (isVariable(first)) {
            firstVar = first;
          } else {
            firstVar = variable("first", "Int", first);
            variableDefinitions.push(firstVar);
          }
        }
        var document2 = new Document(currentContext.selection.selectionSet.typeBundle);
        return [document2, variableDefinitions, firstVar];
      }
      function addNextFieldTo(currentSelection, contextChain, path, cursor) {
        var nextContext = contextChain.shift();
        path.push(nextContext.selection.responseKey);
        if (contextChain.length) {
          currentSelection.add(nextContext.selection.name, { alias: nextContext.selection.alias, args: nextContext.selection.args }, function(newSelection) {
            addNextFieldTo(newSelection, contextChain, path, cursor);
          });
        } else {
          var edgesField = nextContext.selection.selectionSet.selections.find(function(field) {
            return field.name === "edges";
          });
          var nodeField = edgesField.selectionSet.selections.find(function(field) {
            return field.name === "node";
          });
          var first = void 0;
          if (isVariable(nextContext.selection.args.first)) {
            first = nextContext.selection.args.first;
          } else {
            first = variable("first", "Int", nextContext.selection.args.first);
          }
          var options = {
            alias: nextContext.selection.alias,
            args: Object.assign({}, nextContext.selection.args, { after: cursor, first })
          };
          currentSelection.addConnection(nextContext.selection.name, options, nodeField.selectionSet);
        }
      }
      function collectFragments(selections) {
        return selections.reduce(function(fragmentDefinitions, field) {
          if (FragmentSpread.prototype.isPrototypeOf(field)) {
            fragmentDefinitions.push(field.toDefinition());
          }
          fragmentDefinitions.push.apply(fragmentDefinitions, toConsumableArray(collectFragments(field.selectionSet.selections)));
          return fragmentDefinitions;
        }, []);
      }
      function nextPageQueryAndPath(context, cursor) {
        var nearestNodeContext = nearestNode(context);
        if (nearestNodeContext) {
          return function() {
            var _document$definitions;
            var path = [];
            var nodeType = nearestNodeContext.selection.selectionSet.typeSchema;
            var nodeId = nearestNodeContext.responseData.id;
            var contextChain = contextsFromNearestNode(context);
            var _initializeDocumentAn = initializeDocumentAndVars(context, contextChain), _initializeDocumentAn2 = slicedToArray(_initializeDocumentAn, 2), document2 = _initializeDocumentAn2[0], variableDefinitions = _initializeDocumentAn2[1];
            document2.addQuery(variableDefinitions, function(root) {
              path.push("node");
              root.add("node", { args: { id: nodeId } }, function(node) {
                node.addInlineFragmentOn(nodeType.name, function(fragment) {
                  addNextFieldTo(fragment, contextChain.slice(1), path, cursor);
                });
              });
            });
            var fragments = collectFragments(document2.operations[0].selectionSet.selections);
            (_document$definitions = document2.definitions).unshift.apply(_document$definitions, toConsumableArray(fragments));
            return [document2, path];
          };
        } else {
          return function() {
            var _document$definitions2;
            var path = [];
            var contextChain = contextsFromRoot(context);
            var _initializeDocumentAn3 = initializeDocumentAndVars(context, contextChain), _initializeDocumentAn4 = slicedToArray(_initializeDocumentAn3, 2), document2 = _initializeDocumentAn4[0], variableDefinitions = _initializeDocumentAn4[1];
            document2.addQuery(variableDefinitions, function(root) {
              addNextFieldTo(root, contextChain.slice(1), path, cursor);
            });
            var fragments = collectFragments(document2.operations[0].selectionSet.selections);
            (_document$definitions2 = document2.definitions).unshift.apply(_document$definitions2, toConsumableArray(fragments));
            return [document2, path];
          };
        }
      }
      function hasNextPage$1(connection, edge) {
        if (edge !== connection.edges[connection.edges.length - 1]) {
          return new Scalar(true);
        }
        return connection.pageInfo.hasNextPage;
      }
      function hasPreviousPage(connection, edge) {
        if (edge !== connection.edges[0]) {
          return new Scalar(true);
        }
        return connection.pageInfo.hasPreviousPage;
      }
      function transformConnections(variableValues) {
        return function(context, value) {
          if (isConnection(context)) {
            if (!(value.pageInfo && value.pageInfo.hasOwnProperty("hasNextPage") && value.pageInfo.hasOwnProperty("hasPreviousPage"))) {
              throw new Error('Connections must include the selections "pageInfo { hasNextPage, hasPreviousPage }".');
            }
            return value.edges.map(function(edge) {
              return Object.assign(edge.node, {
                nextPageQueryAndPath: nextPageQueryAndPath(context, edge.cursor),
                hasNextPage: hasNextPage$1(value, edge),
                hasPreviousPage: hasPreviousPage(value, edge),
                variableValues
              });
            });
          } else {
            return value;
          }
        };
      }
      var DecodingContext = function() {
        function DecodingContext2(selection, responseData) {
          var parent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
          classCallCheck(this, DecodingContext2);
          this.selection = selection;
          this.responseData = responseData;
          this.parent = parent;
          Object.freeze(this);
        }
        createClass(DecodingContext2, [{
          key: "contextForObjectProperty",
          value: function contextForObjectProperty(responseKey) {
            var nestedSelections = this.selection.selectionSet.selectionsByResponseKey[responseKey];
            var nextSelection = nestedSelections && nestedSelections[0];
            var nextContext = void 0;
            if (Spread.prototype.isPrototypeOf(nextSelection)) {
              nextContext = new DecodingContext2(nextSelection, this.responseData, this.parent);
            } else {
              nextContext = new DecodingContext2(nextSelection, this.responseData[responseKey], this);
            }
            if (!nextSelection) {
              throw new Error('Unexpected response key "' + responseKey + '", not found in selection set: ' + this.selection.selectionSet);
            }
            if (Field.prototype.isPrototypeOf(nextSelection)) {
              return nextContext;
            } else {
              return nextContext.contextForObjectProperty(responseKey);
            }
          }
        }, {
          key: "contextForArrayItem",
          value: function contextForArrayItem(item) {
            return new DecodingContext2(this.selection, item, this.parent);
          }
        }]);
        return DecodingContext2;
      }();
      function decodeArrayItems(context, transformers) {
        return context.responseData.map(function(item) {
          return decodeContext(context.contextForArrayItem(item), transformers);
        });
      }
      function decodeObjectValues(context, transformers) {
        return Object.keys(context.responseData).reduce(function(acc, responseKey) {
          acc[responseKey] = decodeContext(context.contextForObjectProperty(responseKey), transformers);
          return acc;
        }, {});
      }
      function runTransformers(transformers, context, value) {
        return transformers.reduce(function(acc, transformer) {
          return transformer(context, acc);
        }, value);
      }
      function decodeContext(context, transformers) {
        var value = context.responseData;
        if (Array.isArray(value)) {
          value = decodeArrayItems(context, transformers);
        } else if (isObject(value)) {
          value = decodeObjectValues(context, transformers);
        }
        return runTransformers(transformers, context, value);
      }
      function generateRefetchQueries(context, value) {
        if (isValue(value) && isNodeContext(context)) {
          value.refetchQuery = function() {
            return new Query(context.selection.selectionSet.typeBundle, function(root) {
              root.add("node", { args: { id: context.responseData.id } }, function(node) {
                node.addInlineFragmentOn(context.selection.selectionSet.typeSchema.name, context.selection.selectionSet);
              });
            });
          };
        }
        return value;
      }
      function transformPojosToClassesWithRegistry(classRegistry) {
        return function transformPojosToClasses(context, value) {
          if (isObject(value)) {
            var Klass = classRegistry.classForType(context.selection.selectionSet.typeSchema.name);
            return new Klass(value);
          } else {
            return value;
          }
        };
      }
      function transformScalars(context, value) {
        if (isValue(value)) {
          if (context.selection.selectionSet.typeSchema.kind === "SCALAR") {
            return new Scalar(value);
          } else if (context.selection.selectionSet.typeSchema.kind === "ENUM") {
            return new Enum(value);
          }
        }
        return value;
      }
      function recordTypeInformation(context, value) {
        var _context$selection$se = context.selection.selectionSet, typeBundle = _context$selection$se.typeBundle, typeSchema = _context$selection$se.typeSchema;
        if (isValue(value)) {
          if (value.__typename) {
            value.type = schemaForType(typeBundle, value.__typename, typeSchema);
          } else {
            value.type = typeSchema;
          }
        }
        return value;
      }
      function defaultTransformers(_ref) {
        var _ref$classRegistry = _ref.classRegistry, classRegistry = _ref$classRegistry === void 0 ? new ClassRegistry() : _ref$classRegistry, variableValues = _ref.variableValues;
        return [transformScalars, generateRefetchQueries, transformConnections(variableValues), recordTypeInformation, transformPojosToClassesWithRegistry(classRegistry)];
      }
      function decode(selection, responseData) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var transformers = options.transformers || defaultTransformers(options);
        var context = new DecodingContext(selection, responseData);
        return decodeContext(context, transformers);
      }
      function httpFetcher(url) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return function fetcher(graphQLParams, headers) {
          return fetch(url, _extends({
            body: JSON.stringify(graphQLParams),
            method: "POST",
            mode: "cors"
          }, options, {
            headers: _extends({
              "Content-Type": "application/json",
              Accept: "application/json"
            }, options.headers, headers)
          })).then(function(response) {
            var contentType = response.headers.get("content-type");
            if (contentType.indexOf("application/json") > -1) {
              return response.json();
            }
            return response.text().then(function(text) {
              return { text };
            });
          });
        };
      }
      function hasNextPage(paginatedModels) {
        return paginatedModels && paginatedModels.length && paginatedModels[paginatedModels.length - 1].hasNextPage;
      }
      var Client$2 = function() {
        function Client3(typeBundle, _ref) {
          var url = _ref.url, fetcherOptions = _ref.fetcherOptions, fetcher = _ref.fetcher, _ref$registry = _ref.registry, registry = _ref$registry === void 0 ? new ClassRegistry() : _ref$registry;
          classCallCheck(this, Client3);
          this.typeBundle = typeBundle;
          this.classRegistry = registry;
          if (url && fetcher) {
            throw new Error("Arguments not supported: supply either `url` and optional `fetcherOptions` OR use a `fetcher` function for further customization.");
          }
          if (url) {
            this.fetcher = httpFetcher(url, fetcherOptions);
          } else if (fetcher) {
            if (fetcherOptions) {
              throw new Error("Arguments not supported: when specifying your own `fetcher`, set options through it and not with `fetcherOptions`");
            }
            this.fetcher = fetcher;
          } else {
            throw new Error("Invalid arguments: one of `url` or `fetcher` is needed.");
          }
        }
        createClass(Client3, [{
          key: "document",
          value: function document2() {
            return new Document(this.typeBundle);
          }
        }, {
          key: "query",
          value: function query2() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return new (Function.prototype.bind.apply(Query, [null].concat([this.typeBundle], args)))();
          }
        }, {
          key: "mutation",
          value: function mutation() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            return new (Function.prototype.bind.apply(Mutation, [null].concat([this.typeBundle], args)))();
          }
        }, {
          key: "send",
          value: function send(request) {
            var variableValues = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
            var _this = this;
            var otherProperties = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
            var headers = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
            var operationOrDocument = void 0;
            if (Function.prototype.isPrototypeOf(request)) {
              operationOrDocument = request(this);
            } else {
              operationOrDocument = request;
            }
            var graphQLParams = { query: operationOrDocument.toString() };
            if (variableValues) {
              graphQLParams.variables = variableValues;
            }
            Object.assign(graphQLParams, otherProperties);
            var operation = void 0;
            if (Operation.prototype.isPrototypeOf(operationOrDocument)) {
              operation = operationOrDocument;
            } else {
              var document2 = operationOrDocument;
              if (document2.operations.length === 1) {
                operation = document2.operations[0];
              } else if (otherProperties.operationName) {
                operation = document2.operations.find(function(documentOperation) {
                  return documentOperation.name === otherProperties.operationName;
                });
              } else {
                throw new Error("\n          A document must contain exactly one operation, or an operationName\n          must be specified. Example:\n\n            client.send(document, null, {operationName: 'myFancyQuery'});\n        ");
              }
            }
            return this.fetcher(graphQLParams, headers).then(function(response) {
              if (response.data) {
                response.model = decode(operation, response.data, {
                  classRegistry: _this.classRegistry,
                  variableValues
                });
              }
              return response;
            });
          }
        }, {
          key: "fetchNextPage",
          value: function fetchNextPage(nodeOrNodes, options) {
            var node = void 0;
            if (Array.isArray(nodeOrNodes)) {
              node = nodeOrNodes[nodeOrNodes.length - 1];
            } else {
              node = nodeOrNodes;
            }
            var _node$nextPageQueryAn = node.nextPageQueryAndPath(), _node$nextPageQueryAn2 = slicedToArray(_node$nextPageQueryAn, 2), query2 = _node$nextPageQueryAn2[0], path = _node$nextPageQueryAn2[1];
            var variableValues = void 0;
            if (node.variableValues || options) {
              variableValues = Object.assign({}, node.variableValues, options);
            }
            return this.send(query2, variableValues).then(function(response) {
              response.model = path.reduce(function(object, key) {
                return object[key];
              }, response.model);
              return response;
            });
          }
        }, {
          key: "fetchAllPages",
          value: function fetchAllPages(paginatedModels, _ref2) {
            var _this2 = this;
            var pageSize = _ref2.pageSize;
            if (hasNextPage(paginatedModels)) {
              return this.fetchNextPage(paginatedModels, { first: pageSize }).then(function(_ref3) {
                var model = _ref3.model;
                var pages = paginatedModels.concat(model);
                return _this2.fetchAllPages(pages, { pageSize });
              });
            }
            return Promise.resolve(paginatedModels);
          }
        }, {
          key: "refetch",
          value: function refetch(nodeType) {
            if (!nodeType) {
              throw new Error("'client#refetch' must be called with a non-null instance of a Node.");
            } else if (!nodeType.type.implementsNode) {
              throw new Error("'client#refetch' must be called with a type that implements Node. Received " + nodeType.type.name + ".");
            }
            return this.send(nodeType.refetchQuery()).then(function(_ref4) {
              var model = _ref4.model;
              return model.node;
            });
          }
        }, {
          key: "variable",
          value: function variable$$1(name, type, defaultValue) {
            return variable(name, type, defaultValue);
          }
        }, {
          key: "enum",
          value: function _enum(key) {
            return enumFunction(key);
          }
        }]);
        return Client3;
      }();
      var Config = function() {
        createClass$1(Config2, [{
          key: "requiredProperties",
          get: function get$$1() {
            return ["storefrontAccessToken", "domain"];
          }
        }, {
          key: "deprecatedProperties",
          get: function get$$1() {
            return {
              accessToken: "storefrontAccessToken",
              apiKey: "storefrontAccessToken"
            };
          }
        }]);
        function Config2(attrs) {
          var _this = this;
          classCallCheck$1(this, Config2);
          Object.keys(this.deprecatedProperties).forEach(function(key) {
            if (!attrs.hasOwnProperty(key)) {
              return;
            }
            console.warn("[ShopifyBuy] Config property " + key + " is deprecated as of v1.0, please use " + _this.deprecatedProperties[key] + " instead.");
            attrs[_this.deprecatedProperties[key]] = attrs[key];
          });
          this.requiredProperties.forEach(function(key) {
            if (attrs.hasOwnProperty(key)) {
              _this[key] = attrs[key];
            } else {
              throw new Error("new Config() requires the option '" + key + "'");
            }
          });
          if (attrs.hasOwnProperty("apiVersion")) {
            this.apiVersion = attrs.apiVersion;
          } else {
            this.apiVersion = "2022-04";
          }
          if (attrs.hasOwnProperty("source")) {
            this.source = attrs.source;
          }
          if (attrs.hasOwnProperty("language")) {
            this.language = attrs.language;
          }
        }
        return Config2;
      }();
      var Resource = function Resource2(client) {
        classCallCheck$1(this, Resource2);
        this.graphQLClient = client;
      };
      var defaultErrors = [{ message: "an unknown error has occurred." }];
      function defaultResolver(path) {
        var keys = path.split(".");
        return function(_ref) {
          var model = _ref.model, errors = _ref.errors;
          return new Promise(function(resolve, reject) {
            try {
              var result = keys.reduce(function(ref, key) {
                return ref[key];
              }, model);
              resolve(result);
            } catch (_) {
              if (errors) {
                reject(errors);
              } else {
                reject(defaultErrors);
              }
            }
          });
        };
      }
      function fetchResourcesForProducts(productOrProduct, client) {
        var products = [].concat(productOrProduct);
        return Promise.all(products.reduce(function(promiseAcc, product) {
          if (product === null) {
            return promiseAcc;
          }
          promiseAcc.push(client.fetchAllPages(product.images, { pageSize: 250 }).then(function(images) {
            product.attrs.images = images;
          }));
          promiseAcc.push(client.fetchAllPages(product.variants, { pageSize: 250 }).then(function(variants) {
            product.attrs.variants = variants;
          }));
          return promiseAcc;
        }, []));
      }
      function paginateProductConnectionsAndResolve(client) {
        return function(products) {
          return fetchResourcesForProducts(products, client).then(function() {
            return products;
          });
        };
      }
      function paginateCollectionsProductConnectionsAndResolve(client) {
        return function(collectionOrCollections) {
          var collections = [].concat(collectionOrCollections);
          return Promise.all(collections.reduce(function(promiseAcc, collection) {
            return promiseAcc.concat(fetchResourcesForProducts(collection.products, client));
          }, [])).then(function() {
            return collectionOrCollections;
          });
        };
      }
      var productHelpers = {
        variantForOptions: function variantForOptions(product, options) {
          return product.variants.find(function(variant) {
            return variant.selectedOptions.every(function(selectedOption) {
              return options[selectedOption.name] === selectedOption.value.valueOf();
            });
          });
        }
      };
      function query(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.id = client.variable("id", "ID!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.ProductFragment = document2.defineFragment("ProductFragment", "Product", function(root) {
          root.add("id");
          root.add("availableForSale");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("descriptionHtml");
          root.add("description");
          root.add("handle");
          root.add("productType");
          root.add("title");
          root.add("vendor");
          root.add("publishedAt");
          root.add("onlineStoreUrl");
          root.add("options", function(options) {
            options.add("name");
            options.add("values");
          });
          root.add("images", {
            args: {
              first: 250
            }
          }, function(images) {
            images.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            images.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("src");
                node.add("altText");
                node.add("width");
                node.add("height");
              });
            });
          });
          root.add("variants", {
            args: {
              first: 250
            }
          }, function(variants) {
            variants.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            variants.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.addFragment(spreads.VariantFragment);
              });
            });
          });
        });
        document2.addQuery([variables.__defaultOperation__.id], function(root) {
          root.add("node", {
            args: {
              id: variables.__defaultOperation__.id
            }
          }, function(node) {
            node.addFragment(spreads.ProductFragment);
          });
        });
        return document2;
      }
      function query$1(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.ids = client.variable("ids", "[ID!]!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.ProductFragment = document2.defineFragment("ProductFragment", "Product", function(root) {
          root.add("id");
          root.add("availableForSale");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("descriptionHtml");
          root.add("description");
          root.add("handle");
          root.add("productType");
          root.add("title");
          root.add("vendor");
          root.add("publishedAt");
          root.add("onlineStoreUrl");
          root.add("options", function(options) {
            options.add("name");
            options.add("values");
          });
          root.add("images", {
            args: {
              first: 250
            }
          }, function(images) {
            images.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            images.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("src");
                node.add("altText");
                node.add("width");
                node.add("height");
              });
            });
          });
          root.add("variants", {
            args: {
              first: 250
            }
          }, function(variants) {
            variants.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            variants.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.addFragment(spreads.VariantFragment);
              });
            });
          });
        });
        document2.addQuery([variables.__defaultOperation__.ids], function(root) {
          root.add("nodes", {
            args: {
              ids: variables.__defaultOperation__.ids
            }
          }, function(nodes) {
            nodes.addFragment(spreads.ProductFragment);
          });
        });
        return document2;
      }
      function query$2(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.first = client.variable("first", "Int!");
        variables.__defaultOperation__.query = client.variable("query", "String");
        variables.__defaultOperation__.sortKey = client.variable("sortKey", "ProductSortKeys");
        variables.__defaultOperation__.reverse = client.variable("reverse", "Boolean");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.ProductFragment = document2.defineFragment("ProductFragment", "Product", function(root) {
          root.add("id");
          root.add("availableForSale");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("descriptionHtml");
          root.add("description");
          root.add("handle");
          root.add("productType");
          root.add("title");
          root.add("vendor");
          root.add("publishedAt");
          root.add("onlineStoreUrl");
          root.add("options", function(options) {
            options.add("name");
            options.add("values");
          });
          root.add("images", {
            args: {
              first: 250
            }
          }, function(images) {
            images.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            images.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("src");
                node.add("altText");
                node.add("width");
                node.add("height");
              });
            });
          });
          root.add("variants", {
            args: {
              first: 250
            }
          }, function(variants) {
            variants.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            variants.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.addFragment(spreads.VariantFragment);
              });
            });
          });
        });
        document2.addQuery([variables.__defaultOperation__.first, variables.__defaultOperation__.query, variables.__defaultOperation__.sortKey, variables.__defaultOperation__.reverse], function(root) {
          root.add("products", {
            args: {
              first: variables.__defaultOperation__.first,
              query: variables.__defaultOperation__.query,
              sortKey: variables.__defaultOperation__.sortKey,
              reverse: variables.__defaultOperation__.reverse
            }
          }, function(products) {
            products.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            products.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.addFragment(spreads.ProductFragment);
              });
            });
          });
        });
        return document2;
      }
      function query$3(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.handle = client.variable("handle", "String!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.ProductFragment = document2.defineFragment("ProductFragment", "Product", function(root) {
          root.add("id");
          root.add("availableForSale");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("descriptionHtml");
          root.add("description");
          root.add("handle");
          root.add("productType");
          root.add("title");
          root.add("vendor");
          root.add("publishedAt");
          root.add("onlineStoreUrl");
          root.add("options", function(options) {
            options.add("name");
            options.add("values");
          });
          root.add("images", {
            args: {
              first: 250
            }
          }, function(images) {
            images.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            images.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("src");
                node.add("altText");
                node.add("width");
                node.add("height");
              });
            });
          });
          root.add("variants", {
            args: {
              first: 250
            }
          }, function(variants) {
            variants.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            variants.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.addFragment(spreads.VariantFragment);
              });
            });
          });
        });
        document2.addQuery([variables.__defaultOperation__.handle], function(root) {
          root.add("productByHandle", {
            args: {
              handle: variables.__defaultOperation__.handle
            }
          }, function(productByHandle2) {
            productByHandle2.addFragment(spreads.ProductFragment);
          });
        });
        return document2;
      }
      function query$4(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.productId = client.variable("productId", "ID!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.ProductFragment = document2.defineFragment("ProductFragment", "Product", function(root) {
          root.add("id");
          root.add("availableForSale");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("descriptionHtml");
          root.add("description");
          root.add("handle");
          root.add("productType");
          root.add("title");
          root.add("vendor");
          root.add("publishedAt");
          root.add("onlineStoreUrl");
          root.add("options", function(options) {
            options.add("name");
            options.add("values");
          });
          root.add("images", {
            args: {
              first: 250
            }
          }, function(images) {
            images.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            images.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("src");
                node.add("altText");
                node.add("width");
                node.add("height");
              });
            });
          });
          root.add("variants", {
            args: {
              first: 250
            }
          }, function(variants) {
            variants.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            variants.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.addFragment(spreads.VariantFragment);
              });
            });
          });
        });
        document2.addQuery([variables.__defaultOperation__.productId], function(root) {
          root.add("productRecommendations", {
            args: {
              productId: variables.__defaultOperation__.productId
            }
          }, function(productRecommendations) {
            productRecommendations.addFragment(spreads.ProductFragment);
          });
        });
        return document2;
      }
      var ProductResource = function(_Resource) {
        inherits$1(ProductResource2, _Resource);
        function ProductResource2() {
          classCallCheck$1(this, ProductResource2);
          return possibleConstructorReturn$1(this, (ProductResource2.__proto__ || Object.getPrototypeOf(ProductResource2)).apply(this, arguments));
        }
        createClass$1(ProductResource2, [{
          key: "fetchAll",
          value: function fetchAll() {
            var first = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 20;
            return this.graphQLClient.send(query$2, { first }).then(defaultResolver("products")).then(paginateProductConnectionsAndResolve(this.graphQLClient));
          }
        }, {
          key: "fetch",
          value: function fetch2(id) {
            return this.graphQLClient.send(query, { id }).then(defaultResolver("node")).then(paginateProductConnectionsAndResolve(this.graphQLClient));
          }
        }, {
          key: "fetchMultiple",
          value: function fetchMultiple(ids) {
            return this.graphQLClient.send(query$1, { ids }).then(defaultResolver("nodes")).then(paginateProductConnectionsAndResolve(this.graphQLClient));
          }
        }, {
          key: "fetchByHandle",
          value: function fetchByHandle(handle) {
            return this.graphQLClient.send(query$3, { handle }).then(defaultResolver("productByHandle")).then(paginateProductConnectionsAndResolve(this.graphQLClient));
          }
        }, {
          key: "fetchQuery",
          value: function fetchQuery() {
            var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$first = _ref.first, first = _ref$first === void 0 ? 20 : _ref$first, _ref$sortKey = _ref.sortKey, sortKey = _ref$sortKey === void 0 ? "ID" : _ref$sortKey, query$$1 = _ref.query, reverse = _ref.reverse;
            return this.graphQLClient.send(query$2, {
              first,
              sortKey,
              query: query$$1,
              reverse
            }).then(defaultResolver("products")).then(paginateProductConnectionsAndResolve(this.graphQLClient));
          }
        }, {
          key: "fetchRecommendations",
          value: function fetchRecommendations(productId) {
            return this.graphQLClient.send(query$4, { productId }).then(defaultResolver("productRecommendations")).then(paginateProductConnectionsAndResolve(this.graphQLClient));
          }
        }, {
          key: "helpers",
          get: function get$$1() {
            return productHelpers;
          }
        }]);
        return ProductResource2;
      }(Resource);
      function query$5(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.id = client.variable("id", "ID!");
        spreads.CollectionFragment = document2.defineFragment("CollectionFragment", "Collection", function(root) {
          root.add("id");
          root.add("handle");
          root.add("description");
          root.add("descriptionHtml");
          root.add("updatedAt");
          root.add("title");
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
          });
        });
        document2.addQuery([variables.__defaultOperation__.id], function(root) {
          root.add("node", {
            args: {
              id: variables.__defaultOperation__.id
            }
          }, function(node) {
            node.addFragment(spreads.CollectionFragment);
          });
        });
        return document2;
      }
      function query$6(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.id = client.variable("id", "ID!");
        variables.__defaultOperation__.productsFirst = client.variable("productsFirst", "Int!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.CollectionFragment = document2.defineFragment("CollectionFragment", "Collection", function(root) {
          root.add("id");
          root.add("handle");
          root.add("description");
          root.add("descriptionHtml");
          root.add("updatedAt");
          root.add("title");
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
          });
        });
        spreads.ProductFragment = document2.defineFragment("ProductFragment", "Product", function(root) {
          root.add("id");
          root.add("availableForSale");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("descriptionHtml");
          root.add("description");
          root.add("handle");
          root.add("productType");
          root.add("title");
          root.add("vendor");
          root.add("publishedAt");
          root.add("onlineStoreUrl");
          root.add("options", function(options) {
            options.add("name");
            options.add("values");
          });
          root.add("images", {
            args: {
              first: 250
            }
          }, function(images) {
            images.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            images.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("src");
                node.add("altText");
                node.add("width");
                node.add("height");
              });
            });
          });
          root.add("variants", {
            args: {
              first: 250
            }
          }, function(variants) {
            variants.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            variants.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.addFragment(spreads.VariantFragment);
              });
            });
          });
        });
        document2.addQuery([variables.__defaultOperation__.id, variables.__defaultOperation__.productsFirst], function(root) {
          root.add("node", {
            args: {
              id: variables.__defaultOperation__.id
            }
          }, function(node) {
            node.addFragment(spreads.CollectionFragment);
            node.addInlineFragmentOn("Collection", function(Collection2) {
              Collection2.add("products", {
                args: {
                  first: variables.__defaultOperation__.productsFirst
                }
              }, function(products) {
                products.add("pageInfo", function(pageInfo) {
                  pageInfo.add("hasNextPage");
                  pageInfo.add("hasPreviousPage");
                });
                products.add("edges", function(edges) {
                  edges.add("cursor");
                  edges.add("node", function(node2) {
                    node2.addFragment(spreads.ProductFragment);
                  });
                });
              });
            });
          });
        });
        return document2;
      }
      function query$7(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.first = client.variable("first", "Int!");
        variables.__defaultOperation__.query = client.variable("query", "String");
        variables.__defaultOperation__.sortKey = client.variable("sortKey", "CollectionSortKeys");
        variables.__defaultOperation__.reverse = client.variable("reverse", "Boolean");
        spreads.CollectionFragment = document2.defineFragment("CollectionFragment", "Collection", function(root) {
          root.add("id");
          root.add("handle");
          root.add("description");
          root.add("descriptionHtml");
          root.add("updatedAt");
          root.add("title");
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
          });
        });
        document2.addQuery([variables.__defaultOperation__.first, variables.__defaultOperation__.query, variables.__defaultOperation__.sortKey, variables.__defaultOperation__.reverse], function(root) {
          root.add("collections", {
            args: {
              first: variables.__defaultOperation__.first,
              query: variables.__defaultOperation__.query,
              sortKey: variables.__defaultOperation__.sortKey,
              reverse: variables.__defaultOperation__.reverse
            }
          }, function(collections) {
            collections.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            collections.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.addFragment(spreads.CollectionFragment);
              });
            });
          });
        });
        return document2;
      }
      function query$8(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.first = client.variable("first", "Int!");
        variables.__defaultOperation__.query = client.variable("query", "String");
        variables.__defaultOperation__.sortKey = client.variable("sortKey", "CollectionSortKeys");
        variables.__defaultOperation__.reverse = client.variable("reverse", "Boolean");
        variables.__defaultOperation__.productsFirst = client.variable("productsFirst", "Int!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.CollectionFragment = document2.defineFragment("CollectionFragment", "Collection", function(root) {
          root.add("id");
          root.add("handle");
          root.add("description");
          root.add("descriptionHtml");
          root.add("updatedAt");
          root.add("title");
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
          });
        });
        spreads.ProductFragment = document2.defineFragment("ProductFragment", "Product", function(root) {
          root.add("id");
          root.add("availableForSale");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("descriptionHtml");
          root.add("description");
          root.add("handle");
          root.add("productType");
          root.add("title");
          root.add("vendor");
          root.add("publishedAt");
          root.add("onlineStoreUrl");
          root.add("options", function(options) {
            options.add("name");
            options.add("values");
          });
          root.add("images", {
            args: {
              first: 250
            }
          }, function(images) {
            images.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            images.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("src");
                node.add("altText");
                node.add("width");
                node.add("height");
              });
            });
          });
          root.add("variants", {
            args: {
              first: 250
            }
          }, function(variants) {
            variants.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            variants.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.addFragment(spreads.VariantFragment);
              });
            });
          });
        });
        document2.addQuery([variables.__defaultOperation__.first, variables.__defaultOperation__.query, variables.__defaultOperation__.sortKey, variables.__defaultOperation__.reverse, variables.__defaultOperation__.productsFirst], function(root) {
          root.add("collections", {
            args: {
              first: variables.__defaultOperation__.first,
              query: variables.__defaultOperation__.query,
              sortKey: variables.__defaultOperation__.sortKey,
              reverse: variables.__defaultOperation__.reverse
            }
          }, function(collections) {
            collections.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            collections.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.addFragment(spreads.CollectionFragment);
                node.add("products", {
                  args: {
                    first: variables.__defaultOperation__.productsFirst
                  }
                }, function(products) {
                  products.add("pageInfo", function(pageInfo) {
                    pageInfo.add("hasNextPage");
                    pageInfo.add("hasPreviousPage");
                  });
                  products.add("edges", function(edges2) {
                    edges2.add("cursor");
                    edges2.add("node", function(node2) {
                      node2.addFragment(spreads.ProductFragment);
                    });
                  });
                });
              });
            });
          });
        });
        return document2;
      }
      function query$9(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.handle = client.variable("handle", "String!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.ProductFragment = document2.defineFragment("ProductFragment", "Product", function(root) {
          root.add("id");
          root.add("availableForSale");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("descriptionHtml");
          root.add("description");
          root.add("handle");
          root.add("productType");
          root.add("title");
          root.add("vendor");
          root.add("publishedAt");
          root.add("onlineStoreUrl");
          root.add("options", function(options) {
            options.add("name");
            options.add("values");
          });
          root.add("images", {
            args: {
              first: 250
            }
          }, function(images) {
            images.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            images.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("src");
                node.add("altText");
                node.add("width");
                node.add("height");
              });
            });
          });
          root.add("variants", {
            args: {
              first: 250
            }
          }, function(variants) {
            variants.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            variants.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.addFragment(spreads.VariantFragment);
              });
            });
          });
        });
        spreads.CollectionFragment = document2.defineFragment("CollectionFragment", "Collection", function(root) {
          root.add("id");
          root.add("handle");
          root.add("description");
          root.add("descriptionHtml");
          root.add("updatedAt");
          root.add("title");
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
          });
        });
        spreads.CollectionsProductsFragment = document2.defineFragment("CollectionsProductsFragment", "Collection", function(root) {
          root.add("products", {
            args: {
              first: 20
            }
          }, function(products) {
            products.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            products.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.addFragment(spreads.ProductFragment);
              });
            });
          });
        });
        document2.addQuery([variables.__defaultOperation__.handle], function(root) {
          root.add("collectionByHandle", {
            args: {
              handle: variables.__defaultOperation__.handle
            }
          }, function(collectionByHandle2) {
            collectionByHandle2.addFragment(spreads.CollectionFragment);
            collectionByHandle2.addFragment(spreads.CollectionsProductsFragment);
          });
        });
        return document2;
      }
      var CollectionResource = function(_Resource) {
        inherits$1(CollectionResource2, _Resource);
        function CollectionResource2() {
          classCallCheck$1(this, CollectionResource2);
          return possibleConstructorReturn$1(this, (CollectionResource2.__proto__ || Object.getPrototypeOf(CollectionResource2)).apply(this, arguments));
        }
        createClass$1(CollectionResource2, [{
          key: "fetchAll",
          value: function fetchAll() {
            var first = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 20;
            return this.graphQLClient.send(query$7, { first }).then(defaultResolver("collections"));
          }
        }, {
          key: "fetchAllWithProducts",
          value: function fetchAllWithProducts() {
            var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$first = _ref.first, first = _ref$first === void 0 ? 20 : _ref$first, _ref$productsFirst = _ref.productsFirst, productsFirst = _ref$productsFirst === void 0 ? 20 : _ref$productsFirst;
            return this.graphQLClient.send(query$8, { first, productsFirst }).then(defaultResolver("collections")).then(paginateCollectionsProductConnectionsAndResolve(this.graphQLClient));
          }
        }, {
          key: "fetch",
          value: function fetch2(id) {
            return this.graphQLClient.send(query$5, { id }).then(defaultResolver("node"));
          }
        }, {
          key: "fetchWithProducts",
          value: function fetchWithProducts(id) {
            var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref2$productsFirst = _ref2.productsFirst, productsFirst = _ref2$productsFirst === void 0 ? 20 : _ref2$productsFirst;
            return this.graphQLClient.send(query$6, { id, productsFirst }).then(defaultResolver("node")).then(paginateCollectionsProductConnectionsAndResolve(this.graphQLClient));
          }
        }, {
          key: "fetchByHandle",
          value: function fetchByHandle(handle) {
            return this.graphQLClient.send(query$9, { handle }).then(defaultResolver("collectionByHandle"));
          }
        }, {
          key: "fetchQuery",
          value: function fetchQuery() {
            var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref3$first = _ref3.first, first = _ref3$first === void 0 ? 20 : _ref3$first, _ref3$sortKey = _ref3.sortKey, sortKey = _ref3$sortKey === void 0 ? "ID" : _ref3$sortKey, query2 = _ref3.query, reverse = _ref3.reverse;
            return this.graphQLClient.send(query$7, {
              first,
              sortKey,
              query: query2,
              reverse
            }).then(defaultResolver("collections"));
          }
        }]);
        return CollectionResource2;
      }(Resource);
      function query$10(client) {
        var document2 = client.document();
        document2.addQuery(function(root) {
          root.add("shop", function(shop) {
            shop.add("paymentSettings", function(paymentSettings) {
              paymentSettings.add("enabledPresentmentCurrencies");
            });
            shop.add("description");
            shop.add("moneyFormat");
            shop.add("name");
            shop.add("primaryDomain", function(primaryDomain) {
              primaryDomain.add("host");
              primaryDomain.add("sslEnabled");
              primaryDomain.add("url");
            });
          });
        });
        return document2;
      }
      function query$11(client) {
        var document2 = client.document();
        var spreads = {};
        spreads.PolicyFragment = document2.defineFragment("PolicyFragment", "ShopPolicy", function(root) {
          root.add("id");
          root.add("title");
          root.add("url");
          root.add("body");
        });
        document2.addQuery(function(root) {
          root.add("shop", function(shop) {
            shop.add("privacyPolicy", function(privacyPolicy) {
              privacyPolicy.addFragment(spreads.PolicyFragment);
            });
            shop.add("termsOfService", function(termsOfService) {
              termsOfService.addFragment(spreads.PolicyFragment);
            });
            shop.add("refundPolicy", function(refundPolicy) {
              refundPolicy.addFragment(spreads.PolicyFragment);
            });
          });
        });
        return document2;
      }
      var ShopResource = function(_Resource) {
        inherits$1(ShopResource2, _Resource);
        function ShopResource2() {
          classCallCheck$1(this, ShopResource2);
          return possibleConstructorReturn$1(this, (ShopResource2.__proto__ || Object.getPrototypeOf(ShopResource2)).apply(this, arguments));
        }
        createClass$1(ShopResource2, [{
          key: "fetchInfo",
          value: function fetchInfo() {
            return this.graphQLClient.send(query$10).then(defaultResolver("shop"));
          }
        }, {
          key: "fetchPolicies",
          value: function fetchPolicies() {
            return this.graphQLClient.send(query$11).then(defaultResolver("shop"));
          }
        }]);
        return ShopResource2;
      }(Resource);
      function handleCheckoutMutation(mutationRootKey, client) {
        return function(_ref) {
          var _ref$data = _ref.data, data = _ref$data === void 0 ? {} : _ref$data, errors = _ref.errors, _ref$model = _ref.model, model = _ref$model === void 0 ? {} : _ref$model;
          var rootData = data[mutationRootKey];
          var rootModel = model[mutationRootKey];
          if (rootData && rootData.checkout) {
            return client.fetchAllPages(rootModel.checkout.lineItems, { pageSize: 250 }).then(function(lineItems) {
              rootModel.checkout.attrs.lineItems = lineItems;
              rootModel.checkout.errors = errors;
              rootModel.checkout.userErrors = rootModel.userErrors;
              return rootModel.checkout;
            });
          }
          if (errors && errors.length) {
            return Promise.reject(new Error(JSON.stringify(errors)));
          }
          if (rootData && rootData.checkoutUserErrors && rootData.checkoutUserErrors.length) {
            return Promise.reject(new Error(JSON.stringify(rootData.checkoutUserErrors)));
          }
          if (rootData && rootData.userErrors && rootData.userErrors.length) {
            return Promise.reject(new Error(JSON.stringify(rootData.userErrors)));
          }
          return Promise.reject(new Error("The " + mutationRootKey + " mutation failed due to an unknown error."));
        };
      }
      function query$12(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.id = client.variable("id", "ID!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addQuery([variables.__defaultOperation__.id], function(root) {
          root.add("node", {
            args: {
              id: variables.__defaultOperation__.id
            }
          }, function(node) {
            node.addFragment(spreads.CheckoutFragment);
          });
        });
        return document2;
      }
      function query$13(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.input = client.variable("input", "CheckoutCreateInput!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.UserErrorFragment = document2.defineFragment("UserErrorFragment", "UserError", function(root) {
          root.add("field");
          root.add("message");
        });
        spreads.CheckoutUserErrorFragment = document2.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function(root) {
          root.add("field");
          root.add("message");
          root.add("code");
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addMutation([variables.__defaultOperation__.input], function(root) {
          root.add("checkoutCreate", {
            args: {
              input: variables.__defaultOperation__.input
            }
          }, function(checkoutCreate) {
            checkoutCreate.add("userErrors", function(userErrors) {
              userErrors.addFragment(spreads.UserErrorFragment);
            });
            checkoutCreate.add("checkoutUserErrors", function(checkoutUserErrors) {
              checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
            });
            checkoutCreate.add("checkout", function(checkout) {
              checkout.addFragment(spreads.CheckoutFragment);
            });
          });
        });
        return document2;
      }
      function query$14(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.checkoutId = client.variable("checkoutId", "ID!");
        variables.__defaultOperation__.lineItems = client.variable("lineItems", "[CheckoutLineItemInput!]!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.UserErrorFragment = document2.defineFragment("UserErrorFragment", "UserError", function(root) {
          root.add("field");
          root.add("message");
        });
        spreads.CheckoutUserErrorFragment = document2.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function(root) {
          root.add("field");
          root.add("message");
          root.add("code");
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addMutation([variables.__defaultOperation__.checkoutId, variables.__defaultOperation__.lineItems], function(root) {
          root.add("checkoutLineItemsAdd", {
            args: {
              checkoutId: variables.__defaultOperation__.checkoutId,
              lineItems: variables.__defaultOperation__.lineItems
            }
          }, function(checkoutLineItemsAdd) {
            checkoutLineItemsAdd.add("userErrors", function(userErrors) {
              userErrors.addFragment(spreads.UserErrorFragment);
            });
            checkoutLineItemsAdd.add("checkoutUserErrors", function(checkoutUserErrors) {
              checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
            });
            checkoutLineItemsAdd.add("checkout", function(checkout) {
              checkout.addFragment(spreads.CheckoutFragment);
            });
          });
        });
        return document2;
      }
      function query$15(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.checkoutId = client.variable("checkoutId", "ID!");
        variables.__defaultOperation__.lineItemIds = client.variable("lineItemIds", "[ID!]!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.UserErrorFragment = document2.defineFragment("UserErrorFragment", "UserError", function(root) {
          root.add("field");
          root.add("message");
        });
        spreads.CheckoutUserErrorFragment = document2.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function(root) {
          root.add("field");
          root.add("message");
          root.add("code");
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addMutation([variables.__defaultOperation__.checkoutId, variables.__defaultOperation__.lineItemIds], function(root) {
          root.add("checkoutLineItemsRemove", {
            args: {
              checkoutId: variables.__defaultOperation__.checkoutId,
              lineItemIds: variables.__defaultOperation__.lineItemIds
            }
          }, function(checkoutLineItemsRemove) {
            checkoutLineItemsRemove.add("userErrors", function(userErrors) {
              userErrors.addFragment(spreads.UserErrorFragment);
            });
            checkoutLineItemsRemove.add("checkoutUserErrors", function(checkoutUserErrors) {
              checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
            });
            checkoutLineItemsRemove.add("checkout", function(checkout) {
              checkout.addFragment(spreads.CheckoutFragment);
            });
          });
        });
        return document2;
      }
      function query$16(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.checkoutId = client.variable("checkoutId", "ID!");
        variables.__defaultOperation__.lineItems = client.variable("lineItems", "[CheckoutLineItemInput!]!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.CheckoutUserErrorFragment = document2.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function(root) {
          root.add("field");
          root.add("message");
          root.add("code");
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addMutation([variables.__defaultOperation__.checkoutId, variables.__defaultOperation__.lineItems], function(root) {
          root.add("checkoutLineItemsReplace", {
            args: {
              checkoutId: variables.__defaultOperation__.checkoutId,
              lineItems: variables.__defaultOperation__.lineItems
            }
          }, function(checkoutLineItemsReplace) {
            checkoutLineItemsReplace.add("userErrors", function(userErrors) {
              userErrors.addFragment(spreads.CheckoutUserErrorFragment);
            });
            checkoutLineItemsReplace.add("checkout", function(checkout) {
              checkout.addFragment(spreads.CheckoutFragment);
            });
          });
        });
        return document2;
      }
      function query$17(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.__defaultOperation__ = {};
        variables.__defaultOperation__.checkoutId = client.variable("checkoutId", "ID!");
        variables.__defaultOperation__.lineItems = client.variable("lineItems", "[CheckoutLineItemUpdateInput!]!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.UserErrorFragment = document2.defineFragment("UserErrorFragment", "UserError", function(root) {
          root.add("field");
          root.add("message");
        });
        spreads.CheckoutUserErrorFragment = document2.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function(root) {
          root.add("field");
          root.add("message");
          root.add("code");
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addMutation([variables.__defaultOperation__.checkoutId, variables.__defaultOperation__.lineItems], function(root) {
          root.add("checkoutLineItemsUpdate", {
            args: {
              checkoutId: variables.__defaultOperation__.checkoutId,
              lineItems: variables.__defaultOperation__.lineItems
            }
          }, function(checkoutLineItemsUpdate) {
            checkoutLineItemsUpdate.add("userErrors", function(userErrors) {
              userErrors.addFragment(spreads.UserErrorFragment);
            });
            checkoutLineItemsUpdate.add("checkoutUserErrors", function(checkoutUserErrors) {
              checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
            });
            checkoutLineItemsUpdate.add("checkout", function(checkout) {
              checkout.addFragment(spreads.CheckoutFragment);
            });
          });
        });
        return document2;
      }
      function query$18(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.checkoutAttributesUpdateV2 = {};
        variables.checkoutAttributesUpdateV2.checkoutId = client.variable("checkoutId", "ID!");
        variables.checkoutAttributesUpdateV2.input = client.variable("input", "CheckoutAttributesUpdateV2Input!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.UserErrorFragment = document2.defineFragment("UserErrorFragment", "UserError", function(root) {
          root.add("field");
          root.add("message");
        });
        spreads.CheckoutUserErrorFragment = document2.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function(root) {
          root.add("field");
          root.add("message");
          root.add("code");
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addMutation("checkoutAttributesUpdateV2", [variables.checkoutAttributesUpdateV2.checkoutId, variables.checkoutAttributesUpdateV2.input], function(root) {
          root.add("checkoutAttributesUpdateV2", {
            args: {
              checkoutId: variables.checkoutAttributesUpdateV2.checkoutId,
              input: variables.checkoutAttributesUpdateV2.input
            }
          }, function(checkoutAttributesUpdateV2) {
            checkoutAttributesUpdateV2.add("userErrors", function(userErrors) {
              userErrors.addFragment(spreads.UserErrorFragment);
            });
            checkoutAttributesUpdateV2.add("checkoutUserErrors", function(checkoutUserErrors) {
              checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
            });
            checkoutAttributesUpdateV2.add("checkout", function(checkout) {
              checkout.addFragment(spreads.CheckoutFragment);
            });
          });
        });
        return document2;
      }
      function query$19(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.checkoutDiscountCodeApplyV2 = {};
        variables.checkoutDiscountCodeApplyV2.discountCode = client.variable("discountCode", "String!");
        variables.checkoutDiscountCodeApplyV2.checkoutId = client.variable("checkoutId", "ID!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.UserErrorFragment = document2.defineFragment("UserErrorFragment", "UserError", function(root) {
          root.add("field");
          root.add("message");
        });
        spreads.CheckoutUserErrorFragment = document2.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function(root) {
          root.add("field");
          root.add("message");
          root.add("code");
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addMutation("checkoutDiscountCodeApplyV2", [variables.checkoutDiscountCodeApplyV2.discountCode, variables.checkoutDiscountCodeApplyV2.checkoutId], function(root) {
          root.add("checkoutDiscountCodeApplyV2", {
            args: {
              discountCode: variables.checkoutDiscountCodeApplyV2.discountCode,
              checkoutId: variables.checkoutDiscountCodeApplyV2.checkoutId
            }
          }, function(checkoutDiscountCodeApplyV2) {
            checkoutDiscountCodeApplyV2.add("userErrors", function(userErrors) {
              userErrors.addFragment(spreads.UserErrorFragment);
            });
            checkoutDiscountCodeApplyV2.add("checkoutUserErrors", function(checkoutUserErrors) {
              checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
            });
            checkoutDiscountCodeApplyV2.add("checkout", function(checkout) {
              checkout.addFragment(spreads.CheckoutFragment);
            });
          });
        });
        return document2;
      }
      function query$20(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.checkoutDiscountCodeRemove = {};
        variables.checkoutDiscountCodeRemove.checkoutId = client.variable("checkoutId", "ID!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.UserErrorFragment = document2.defineFragment("UserErrorFragment", "UserError", function(root) {
          root.add("field");
          root.add("message");
        });
        spreads.CheckoutUserErrorFragment = document2.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function(root) {
          root.add("field");
          root.add("message");
          root.add("code");
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addMutation("checkoutDiscountCodeRemove", [variables.checkoutDiscountCodeRemove.checkoutId], function(root) {
          root.add("checkoutDiscountCodeRemove", {
            args: {
              checkoutId: variables.checkoutDiscountCodeRemove.checkoutId
            }
          }, function(checkoutDiscountCodeRemove) {
            checkoutDiscountCodeRemove.add("userErrors", function(userErrors) {
              userErrors.addFragment(spreads.UserErrorFragment);
            });
            checkoutDiscountCodeRemove.add("checkoutUserErrors", function(checkoutUserErrors) {
              checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
            });
            checkoutDiscountCodeRemove.add("checkout", function(checkout) {
              checkout.addFragment(spreads.CheckoutFragment);
            });
          });
        });
        return document2;
      }
      function query$21(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.checkoutGiftCardsAppend = {};
        variables.checkoutGiftCardsAppend.giftCardCodes = client.variable("giftCardCodes", "[String!]!");
        variables.checkoutGiftCardsAppend.checkoutId = client.variable("checkoutId", "ID!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.UserErrorFragment = document2.defineFragment("UserErrorFragment", "UserError", function(root) {
          root.add("field");
          root.add("message");
        });
        spreads.CheckoutUserErrorFragment = document2.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function(root) {
          root.add("field");
          root.add("message");
          root.add("code");
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addMutation("checkoutGiftCardsAppend", [variables.checkoutGiftCardsAppend.giftCardCodes, variables.checkoutGiftCardsAppend.checkoutId], function(root) {
          root.add("checkoutGiftCardsAppend", {
            args: {
              giftCardCodes: variables.checkoutGiftCardsAppend.giftCardCodes,
              checkoutId: variables.checkoutGiftCardsAppend.checkoutId
            }
          }, function(checkoutGiftCardsAppend) {
            checkoutGiftCardsAppend.add("userErrors", function(userErrors) {
              userErrors.addFragment(spreads.UserErrorFragment);
            });
            checkoutGiftCardsAppend.add("checkoutUserErrors", function(checkoutUserErrors) {
              checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
            });
            checkoutGiftCardsAppend.add("checkout", function(checkout) {
              checkout.addFragment(spreads.CheckoutFragment);
            });
          });
        });
        return document2;
      }
      function query$22(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.checkoutGiftCardRemoveV2 = {};
        variables.checkoutGiftCardRemoveV2.appliedGiftCardId = client.variable("appliedGiftCardId", "ID!");
        variables.checkoutGiftCardRemoveV2.checkoutId = client.variable("checkoutId", "ID!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.UserErrorFragment = document2.defineFragment("UserErrorFragment", "UserError", function(root) {
          root.add("field");
          root.add("message");
        });
        spreads.CheckoutUserErrorFragment = document2.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function(root) {
          root.add("field");
          root.add("message");
          root.add("code");
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addMutation("checkoutGiftCardRemoveV2", [variables.checkoutGiftCardRemoveV2.appliedGiftCardId, variables.checkoutGiftCardRemoveV2.checkoutId], function(root) {
          root.add("checkoutGiftCardRemoveV2", {
            args: {
              appliedGiftCardId: variables.checkoutGiftCardRemoveV2.appliedGiftCardId,
              checkoutId: variables.checkoutGiftCardRemoveV2.checkoutId
            }
          }, function(checkoutGiftCardRemoveV2) {
            checkoutGiftCardRemoveV2.add("userErrors", function(userErrors) {
              userErrors.addFragment(spreads.UserErrorFragment);
            });
            checkoutGiftCardRemoveV2.add("checkoutUserErrors", function(checkoutUserErrors) {
              checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
            });
            checkoutGiftCardRemoveV2.add("checkout", function(checkout) {
              checkout.addFragment(spreads.CheckoutFragment);
            });
          });
        });
        return document2;
      }
      function query$23(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.checkoutEmailUpdateV2 = {};
        variables.checkoutEmailUpdateV2.checkoutId = client.variable("checkoutId", "ID!");
        variables.checkoutEmailUpdateV2.email = client.variable("email", "String!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.UserErrorFragment = document2.defineFragment("UserErrorFragment", "UserError", function(root) {
          root.add("field");
          root.add("message");
        });
        spreads.CheckoutUserErrorFragment = document2.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function(root) {
          root.add("field");
          root.add("message");
          root.add("code");
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addMutation("checkoutEmailUpdateV2", [variables.checkoutEmailUpdateV2.checkoutId, variables.checkoutEmailUpdateV2.email], function(root) {
          root.add("checkoutEmailUpdateV2", {
            args: {
              checkoutId: variables.checkoutEmailUpdateV2.checkoutId,
              email: variables.checkoutEmailUpdateV2.email
            }
          }, function(checkoutEmailUpdateV2) {
            checkoutEmailUpdateV2.add("userErrors", function(userErrors) {
              userErrors.addFragment(spreads.UserErrorFragment);
            });
            checkoutEmailUpdateV2.add("checkoutUserErrors", function(checkoutUserErrors) {
              checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
            });
            checkoutEmailUpdateV2.add("checkout", function(checkout) {
              checkout.addFragment(spreads.CheckoutFragment);
            });
          });
        });
        return document2;
      }
      function query$24(client) {
        var document2 = client.document();
        var spreads = {};
        var variables = {};
        variables.checkoutShippingAddressUpdateV2 = {};
        variables.checkoutShippingAddressUpdateV2.shippingAddress = client.variable("shippingAddress", "MailingAddressInput!");
        variables.checkoutShippingAddressUpdateV2.checkoutId = client.variable("checkoutId", "ID!");
        spreads.VariantFragment = document2.defineFragment("VariantFragment", "ProductVariant", function(root) {
          root.add("id");
          root.add("title");
          root.add("price");
          root.add("priceV2", function(priceV2) {
            priceV2.add("amount");
            priceV2.add("currencyCode");
          });
          root.add("weight");
          root.add("availableForSale", {
            alias: "available"
          });
          root.add("sku");
          root.add("compareAtPrice");
          root.add("compareAtPriceV2", function(compareAtPriceV2) {
            compareAtPriceV2.add("amount");
            compareAtPriceV2.add("currencyCode");
          });
          root.add("image", function(image) {
            image.add("id");
            image.add("originalSrc", {
              alias: "src"
            });
            image.add("altText");
            image.add("width");
            image.add("height");
          });
          root.add("selectedOptions", function(selectedOptions) {
            selectedOptions.add("name");
            selectedOptions.add("value");
          });
          root.add("unitPrice", function(unitPrice) {
            unitPrice.add("amount");
            unitPrice.add("currencyCode");
          });
          root.add("unitPriceMeasurement", function(unitPriceMeasurement) {
            unitPriceMeasurement.add("measuredType");
            unitPriceMeasurement.add("quantityUnit");
            unitPriceMeasurement.add("quantityValue");
            unitPriceMeasurement.add("referenceUnit");
            unitPriceMeasurement.add("referenceValue");
          });
        });
        spreads.DiscountApplicationFragment = document2.defineFragment("DiscountApplicationFragment", "DiscountApplication", function(root) {
          root.add("targetSelection");
          root.add("allocationMethod");
          root.add("targetType");
          root.add("value", function(value) {
            value.addInlineFragmentOn("MoneyV2", function(MoneyV22) {
              MoneyV22.add("amount");
              MoneyV22.add("currencyCode");
            });
            value.addInlineFragmentOn("PricingPercentageValue", function(PricingPercentageValue2) {
              PricingPercentageValue2.add("percentage");
            });
          });
          root.addInlineFragmentOn("ManualDiscountApplication", function(ManualDiscountApplication2) {
            ManualDiscountApplication2.add("title");
            ManualDiscountApplication2.add("description");
          });
          root.addInlineFragmentOn("DiscountCodeApplication", function(DiscountCodeApplication2) {
            DiscountCodeApplication2.add("code");
            DiscountCodeApplication2.add("applicable");
          });
          root.addInlineFragmentOn("ScriptDiscountApplication", function(ScriptDiscountApplication2) {
            ScriptDiscountApplication2.add("title");
          });
          root.addInlineFragmentOn("AutomaticDiscountApplication", function(AutomaticDiscountApplication2) {
            AutomaticDiscountApplication2.add("title");
          });
        });
        spreads.AppliedGiftCardFragment = document2.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function(root) {
          root.add("amountUsedV2", function(amountUsedV2) {
            amountUsedV2.add("amount");
            amountUsedV2.add("currencyCode");
          });
          root.add("balanceV2", function(balanceV2) {
            balanceV2.add("amount");
            balanceV2.add("currencyCode");
          });
          root.add("presentmentAmountUsed", function(presentmentAmountUsed) {
            presentmentAmountUsed.add("amount");
            presentmentAmountUsed.add("currencyCode");
          });
          root.add("id");
          root.add("lastCharacters");
        });
        spreads.VariantWithProductFragment = document2.defineFragment("VariantWithProductFragment", "ProductVariant", function(root) {
          root.addFragment(spreads.VariantFragment);
          root.add("product", function(product) {
            product.add("id");
            product.add("handle");
          });
        });
        spreads.UserErrorFragment = document2.defineFragment("UserErrorFragment", "UserError", function(root) {
          root.add("field");
          root.add("message");
        });
        spreads.CheckoutUserErrorFragment = document2.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function(root) {
          root.add("field");
          root.add("message");
          root.add("code");
        });
        spreads.MailingAddressFragment = document2.defineFragment("MailingAddressFragment", "MailingAddress", function(root) {
          root.add("id");
          root.add("address1");
          root.add("address2");
          root.add("city");
          root.add("company");
          root.add("country");
          root.add("firstName");
          root.add("formatted");
          root.add("lastName");
          root.add("latitude");
          root.add("longitude");
          root.add("phone");
          root.add("province");
          root.add("zip");
          root.add("name");
          root.add("countryCodeV2", {
            alias: "countryCode"
          });
          root.add("provinceCode");
        });
        spreads.CheckoutFragment = document2.defineFragment("CheckoutFragment", "Checkout", function(root) {
          root.add("id");
          root.add("ready");
          root.add("requiresShipping");
          root.add("note");
          root.add("paymentDue");
          root.add("paymentDueV2", function(paymentDueV2) {
            paymentDueV2.add("amount");
            paymentDueV2.add("currencyCode");
          });
          root.add("webUrl");
          root.add("orderStatusUrl");
          root.add("taxExempt");
          root.add("taxesIncluded");
          root.add("currencyCode");
          root.add("totalTax");
          root.add("totalTaxV2", function(totalTaxV2) {
            totalTaxV2.add("amount");
            totalTaxV2.add("currencyCode");
          });
          root.add("lineItemsSubtotalPrice", function(lineItemsSubtotalPrice) {
            lineItemsSubtotalPrice.add("amount");
            lineItemsSubtotalPrice.add("currencyCode");
          });
          root.add("subtotalPrice");
          root.add("subtotalPriceV2", function(subtotalPriceV2) {
            subtotalPriceV2.add("amount");
            subtotalPriceV2.add("currencyCode");
          });
          root.add("totalPrice");
          root.add("totalPriceV2", function(totalPriceV2) {
            totalPriceV2.add("amount");
            totalPriceV2.add("currencyCode");
          });
          root.add("completedAt");
          root.add("createdAt");
          root.add("updatedAt");
          root.add("email");
          root.add("discountApplications", {
            args: {
              first: 10
            }
          }, function(discountApplications) {
            discountApplications.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            discountApplications.add("edges", function(edges) {
              edges.add("node", function(node) {
                node.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
          root.add("appliedGiftCards", function(appliedGiftCards) {
            appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
          });
          root.add("shippingAddress", function(shippingAddress) {
            shippingAddress.addFragment(spreads.MailingAddressFragment);
          });
          root.add("shippingLine", function(shippingLine) {
            shippingLine.add("handle");
            shippingLine.add("price");
            shippingLine.add("priceV2", function(priceV2) {
              priceV2.add("amount");
              priceV2.add("currencyCode");
            });
            shippingLine.add("title");
          });
          root.add("customAttributes", function(customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
          root.add("order", function(order) {
            order.add("id");
            order.add("processedAt");
            order.add("orderNumber");
            order.add("subtotalPrice");
            order.add("subtotalPriceV2", function(subtotalPriceV2) {
              subtotalPriceV2.add("amount");
              subtotalPriceV2.add("currencyCode");
            });
            order.add("totalShippingPrice");
            order.add("totalShippingPriceV2", function(totalShippingPriceV2) {
              totalShippingPriceV2.add("amount");
              totalShippingPriceV2.add("currencyCode");
            });
            order.add("totalTax");
            order.add("totalTaxV2", function(totalTaxV2) {
              totalTaxV2.add("amount");
              totalTaxV2.add("currencyCode");
            });
            order.add("totalPrice");
            order.add("totalPriceV2", function(totalPriceV2) {
              totalPriceV2.add("amount");
              totalPriceV2.add("currencyCode");
            });
            order.add("currencyCode");
            order.add("totalRefunded");
            order.add("totalRefundedV2", function(totalRefundedV2) {
              totalRefundedV2.add("amount");
              totalRefundedV2.add("currencyCode");
            });
            order.add("customerUrl");
            order.add("shippingAddress", function(shippingAddress) {
              shippingAddress.addFragment(spreads.MailingAddressFragment);
            });
            order.add("lineItems", {
              args: {
                first: 250
              }
            }, function(lineItems) {
              lineItems.add("pageInfo", function(pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              lineItems.add("edges", function(edges) {
                edges.add("cursor");
                edges.add("node", function(node) {
                  node.add("title");
                  node.add("variant", function(variant) {
                    variant.addFragment(spreads.VariantWithProductFragment);
                  });
                  node.add("quantity");
                  node.add("customAttributes", function(customAttributes) {
                    customAttributes.add("key");
                    customAttributes.add("value");
                  });
                });
              });
            });
          });
          root.add("lineItems", {
            args: {
              first: 250
            }
          }, function(lineItems) {
            lineItems.add("pageInfo", function(pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            lineItems.add("edges", function(edges) {
              edges.add("cursor");
              edges.add("node", function(node) {
                node.add("id");
                node.add("title");
                node.add("variant", function(variant) {
                  variant.addFragment(spreads.VariantWithProductFragment);
                });
                node.add("quantity");
                node.add("customAttributes", function(customAttributes) {
                  customAttributes.add("key");
                  customAttributes.add("value");
                });
                node.add("discountAllocations", function(discountAllocations) {
                  discountAllocations.add("allocatedAmount", function(allocatedAmount) {
                    allocatedAmount.add("amount");
                    allocatedAmount.add("currencyCode");
                  });
                  discountAllocations.add("discountApplication", function(discountApplication) {
                    discountApplication.addFragment(spreads.DiscountApplicationFragment);
                  });
                });
              });
            });
          });
        });
        document2.addMutation("checkoutShippingAddressUpdateV2", [variables.checkoutShippingAddressUpdateV2.shippingAddress, variables.checkoutShippingAddressUpdateV2.checkoutId], function(root) {
          root.add("checkoutShippingAddressUpdateV2", {
            args: {
              shippingAddress: variables.checkoutShippingAddressUpdateV2.shippingAddress,
              checkoutId: variables.checkoutShippingAddressUpdateV2.checkoutId
            }
          }, function(checkoutShippingAddressUpdateV2) {
            checkoutShippingAddressUpdateV2.add("userErrors", function(userErrors) {
              userErrors.addFragment(spreads.UserErrorFragment);
            });
            checkoutShippingAddressUpdateV2.add("checkoutUserErrors", function(checkoutUserErrors) {
              checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
            });
            checkoutShippingAddressUpdateV2.add("checkout", function(checkout) {
              checkout.addFragment(spreads.CheckoutFragment);
            });
          });
        });
        return document2;
      }
      var CheckoutResource = function(_Resource) {
        inherits$1(CheckoutResource2, _Resource);
        function CheckoutResource2() {
          classCallCheck$1(this, CheckoutResource2);
          return possibleConstructorReturn$1(this, (CheckoutResource2.__proto__ || Object.getPrototypeOf(CheckoutResource2)).apply(this, arguments));
        }
        createClass$1(CheckoutResource2, [{
          key: "fetch",
          value: function fetch2(id) {
            var _this2 = this;
            return this.graphQLClient.send(query$12, { id }).then(defaultResolver("node")).then(function(checkout) {
              if (!checkout) {
                return null;
              }
              return _this2.graphQLClient.fetchAllPages(checkout.lineItems, { pageSize: 250 }).then(function(lineItems) {
                checkout.attrs.lineItems = lineItems;
                return checkout;
              });
            });
          }
        }, {
          key: "create",
          value: function create() {
            var input = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            return this.graphQLClient.send(query$13, { input }).then(handleCheckoutMutation("checkoutCreate", this.graphQLClient));
          }
        }, {
          key: "updateAttributes",
          value: function updateAttributes(checkoutId) {
            var input = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            return this.graphQLClient.send(query$18, { checkoutId, input }).then(handleCheckoutMutation("checkoutAttributesUpdateV2", this.graphQLClient));
          }
        }, {
          key: "updateEmail",
          value: function updateEmail(checkoutId, email) {
            return this.graphQLClient.send(query$23, { checkoutId, email }).then(handleCheckoutMutation("checkoutEmailUpdateV2", this.graphQLClient));
          }
        }, {
          key: "addLineItems",
          value: function addLineItems(checkoutId, lineItems) {
            return this.graphQLClient.send(query$14, { checkoutId, lineItems }).then(handleCheckoutMutation("checkoutLineItemsAdd", this.graphQLClient));
          }
        }, {
          key: "addDiscount",
          value: function addDiscount(checkoutId, discountCode) {
            return this.graphQLClient.send(query$19, { checkoutId, discountCode }).then(handleCheckoutMutation("checkoutDiscountCodeApplyV2", this.graphQLClient));
          }
        }, {
          key: "removeDiscount",
          value: function removeDiscount(checkoutId) {
            return this.graphQLClient.send(query$20, { checkoutId }).then(handleCheckoutMutation("checkoutDiscountCodeRemove", this.graphQLClient));
          }
        }, {
          key: "addGiftCards",
          value: function addGiftCards(checkoutId, giftCardCodes) {
            return this.graphQLClient.send(query$21, { checkoutId, giftCardCodes }).then(handleCheckoutMutation("checkoutGiftCardsAppend", this.graphQLClient));
          }
        }, {
          key: "removeGiftCard",
          value: function removeGiftCard(checkoutId, appliedGiftCardId) {
            return this.graphQLClient.send(query$22, { checkoutId, appliedGiftCardId }).then(handleCheckoutMutation("checkoutGiftCardRemoveV2", this.graphQLClient));
          }
        }, {
          key: "removeLineItems",
          value: function removeLineItems(checkoutId, lineItemIds) {
            return this.graphQLClient.send(query$15, { checkoutId, lineItemIds }).then(handleCheckoutMutation("checkoutLineItemsRemove", this.graphQLClient));
          }
        }, {
          key: "replaceLineItems",
          value: function replaceLineItems(checkoutId, lineItems) {
            return this.graphQLClient.send(query$16, { checkoutId, lineItems }).then(handleCheckoutMutation("checkoutLineItemsReplace", this.graphQLClient));
          }
        }, {
          key: "updateLineItems",
          value: function updateLineItems(checkoutId, lineItems) {
            return this.graphQLClient.send(query$17, { checkoutId, lineItems }).then(handleCheckoutMutation("checkoutLineItemsUpdate", this.graphQLClient));
          }
        }, {
          key: "updateShippingAddress",
          value: function updateShippingAddress(checkoutId, shippingAddress) {
            return this.graphQLClient.send(query$24, { checkoutId, shippingAddress }).then(handleCheckoutMutation("checkoutShippingAddressUpdateV2", this.graphQLClient));
          }
        }]);
        return CheckoutResource2;
      }(Resource);
      var imageHelpers = {
        imageForSize: function imageForSize(image, _ref) {
          var maxWidth = _ref.maxWidth, maxHeight = _ref.maxHeight;
          var splitUrl = image.src.split("?");
          var notQuery = splitUrl[0];
          var query2 = splitUrl[1] ? "?" + splitUrl[1] : "";
          var imageTokens = notQuery.split(".");
          var imagePathIndex = imageTokens.length - 2;
          imageTokens[imagePathIndex] = imageTokens[imagePathIndex] + "_" + maxWidth + "x" + maxHeight;
          return "" + imageTokens.join(".") + query2;
        }
      };
      var ImageResource = function(_Resource) {
        inherits$1(ImageResource2, _Resource);
        function ImageResource2() {
          classCallCheck$1(this, ImageResource2);
          return possibleConstructorReturn$1(this, (ImageResource2.__proto__ || Object.getPrototypeOf(ImageResource2)).apply(this, arguments));
        }
        createClass$1(ImageResource2, [{
          key: "helpers",
          get: function get$$1() {
            return imageHelpers;
          }
        }]);
        return ImageResource2;
      }(Resource);
      var version = "2.15.1";
      var AppliedGiftCard = {
        "name": "AppliedGiftCard",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "amountUsedV2": "MoneyV2",
          "balanceV2": "MoneyV2",
          "id": "ID",
          "lastCharacters": "String",
          "presentmentAmountUsed": "MoneyV2"
        },
        "implementsNode": true
      };
      var Attribute = {
        "name": "Attribute",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "key": "String",
          "value": "String"
        },
        "implementsNode": false
      };
      var AutomaticDiscountApplication = {
        "name": "AutomaticDiscountApplication",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "title": "String"
        },
        "implementsNode": false
      };
      var Boolean$1 = {
        "name": "Boolean",
        "kind": "SCALAR"
      };
      var Checkout = {
        "name": "Checkout",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "appliedGiftCards": "AppliedGiftCard",
          "completedAt": "DateTime",
          "createdAt": "DateTime",
          "currencyCode": "CurrencyCode",
          "customAttributes": "Attribute",
          "discountApplications": "DiscountApplicationConnection",
          "email": "String",
          "id": "ID",
          "lineItems": "CheckoutLineItemConnection",
          "lineItemsSubtotalPrice": "MoneyV2",
          "note": "String",
          "order": "Order",
          "orderStatusUrl": "URL",
          "paymentDue": "Money",
          "paymentDueV2": "MoneyV2",
          "ready": "Boolean",
          "requiresShipping": "Boolean",
          "shippingAddress": "MailingAddress",
          "shippingLine": "ShippingRate",
          "subtotalPrice": "Money",
          "subtotalPriceV2": "MoneyV2",
          "taxExempt": "Boolean",
          "taxesIncluded": "Boolean",
          "totalPrice": "Money",
          "totalPriceV2": "MoneyV2",
          "totalTax": "Money",
          "totalTaxV2": "MoneyV2",
          "updatedAt": "DateTime",
          "webUrl": "URL"
        },
        "implementsNode": true
      };
      var CheckoutAttributesUpdateV2Payload = {
        "name": "CheckoutAttributesUpdateV2Payload",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkout": "Checkout",
          "checkoutUserErrors": "CheckoutUserError",
          "userErrors": "UserError"
        },
        "implementsNode": false
      };
      var CheckoutCreatePayload = {
        "name": "CheckoutCreatePayload",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkout": "Checkout",
          "checkoutUserErrors": "CheckoutUserError",
          "userErrors": "UserError"
        },
        "implementsNode": false
      };
      var CheckoutDiscountCodeApplyV2Payload = {
        "name": "CheckoutDiscountCodeApplyV2Payload",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkout": "Checkout",
          "checkoutUserErrors": "CheckoutUserError",
          "userErrors": "UserError"
        },
        "implementsNode": false
      };
      var CheckoutDiscountCodeRemovePayload = {
        "name": "CheckoutDiscountCodeRemovePayload",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkout": "Checkout",
          "checkoutUserErrors": "CheckoutUserError",
          "userErrors": "UserError"
        },
        "implementsNode": false
      };
      var CheckoutEmailUpdateV2Payload = {
        "name": "CheckoutEmailUpdateV2Payload",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkout": "Checkout",
          "checkoutUserErrors": "CheckoutUserError",
          "userErrors": "UserError"
        },
        "implementsNode": false
      };
      var CheckoutErrorCode = {
        "name": "CheckoutErrorCode",
        "kind": "ENUM"
      };
      var CheckoutGiftCardRemoveV2Payload = {
        "name": "CheckoutGiftCardRemoveV2Payload",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkout": "Checkout",
          "checkoutUserErrors": "CheckoutUserError",
          "userErrors": "UserError"
        },
        "implementsNode": false
      };
      var CheckoutGiftCardsAppendPayload = {
        "name": "CheckoutGiftCardsAppendPayload",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkout": "Checkout",
          "checkoutUserErrors": "CheckoutUserError",
          "userErrors": "UserError"
        },
        "implementsNode": false
      };
      var CheckoutLineItem = {
        "name": "CheckoutLineItem",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "customAttributes": "Attribute",
          "discountAllocations": "DiscountAllocation",
          "id": "ID",
          "quantity": "Int",
          "title": "String",
          "variant": "ProductVariant"
        },
        "implementsNode": true
      };
      var CheckoutLineItemConnection = {
        "name": "CheckoutLineItemConnection",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "edges": "CheckoutLineItemEdge",
          "pageInfo": "PageInfo"
        },
        "implementsNode": false
      };
      var CheckoutLineItemEdge = {
        "name": "CheckoutLineItemEdge",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "cursor": "String",
          "node": "CheckoutLineItem"
        },
        "implementsNode": false
      };
      var CheckoutLineItemsAddPayload = {
        "name": "CheckoutLineItemsAddPayload",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkout": "Checkout",
          "checkoutUserErrors": "CheckoutUserError",
          "userErrors": "UserError"
        },
        "implementsNode": false
      };
      var CheckoutLineItemsRemovePayload = {
        "name": "CheckoutLineItemsRemovePayload",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkout": "Checkout",
          "checkoutUserErrors": "CheckoutUserError",
          "userErrors": "UserError"
        },
        "implementsNode": false
      };
      var CheckoutLineItemsReplacePayload = {
        "name": "CheckoutLineItemsReplacePayload",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkout": "Checkout",
          "userErrors": "CheckoutUserError"
        },
        "implementsNode": false
      };
      var CheckoutLineItemsUpdatePayload = {
        "name": "CheckoutLineItemsUpdatePayload",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkout": "Checkout",
          "checkoutUserErrors": "CheckoutUserError",
          "userErrors": "UserError"
        },
        "implementsNode": false
      };
      var CheckoutShippingAddressUpdateV2Payload = {
        "name": "CheckoutShippingAddressUpdateV2Payload",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkout": "Checkout",
          "checkoutUserErrors": "CheckoutUserError",
          "userErrors": "UserError"
        },
        "implementsNode": false
      };
      var CheckoutUserError = {
        "name": "CheckoutUserError",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "code": "CheckoutErrorCode",
          "field": "String",
          "message": "String"
        },
        "implementsNode": false
      };
      var Collection = {
        "name": "Collection",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "description": "String",
          "descriptionHtml": "HTML",
          "handle": "String",
          "id": "ID",
          "image": "Image",
          "products": "ProductConnection",
          "title": "String",
          "updatedAt": "DateTime"
        },
        "implementsNode": true
      };
      var CollectionConnection = {
        "name": "CollectionConnection",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "edges": "CollectionEdge",
          "pageInfo": "PageInfo"
        },
        "implementsNode": false
      };
      var CollectionEdge = {
        "name": "CollectionEdge",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "cursor": "String",
          "node": "Collection"
        },
        "implementsNode": false
      };
      var CountryCode = {
        "name": "CountryCode",
        "kind": "ENUM"
      };
      var CurrencyCode = {
        "name": "CurrencyCode",
        "kind": "ENUM"
      };
      var DateTime = {
        "name": "DateTime",
        "kind": "SCALAR"
      };
      var Decimal = {
        "name": "Decimal",
        "kind": "SCALAR"
      };
      var DiscountAllocation = {
        "name": "DiscountAllocation",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "allocatedAmount": "MoneyV2",
          "discountApplication": "DiscountApplication"
        },
        "implementsNode": false
      };
      var DiscountApplication = {
        "name": "DiscountApplication",
        "kind": "INTERFACE",
        "fieldBaseTypes": {
          "allocationMethod": "DiscountApplicationAllocationMethod",
          "targetSelection": "DiscountApplicationTargetSelection",
          "targetType": "DiscountApplicationTargetType",
          "value": "PricingValue"
        },
        "possibleTypes": ["AutomaticDiscountApplication", "DiscountCodeApplication", "ManualDiscountApplication", "ScriptDiscountApplication"]
      };
      var DiscountApplicationAllocationMethod = {
        "name": "DiscountApplicationAllocationMethod",
        "kind": "ENUM"
      };
      var DiscountApplicationConnection = {
        "name": "DiscountApplicationConnection",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "edges": "DiscountApplicationEdge",
          "pageInfo": "PageInfo"
        },
        "implementsNode": false
      };
      var DiscountApplicationEdge = {
        "name": "DiscountApplicationEdge",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "node": "DiscountApplication"
        },
        "implementsNode": false
      };
      var DiscountApplicationTargetSelection = {
        "name": "DiscountApplicationTargetSelection",
        "kind": "ENUM"
      };
      var DiscountApplicationTargetType = {
        "name": "DiscountApplicationTargetType",
        "kind": "ENUM"
      };
      var DiscountCodeApplication = {
        "name": "DiscountCodeApplication",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "applicable": "Boolean",
          "code": "String"
        },
        "implementsNode": false
      };
      var Domain = {
        "name": "Domain",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "host": "String",
          "sslEnabled": "Boolean",
          "url": "URL"
        },
        "implementsNode": false
      };
      var Float = {
        "name": "Float",
        "kind": "SCALAR"
      };
      var HTML = {
        "name": "HTML",
        "kind": "SCALAR"
      };
      var ID2 = {
        "name": "ID",
        "kind": "SCALAR"
      };
      var Image = {
        "name": "Image",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "altText": "String",
          "height": "Int",
          "id": "ID",
          "originalSrc": "URL",
          "src": "URL",
          "width": "Int"
        },
        "implementsNode": false
      };
      var ImageConnection = {
        "name": "ImageConnection",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "edges": "ImageEdge",
          "pageInfo": "PageInfo"
        },
        "implementsNode": false
      };
      var ImageEdge = {
        "name": "ImageEdge",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "cursor": "String",
          "node": "Image"
        },
        "implementsNode": false
      };
      var Int = {
        "name": "Int",
        "kind": "SCALAR"
      };
      var MailingAddress = {
        "name": "MailingAddress",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "address1": "String",
          "address2": "String",
          "city": "String",
          "company": "String",
          "country": "String",
          "countryCodeV2": "CountryCode",
          "firstName": "String",
          "formatted": "String",
          "id": "ID",
          "lastName": "String",
          "latitude": "Float",
          "longitude": "Float",
          "name": "String",
          "phone": "String",
          "province": "String",
          "provinceCode": "String",
          "zip": "String"
        },
        "implementsNode": true
      };
      var ManualDiscountApplication = {
        "name": "ManualDiscountApplication",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "description": "String",
          "title": "String"
        },
        "implementsNode": false
      };
      var Money = {
        "name": "Money",
        "kind": "SCALAR"
      };
      var MoneyV2 = {
        "name": "MoneyV2",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "amount": "Decimal",
          "currencyCode": "CurrencyCode"
        },
        "implementsNode": false
      };
      var Mutation$1 = {
        "name": "Mutation",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "checkoutAttributesUpdateV2": "CheckoutAttributesUpdateV2Payload",
          "checkoutCreate": "CheckoutCreatePayload",
          "checkoutDiscountCodeApplyV2": "CheckoutDiscountCodeApplyV2Payload",
          "checkoutDiscountCodeRemove": "CheckoutDiscountCodeRemovePayload",
          "checkoutEmailUpdateV2": "CheckoutEmailUpdateV2Payload",
          "checkoutGiftCardRemoveV2": "CheckoutGiftCardRemoveV2Payload",
          "checkoutGiftCardsAppend": "CheckoutGiftCardsAppendPayload",
          "checkoutLineItemsAdd": "CheckoutLineItemsAddPayload",
          "checkoutLineItemsRemove": "CheckoutLineItemsRemovePayload",
          "checkoutLineItemsReplace": "CheckoutLineItemsReplacePayload",
          "checkoutLineItemsUpdate": "CheckoutLineItemsUpdatePayload",
          "checkoutShippingAddressUpdateV2": "CheckoutShippingAddressUpdateV2Payload"
        },
        "implementsNode": false,
        "relayInputObjectBaseTypes": {
          "cartCreate": "CartInput",
          "checkoutAttributesUpdate": "CheckoutAttributesUpdateInput",
          "checkoutAttributesUpdateV2": "CheckoutAttributesUpdateV2Input",
          "checkoutCreate": "CheckoutCreateInput",
          "customerAccessTokenCreate": "CustomerAccessTokenCreateInput",
          "customerActivate": "CustomerActivateInput",
          "customerCreate": "CustomerCreateInput",
          "customerReset": "CustomerResetInput"
        }
      };
      var Node = {
        "name": "Node",
        "kind": "INTERFACE",
        "fieldBaseTypes": {},
        "possibleTypes": ["AppliedGiftCard", "Article", "Blog", "Cart", "CartLine", "Checkout", "CheckoutLineItem", "Collection", "Comment", "ExternalVideo", "GenericFile", "Location", "MailingAddress", "MediaImage", "Menu", "MenuItem", "Metafield", "Model3d", "Order", "Page", "Payment", "Product", "ProductOption", "ProductVariant", "Shop", "ShopPolicy", "Video"]
      };
      var Order = {
        "name": "Order",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "currencyCode": "CurrencyCode",
          "customerUrl": "URL",
          "id": "ID",
          "lineItems": "OrderLineItemConnection",
          "orderNumber": "Int",
          "processedAt": "DateTime",
          "shippingAddress": "MailingAddress",
          "subtotalPrice": "Money",
          "subtotalPriceV2": "MoneyV2",
          "totalPrice": "Money",
          "totalPriceV2": "MoneyV2",
          "totalRefunded": "Money",
          "totalRefundedV2": "MoneyV2",
          "totalShippingPrice": "Money",
          "totalShippingPriceV2": "MoneyV2",
          "totalTax": "Money",
          "totalTaxV2": "MoneyV2"
        },
        "implementsNode": true
      };
      var OrderLineItem = {
        "name": "OrderLineItem",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "customAttributes": "Attribute",
          "quantity": "Int",
          "title": "String",
          "variant": "ProductVariant"
        },
        "implementsNode": false
      };
      var OrderLineItemConnection = {
        "name": "OrderLineItemConnection",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "edges": "OrderLineItemEdge",
          "pageInfo": "PageInfo"
        },
        "implementsNode": false
      };
      var OrderLineItemEdge = {
        "name": "OrderLineItemEdge",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "cursor": "String",
          "node": "OrderLineItem"
        },
        "implementsNode": false
      };
      var PageInfo = {
        "name": "PageInfo",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "hasNextPage": "Boolean",
          "hasPreviousPage": "Boolean"
        },
        "implementsNode": false
      };
      var PaymentSettings = {
        "name": "PaymentSettings",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "enabledPresentmentCurrencies": "CurrencyCode"
        },
        "implementsNode": false
      };
      var PricingPercentageValue = {
        "name": "PricingPercentageValue",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "percentage": "Float"
        },
        "implementsNode": false
      };
      var PricingValue = {
        "name": "PricingValue",
        "kind": "UNION"
      };
      var Product = {
        "name": "Product",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "availableForSale": "Boolean",
          "createdAt": "DateTime",
          "description": "String",
          "descriptionHtml": "HTML",
          "handle": "String",
          "id": "ID",
          "images": "ImageConnection",
          "onlineStoreUrl": "URL",
          "options": "ProductOption",
          "productType": "String",
          "publishedAt": "DateTime",
          "title": "String",
          "updatedAt": "DateTime",
          "variants": "ProductVariantConnection",
          "vendor": "String"
        },
        "implementsNode": true
      };
      var ProductConnection = {
        "name": "ProductConnection",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "edges": "ProductEdge",
          "pageInfo": "PageInfo"
        },
        "implementsNode": false
      };
      var ProductEdge = {
        "name": "ProductEdge",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "cursor": "String",
          "node": "Product"
        },
        "implementsNode": false
      };
      var ProductOption = {
        "name": "ProductOption",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "name": "String",
          "values": "String"
        },
        "implementsNode": true
      };
      var ProductVariant = {
        "name": "ProductVariant",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "availableForSale": "Boolean",
          "compareAtPrice": "Money",
          "compareAtPriceV2": "MoneyV2",
          "id": "ID",
          "image": "Image",
          "price": "Money",
          "priceV2": "MoneyV2",
          "product": "Product",
          "selectedOptions": "SelectedOption",
          "sku": "String",
          "title": "String",
          "unitPrice": "MoneyV2",
          "unitPriceMeasurement": "UnitPriceMeasurement",
          "weight": "Float"
        },
        "implementsNode": true
      };
      var ProductVariantConnection = {
        "name": "ProductVariantConnection",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "edges": "ProductVariantEdge",
          "pageInfo": "PageInfo"
        },
        "implementsNode": false
      };
      var ProductVariantEdge = {
        "name": "ProductVariantEdge",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "cursor": "String",
          "node": "ProductVariant"
        },
        "implementsNode": false
      };
      var QueryRoot = {
        "name": "QueryRoot",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "collectionByHandle": "Collection",
          "collections": "CollectionConnection",
          "node": "Node",
          "nodes": "Node",
          "productByHandle": "Product",
          "productRecommendations": "Product",
          "products": "ProductConnection",
          "shop": "Shop"
        },
        "implementsNode": false
      };
      var ScriptDiscountApplication = {
        "name": "ScriptDiscountApplication",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "title": "String"
        },
        "implementsNode": false
      };
      var SelectedOption = {
        "name": "SelectedOption",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "name": "String",
          "value": "String"
        },
        "implementsNode": false
      };
      var ShippingRate = {
        "name": "ShippingRate",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "handle": "String",
          "price": "Money",
          "priceV2": "MoneyV2",
          "title": "String"
        },
        "implementsNode": false
      };
      var Shop = {
        "name": "Shop",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "description": "String",
          "moneyFormat": "String",
          "name": "String",
          "paymentSettings": "PaymentSettings",
          "primaryDomain": "Domain",
          "privacyPolicy": "ShopPolicy",
          "refundPolicy": "ShopPolicy",
          "termsOfService": "ShopPolicy"
        },
        "implementsNode": true
      };
      var ShopPolicy = {
        "name": "ShopPolicy",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "body": "String",
          "id": "ID",
          "title": "String",
          "url": "URL"
        },
        "implementsNode": true
      };
      var String$1 = {
        "name": "String",
        "kind": "SCALAR"
      };
      var URL = {
        "name": "URL",
        "kind": "SCALAR"
      };
      var UnitPriceMeasurement = {
        "name": "UnitPriceMeasurement",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "measuredType": "UnitPriceMeasurementMeasuredType",
          "quantityUnit": "UnitPriceMeasurementMeasuredUnit",
          "quantityValue": "Float",
          "referenceUnit": "UnitPriceMeasurementMeasuredUnit",
          "referenceValue": "Int"
        },
        "implementsNode": false
      };
      var UnitPriceMeasurementMeasuredType = {
        "name": "UnitPriceMeasurementMeasuredType",
        "kind": "ENUM"
      };
      var UnitPriceMeasurementMeasuredUnit = {
        "name": "UnitPriceMeasurementMeasuredUnit",
        "kind": "ENUM"
      };
      var UserError = {
        "name": "UserError",
        "kind": "OBJECT",
        "fieldBaseTypes": {
          "field": "String",
          "message": "String"
        },
        "implementsNode": false
      };
      var Types = {
        types: {}
      };
      Types.types["AppliedGiftCard"] = AppliedGiftCard;
      Types.types["Attribute"] = Attribute;
      Types.types["AutomaticDiscountApplication"] = AutomaticDiscountApplication;
      Types.types["Boolean"] = Boolean$1;
      Types.types["Checkout"] = Checkout;
      Types.types["CheckoutAttributesUpdateV2Payload"] = CheckoutAttributesUpdateV2Payload;
      Types.types["CheckoutCreatePayload"] = CheckoutCreatePayload;
      Types.types["CheckoutDiscountCodeApplyV2Payload"] = CheckoutDiscountCodeApplyV2Payload;
      Types.types["CheckoutDiscountCodeRemovePayload"] = CheckoutDiscountCodeRemovePayload;
      Types.types["CheckoutEmailUpdateV2Payload"] = CheckoutEmailUpdateV2Payload;
      Types.types["CheckoutErrorCode"] = CheckoutErrorCode;
      Types.types["CheckoutGiftCardRemoveV2Payload"] = CheckoutGiftCardRemoveV2Payload;
      Types.types["CheckoutGiftCardsAppendPayload"] = CheckoutGiftCardsAppendPayload;
      Types.types["CheckoutLineItem"] = CheckoutLineItem;
      Types.types["CheckoutLineItemConnection"] = CheckoutLineItemConnection;
      Types.types["CheckoutLineItemEdge"] = CheckoutLineItemEdge;
      Types.types["CheckoutLineItemsAddPayload"] = CheckoutLineItemsAddPayload;
      Types.types["CheckoutLineItemsRemovePayload"] = CheckoutLineItemsRemovePayload;
      Types.types["CheckoutLineItemsReplacePayload"] = CheckoutLineItemsReplacePayload;
      Types.types["CheckoutLineItemsUpdatePayload"] = CheckoutLineItemsUpdatePayload;
      Types.types["CheckoutShippingAddressUpdateV2Payload"] = CheckoutShippingAddressUpdateV2Payload;
      Types.types["CheckoutUserError"] = CheckoutUserError;
      Types.types["Collection"] = Collection;
      Types.types["CollectionConnection"] = CollectionConnection;
      Types.types["CollectionEdge"] = CollectionEdge;
      Types.types["CountryCode"] = CountryCode;
      Types.types["CurrencyCode"] = CurrencyCode;
      Types.types["DateTime"] = DateTime;
      Types.types["Decimal"] = Decimal;
      Types.types["DiscountAllocation"] = DiscountAllocation;
      Types.types["DiscountApplication"] = DiscountApplication;
      Types.types["DiscountApplicationAllocationMethod"] = DiscountApplicationAllocationMethod;
      Types.types["DiscountApplicationConnection"] = DiscountApplicationConnection;
      Types.types["DiscountApplicationEdge"] = DiscountApplicationEdge;
      Types.types["DiscountApplicationTargetSelection"] = DiscountApplicationTargetSelection;
      Types.types["DiscountApplicationTargetType"] = DiscountApplicationTargetType;
      Types.types["DiscountCodeApplication"] = DiscountCodeApplication;
      Types.types["Domain"] = Domain;
      Types.types["Float"] = Float;
      Types.types["HTML"] = HTML;
      Types.types["ID"] = ID2;
      Types.types["Image"] = Image;
      Types.types["ImageConnection"] = ImageConnection;
      Types.types["ImageEdge"] = ImageEdge;
      Types.types["Int"] = Int;
      Types.types["MailingAddress"] = MailingAddress;
      Types.types["ManualDiscountApplication"] = ManualDiscountApplication;
      Types.types["Money"] = Money;
      Types.types["MoneyV2"] = MoneyV2;
      Types.types["Mutation"] = Mutation$1;
      Types.types["Node"] = Node;
      Types.types["Order"] = Order;
      Types.types["OrderLineItem"] = OrderLineItem;
      Types.types["OrderLineItemConnection"] = OrderLineItemConnection;
      Types.types["OrderLineItemEdge"] = OrderLineItemEdge;
      Types.types["PageInfo"] = PageInfo;
      Types.types["PaymentSettings"] = PaymentSettings;
      Types.types["PricingPercentageValue"] = PricingPercentageValue;
      Types.types["PricingValue"] = PricingValue;
      Types.types["Product"] = Product;
      Types.types["ProductConnection"] = ProductConnection;
      Types.types["ProductEdge"] = ProductEdge;
      Types.types["ProductOption"] = ProductOption;
      Types.types["ProductVariant"] = ProductVariant;
      Types.types["ProductVariantConnection"] = ProductVariantConnection;
      Types.types["ProductVariantEdge"] = ProductVariantEdge;
      Types.types["QueryRoot"] = QueryRoot;
      Types.types["ScriptDiscountApplication"] = ScriptDiscountApplication;
      Types.types["SelectedOption"] = SelectedOption;
      Types.types["ShippingRate"] = ShippingRate;
      Types.types["Shop"] = Shop;
      Types.types["ShopPolicy"] = ShopPolicy;
      Types.types["String"] = String$1;
      Types.types["URL"] = URL;
      Types.types["UnitPriceMeasurement"] = UnitPriceMeasurement;
      Types.types["UnitPriceMeasurementMeasuredType"] = UnitPriceMeasurementMeasuredType;
      Types.types["UnitPriceMeasurementMeasuredUnit"] = UnitPriceMeasurementMeasuredUnit;
      Types.types["UserError"] = UserError;
      Types.queryType = "QueryRoot";
      Types.mutationType = "Mutation";
      Types.subscriptionType = null;
      function recursivelyFreezeObject(structure) {
        Object.getOwnPropertyNames(structure).forEach(function(key) {
          var value = structure[key];
          if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
            recursivelyFreezeObject(value);
          }
        });
        Object.freeze(structure);
        return structure;
      }
      var types = recursivelyFreezeObject(Types);
      var Client2 = function() {
        createClass$1(Client3, null, [{
          key: "buildClient",
          value: function buildClient(config, fetchFunction) {
            var newConfig = new Config(config);
            var client = new Client3(newConfig, Client$2, fetchFunction);
            client.config = newConfig;
            return client;
          }
        }]);
        function Client3(config) {
          var GraphQLClientClass = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Client$2;
          var fetchFunction = arguments[2];
          classCallCheck$1(this, Client3);
          var url = "https://" + config.domain + "/api/" + config.apiVersion + "/graphql";
          var headers = {
            "X-SDK-Variant": "javascript",
            "X-SDK-Version": version,
            "X-Shopify-Storefront-Access-Token": config.storefrontAccessToken
          };
          if (config.source) {
            headers["X-SDK-Variant-Source"] = config.source;
          }
          var languageHeader = config.language ? config.language : "*";
          headers["Accept-Language"] = languageHeader;
          if (fetchFunction) {
            headers["Content-Type"] = "application/json";
            headers.Accept = "application/json";
            this.graphQLClient = new GraphQLClientClass(types, {
              fetcher: function fetcher(graphQLParams) {
                return fetchFunction(url, {
                  body: JSON.stringify(graphQLParams),
                  method: "POST",
                  mode: "cors",
                  headers
                }).then(function(response) {
                  return response.json();
                });
              }
            });
          } else {
            this.graphQLClient = new GraphQLClientClass(types, {
              url,
              fetcherOptions: { headers }
            });
          }
          this.product = new ProductResource(this.graphQLClient);
          this.collection = new CollectionResource(this.graphQLClient);
          this.shop = new ShopResource(this.graphQLClient);
          this.checkout = new CheckoutResource(this.graphQLClient);
          this.image = new ImageResource(this.graphQLClient);
        }
        createClass$1(Client3, [{
          key: "fetchNextPage",
          value: function fetchNextPage(models) {
            return this.graphQLClient.fetchNextPage(models);
          }
        }]);
        return Client3;
      }();
      module.exports = Client2;
    }
  });

  // ../../node_modules/.pnpm/@finsweet+ts-utils@0.37.1/node_modules/@finsweet/ts-utils/dist/type-guards/primitives.js
  var isString = (value) => typeof value === "string";

  // ../../global/factory/selectors.ts
  var generateSelectors = (attributes) => {
    const getSelector2 = (name, valueKey, params) => {
      const attribute = attributes[name];
      const { key: attributeKey, values } = attribute;
      let attributeValue;
      if (!valueKey)
        return `[${attributeKey}]`;
      const value = values?.[valueKey];
      if (isString(value))
        attributeValue = value;
      else
        attributeValue = value(params && "instanceIndex" in params ? params.instanceIndex : void 0);
      const caseInsensitive = params && "caseInsensitive" in params && params.caseInsensitive ? "i" : "";
      if (!params?.operator)
        return `[${attributeKey}="${attributeValue}"${caseInsensitive}]`;
      switch (params.operator) {
        case "prefixed":
          return `[${attributeKey}^="${attributeValue}"${caseInsensitive}]`;
        case "suffixed":
          return `[${attributeKey}$="${attributeValue}"${caseInsensitive}]`;
        case "contains":
          return `[${attributeKey}*="${attributeValue}"${caseInsensitive}]`;
      }
    };
    function queryElement2(elementKey, params) {
      const selector = getSelector2("element", elementKey, params);
      const scope = params?.scope || document;
      return params?.all ? [...scope.querySelectorAll(selector)] : scope.querySelector(selector);
    }
    const getAttribute = (element, settingKey) => {
      const attribute = attributes[settingKey];
      if (!attribute)
        return null;
      return element.getAttribute(attribute.key);
    };
    return [getSelector2, queryElement2, getAttribute];
  };

  // src/utils/constants.ts
  var ATTRIBUTE = "shopify";
  var ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;
  var PRODUCT_CREATED = "created";
  var PRODUCT_PUBLISHED = "published";
  var IMAGE = "image";
  var PRODUCT_THUMBNAIL = "thumbnail";
  var PRODUCT_SKU = "sku";
  var PRODUCT_PRICE = "price";
  var PRODUCT_COMPARE_PRICE = "compareprice";
  var PRODUCT_DISCOUNTED_PERCENT = "discountpercent";
  var PRODUCT_TYPE = "type";
  var PRODUCT_VENDOR = "vendor";
  var PRODUCT_WEIGHT = "weight";
  var PRODUCT_WEIGHT_UNIT = "weightunit";
  var PRODUCT_TAG_LIST = "tag-list";
  var PRODUCT_TAG_TEMPLATE = "tag-template";
  var PRODUCT_TAG_TEXT = "tag-text";
  var PRODUCTS_LIST = "products-list";
  var PRODUCTS_COLLECTION = "collection";
  var PRODUCTS_OPTION_TEMPLATE = "option-template";
  var PRODUCTS_OPTION_NAME = "option-name";
  var PRODUCTS_VARIANT_LIST = "variant-list";
  var PRODUCTS_VARIANT_SEPARATOR = " / ";
  var LOADER = "loader";
  var LINK_FORMAT = "linkformat";
  var LINK = "link";
  var PRODUCTS = "products";
  var ID = "id";
  var TITLE = "title";
  var DESCRIPTION = "description";
  var HANDLE = "handle";
  var UPDATED = "updated";
  var COLLECTION_IMAGE = "image";
  var COLLECTION_ID = "collectionid";
  var COLLECTION_PRODUCT_LIMIT = "productlimit";
  var COLLECTIONS_LIMIT = "collectionlimit";
  var COLLECTION_PRODUCT_SORT = "sort";
  var COLLECTIONS_LIST = "collections-list";
  var DEFAULT_PRODUCTS_LIMIT = "10";
  var DEFAULT_COLLECTIONS_LIMIT = "10";
  var PRODUCT_ID_PREFIX = "gid://shopify/Product/";
  var COLLECTION_ID_PREFIX = "gid://shopify/Collection/";
  var productAttributes = [
    TITLE,
    DESCRIPTION,
    HANDLE,
    PRODUCT_CREATED,
    UPDATED,
    PRODUCT_PUBLISHED,
    IMAGE,
    PRODUCT_THUMBNAIL,
    PRODUCT_SKU,
    PRODUCT_PRICE,
    PRODUCT_COMPARE_PRICE,
    PRODUCT_DISCOUNTED_PERCENT,
    PRODUCT_TYPE,
    PRODUCT_VENDOR,
    PRODUCT_WEIGHT,
    PRODUCT_WEIGHT_UNIT,
    PRODUCT_TAG_LIST,
    PRODUCTS_COLLECTION
  ];
  var collectionAttributes = [ID, TITLE, DESCRIPTION, HANDLE, IMAGE, UPDATED];
  var QUERY_PARAMS = {
    id: "id",
    handle: "handle"
  };
  var ATTRIBUTES = {
    element: {
      key: `${ATTRIBUTES_PREFIX}-element`,
      values: {
        id: ID,
        title: TITLE,
        description: DESCRIPTION,
        handle: HANDLE,
        created: PRODUCT_CREATED,
        updated: UPDATED,
        published: PRODUCT_PUBLISHED,
        image: IMAGE,
        thumbnail: PRODUCT_THUMBNAIL,
        sku: PRODUCT_SKU,
        price: PRODUCT_PRICE,
        compareprice: PRODUCT_COMPARE_PRICE,
        discountpercent: PRODUCT_DISCOUNTED_PERCENT,
        type: PRODUCT_TYPE,
        vendor: PRODUCT_VENDOR,
        weight: PRODUCT_WEIGHT,
        weightunit: PRODUCT_WEIGHT_UNIT,
        [PRODUCT_TAG_LIST]: PRODUCT_TAG_LIST,
        [PRODUCT_TAG_TEMPLATE]: PRODUCT_TAG_TEMPLATE,
        [PRODUCT_TAG_TEXT]: PRODUCT_TAG_TEXT,
        loader: LOADER,
        products: PRODUCTS,
        productsList: PRODUCTS_LIST,
        collectionsList: COLLECTIONS_LIST,
        collection: PRODUCTS_COLLECTION,
        optiontemplate: PRODUCTS_OPTION_TEMPLATE,
        optionname: PRODUCTS_OPTION_NAME,
        variantlist: PRODUCTS_VARIANT_LIST
      }
    },
    token: { key: `${ATTRIBUTES_PREFIX}-token` },
    domain: { key: `${ATTRIBUTES_PREFIX}-domain` },
    productPage: { key: `${ATTRIBUTES_PREFIX}-productpage`, defaultValue: "/tests/product-template" },
    collectionPage: { key: `${ATTRIBUTES_PREFIX}-collectionpage`, defaultValue: "/tests/collection-template" },
    redirectURL: { key: `${ATTRIBUTES_PREFIX}-redirecturl`, defaultValue: "/404" },
    collectionId: { key: `${ATTRIBUTES_PREFIX}-${COLLECTION_ID}` },
    productLimit: { key: `${ATTRIBUTES_PREFIX}-${COLLECTION_PRODUCT_LIMIT}` },
    collectionLimit: { key: `${ATTRIBUTES_PREFIX}-${COLLECTIONS_LIMIT}` },
    sort: { key: `${ATTRIBUTES_PREFIX}-${COLLECTION_PRODUCT_SORT}` },
    linkFormat: { key: `${ATTRIBUTES_PREFIX}-${LINK_FORMAT}` },
    link: { key: `${ATTRIBUTES_PREFIX}-${LINK}`, values: { product: "product", collection: "collection" } }
  };
  var [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

  // src/actions/loaders.ts
  var hideLoaders = () => {
    const allElements = queryElement("loader", { all: true });
    for (const element of allElements) {
      element.style.display = "none";
    }
  };

  // src/utils/util.ts
  var formatAttribute = (attribute) => {
    return attribute.replace(/(\[|\])/g, "");
  };

  // src/actions/util.ts
  var handleProductLink = (parentElement, {
    id,
    handle,
    productOptions: { productPage, linkFormat }
  }) => {
    id = id.replace(PRODUCT_ID_PREFIX, "");
    const productLinks = parentElement.querySelectorAll(getSelector("link", "product"));
    productLinks.forEach((link) => {
      let elementLinkFormat = link.getAttribute(ATTRIBUTES.linkFormat.key);
      if (!elementLinkFormat) {
        elementLinkFormat = linkFormat || "id" /* ID */;
      }
      if (elementLinkFormat === "handle" /* HANDLE */) {
        link.href = `${productPage}?handle=${handle}`;
        return;
      }
      link.href = `${productPage}?id=${id}`;
    });
  };
  var handleCollectionLink = (parentElement, {
    productOptions: { collectionPage, linkFormat, collectionHandle, collectionId }
  }) => {
    const collectionLinks = parentElement.querySelectorAll(getSelector("link", "collection"));
    collectionLinks.forEach((link) => {
      let elementLinkFormat = link.getAttribute(ATTRIBUTES.linkFormat.key);
      if (!elementLinkFormat) {
        elementLinkFormat = linkFormat || "id" /* ID */;
      }
      if (elementLinkFormat === "handle" /* HANDLE */ && collectionHandle) {
        link.href = `${collectionPage}?handle=${collectionHandle}`;
        return;
      }
      if (collectionId)
        link.href = `${collectionPage}?id=${collectionId.replace(COLLECTION_ID_PREFIX, "")}`;
    });
  };

  // src/actions/product.ts
  var propertyActions = {
    [IMAGE]: (element, value) => {
      element.setAttribute("src", String(value));
    },
    [PRODUCTS_COLLECTION]: (element, value) => {
      if (value)
        element.textContent = String(value);
    },
    [PRODUCT_THUMBNAIL]: (element, value) => {
      element.setAttribute("src", String(value));
    },
    [PRODUCT_TAG_LIST]: (element, value) => {
      const tags = value;
      const template = queryElement(PRODUCT_TAG_TEMPLATE, {
        scope: element
      });
      if (template) {
        const templateParent = template.parentElement;
        tags.forEach((tag) => {
          const clone = template.cloneNode(true);
          const tagText = queryElement(PRODUCT_TAG_TEXT, {
            scope: clone
          });
          clone.removeAttribute(ATTRIBUTES.element.key);
          if (tagText) {
            tagText.innerText = tag;
          }
          templateParent.appendChild(clone);
        });
        template.remove();
      }
    }
  };
  var bindProductDataGraphQL = (parentElement, product, options) => {
    const {
      id,
      title,
      description,
      handle,
      createdAt,
      updatedAt,
      publishedAt,
      variants,
      vendor,
      productType,
      featuredImage,
      tags
    } = product;
    const variantMaps = {};
    variants.nodes.forEach((variant) => {
      variantMaps[variant.title] = variant;
    });
    function bindProductVariant(variant) {
      const { sku, price, compareAtPrice, image, weight, weightUnit } = variant;
      const discount = 0;
      const typeValue = productType;
      const productImage = (image || featuredImage).url;
      const productValues = [
        title,
        description,
        handle,
        createdAt,
        updatedAt,
        publishedAt,
        productImage,
        productImage,
        sku,
        price.amount,
        compareAtPrice?.amount,
        discount || 0,
        typeValue,
        vendor,
        weight,
        weightUnit,
        tags,
        options.collectionName || ""
      ];
      productAttributes.forEach((attribute, index) => {
        const matchedElements = queryElement(attribute, {
          scope: parentElement,
          all: true
        });
        matchedElements.forEach((element) => {
          if (propertyActions[attribute]) {
            propertyActions[attribute](element, productValues[index]);
            return;
          }
          element.innerText = String(productValues[index]);
        });
      });
      handleProductLink(parentElement, { id, handle, productOptions: options });
      handleCollectionLink(parentElement, { productOptions: options });
    }
    bindProductVariant(variants.nodes[0]);
    const firstTemplate = queryElement("optiontemplate", {
      scope: parentElement
    });
    if (!firstTemplate) {
      return;
    }
    const templateParent = firstTemplate.parentElement;
    templateParent.innerHTML = "";
    const template = firstTemplate.cloneNode(true);
    const selectedVariantKey = product.options.map(() => "");
    product.options.forEach((option, index) => {
      const clone = template.cloneNode(true);
      const optionName = queryElement("optionname", {
        scope: clone
      });
      if (optionName) {
        optionName.innerText = option.name;
      }
      const variantList = queryElement("variantlist", {
        scope: clone
      });
      const selectElement = clone.querySelector("select");
      if (variantList) {
        const childNode = variantList.children[0];
        const template2 = childNode.cloneNode(true);
        variantList.innerHTML = "";
        option.values.forEach((value) => {
          const clone2 = template2.cloneNode(true);
          const input = clone2.querySelector("input");
          const label = clone2.querySelector(`[for='${input.name}']`);
          input.value = value;
          label.innerText = value;
          input.setAttribute("name", `${input.name}-${index}`);
          label.setAttribute("for", `${input.name}-${index}`);
          input.addEventListener("change", () => {
            selectedVariantKey[index] = value;
            const variant = variantMaps[selectedVariantKey.join(PRODUCTS_VARIANT_SEPARATOR)];
            if (variant) {
              bindProductVariant(variant);
            }
          });
          variantList.appendChild(clone2);
        });
        const firstInput = variantList.querySelector("input");
        setTimeout(() => {
          firstInput.click();
        }, 500);
      } else if (selectElement) {
        selectElement.innerHTML = "";
        option.values.forEach((value) => {
          const optionElement = document.createElement("option");
          optionElement.value = value;
          optionElement.innerText = value;
          selectElement.appendChild(optionElement);
        });
        selectElement.addEventListener("change", () => {
          selectedVariantKey[index] = selectElement.value;
          const variant = variantMaps[selectedVariantKey.join(PRODUCTS_VARIANT_SEPARATOR)];
          if (variant) {
            bindProductVariant(variant);
          }
        });
        selectElement.dispatchEvent(new Event("change"));
      }
      templateParent.appendChild(clone);
    });
  };

  // src/actions/productsPage.ts
  var productsPageInit = async (client) => {
    try {
      const collectionContainers = queryElement("productsList", {
        scope: document.body,
        all: true
      });
      collectionContainers.forEach(async (container) => {
        bindCollectionProductsData(client, container);
      });
    } catch (e) {
      console.log("productsPageInit", e);
    }
  };
  var bindCollectionProductsData = async (client, container, collectionHandle) => {
    const selector = getSelector("collectionId");
    const { productPage, collectionPage } = client.getParams();
    const firstChild = container.firstElementChild;
    const template = firstChild.cloneNode(true);
    container.innerHTML = "";
    const collectionId = container.getAttribute(formatAttribute(selector));
    const productLimit = container.getAttribute(formatAttribute(getSelector("productLimit"))) || DEFAULT_PRODUCTS_LIMIT;
    const sortKey = container.getAttribute(formatAttribute(getSelector("sort")));
    let productSort = "position" /* POSITION */;
    if (sortKey === "most-recent" /* MOST_RECENT */) {
      productSort = "most-recent" /* MOST_RECENT */;
    } else if (sortKey === "oldest" /* OLDEST */) {
      productSort = "oldest" /* OLDEST */;
    }
    let collection;
    if (collectionHandle) {
      collection = await client.fetchCollectionByHandle(collectionHandle, Number(productLimit), productSort);
    } else if (collectionId) {
      collection = await client.fetchCollectionById(
        COLLECTION_ID_PREFIX + collectionId,
        Number(productLimit),
        productSort
      );
    } else {
      return null;
    }
    const {
      products: { nodes: products }
    } = collection;
    bindProducts(products, template, container, {
      productPage,
      collectionPage,
      collectionId,
      collectionHandle: collection.handle,
      collectionName: collection.title
    });
    return Promise.resolve(collection);
  };
  var bindProducts = (products, template, container, productOptions) => {
    const linkFormat = container.getAttribute(ATTRIBUTES.linkFormat.key);
    const options = productOptions;
    if (linkFormat) {
      options.linkFormat = linkFormat;
    }
    products.forEach((product) => {
      const productContainer = template.cloneNode(true);
      bindProductDataGraphQL(productContainer, product, productOptions);
      container.appendChild(productContainer);
    });
  };

  // src/actions/collectionPage.ts
  var propertyActions2 = {
    [COLLECTION_IMAGE]: (element, value) => {
      if (value && value.length) {
        element.setAttribute("src", String(value));
      }
    }
  };
  var collectionPageInit = async (client) => {
    const { redirectURL } = client.getParams();
    const { id, handle } = QUERY_PARAMS;
    const urlParams = new URLSearchParams(window.location.search);
    const idParamValue = urlParams.get(id);
    const handleParamValue = urlParams.get(handle);
    if (!idParamValue && !handleParamValue) {
      window.location.href = redirectURL;
      return;
    }
    try {
      document.body.setAttribute(ATTRIBUTES.collectionId.key, idParamValue);
      const selector = getSelector("collectionId");
      const collectionContainer = document.querySelector(`${selector}`);
      const productListElement = queryElement("products", {
        scope: collectionContainer
      });
      productListElement.setAttribute(ATTRIBUTES.collectionId.key, idParamValue);
      const collection = await bindCollectionProductsData(client, productListElement, handleParamValue);
      if (collection) {
        bindCollectionData(collection, document.body);
      }
    } catch (e) {
      console.log("collectionPageInit", e);
    }
  };
  var bindCollectionData = (collection, parentElement, scopeToExclude) => {
    const { id, description, handle, title, image, updatedAt } = collection;
    const url = image?.url || "";
    const collectionValues = [id.replace(COLLECTION_ID_PREFIX, ""), title, description, handle, url, updatedAt];
    collectionAttributes.forEach((attribute, index) => {
      const matchedElements = queryElement(attribute, {
        scope: parentElement,
        all: true
      });
      matchedElements.forEach((element) => {
        if (scopeToExclude && scopeToExclude.contains(element))
          return;
        if (propertyActions2[attribute]) {
          propertyActions2[attribute](element, collectionValues[index]);
          return;
        }
        element.innerText = String(collectionValues[index]);
      });
    });
  };

  // src/actions/collectionsPage.ts
  var collectionsPageInit = async (client) => {
    const { collectionPage, productPage } = client.getParams();
    try {
      const collectionContainers = queryElement("collectionsList", {
        scope: document.body,
        all: true
      });
      collectionContainers.forEach(async (container) => {
        const collectionsLimit = container.getAttribute(formatAttribute(getSelector("collectionLimit"))) || DEFAULT_COLLECTIONS_LIMIT;
        const sortKey = container.getAttribute(formatAttribute(getSelector("sort")));
        let collectionSort = "position" /* POSITION */;
        if (sortKey === "most-recent" /* MOST_RECENT */) {
          collectionSort = "most-recent" /* MOST_RECENT */;
        } else if (sortKey === "oldest" /* OLDEST */) {
          collectionSort = "oldest" /* OLDEST */;
        }
        const collections = await client.fetchAllCollections(Number(collectionsLimit), collectionSort);
        const firstChild = container.firstElementChild;
        const template = firstChild.cloneNode(true);
        container.innerHTML = "";
        collections.forEach((collection) => {
          const collectionContainer = template.cloneNode(true);
          bindCollectionData(collection, collectionContainer);
          handleCollectionLink(collectionContainer, {
            productOptions: {
              collectionId: collection.id,
              collectionHandle: collection.handle,
              collectionPage,
              productPage
            }
          });
          container.appendChild(collectionContainer);
        });
      });
    } catch (e) {
      console.log("productsPageInit", e);
    }
  };

  // src/actions/productPage.ts
  var productPageInit = async (client) => {
    const { redirectURL, productPage, collectionPage } = client.getParams();
    const { id, handle } = QUERY_PARAMS;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idParamValue = PRODUCT_ID_PREFIX + urlParams.get(id);
    const handleParamValue = urlParams.get(handle);
    if (!idParamValue && !handleParamValue) {
      window.location.href = redirectURL;
      return;
    }
    try {
      let productGraphQl;
      if (urlParams.get(id)) {
        productGraphQl = await client.fetchProductByIDGraphQL(idParamValue);
      } else if (handleParamValue) {
        productGraphQl = await client.fetchProductByHandleGraphQL(handleParamValue);
      } else {
        window.location.href = redirectURL;
        return;
      }
      bindProductDataGraphQL(document.body, productGraphQl, {
        productPage,
        collectionPage
      });
    } catch (e) {
      console.log("productPageInit", e);
    }
  };

  // src/factory.ts
  var initPages = async (client) => {
    const { productPage, collectionPage } = client.getParams();
    const path = window.location.pathname;
    if (path.endsWith(productPage)) {
      await productPageInit(client);
      return;
    }
    if (path.endsWith(collectionPage)) {
      collectionPageInit(client);
      return;
    }
    await productsPageInit(client);
    await collectionsPageInit(client);
  };

  // src/shopifyClient.ts
  var import_shopify_buy = __toESM(require_shopify_buy(), 1);

  // src/queries/product.ts
  var productBody = `
        id
        title
        description
        descriptionHtml
        handle
        createdAt
        updatedAt
        publishedAt
        featuredImage {
          url
        }
        tags
        variants(first: 10) {
          nodes {
            id
            sku
            title
            unitPrice {
              amount
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            image {
              url
            }
            weight
            weightUnit
          }
        }
        options{
          id
          name
          values
        }
        productType
        vendor
`;
  var productByIdQuery = () => {
    return `query productById($id: ID!) {
      product(id: $id) {
        ${productBody}
      }
    }  
    `;
  };
  var productByHandle = () => {
    return `query productByHandle($handle: String!) {
      product(handle: $handle) {
        ${productBody}
      }
    }  
    `;
  };

  // src/queries/collection.ts
  var collectionProperties = `
        id
        description
        handle
        title
        updatedAt
        image {
          url
        }
`;
  var collectionById = (productSort) => {
    if (productSort === "most-recent" /* MOST_RECENT */) {
      return `query collectionById($id: ID!, $productLimit: Int) {
      collection(id: $id) {
        ${collectionProperties}
        products(first: $productLimit, sortKey: CREATED) {
          nodes {
            ${productBody}
          }
        }
      }
    }
    `;
    }
    if (productSort === "oldest" /* OLDEST */) {
      return `query collectionById($id: ID!, $productLimit: Int) {
      collection(id: $id) {
        ${collectionProperties}
        products(first: $productLimit, sortKey: CREATED, reverse: true) {
          nodes {
            ${productBody}
          }
        }
      }
    }
    `;
    }
    return `query collectionById($id: ID!, $productLimit: Int) {
    collection(id: $id) {
      ${collectionProperties}
      products(first: $productLimit) {
        nodes {
          ${productBody}
        }
      }
    }
  }  
  `;
  };
  var collectionByHandle = (productSort) => {
    if (productSort === "most-recent" /* MOST_RECENT */) {
      return `query collectionByHandle($handle: String!, $productLimit: Int) {
      collection(handle: $handle) {
        ${collectionProperties}
        products(first: $productLimit, sortKey: CREATED) {
          nodes {
            ${productBody}
          }
        }
      }
    }
    `;
    }
    if (productSort === "oldest" /* OLDEST */) {
      return `query collectionByHandle($handle: String!, $productLimit: Int) {
      collection(handle: $handle) {
        ${collectionProperties}
        products(first: $productLimit, sortKey: CREATED, reverse: true) {
          nodes {
            ${productBody}
          }
        }
      }
    }
    `;
    }
    return `query collectionById($handle: String!, $productLimit: Int) {
    collection(handle: $handle) {
      ${collectionProperties}
      products(first: $productLimit) {
        nodes {
          ${productBody}
        }
      }
    }
  }  
  `;
  };
  var allCollections = (collectionSort) => {
    if (collectionSort === "most-recent" /* MOST_RECENT */) {
      return `query collections($collectionLimit: Int) {
      collections(first: $collectionLimit, sortKey: UPDATED_AT) {
          nodes {
            ${collectionProperties}
          }
      }
    }
    `;
    }
    if (collectionSort === "oldest" /* OLDEST */) {
      return `query collections($collectionLimit: Int) {
      collections(first: $collectionLimit, sortKey: UPDATED_AT, reverse: true) {
          nodes {
            ${collectionProperties}
          }
      }
    }
    `;
    }
    return `query collections($collectionLimit: Int) {
    collections(first: $collectionLimit) {
        nodes {
          ${collectionProperties}
        }
    }
  }
  `;
  };

  // src/shopifyClient.ts
  var ShopifyClient = class {
    params;
    client;
    constructor(params) {
      this.params = params;
      this.client = import_shopify_buy.default.buildClient({
        domain: this.params.domain,
        storefrontAccessToken: this.params.token
      });
    }
    async fetchProductById(id) {
      return this.client.product.fetch(id);
    }
    async fetchProductByHandle(handle) {
      return this.client.product.fetchByHandle(handle);
    }
    async fetchAllProducts() {
      return this.client.product.fetchAll();
    }
    getParams() {
      return this.params;
    }
    async fetchProductByIDGraphQL(id) {
      const response = await this.makeRequest(productByIdQuery(), { id });
      return response.data.product;
    }
    async fetchProductByHandleGraphQL(handle) {
      const response = await this.makeRequest(productByHandle(), { handle });
      return response.data.product;
    }
    async fetchCollectionById(id, productLimit, sort) {
      const response = await this.makeRequest(collectionById(sort), { id, productLimit });
      return response.data.collection;
    }
    async fetchCollectionByHandle(handle, productLimit, sort) {
      const response = await this.makeRequest(collectionByHandle(sort), { handle, productLimit });
      return response.data.collection;
    }
    async fetchAllCollections(collectionLimit, sort) {
      const response = await this.makeRequest(allCollections(sort), { collectionLimit });
      return response.data.collections.nodes;
    }
    async makeRequest(query, variables) {
      const response = await fetch("https://" + this.params.domain + "/api/2022-10/graphql.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": this.params.token
        },
        body: JSON.stringify({
          query,
          variables
        })
      });
      return response.json();
    }
  };

  // src/testExports.ts
  window.fsShopify = {
    hideLoaders,
    initPages
  };
  window.ShopifyClient = ShopifyClient;
})();
/*
@license
The MIT License (MIT)

Copyright (c) 2016 Shopify Inc.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
//# sourceMappingURL=testExports.js.map
