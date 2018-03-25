"use strict";
// A Type Inference Algorithm that provides support for full inference 
// of non-recursive higher rank polymorphic types.
//
// Copyright 2017 by Christopher Diggins 
// Licensed under the MIT License
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var trace = false;
/** Turn on debug tracing */
function setTrace(b) {
    trace = b;
}
exports.setTrace = setTrace;
//=========================================
// Name generation 
// Used for generating new names 
var id = 0;
// Returns a new type variable.
function newTypeVar() {
    return typeVariable("$" + id++);
}
exports.newTypeVar = newTypeVar;
;
/** Called when the type unfiication process fails.  */
var TypeUnificationError = /** @class */ (function (_super) {
    __extends(TypeUnificationError, _super);
    function TypeUnificationError(u, a, b, msg) {
        if (msg === void 0) { msg = ""; }
        var _this = _super.call(this, "Unification failed between type " + a + " and " + b + " " + msg) || this;
        _this.u = u;
        _this.a = a;
        _this.b = b;
        _this.msg = msg;
        return _this;
    }
    return TypeUnificationError;
}(Error));
exports.TypeUnificationError = TypeUnificationError;
//=========================================
// Classes that represent kinds of types  
/** Base class of a type: either a PolyType, TypeVariable, or TypeConstant */
var Type = /** @class */ (function () {
    function Type() {
    }
    return Type;
}());
exports.Type = Type;
/** A collection of a fixed number of types can be used to represent function types or tuple types.
 * A list of types is usually encoded as a nested set of type pairs (PolyTypes with two elements).
 * The schama is a list of universally quantified variables.
 */
