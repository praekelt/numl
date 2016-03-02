(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["numl"] = factory();
	else
		root["numl"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var dedent = __webpack_require__(1);
	var extend = __webpack_require__(2);
	var toCamelCase = __webpack_require__(36);
	var fromPairs = __webpack_require__(39);
	var parser = __webpack_require__(40);


	function numl(input) {
	  return parser.parse(input, {
	    extend: extend,
	    dedent: dedent,
	    fromPairs: fromPairs,
	    toCamelCase: toCamelCase
	  });
	}


	numl.SyntaxError = parser.SyntaxError;
	module.exports = numl;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function dedent(strings) {

	  var raw = undefined;
	  if (typeof strings === "string") {
	    // dedent can be used as a plain function
	    raw = [strings];
	  } else {
	    raw = strings.raw;
	  }

	  // first, perform interpolation
	  var result = "";

	  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    values[_key - 1] = arguments[_key];
	  }

	  for (var i = 0; i < raw.length; i++) {
	    result += raw[i].
	    // join lines when there is a suppressed newline
	    replace(/\\\n[ \t]*/g, "").

	    // handle escaped backticks
	    replace(/\\`/g, "`");

	    if (i < values.length) {
	      result += values[i];
	    }
	  }

	  // dedent eats leading and trailing whitespace too
	  result = result.trim();

	  // now strip indentation
	  var lines = result.split("\n");
	  var mindent = null;
	  lines.forEach(function (l) {
	    var m = l.match(/^ +/);
	    if (m) {
	      var indent = m[0].length;
	      if (!mindent) {
	        // this is the first indented line
	        mindent = indent;
	      } else {
	        mindent = Math.min(mindent, indent);
	      }
	    }
	  });

	  if (mindent !== null) {
	    result = lines.map(function (l) {
	      return l[0] === " " ? l.slice(mindent) : l;
	    }).join("\n");
	  }

	  // handle escaped newlines at the end to ensure they don't get stripped too
	  return result.replace(/\\n/g, "\n");
	}

	if (true) {
	  module.exports = dedent;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(4),
	    copyObject = __webpack_require__(6),
	    createAssigner = __webpack_require__(8),
	    isArrayLike = __webpack_require__(10),
	    isPrototype = __webpack_require__(21),
	    keysIn = __webpack_require__(22);

	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !({ 'valueOf': 1 }).propertyIsEnumerable('valueOf');

	/**
	 * This method is like `_.assign` except that it iterates over own and
	 * inherited source properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * function Bar() {
	 *   this.d = 4;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 * Bar.prototype.e = 5;
	 *
	 * _.assignIn({ 'a': 1 }, new Foo, new Bar);
	 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
	 */
	var assignIn = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keysIn(source), object);
	    return;
	  }
	  for (var key in source) {
	    assignValue(object, key, source[key]);
	  }
	});

	module.exports = assignIn;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(5);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	module.exports = assignValue;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(7);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object) {
	  return copyObjectWith(source, props, object);
	}

	module.exports = copyObject;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(4);

	/**
	 * This function is like `copyObject` except that it accepts a function to
	 * customize copied values.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObjectWith(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : source[key];

	    assignValue(object, key, newValue);
	  }
	  return object;
	}

	module.exports = copyObjectWith;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(9),
	    rest = __webpack_require__(17);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = typeof customizer == 'function'
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(5),
	    isArrayLike = __webpack_require__(10),
	    isIndex = __webpack_require__(16),
	    isObject = __webpack_require__(14);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(11),
	    isFunction = __webpack_require__(13),
	    isLength = __webpack_require__(15);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(12);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(18),
	    toInteger = __webpack_require__(19);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = rest;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(20);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? (remainder ? value - remainder : value) : 0;
	}

	module.exports = toInteger;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(13),
	    isObject = __webpack_require__(14);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(23),
	    indexKeys = __webpack_require__(29),
	    isIndex = __webpack_require__(16),
	    isPrototype = __webpack_require__(21);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  var index = -1,
	      isProto = isPrototype(object),
	      props = baseKeysIn(object),
	      propsLength = props.length,
	      indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(24),
	    iteratorToArray = __webpack_require__(28);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var enumerate = Reflect ? Reflect.enumerate : undefined,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);

	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}

	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function(object) {
	    return iteratorToArray(enumerate(object));
	  };
	}

	module.exports = baseKeysIn;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(25);

	/** Built-in value references. */
	var Reflect = root.Reflect;

	module.exports = Reflect;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {var checkGlobal = __webpack_require__(27);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();

	module.exports = root;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)(module), (function() { return this; }())))

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}

	module.exports = checkGlobal;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];

	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}

	module.exports = iteratorToArray;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(30),
	    isArguments = __webpack_require__(31),
	    isArray = __webpack_require__(34),
	    isLength = __webpack_require__(15),
	    isString = __webpack_require__(35);

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	module.exports = indexKeys;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(32);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(10),
	    isObjectLike = __webpack_require__(33);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(34),
	    isObjectLike = __webpack_require__(33);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	
	var space = __webpack_require__(37)

	/**
	 * Export.
	 */

	module.exports = toCamelCase

	/**
	 * Convert a `string` to camel case.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function toCamelCase(string) {
	  return space(string).replace(/\s(\w)/g, function (matches, letter) {
	    return letter.toUpperCase()
	  })
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	
	var clean = __webpack_require__(38)

	/**
	 * Export.
	 */

	module.exports = toSpaceCase

	/**
	 * Convert a `string` to space case.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function toSpaceCase(string) {
	  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
	    return match ? ' ' + match : ''
	  }).trim()
	}


/***/ },
/* 38 */
/***/ function(module, exports) {

	
	/**
	 * Export.
	 */

	module.exports = toNoCase

	/**
	 * Test whether a string is camel-case.
	 */

	var hasSpace = /\s/
	var hasSeparator = /[\W_]/

	/**
	 * Remove any starting case from a `string`, like camel or snake, but keep
	 * spaces and punctuation that may be important otherwise.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function toNoCase(string) {
	  if (hasSpace.test(string)) return string.toLowerCase()
	  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase()
	  return uncamelize(string).toLowerCase()
	}

	/**
	 * Separator splitter.
	 */

	var separatorSplitter = /[\W_]+(.|$)/g

	/**
	 * Un-separate a `string`.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function unseparate(string) {
	  return string.replace(separatorSplitter, function (m, next) {
	    return next ? ' ' + next : ''
	  })
	}

	/**
	 * Camelcase splitter.
	 */

	var camelSplitter = /(.)([A-Z]+)/g

	/**
	 * Un-camelcase a `string`.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function uncamelize(string) {
	  return string.replace(camelSplitter, function (m, previous, uppers) {
	    return previous + ' ' + uppers.toLowerCase().split('').join(' ')
	  })
	}


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * The inverse of `_.toPairs`; this method returns an object composed
	 * from key-value `pairs`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} pairs The key-value pairs.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * _.fromPairs([['fred', 30], ['barney', 40]]);
	 * // => { 'fred': 30, 'barney': 40 }
	 */
	function fromPairs(pairs) {
	  var index = -1,
	      length = pairs ? pairs.length : 0,
	      result = {};

	  while (++index < length) {
	    var pair = pairs[index];
	    result[pair[0]] = pair[1];
	  }
	  return result;
	}

	module.exports = fromPairs;


/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = (function() {
	  /*
	   * Generated by PEG.js 0.8.0.
	   *
	   * http://pegjs.majda.cz/
	   */

	  function peg$subclass(child, parent) {
	    function ctor() { this.constructor = child; }
	    ctor.prototype = parent.prototype;
	    child.prototype = new ctor();
	  }

	  function SyntaxError(message, expected, found, offset, line, column) {
	    this.message  = message;
	    this.expected = expected;
	    this.found    = found;
	    this.offset   = offset;
	    this.line     = line;
	    this.column   = column;

	    this.name     = "SyntaxError";
	  }

	  peg$subclass(SyntaxError, Error);

	  function parse(input) {
	    var options = arguments.length > 1 ? arguments[1] : {},

	        peg$FAILED = {},

	        peg$startRuleFunctions = { start: peg$parsestart },
	        peg$startRuleFunction  = peg$parsestart,

	        peg$c0 = peg$FAILED,
	        peg$c1 = [],
	        peg$c2 = function(dialogue) { return dialogue },
	        peg$c3 = { type: "other", description: "dialogue" },
	        peg$c4 = function(title, sequences) {
	            return {
	              title: title,
	              sequences: sequences
	            };
	          },
	        peg$c5 = { type: "other", description: "dialogue title" },
	        peg$c6 = "#",
	        peg$c7 = { type: "literal", value: "#", description: "\"#\"" },
	        peg$c8 = function(value) { return value; },
	        peg$c9 = { type: "other", description: "sequence title" },
	        peg$c10 = "##",
	        peg$c11 = { type: "literal", value: "##", description: "\"##\"" },
	        peg$c12 = { type: "other", description: "block title" },
	        peg$c13 = "###",
	        peg$c14 = { type: "literal", value: "###", description: "\"###\"" },
	        peg$c15 = { type: "other", description: "sequences" },
	        peg$c16 = function(s) { return s; },
	        peg$c17 = { type: "other", description: "sequence" },
	        peg$c18 = function(title, properties, blocks) {
	            return conj(properties, {
	              title: title,
	              blocks: blocks
	            });
	          },
	        peg$c19 = { type: "other", description: "blocks" },
	        peg$c20 = function(b) { return b; },
	        peg$c21 = { type: "other", description: "block" },
	        peg$c22 = function(title, properties) { return conj(properties, {title: title}); },
	        peg$c23 = { type: "other", description: "properties" },
	        peg$c24 = function(p) { return p; },
	        peg$c25 = function(properties) { return fromPairs(properties); },
	        peg$c26 = { type: "other", description: "property" },
	        peg$c27 = { type: "other", description: "symbol property" },
	        peg$c28 = null,
	        peg$c29 = "[symbol]",
	        peg$c30 = { type: "literal", value: "[symbol]", description: "\"[symbol]\"" },
	        peg$c31 = ":",
	        peg$c32 = { type: "literal", value: ":", description: "\":\"" },
	        peg$c33 = function(key, value) { return parseProperty(key, value); },
	        peg$c34 = { type: "other", description: "text property" },
	        peg$c35 = "[text]",
	        peg$c36 = { type: "literal", value: "[text]", description: "\"[text]\"" },
	        peg$c37 = "`",
	        peg$c38 = { type: "literal", value: "`", description: "\"`\"" },
	        peg$c39 = function(key, value) { return parseTextProperty(key, value); },
	        peg$c40 = { type: "other", description: "digit" },
	        peg$c41 = /^[0-9]/,
	        peg$c42 = { type: "class", value: "[0-9]", description: "[0-9]" },
	        peg$c43 = { type: "other", description: "lower case letter" },
	        peg$c44 = /^[a-z]/,
	        peg$c45 = { type: "class", value: "[a-z]", description: "[a-z]" },
	        peg$c46 = { type: "other", description: "-" },
	        peg$c47 = "-",
	        peg$c48 = { type: "literal", value: "-", description: "\"-\"" },
	        peg$c49 = { type: "other", description: "text" },
	        peg$c50 = /^[^`]/,
	        peg$c51 = { type: "class", value: "[^`]", description: "[^`]" },
	        peg$c52 = function() { return text(); },
	        peg$c53 = { type: "other", description: "line text" },
	        peg$c54 = /^[^\t\n\r]/,
	        peg$c55 = { type: "class", value: "[^\\t\\n\\r]", description: "[^\\t\\n\\r]" },
	        peg$c56 = { type: "other", description: "symbol" },
	        peg$c57 = { type: "other", description: "new line" },
	        peg$c58 = /^[\n]/,
	        peg$c59 = { type: "class", value: "[\\n]", description: "[\\n]" },
	        peg$c60 = { type: "other", description: "whitespace" },
	        peg$c61 = /^[ \t\n\r]/,
	        peg$c62 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
	        peg$c63 = { type: "other", description: "line whitespace" },
	        peg$c64 = /^[ \t\r]/,
	        peg$c65 = { type: "class", value: "[ \\t\\r]", description: "[ \\t\\r]" },

	        peg$currPos          = 0,
	        peg$reportedPos      = 0,
	        peg$cachedPos        = 0,
	        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
	        peg$maxFailPos       = 0,
	        peg$maxFailExpected  = [],
	        peg$silentFails      = 0,

	        peg$result;

	    if ("startRule" in options) {
	      if (!(options.startRule in peg$startRuleFunctions)) {
	        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
	      }

	      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
	    }

	    function text() {
	      return input.substring(peg$reportedPos, peg$currPos);
	    }

	    function offset() {
	      return peg$reportedPos;
	    }

	    function line() {
	      return peg$computePosDetails(peg$reportedPos).line;
	    }

	    function column() {
	      return peg$computePosDetails(peg$reportedPos).column;
	    }

	    function expected(description) {
	      throw peg$buildException(
	        null,
	        [{ type: "other", description: description }],
	        peg$reportedPos
	      );
	    }

	    function error(message) {
	      throw peg$buildException(message, null, peg$reportedPos);
	    }

	    function peg$computePosDetails(pos) {
	      function advance(details, startPos, endPos) {
	        var p, ch;

	        for (p = startPos; p < endPos; p++) {
	          ch = input.charAt(p);
	          if (ch === "\n") {
	            if (!details.seenCR) { details.line++; }
	            details.column = 1;
	            details.seenCR = false;
	          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
	            details.line++;
	            details.column = 1;
	            details.seenCR = true;
	          } else {
	            details.column++;
	            details.seenCR = false;
	          }
	        }
	      }

	      if (peg$cachedPos !== pos) {
	        if (peg$cachedPos > pos) {
	          peg$cachedPos = 0;
	          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
	        }
	        advance(peg$cachedPosDetails, peg$cachedPos, pos);
	        peg$cachedPos = pos;
	      }

	      return peg$cachedPosDetails;
	    }

	    function peg$fail(expected) {
	      if (peg$currPos < peg$maxFailPos) { return; }

	      if (peg$currPos > peg$maxFailPos) {
	        peg$maxFailPos = peg$currPos;
	        peg$maxFailExpected = [];
	      }

	      peg$maxFailExpected.push(expected);
	    }

	    function peg$buildException(message, expected, pos) {
	      function cleanupExpected(expected) {
	        var i = 1;

	        expected.sort(function(a, b) {
	          if (a.description < b.description) {
	            return -1;
	          } else if (a.description > b.description) {
	            return 1;
	          } else {
	            return 0;
	          }
	        });

	        while (i < expected.length) {
	          if (expected[i - 1] === expected[i]) {
	            expected.splice(i, 1);
	          } else {
	            i++;
	          }
	        }
	      }

	      function buildMessage(expected, found) {
	        function stringEscape(s) {
	          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

	          return s
	            .replace(/\\/g,   '\\\\')
	            .replace(/"/g,    '\\"')
	            .replace(/\x08/g, '\\b')
	            .replace(/\t/g,   '\\t')
	            .replace(/\n/g,   '\\n')
	            .replace(/\f/g,   '\\f')
	            .replace(/\r/g,   '\\r')
	            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
	            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
	            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
	            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
	        }

	        var expectedDescs = new Array(expected.length),
	            expectedDesc, foundDesc, i;

	        for (i = 0; i < expected.length; i++) {
	          expectedDescs[i] = expected[i].description;
	        }

	        expectedDesc = expected.length > 1
	          ? expectedDescs.slice(0, -1).join(", ")
	              + " or "
	              + expectedDescs[expected.length - 1]
	          : expectedDescs[0];

	        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

	        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
	      }

	      var posDetails = peg$computePosDetails(pos),
	          found      = pos < input.length ? input.charAt(pos) : null;

	      if (expected !== null) {
	        cleanupExpected(expected);
	      }

	      return new SyntaxError(
	        message !== null ? message : buildMessage(expected, found),
	        expected,
	        found,
	        pos,
	        posDetails.line,
	        posDetails.column
	      );
	    }

	    function peg$parsestart() {
	      var s0, s1, s2, s3, s4;

	      s0 = peg$currPos;
	      s1 = [];
	      s2 = peg$parsews();
	      while (s2 !== peg$FAILED) {
	        s1.push(s2);
	        s2 = peg$parsews();
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parsedialogue();
	        if (s2 !== peg$FAILED) {
	          s3 = [];
	          s4 = peg$parsews();
	          while (s4 !== peg$FAILED) {
	            s3.push(s4);
	            s4 = peg$parsews();
	          }
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c2(s2);
	            s0 = s1;
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }

	      return s0;
	    }

	    function peg$parsedialogue() {
	      var s0, s1, s2, s3;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      s1 = peg$parsedialogueTitle();
	      if (s1 !== peg$FAILED) {
	        s2 = [];
	        s3 = peg$parsews();
	        while (s3 !== peg$FAILED) {
	          s2.push(s3);
	          s3 = peg$parsews();
	        }
	        if (s2 !== peg$FAILED) {
	          s3 = peg$parsesequences();
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c4(s1, s3);
	            s0 = s1;
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c3); }
	      }

	      return s0;
	    }

	    function peg$parsedialogueTitle() {
	      var s0, s1, s2, s3;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      if (input.charCodeAt(peg$currPos) === 35) {
	        s1 = peg$c6;
	        peg$currPos++;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c7); }
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = [];
	        s3 = peg$parselineWs();
	        while (s3 !== peg$FAILED) {
	          s2.push(s3);
	          s3 = peg$parselineWs();
	        }
	        if (s2 !== peg$FAILED) {
	          s3 = peg$parselineText();
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c8(s3);
	            s0 = s1;
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c5); }
	      }

	      return s0;
	    }

	    function peg$parsesequenceTitle() {
	      var s0, s1, s2, s3;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      if (input.substr(peg$currPos, 2) === peg$c10) {
	        s1 = peg$c10;
	        peg$currPos += 2;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c11); }
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = [];
	        s3 = peg$parselineWs();
	        while (s3 !== peg$FAILED) {
	          s2.push(s3);
	          s3 = peg$parselineWs();
	        }
	        if (s2 !== peg$FAILED) {
	          s3 = peg$parselineText();
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c8(s3);
	            s0 = s1;
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c9); }
	      }

	      return s0;
	    }

	    function peg$parseblockTitle() {
	      var s0, s1, s2, s3;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      if (input.substr(peg$currPos, 3) === peg$c13) {
	        s1 = peg$c13;
	        peg$currPos += 3;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c14); }
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = [];
	        s3 = peg$parselineWs();
	        while (s3 !== peg$FAILED) {
	          s2.push(s3);
	          s3 = peg$parselineWs();
	        }
	        if (s2 !== peg$FAILED) {
	          s3 = peg$parselineText();
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c8(s3);
	            s0 = s1;
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c12); }
	      }

	      return s0;
	    }

	    function peg$parsesequences() {
	      var s0, s1, s2, s3, s4;

	      peg$silentFails++;
	      s0 = [];
	      s1 = peg$currPos;
	      s2 = peg$parsesequence();
	      if (s2 !== peg$FAILED) {
	        s3 = [];
	        s4 = peg$parsews();
	        while (s4 !== peg$FAILED) {
	          s3.push(s4);
	          s4 = peg$parsews();
	        }
	        if (s3 !== peg$FAILED) {
	          peg$reportedPos = s1;
	          s2 = peg$c16(s2);
	          s1 = s2;
	        } else {
	          peg$currPos = s1;
	          s1 = peg$c0;
	        }
	      } else {
	        peg$currPos = s1;
	        s1 = peg$c0;
	      }
	      while (s1 !== peg$FAILED) {
	        s0.push(s1);
	        s1 = peg$currPos;
	        s2 = peg$parsesequence();
	        if (s2 !== peg$FAILED) {
	          s3 = [];
	          s4 = peg$parsews();
	          while (s4 !== peg$FAILED) {
	            s3.push(s4);
	            s4 = peg$parsews();
	          }
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s1;
	            s2 = peg$c16(s2);
	            s1 = s2;
	          } else {
	            peg$currPos = s1;
	            s1 = peg$c0;
	          }
	        } else {
	          peg$currPos = s1;
	          s1 = peg$c0;
	        }
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c15); }
	      }

	      return s0;
	    }

	    function peg$parsesequence() {
	      var s0, s1, s2, s3, s4, s5;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      s1 = peg$parsesequenceTitle();
	      if (s1 !== peg$FAILED) {
	        s2 = [];
	        s3 = peg$parsews();
	        while (s3 !== peg$FAILED) {
	          s2.push(s3);
	          s3 = peg$parsews();
	        }
	        if (s2 !== peg$FAILED) {
	          s3 = peg$parseproperties();
	          if (s3 !== peg$FAILED) {
	            s4 = [];
	            s5 = peg$parsews();
	            while (s5 !== peg$FAILED) {
	              s4.push(s5);
	              s5 = peg$parsews();
	            }
	            if (s4 !== peg$FAILED) {
	              s5 = peg$parseblocks();
	              if (s5 !== peg$FAILED) {
	                peg$reportedPos = s0;
	                s1 = peg$c18(s1, s3, s5);
	                s0 = s1;
	              } else {
	                peg$currPos = s0;
	                s0 = peg$c0;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$c0;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c17); }
	      }

	      return s0;
	    }

	    function peg$parseblocks() {
	      var s0, s1, s2, s3, s4;

	      peg$silentFails++;
	      s0 = [];
	      s1 = peg$currPos;
	      s2 = peg$parseblock();
	      if (s2 !== peg$FAILED) {
	        s3 = [];
	        s4 = peg$parsews();
	        while (s4 !== peg$FAILED) {
	          s3.push(s4);
	          s4 = peg$parsews();
	        }
	        if (s3 !== peg$FAILED) {
	          peg$reportedPos = s1;
	          s2 = peg$c20(s2);
	          s1 = s2;
	        } else {
	          peg$currPos = s1;
	          s1 = peg$c0;
	        }
	      } else {
	        peg$currPos = s1;
	        s1 = peg$c0;
	      }
	      while (s1 !== peg$FAILED) {
	        s0.push(s1);
	        s1 = peg$currPos;
	        s2 = peg$parseblock();
	        if (s2 !== peg$FAILED) {
	          s3 = [];
	          s4 = peg$parsews();
	          while (s4 !== peg$FAILED) {
	            s3.push(s4);
	            s4 = peg$parsews();
	          }
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s1;
	            s2 = peg$c20(s2);
	            s1 = s2;
	          } else {
	            peg$currPos = s1;
	            s1 = peg$c0;
	          }
	        } else {
	          peg$currPos = s1;
	          s1 = peg$c0;
	        }
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c19); }
	      }

	      return s0;
	    }

	    function peg$parseblock() {
	      var s0, s1, s2, s3;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      s1 = peg$parseblockTitle();
	      if (s1 !== peg$FAILED) {
	        s2 = [];
	        s3 = peg$parsews();
	        while (s3 !== peg$FAILED) {
	          s2.push(s3);
	          s3 = peg$parsews();
	        }
	        if (s2 !== peg$FAILED) {
	          s3 = peg$parseproperties();
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c22(s1, s3);
	            s0 = s1;
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c21); }
	      }

	      return s0;
	    }

	    function peg$parseproperties() {
	      var s0, s1, s2, s3, s4, s5;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      s1 = [];
	      s2 = peg$currPos;
	      s3 = peg$parseproperty();
	      if (s3 !== peg$FAILED) {
	        s4 = [];
	        s5 = peg$parsews();
	        while (s5 !== peg$FAILED) {
	          s4.push(s5);
	          s5 = peg$parsews();
	        }
	        if (s4 !== peg$FAILED) {
	          peg$reportedPos = s2;
	          s3 = peg$c24(s3);
	          s2 = s3;
	        } else {
	          peg$currPos = s2;
	          s2 = peg$c0;
	        }
	      } else {
	        peg$currPos = s2;
	        s2 = peg$c0;
	      }
	      while (s2 !== peg$FAILED) {
	        s1.push(s2);
	        s2 = peg$currPos;
	        s3 = peg$parseproperty();
	        if (s3 !== peg$FAILED) {
	          s4 = [];
	          s5 = peg$parsews();
	          while (s5 !== peg$FAILED) {
	            s4.push(s5);
	            s5 = peg$parsews();
	          }
	          if (s4 !== peg$FAILED) {
	            peg$reportedPos = s2;
	            s3 = peg$c24(s3);
	            s2 = s3;
	          } else {
	            peg$currPos = s2;
	            s2 = peg$c0;
	          }
	        } else {
	          peg$currPos = s2;
	          s2 = peg$c0;
	        }
	      }
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c25(s1);
	      }
	      s0 = s1;
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c23); }
	      }

	      return s0;
	    }

	    function peg$parseproperty() {
	      var s0, s1;

	      peg$silentFails++;
	      s0 = peg$parsesymbolProperty();
	      if (s0 === peg$FAILED) {
	        s0 = peg$parsetextProperty();
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c26); }
	      }

	      return s0;
	    }

	    function peg$parsesymbolProperty() {
	      var s0, s1, s2, s3, s4, s5;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      s1 = peg$parsesymbol();
	      if (s1 !== peg$FAILED) {
	        if (input.substr(peg$currPos, 8) === peg$c29) {
	          s2 = peg$c29;
	          peg$currPos += 8;
	        } else {
	          s2 = peg$FAILED;
	          if (peg$silentFails === 0) { peg$fail(peg$c30); }
	        }
	        if (s2 === peg$FAILED) {
	          s2 = peg$c28;
	        }
	        if (s2 !== peg$FAILED) {
	          if (input.charCodeAt(peg$currPos) === 58) {
	            s3 = peg$c31;
	            peg$currPos++;
	          } else {
	            s3 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c32); }
	          }
	          if (s3 !== peg$FAILED) {
	            s4 = [];
	            s5 = peg$parselineWs();
	            while (s5 !== peg$FAILED) {
	              s4.push(s5);
	              s5 = peg$parselineWs();
	            }
	            if (s4 !== peg$FAILED) {
	              s5 = peg$parsesymbol();
	              if (s5 !== peg$FAILED) {
	                peg$reportedPos = s0;
	                s1 = peg$c33(s1, s5);
	                s0 = s1;
	              } else {
	                peg$currPos = s0;
	                s0 = peg$c0;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$c0;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c27); }
	      }

	      return s0;
	    }

	    function peg$parsetextProperty() {
	      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      s1 = peg$parsesymbol();
	      if (s1 !== peg$FAILED) {
	        if (input.substr(peg$currPos, 6) === peg$c35) {
	          s2 = peg$c35;
	          peg$currPos += 6;
	        } else {
	          s2 = peg$FAILED;
	          if (peg$silentFails === 0) { peg$fail(peg$c36); }
	        }
	        if (s2 === peg$FAILED) {
	          s2 = peg$c28;
	        }
	        if (s2 !== peg$FAILED) {
	          if (input.charCodeAt(peg$currPos) === 58) {
	            s3 = peg$c31;
	            peg$currPos++;
	          } else {
	            s3 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c32); }
	          }
	          if (s3 !== peg$FAILED) {
	            s4 = [];
	            s5 = peg$parselineWs();
	            while (s5 !== peg$FAILED) {
	              s4.push(s5);
	              s5 = peg$parselineWs();
	            }
	            if (s4 !== peg$FAILED) {
	              if (input.charCodeAt(peg$currPos) === 96) {
	                s5 = peg$c37;
	                peg$currPos++;
	              } else {
	                s5 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c38); }
	              }
	              if (s5 !== peg$FAILED) {
	                s6 = [];
	                s7 = peg$parsenewline();
	                while (s7 !== peg$FAILED) {
	                  s6.push(s7);
	                  s7 = peg$parsenewline();
	                }
	                if (s6 !== peg$FAILED) {
	                  s7 = peg$parsetext();
	                  if (s7 !== peg$FAILED) {
	                    s8 = [];
	                    s9 = peg$parsenewline();
	                    while (s9 !== peg$FAILED) {
	                      s8.push(s9);
	                      s9 = peg$parsenewline();
	                    }
	                    if (s8 !== peg$FAILED) {
	                      if (input.charCodeAt(peg$currPos) === 96) {
	                        s9 = peg$c37;
	                        peg$currPos++;
	                      } else {
	                        s9 = peg$FAILED;
	                        if (peg$silentFails === 0) { peg$fail(peg$c38); }
	                      }
	                      if (s9 !== peg$FAILED) {
	                        peg$reportedPos = s0;
	                        s1 = peg$c39(s1, s7);
	                        s0 = s1;
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$c0;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$c0;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$c0;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$c0;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$c0;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$c0;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c0;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c34); }
	      }

	      return s0;
	    }

	    function peg$parsedigit() {
	      var s0, s1;

	      peg$silentFails++;
	      if (peg$c41.test(input.charAt(peg$currPos))) {
	        s0 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s0 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c42); }
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c40); }
	      }

	      return s0;
	    }

	    function peg$parselcletter() {
	      var s0, s1;

	      peg$silentFails++;
	      if (peg$c44.test(input.charAt(peg$currPos))) {
	        s0 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s0 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c45); }
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c43); }
	      }

	      return s0;
	    }

	    function peg$parsedash() {
	      var s0, s1;

	      peg$silentFails++;
	      if (input.charCodeAt(peg$currPos) === 45) {
	        s0 = peg$c47;
	        peg$currPos++;
	      } else {
	        s0 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c48); }
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c46); }
	      }

	      return s0;
	    }

	    function peg$parsetext() {
	      var s0, s1, s2;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      s1 = [];
	      if (peg$c50.test(input.charAt(peg$currPos))) {
	        s2 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s2 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c51); }
	      }
	      while (s2 !== peg$FAILED) {
	        s1.push(s2);
	        if (peg$c50.test(input.charAt(peg$currPos))) {
	          s2 = input.charAt(peg$currPos);
	          peg$currPos++;
	        } else {
	          s2 = peg$FAILED;
	          if (peg$silentFails === 0) { peg$fail(peg$c51); }
	        }
	      }
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c52();
	      }
	      s0 = s1;
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c49); }
	      }

	      return s0;
	    }

	    function peg$parselineText() {
	      var s0, s1, s2;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      s1 = [];
	      if (peg$c54.test(input.charAt(peg$currPos))) {
	        s2 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s2 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c55); }
	      }
	      if (s2 !== peg$FAILED) {
	        while (s2 !== peg$FAILED) {
	          s1.push(s2);
	          if (peg$c54.test(input.charAt(peg$currPos))) {
	            s2 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s2 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c55); }
	          }
	        }
	      } else {
	        s1 = peg$c0;
	      }
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c52();
	      }
	      s0 = s1;
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c53); }
	      }

	      return s0;
	    }

	    function peg$parsesymbol() {
	      var s0, s1, s2, s3;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      s1 = peg$parselcletter();
	      if (s1 !== peg$FAILED) {
	        s2 = [];
	        s3 = peg$parselcletter();
	        if (s3 === peg$FAILED) {
	          s3 = peg$parsedigit();
	          if (s3 === peg$FAILED) {
	            s3 = peg$parsedash();
	          }
	        }
	        if (s3 !== peg$FAILED) {
	          while (s3 !== peg$FAILED) {
	            s2.push(s3);
	            s3 = peg$parselcletter();
	            if (s3 === peg$FAILED) {
	              s3 = peg$parsedigit();
	              if (s3 === peg$FAILED) {
	                s3 = peg$parsedash();
	              }
	            }
	          }
	        } else {
	          s2 = peg$c0;
	        }
	        if (s2 !== peg$FAILED) {
	          peg$reportedPos = s0;
	          s1 = peg$c52();
	          s0 = s1;
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c0;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c0;
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c56); }
	      }

	      return s0;
	    }

	    function peg$parsedash() {
	      var s0, s1;

	      peg$silentFails++;
	      if (input.charCodeAt(peg$currPos) === 45) {
	        s0 = peg$c47;
	        peg$currPos++;
	      } else {
	        s0 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c48); }
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c46); }
	      }

	      return s0;
	    }

	    function peg$parsenewline() {
	      var s0, s1;

	      peg$silentFails++;
	      if (peg$c58.test(input.charAt(peg$currPos))) {
	        s0 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s0 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c59); }
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c57); }
	      }

	      return s0;
	    }

	    function peg$parsews() {
	      var s0, s1;

	      peg$silentFails++;
	      if (peg$c61.test(input.charAt(peg$currPos))) {
	        s0 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s0 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c62); }
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c60); }
	      }

	      return s0;
	    }

	    function peg$parselineWs() {
	      var s0, s1;

	      peg$silentFails++;
	      if (peg$c64.test(input.charAt(peg$currPos))) {
	        s0 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s0 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c65); }
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c63); }
	      }

	      return s0;
	    }


	      var dedent = options.dedent;
	      var extend = options.extend;
	      var fromPairs = options.fromPairs;
	      var toCamelCase = options.toCamelCase;


	      function conj(a, b) {
	        return extend({}, a, b);
	      }


	      function parseProperty(k, v) {
	        return [toCamelCase(k), v];
	      }


	      function parseTextProperty(k, v) {
	        return parseProperty(k, dedent(v));
	      }


	    peg$result = peg$startRuleFunction();

	    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
	      return peg$result;
	    } else {
	      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
	        peg$fail({ type: "end", description: "end of input" });
	      }

	      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
	    }
	  }

	  return {
	    SyntaxError: SyntaxError,
	    parse:       parse
	  };
	})();

/***/ }
/******/ ])
});
;