"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Myna = require("myna-parser");
var heron_parser_1 = require("./heron-parser");
var heron_to_js_1 = require("./heron-to-js");
var heron_ast_rewrite_1 = require("./heron-ast-rewrite");
var heron_compiler_1 = require("./heron-compiler");
var heron_types_1 = require("./heron-types");
var type_parser_1 = require("./type-parser");
var type_system_1 = require("./type-system");
var m = Myna.Myna;
var g = heron_parser_1.heronGrammar;
var assert = require('assert');
// Assure that two ASTs have the same shape
// For example if I generate some text, and re-parse it.
/* TOOD: use or throw away.
function compareAst(a, b) {
    if (!a && b || a && !b)
        return false;
    if (a.children.length != b.children.length)
        return false;
    if (a.children.length === 0)
        return a.allText === b.allText;
    if (a.name !== b.name)
        return false;
    for (var i=0; i < a.children.length; ++i)
        if (!compareAst(a.children[i], b.children[i]))
            return false;
    return true;
}
*/
// Tests parsing an individual rule against the input input text, and returns an object 
// representing the result of running the test 
function testParse(rule, assert, text, shouldPass) {
    if (shouldPass == undefined)
        shouldPass = true;
    var result = m.failed;
    var err = undefined;
    try {
        var node = m.parse(rule, text);
        if (node)
            result = node.end;
    }
    catch (e) {
        err = e;
    }
    var testResult = {
        name: rule.toString() + ' with input "' + text + '"',
        description: result + "/" + text.length,
        negative: !shouldPass,
        success: (result === text.length) !== !shouldPass,
        error: err,
        ruleDescr: rule.type + ": " + rule.toString(),
        rule: rule
    };
    if (!testResult.success)
        console.log(testResult);
    assert.ok(testResult.success, testResult.name + (shouldPass ? "" : " should fail"));
}
var ruleTests = [
    [g.comment, ['/* abc */', '// abc \n', '/* abc */ /* def */ '], ['abc', '', '/*']],
    [g.funCall, ['(a, b)', '(a)', '(F )', '()'], []],
    [g.expr, ['42', '3+4', '3 + 4', '3 * (2 + 4)', '3 * 2 + 4', 'a', 'a++', 'f(1,2)', 'f(3, 5)', 'f()', 'f(12)', 'hx > 0.0'], []],
    [g.expr, ['0..1', '0 .. 1', 'f(a .. b)'], ['xs[0:5]', 'xs[4:0:-1]']],
    [g.expr, ['x => 42', '(x) => 13', 'x=>3', 'x => { return 42; }', '(x, y) => x * y'], []],
    [g.expr, ['(3)', '(3 + 2)', '(c)', '(a)+(b)', 'a+(b)', 'a+b+c', 'a?b:c', 'a?b+c:d', 'a?b:c+d', 'a?(b):c', '(a)?b:c'], []],
    [g.expr, ['a?b:1(c)'], ['f > max ? max : (f < min ? min) : f']],
    [g.expr, ['op+', 'f(op+)', 'f(0, op+)'], []],
    [g.expr, ['(r1+r2*cos(v))', '(r1 + r2 * cos(v))', '( r1 + r2 * cos(v) )', '( r1 + r2 * cos(v) ) * cos(u)'], []],
    [g.expr, ['a?b:c', 'a?b:c?d:e', 'a?b:(c<d?e:f)', 'a>3?b:c', 'a > 3 ? b : c', 'f > max ? max : (f < min ? min : f)'], []],
    [g.statement, [
            'var x = 0;',
            'f();',
            'if (x) f();',
            'if (x) f(); else g();',
            'return;',
            ';',
            'var test = 1;\n /* */',
            'return p;',
            'if (hx) return p;',
            'if (hx > 0.0) return p;',
            'if(hx > 0.0) return p;',
        ],
        [
            'f()',
            'return 42',
            'g',
            ';;',
        ]]
];
function testParsingRules() {
    for (var _i = 0, ruleTests_1 = ruleTests; _i < ruleTests_1.length; _i++) {
        var ruleTest = ruleTests_1[_i];
        var rule = ruleTest[0];
        for (var _a = 0, _b = ruleTest[1]; _a < _b.length; _a++) {
            var passInput = _b[_a];
            testParse(rule, assert, passInput, true);
        }
        for (var _c = 0, _d = ruleTest[2]; _c < _d.length; _c++) {
            var failInput = _d[_c];
            testParse(rule, assert, failInput, false);
        }
    }
}
exports.testParsingRules = testParsingRules;
var fs = require('fs');
function refDetails(ref) {
    return "Ref Details\n" + heron_ast_rewrite_1.parseLocation(ref.node) + "\n    ref = " + ref.toString() + "\n    name = " + ref.name + "\n    node = " + ref.node['id'] + "    \n    expr = " + ref.node['expr'] + "\n    " + ref.defs;
}
function outputPackageStats(pkg) {
    console.log("Files: ");
    console.log(pkg.files);
    console.log("# Modules  : " + pkg.modules.length);
    console.log("# Scopes   : " + pkg.scopes.length);
    console.log("# Defs     : " + pkg.defs.length);
    console.log("# Usages   : " + pkg.refs.length);
    var multiDefs = pkg.refs.filter(function (r) { return r.defs.length > 1; });
    var zeroDefs = pkg.refs.filter(function (r) { return r.defs.length == 0; });
    console.log('# Refs with multiple defs : ' + multiDefs.length);
    console.log('# Refs with zero defs : ' + zeroDefs.length);
    for (var _i = 0, multiDefs_1 = multiDefs; _i < multiDefs_1.length; _i++) {
        var d = multiDefs_1[_i];
        console.log(refDetails(d));
    }
}
exports.outputPackageStats = outputPackageStats;
function outputFunctionTypes(pkg) {
    for (var _i = 0, _a = pkg.allFuncDefs; _i < _a.length; _i++) {
        var f = _a[_i];
        var t = heron_types_1.computeFuncType(f);
        if (f.body) {
            var finalType = type_system_1.normalizeType(t);
            console.log(f.toString() + " :: " + finalType);
        }
    }
}
function testParseType(expr) {
    var t = type_parser_1.parseType(expr);
    console.log(expr);
    console.log(" : " + t);
}
function testParseTypes() {
    var typeStrings = [
        "(Num Num)",
        "(Func 'T0 'T1 R)",
        "(Array Num)",
        "(Array (Func 'T0 Num))",
        "(Func (Array 'T) (Func 'T 'U) (Array 'U))",
        "(Func (Array 'T) (Array 'U) (Func 'T 'U 'V) (Array 'V))",
        "(Func (Array 'T) (Array 'U) (Func 'T 'U Int 'V) (Array 'V))",
    ];
    for (var _i = 0, typeStrings_1 = typeStrings; _i < typeStrings_1.length; _i++) {
        var ts = typeStrings_1[_i];
        testParseType(ts);
    }
}
exports.testParseTypes = testParseTypes;
function tests() {
    //testParsingRules();
    //testParseTypes();
    var inputFiles = ['geometry-vector3', 'geometry-mesh', 'array', 'test'];
    var pkg = heron_compiler_1.createPackage(inputFiles);
    //outputPackageStats(pkg);
    /*
    for (const sf of pkg.files) {
        const outputPath = sf.filePath.substr(0, sf.filePath.lastIndexOf('.')) + '.output.heron';
        const text = heronToText(sf.node as HeronAstNode);
        fs.writeFileSync(outputPath, text);
    }*/
    var path = require('path');
    var toJs = new heron_to_js_1.HeronToJs();
    for (var _i = 0, _a = pkg.modules; _i < _a.length; _i++) {
        var m_1 = _a[_i];
        toJs.visit(m_1);
    }
    var now = new Date();
    var library = fs.readFileSync(path.join('src', 'js-intrinsics.js'), 'utf-8');
    var text = '// Generated using Heron on ' + now.toDateString() + ' ' + now.toTimeString() + '\n';
    text += 'var heronMain = (function () {\n';
    text += library + '\n';
    text += toJs.cb.toString();
    var main = pkg.findFunction("main");
    text += '\nreturn ' + heron_to_js_1.funcDefName(main) + ';\n';
    text += '})();\n';
    //fs.writeFileSync(path.join(outputFolder, 'output.js'), text);
    fs.writeFileSync(path.join('demo', 'output.js'), text);
    //outputPackageStats(pkg);
    // find the main entry point and call into it. 
    var modName = 'heron:tests:0.1';
    var mainMod = pkg.getModule(modName);
    if (!mainMod)
        throw new Error("Could not find module: " + modName);
    //let mainFunc = findFunc(mainMod, 'main');
    //if (!mainFunc)
    //   throw new Error("Could not find entry point function " + modName + "." + mainFunc);
    // let evaluator = new Evaluator();
    // Try to figure out the value of all the called functions. 
    //evaluator.evalFunc(mainFunc);
    // Look at the usages of each parameter in each function.
    //analyzeFunctions(pkg);
    // An experiemnt for guessing Traits. 
    // I shave decided that traits need to be declared. 
    //outputTraits(pkg);
    outputFunctionTypes(pkg);
    /*
    for (const k in intrinsics)
        console.log(intrinsics[k].toString());
    */
    console.log('Done');
}
/*
testParseExpr("2 + 3");
testParseCode("2 + 3", g.additiveExpr);
testParseCode("2 + 3", g.relationalExpr);
testParseCode("2 + 3", g.equalityExpr);
testParseCode("2 + 3", g.logicalAndExpr);
testParseCode("2 + 3", g.logicalXOrExpr);
testParseCode("2 + 3", g.logicalOrExpr);
testParseCode("2 + 3", g.rangeExpr);
testParseCode("2 + 3", g.conditionalExpr);
testParseCode("2 + 3", g.assignmentExpr);
*/
//testParseFile('.\\tests\\seascape.heron');
//testParseFile('.\\tests\\stdlib.heron');
//testParseFile('.\\inputs\\geometry-vector3.heron');
//testParseFile('.\\inputs\\intrinsics.heron');
tests();
process.exit();
//# sourceMappingURL=tests.js.map