var PolyType = /** @class */ (function (_super) {
    __extends(PolyType, _super);
    function PolyType(types, schema) {
        var _this = _super.call(this) || this;
        _this.types = types;
        _this.schema = schema;
        return _this;
    }
    PolyType.prototype.typeSchemaString = function () {
        var r = values(this.schema).join("!");
        return r ? "!" + r + "." : r;
    };
    PolyType.prototype.toString = function () {
        return this.typeSchemaString + "(" + this.types.join(" ") + ")";
    };
    return PolyType;
}(Type));
exports.PolyType = PolyType;
/** A MonoType is either a Type variable or a type constant: not a PolyType. */
var MonoType = /** @class */ (function (_super) {
    __extends(MonoType, _super);
    function MonoType(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    return MonoType;
}(Type));
exports.MonoType = MonoType;
/** A type variable is used for generics (e.g. T0, TR).
 * The type variable must belong to a type scheme of a polytype. This is like a "scope" for type variables.
 * Computing the type schema is done in an external function.
 */
var TypeVariable = /** @class */ (function (_super) {
    __extends(TypeVariable, _super);
    function TypeVariable(name) {
        return _super.call(this, name) || this;
    }
    TypeVariable.prototype.toString = function () { return "'" + this.name; };
    return TypeVariable;
}(MonoType));
exports.TypeVariable = TypeVariable;
/** A type constant is a fixed type (e.g. int, function). . */
var TypeConstant = /** @class */ (function (_super) {
    __extends(TypeConstant, _super);
    function TypeConstant(name) {
        return _super.call(this, name) || this;
    }
    TypeConstant.prototype.toString = function () { return this.name; };
    return TypeConstant;
}(MonoType));
exports.TypeConstant = TypeConstant;
//============================================================================
// Helper classes and interfaces 
/** A type unifier is a best-fit type. It has a name, which is the original variable name. */
var TypeUnifier = /** @class */ (function () {
    function TypeUnifier(name, unifier) {
        this.name = name;
        this.unifier = unifier;
    }
    return TypeUnifier;
}());
exports.TypeUnifier = TypeUnifier;
//=======================================================================
// Various functions
/** This is helper function helps determine whether a type variable should belong */
function _isTypeVarUsedElsewhere(t, varName, pos) {
    for (var i = 0; i < t.types.length; ++i)
        if (i != pos && t.types[i].typeVars.some(function (v) { return v.name == varName; }))
            return true;
    return false;
}
exports._isTypeVarUsedElsewhere = _isTypeVarUsedElsewhere;
//================================================
// A classes used to implement unification.
/** Find a unified type. */
var TypeResolver = /** @class */ (function () {
    /** The consumer of the class has to provide a startegy for choosing the best unifier
     * when the unifier encounters different type constants. Examples strategies are:
     * - throw an error.
     * - see if one is a sub-type of another
     * - look for an appropriate type-cast
     * This is a great place to add logging as well, to have insights into the unification process.
     */
    function TypeResolver(chooseTypeStrategy) {
        this.chooseTypeStrategy = chooseTypeStrategy;
        /* Given a type variable name find the unifier. Multiple type variables will map to the same unifier. */
        this.unifiers = {};
    }
    /** Unify both types, returning the most specific type possible.
     * When a type variable is unified with something the new unifier is stored.
     * - Constants are preferred over lists and variables
     * - Lists are preferred over variables
     * - Given two variables, the first one is chosen.
     * - given two different constants, the unifier uses the provided strategy
     */
    TypeResolver.prototype.unifyTypes = function (t1, t2, depth) {
        if (depth === void 0) { depth = 0; }
        if (!t1 || !t2)
            throw new Error("Missing type expression");
        if (t1 === t2)
            return t1;
        if (t1 instanceof TypeVariable) {
            var r = this._updateUnifier(t1, t2, depth);
            this._updateAllUnifiers(t1.name, t2);
            return r;
        }
        else if (t2 instanceof TypeVariable) {
            var r = this._updateUnifier(t2, t1, depth);
            this._updateAllUnifiers(t2.name, t1);
            return r;
        }
        else if (t1 instanceof TypeConstant && t2 instanceof TypeConstant) {
            if (t1.name != t2.name)
                return this.chooseTypeStrategy(t1, t2);
            return t1;
        }
        else if (t1 instanceof TypeConstant || t2 instanceof TypeConstant) {
            throw new TypeUnificationError(this, t1, t2);
        }
        else if (t1 instanceof PolyType && t2 instanceof PolyType) {
            return this._unifyLists(t1, t2, depth + 1);
        }
        assert(false, "unexpected code path: " + t1 + " and " + t2);
    };
    Object.defineProperty(TypeResolver.prototype, "state", {
        /** Debug function that dumps prints out a representation of the engine state. */
        get: function () {
            var results = [];
            for (var k in this.unifiers) {
                var u = this.unifiers[k];
                var t = u.unifier;
                results.push("type unifier for " + k + ", unifier name " + u.name + ", unifying type " + t);
            }
            return results.join('\n');
        },
        enumerable: true,
        configurable: true
    });
    // Replaces all variables in a type expression with the unified version
    // The previousVars variable allows detection of cyclical references
    TypeResolver.prototype.getUnifiedType = function (expr, previousVars, unifiedVars) {
        var _this = this;
        if (previousVars === void 0) { previousVars = []; }
        if (unifiedVars === void 0) { unifiedVars = {}; }
        if (expr instanceof TypeConstant)
            return expr;
        else if (expr instanceof TypeVariable) {
            // If we encountered the type variable previously, it meant that there is a recursive relation
            for (var i = 0; i < previousVars.length; ++i)
                if (previousVars[i] == expr.name)
                    return recursiveType(i);
            var u = this.unifiers[expr.name];
            if (!u)
                return expr;
            else if (u.unifier instanceof TypeVariable)
                return u.unifier;
            else if (u.unifier instanceof TypeConstant)
                return u.unifier;
            else if (u.unifier instanceof PolyType) {
                // TODO: this logic has to move into the unification step. 
                if (u.name in unifiedVars) {
                    // We have already seen this unified const before
                    var u2 = u.unifier.freshParameterNames();
                    return this.getUnifiedType(u2, [expr.name].concat(previousVars), unifiedVars);
                }
                else {
                    unifiedVars[u.name] = 0;
                    return this.getUnifiedType(u.unifier, [expr.name].concat(previousVars), unifiedVars);
                }
            }
            else
                throw new Error("Unhandled kind of type " + expr);
        }
        else if (expr instanceof PolyType) {
            var types = expr.types.map(function (t) { return _this.getUnifiedType(t, previousVars, unifiedVars); });
            var r = new PolyType(types, false);
            return r;
        }
        else
            throw new Error("Unrecognized kind of type expression " + expr);
    };
    /** Choose one of two unifiers, or continue the unification process if necessary */
    TypeResolver.prototype._chooseBestUnifier = function (t1, t2, depth) {
        if (t1 instanceof TypeVariable && t2 instanceof TypeVariable)
            return t1;
        else if (t1 instanceof TypeVariable)
            return t2;
        else if (t2 instanceof TypeVariable)
            return t1;
        else
            return this.unifyTypes(t1, t2, depth + 1);
    };
    // Unifying lists involves unifying each element
    TypeResolver.prototype._unifyLists = function (list1, list2, depth) {
        if (list1.types.length != list2.types.length)
            throw new Error("Cannot unify differently sized lists: " + list1 + " and " + list2);
        var rtypes = [];
        for (var i = 0; i < list1.types.length; ++i)
            rtypes.push(this.unifyTypes(list1.types[i], list2.types[i], depth));
        // We just return the first list for now. 
        return list1;
    };
    // All unifiers that refer to varName as the unifier are pointed to the new unifier 
    TypeResolver.prototype._updateVariableUnifiers = function (varName, u) {
        for (var x in this.unifiers) {
            var t = this.unifiers[x].unifier;
            if (t instanceof TypeVariable)
                if (t.name == varName)
                    this.unifiers[x] = u;
        }
    };
    // Go through a type and replace all instances of a variable with the new type
    // unless the new type is a variable. 
    TypeResolver.prototype._replaceVarWithType = function (target, varName, replace) {
        //if (trace) console.log("Replacing variable " + varName + " in target  " + target + " with " + replace);
        // Just leave it as is. 
        // Replacing a variable with a variable is kind of meaningless.
        if (replace instanceof TypeVariable)
            return target;
        // Create new parameter names as needed 
        if (replace instanceof PolyType) {
            if (replace.isPolyType) {
                // Get some new parameters for the poly type
                replace = freshParameterNames(replace);
            }
        }
        // Look at the target type and decide what to do. 
        if (target instanceof TypeVariable) {
            if (target.name == varName)
                return replace;
            else
                return target;
        }
        else if (target instanceof TypeConstant) {
            return target;
        }
        else if (target instanceof PolyType) {
            // TODO?: look at the parameters. Am I replacing a parameter? If so, throw it out. 
            // BUT!!: I don't think I have to do this step, because at the end the type will be constructed correctly.
            return target.clone({ varName: replace });
        }
        else {
            throw new Error("Unrecognized kind of type " + target);
        }
    };
    Object.defineProperty(TypeResolver.prototype, "_allUnifiers", {
        // Returns all of the unifiers as an array 
        get: function () {
            var r = [];
            for (var k in this.unifiers)
                r.push(this.unifiers[k]);
            return r;
        },
        enumerable: true,
        configurable: true
    });
    // Update all unifiers once I am making a replacement 
    TypeResolver.prototype._updateAllUnifiers = function (a, t) {
        for (var _i = 0, _a = this._allUnifiers; _i < _a.length; _i++) {
            var tu = _a[_i];
            tu.unifier = this._replaceVarWithType(tu.unifier, a, t);
        }
    };
    // Computes the best unifier between the current unifier and the new variable.        
    // Updates all unifiers which point to a (or to t if t is a TypeVar) to use the new type. 
    TypeResolver.prototype._updateUnifier = function (a, t, depth) {
        var u = this._getOrCreateUnifier(a);
        if (t instanceof TypeVariable)
            t = this._getOrCreateUnifier(t).unifier;
        u.unifier = this._chooseBestUnifier(u.unifier, t, depth);
        this._updateVariableUnifiers(a.name, u);
        if (t instanceof TypeVariable)
            this._updateVariableUnifiers(t.name, u);
        return u.unifier;
    };
    // Gets or creates a type unifiers for a type variables
    TypeResolver.prototype._getOrCreateUnifier = function (t) {
        if (!(t.name in this.unifiers))
            return this.unifiers[t.name] = new TypeUnifier(t.name, t);
        else
            return this.unifiers[t.name];
    };
    return TypeResolver;
}());
exports.TypeResolver = TypeResolver;
//======================================================================================
// Helper functions 
// Creates a type list as nested pairs ("cons" cells ala lisp). 
// The last type is assumed to be a row variable. 
function rowPolymorphicList(types) {
    if (types.length == 0)
        throw new Error("Expected a type list with at least one type variable");
    else if (types.length == 1) {
        if (types[0] instanceof TypeVariable)
            return types[0];
        else
            throw new Error("Expected a row variable in the final position");
    }
    else
        return polyType([types[0], rowPolymorphicList(types.slice(1))]);
}
exports.rowPolymorphicList = rowPolymorphicList;
// Creates a row-polymorphic function type: adding the implicit row variable 
function rowPolymorphicFunction(inputs, outputs) {
    var row = typeVariable('_');
    inputs.push(row);
    outputs.push(row);
    return functionType(rowPolymorphicList(inputs), rowPolymorphicList(outputs));
}
exports.rowPolymorphicFunction = rowPolymorphicFunction;
// Creates a type array from an array of types
function polyType(types) {
    return new PolyType(types, true);
}
exports.polyType = polyType;
// Creates a type constant 
function typeConstant(name) {
    return new TypeConstant(name);
}
exports.typeConstant = typeConstant;
// Creates a type variable
function typeVariable(name) {
    return new TypeVariable(name);
}
exports.typeVariable = typeVariable;
// Creates a function type, as a special kind of a PolyType 
function functionType(input, output) {
    return polyType([input, typeConstant('->'), output]);
}
exports.functionType = functionType;
// Creates a sum type. If any of the types in the array are a sumType, it is flattened.  
function sumType(types) {
    var r = [];
    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
        var t = types_1[_i];
        if (isSumType(t))
            r.push.apply(r, sumTypeOptions(t));
        else
            r.push(t);
    }
    return polyType([typeConstant('|'), polyType(r)]);
}
exports.sumType = sumType;
// Creates an array type, as a special kind of PolyType
function arrayType(element) {
    return polyType([element, typeConstant('[]')]);
}
exports.arrayType = arrayType;
// Creates a list type, as a special kind of PolyType
function listType(element) {
    return polyType([element, typeConstant('*')]);
}
exports.listType = listType;
// Creates a recursive type, as a special kind of PolyType. The numberical value 
// refers to the depth of the recursion: how many PolyTypes you have to go up 
// to find the recurison base case. 
function recursiveType(depth) {
    return polyType([typeConstant('rec'), typeConstant(depth.toString())]);
}
exports.recursiveType = recursiveType;
// Returns true if and only if the type is a type constant with the specified name
function isTypeConstant(t, name) {
    return t instanceof TypeConstant && t.name === name;
}
exports.isTypeConstant = isTypeConstant;
// Returns true if and only if the type is a type constant with the specified name
function isTypeVariable(t, name) {
    return t instanceof TypeVariable && t.name === name;
}
exports.isTypeVariable = isTypeVariable;
// Returns true if any of the types are the type variable
function variableOccurs(name, type) {
    return descendantTypes(type).some(function (t) { return isTypeVariable(t, name); });
}
exports.variableOccurs = variableOccurs;
// Returns true if and only if the type is a type constant with the specified name
function isPolyType(t, name) {
    return t instanceof PolyType && t.types.length == 2 && isTypeConstant(t.types[1], '[]');
}
exports.isPolyType = isPolyType;
// Returns true iff the type is a TypeArary representing a function type
function isFunctionType(t) {
    return t instanceof PolyType && t.types.length == 3 && isTypeConstant(t.types[1], '->');
}
exports.isFunctionType = isFunctionType;
// Returns true iff the type is a TypeArary representing a sum type
function isSumType(t) {
    return t instanceof PolyType && t.types.length == 2 && isTypeConstant(t.types[0], '|');
}
exports.isSumType = isSumType;
function sumTypeOptions(t) {
    if (!isSumType(t))
        throw new Error("Expected a sum type");
    return t.types[1].types;
}
exports.sumTypeOptions = sumTypeOptions;
// Returns the input types (argument types) of a PolyType representing a function type
function functionInput(t) {
    if (!isFunctionType(t))
        throw new Error("Expected a function type");
    return t.types[0];
}
exports.functionInput = functionInput;
// Returns the output types (return types) of a PolyType representing a function type
function functionOutput(t) {
    if (!isFunctionType(t))
        throw new Error("Expected a function type");
    return t.types[2];
}
exports.functionOutput = functionOutput;
// Returns all types contained in this type
function descendantTypes(t, r) {
    if (r === void 0) { r = []; }
    r.push(t);
    if (t instanceof PolyType)
        t.types.forEach(function (t2) { return descendantTypes(t2, r); });
    return r;
}
exports.descendantTypes = descendantTypes;
// Returns true if the type is a polytype
function isPolyType(t) {
    return t instanceof PolyType && t.typeParameterVars.length > 0;
}
exports.isPolyType = isPolyType;
// Returns true if the type is a function that generates a polytype.
function generatesPolytypes(t) {
    if (!isFunctionType(t))
        return false;
    return descendantTypes(functionOutput(t)).some(isPolyType);
}
exports.generatesPolytypes = generatesPolytypes;
// Global function for fresh variable names
function freshVariableNames(t, id) {
    return (t instanceof PolyType) ? t.freshVariableNames(id) : t;
}
exports.freshVariableNames = freshVariableNames;
// Global function for fresh parameter names
function freshParameterNames(t) {
    return (t instanceof PolyType) ? t.freshParameterNames() : t;
}
exports.freshParameterNames = freshParameterNames;
function computeParameters(t) {
    return (t instanceof PolyType) ? t.computeParameters() : t;
}
exports.computeParameters = computeParameters;
//========================================================
// Variable name functions
// Rename all type variables os that they follow T0..TN according to the order the show in the tree. 
function normalizeVarNames(t) {
    var names = {};
    var count = 0;
    for (var _i = 0, _a = descendantTypes(t); _i < _a.length; _i++) {
        var dt = _a[_i];
        if (dt instanceof TypeVariable)
            if (!(dt.name in names))
                names[dt.name] = typeVariable("t" + count++);
    }
    return t.clone(names);
}
exports.normalizeVarNames = normalizeVarNames;
// Converts a number to a letter from 'a' to 'z'.
function numberToLetters(n) {
    return String.fromCharCode(97 + n);
}
// Rename all type variables so that they are alphabetical in the order they occur in the tree
function alphabetizeVarNames(t) {
    var names = {};
    var count = 0;
    for (var _i = 0, _a = descendantTypes(t); _i < _a.length; _i++) {
        var dt = _a[_i];
        if (dt instanceof TypeVariable)
            if (!(dt.name in names))
                names[dt.name] = typeVariable(numberToLetters(count++));
    }
    return t.clone(names);
}
exports.alphabetizeVarNames = alphabetizeVarNames;
// Compares whether two types are the same after normalizing the type variables. 
function areTypesSame(t1, t2) {
    var s1 = normalizeVarNames(t1).toString();
    var s2 = normalizeVarNames(t2).toString();
    return s1 === s2;
}
exports.areTypesSame = areTypesSame;
function variableOccursOnInput(varName, type) {
    for (var _i = 0, _a = descendantTypes(type); _i < _a.length; _i++) {
        var t = _a[_i];
        if (isFunctionType(t)) {
            var input = functionInput(type);
            if (variableOccurs(varName, input)) {
                return true;
            }
        }
    }
}
exports.variableOccursOnInput = variableOccursOnInput;
// Returns true if and only if the type is valid 
function isValid(type) {
    for (var _i = 0, _a = descendantTypes(type); _i < _a.length; _i++) {
        var t = _a[_i];
        if (isTypeConstant(t, "rec")) {
            return false;
        }
        else if (t instanceof PolyType) {
            if (isFunctionType(t))
                for (var _b = 0, _c = t.typeParameterNames; _b < _c.length; _b++) {
                    var p = _c[_b];
                    if (!variableOccursOnInput(p, t))
                        return false;
                }
        }
    }
    return true;
}
exports.isValid = isValid;
//============================================================
// Top level type operations  
// - Composition
// - Quotation
// Returns the function type that results by composing two function types
function composeFunctions(f, g) {
    if (!isFunctionType(f))
        throw new Error("Expected a function type for f");
    if (!isFunctionType(g))
        throw new Error("Expected a function type for g");
    f = f.freshVariableNames(0);
    g = g.freshVariableNames(1);
    if (trace) {
        console.log("f: " + f);
        console.log("g: " + g);
    }
    var inF = functionInput(f);
    var outF = functionOutput(f);
    var inG = functionInput(g);
    var outG = functionOutput(g);
    var e = new TypeResolver();
    e.unifyTypes(outF, inG);
    var input = e.getUnifiedType(inF, [], {});
    var output = e.getUnifiedType(outG, [], {});
    var r = functionType(input, output);
    if (trace) {
        console.log(e.state);
        console.log("Intermediate result: " + r);
    }
    // Recompute parameters.
    r.computeParameters();
    if (trace) {
        console.log("Final result: " + r);
    }
    r = normalizeVarNames(r);
    return r;
}
exports.composeFunctions = composeFunctions;
// Composes a chain of functions
function composeFunctionChain(fxns) {
    if (fxns.length == 0)
        return idFunction();
    var t = fxns[0];
    for (var i = 1; i < fxns.length; ++i)
        t = composeFunctions(t, fxns[i]);
    return t;
}
exports.composeFunctionChain = composeFunctionChain;
// Composes a chain of functions in reverse. Should give the same result 
function composeFunctionChainReverse(fxns) {
    if (fxns.length == 0)
        return idFunction();
    var t = fxns[fxns.length - 1];
    for (var i = fxns.length - 2; i >= 0; --i)
        t = composeFunctions(fxns[i], t);
    return t;
}
exports.composeFunctionChainReverse = composeFunctionChainReverse;
//================================================================
// Pretty type formatting. 
function flattenFunctionIO(t) {
    if (t instanceof PolyType) {
        return [t.types[0]].concat(flattenFunctionIO(t.types[1]));
    }
    else {
        return [t];
    }
}
function functionInputToString(t) {
    return flattenFunctionIO(functionInput(t)).map(typeToString).join(' ');
}
function functionOutputToString(t) {
    return flattenFunctionIO(functionOutput(t)).map(typeToString).join(' ');
}
function typeToString(t) {
    if (isFunctionType(t)) {
        return "(" + functionInputToString(t) + " -> " + functionOutputToString(t) + ")";
    }
    else if (t instanceof TypeVariable) {
        return t.name;
    }
    else if (t instanceof TypeConstant) {
        return t.name;
    }
    else if (t instanceof PolyType) {
        return "[" + t.types.map(typeToString).join(' ') + "]";
    }
}
exports.typeToString = typeToString;
//================================================
// Helper functions
/** Given a variable name remapping function creates new types.  */
function clone(t, remapper) {
    if (t instanceof TypeVariable) {
        return new TypeVariable(remapper(t.name));
    }
    else if (t instanceof TypeConstant) {
        return t;
    }
    else if (t instanceof PolyType) {
        var schema = {};
        for (var _i = 0, _a = keys(t.schema); _i < _a.length; _i++) {
            var k = _a[_i];
            schema[remapper(k)] = clone(t.schema[k], remapper);
        }
        var types = t.types.map(function (x) { return clone(x, remapper); });
    }
}
exports.clone = clone;
/** Returns the keys of any object.  */
function keys(obj) {
    return Object.keys(obj);
}
exports.keys = keys;
/** Returns the values of any object.  */
function values(obj) {
    return keys(obj).map(function (k) { return obj[k]; });
}
exports.values = values;
/** Given an array of values creates a lookup.  */
function toLookup(vals, nameFunc) {
    var r = {};
    for (var _i = 0, vals_1 = vals; _i < vals_1.length; _i++) {
        var v = vals_1[_i];
        r[nameFunc(v)] = v;
    }
    return r;
}
exports.toLookup = toLookup;
/** Creates a type lookup.  */
function toTypeLookup(vals) {
    return toLookup(vals, function (v) { return v.name; });
}
exports.toTypeLookup = toTypeLookup;
/** Things that should never happen. This is used primarily to catch refactoring errors,
 * and to help the reader understand the code.
*/
function assert(condition, msg) {
    if (!condition)
        throw new Error("Internal error: " + msg);
}
exports.assert = assert;
/** Creates a unique string list. */
function uniqueStrings(xs) {
    return keys(toLookup(xs, function (_) { return _; }));
}
exports.uniqueStrings = uniqueStrings;
//# sourceMappingURL=type-system.js.map