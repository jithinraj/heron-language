import { Myna } from "myna-parser/myna";
import { FuncDef, TypeDef, VarDef, FuncParamDef, createFuncParamDef, getDef, Def } from "./heron-defs";
import { validateNode, visitAst, throwError, HeronAstNode } from "./heron-ast-rewrite";
import { Ref } from "./heron-refs";

// Expressions are either: named function sets, anonymous functions, function calls, variables, or literals.
// In order to work out the type we need to work out the type of the things it depends on first. 
// This can be done by creating a graph, OR by simply computing type by pulling on the thread. 
export class Expr {
    constructor(
        public readonly node: HeronAstNode,
    )
    { node.expr = this; }

    toString(): string {
        return 'expr' + this.node['id'];        
    }
}

export class PostfixDec extends Expr {
    constructor(
        public readonly node: HeronAstNode,
        public readonly lvalue: Expr,
    )
    { super(node); }

    toString(): string {
        return '--' + this.lvalue;
    }
}

export class PostfixInc extends Expr {
    constructor(
        public readonly node: HeronAstNode,
        public readonly lvalue: Expr,
    )
    { super(node); }

    toString(): string {
        return '++' + this.lvalue;
    }
}

// An anonymous function, also known as a lambda.
export class Lambda extends Expr {
    constructor(
        public readonly node: HeronAstNode,
        public readonly params: FuncParamDef[],
        public readonly body: Expr,
    )
    { super(node); }

    toString(): string {
        return 'lambda' + this.node['id'] + '(' + this.params.join(',') + ')' + this.body;
    }
}

// The name of a variable. This could resolve to a function name, in which case there 
// will be multiple types.
export class VarName extends Expr {    
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string,
        public readonly defs: Def[],
    )
    { super(node); } 

    toString(): string {
        return this.name + '[' + this.defs.join(',') + ']';
    }
}

// Let bindings: variable declarations used in the contet of another expression.
export class VarExpr extends Expr {    
    constructor(
        public readonly node: HeronAstNode,
        public readonly vars: VarDef[],
        public readonly expr: Expr,
    )
    { super(node); } 

    toString(): string {
        return 'var ' + this.vars.join(', ') + ' in ' + this.expr;
    }
}

// The different kinds of literals like boolean, number, ints, arrays, objects, and more. 
export class Literal<T> extends Expr {    
    constructor(
        public readonly node: HeronAstNode,
        public readonly value: T,
    )
    { super(node); }

    toString(): string {
        return this.value.toString();
    }
}

export class BoolLiteral extends Literal<boolean> {    
}

export class NumLiteral extends Literal<number> {    
}

export class StrLiteral extends Literal<string> {
}

// An array literal expression
export class ArrayLiteral extends Expr {
    constructor(
        public readonly node: HeronAstNode,
        public readonly vals: Expr[],
    )
    { super(node); }    

    toString(): string {
        return '[' + this.vals.join(',') + ']';
    }
}

export class ObjectField extends Expr {
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string,
        public readonly expr: Expr)
    { super(node); }

    toString(): string {
        return this.name + '=' + this.expr;
    }
}

// An object literal expression
export class ObjectLiteral extends Expr {
    constructor(
        public readonly node: HeronAstNode,
        public readonly fields: ObjectField[]
    )
    { super(node); }
    
    toString(): string {
        return '{ ' + this.fields.join(';') + ' }';
    }
}

// Function call expressions
export class FunCall extends Expr {
    constructor(
        public readonly node: HeronAstNode,
        public readonly func: Expr,
        public readonly args: Expr[],
        )
    { super(node); }

    toString(): string {
        return this.func + '(' + this.args.join(',') + ')';
    }    
}

// Conditional (ternary operator) expressions. 
export class ConditionalExpr extends Expr {
    constructor(
        public readonly node: HeronAstNode,
        public readonly cond: Expr,
        public readonly onTrue: Expr,
        public readonly onFalse: Expr,
        )
    { super(node); }

    toString(): string {
        return this.cond + ' ? ' + this.onTrue + ' : ' + this.onFalse;
    }
}

// Assignment of a value to a variable 
export class VarAssignmentExpr extends Expr {
    constructor(
        public readonly node: HeronAstNode,
        public readonly name: string,
        public readonly value: Expr) 
    { super(node); }

    toString(): string {
        return this.name + ' = ' + this.value;
    }
}

//==========================================================================================
// Expressions

export function addExpr<T extends Expr>(node: HeronAstNode, expr: T): T {
    node['expr'] = expr;
    return expr;
}

export function computeExprs(ast: HeronAstNode) {
    visitAst(ast, createExpr);
}

export function createExpr(node: HeronAstNode): Expr {
    if (!node)
        return null;
    if (node.expr)
        return node.expr;
    switch (node.name) {
        case "postfixExpr":
            switch (node.children[1].name)
            {
                case "fieldSelect":
                    throwError(node, "Field selects should be transformed into function calls");
                case "arrayIndex":
                    throwError(node, "Array indexing should be transformed into function calls");
                case "postIncOp":
                    return new PostfixInc(node, createExpr(node.children[0]));
                case "postDecOp":
                    return new PostfixDec(node, createExpr(node.children[0]));
                case "funCall":
                    // TODO: find the correct function based on the number and types of the arguments
                    return createFunCall(node);
                default:
                    throwError(node, "Unrecognized postfix expression: " + node.name);
            }
        case "objectExpr":
            return createObjectLiteral(node);
        case "lambdaExpr":
            return createLambdaExpr(node);
        case "varExpr":
            return createVarExpr(node)
        case "arrayExpr":
            return createArrayExpr(node);
        case "bool":
            return createBoolExpr(node);
        case "number":
            return createNumExpr(node);
        case "string":
            return createStrExpr(node);
        case "prefixExpr":
            throwError(node, "Prefix expr should be converted into function calls");
        case "conditionalExpr":
            return createConditionalExpr(node);
        case "varName":
            return createVarNameExpr(node);
        case "parenExpr":
            return addExpr(node, createExpr(node.children[0]));            
        case "assignmentExpr":
            return createVarAssignmentExpr(node);
        case "multiplicativeExpr":
        case "additiveExpr":
        case "relationalExpr":
        case "equalityExpr":
        case "rangeExpr":            
        case "literal":
        case "leafExpr":
        case "recExpr":
        case "expr":
            throwError(node, "Unsupported expression found: pre-processing was not performed: " + node.name);
    }
}

export function createFunCall(node: HeronAstNode): FunCall
{ 
    validateNode(node, 'postfixExpr');
    if (node.children.length != 2)
        throwError(node, 'Expected two children of a postfix expression');
    let func = createExpr(node.children[0]);
    if (!func)
        throwError(node, 'Missing function');
    let funCall = validateNode(node.children[1], 'funCall');
    return new FunCall(node, func, funCall.children.map(createExpr));
}

export function createObjectField(node: HeronAstNode): ObjectField {
    validateNode(node, "objectField");
    let name = node.child[0].allText;
    let expr = createExpr(node.child[1]);
    return new ObjectField(node, name, expr);
}

export function createObjectLiteral(node: HeronAstNode): ObjectLiteral {
    return new ObjectLiteral(validateNode(node, 'objectExpr'), node.children.map(createObjectField));
}

export function createArrayExpr(node: HeronAstNode): ArrayLiteral {
    return new ArrayLiteral(validateNode(node, 'arrayExpr'), node.children.map(createExpr));
}

export function createBoolExpr(node: HeronAstNode): BoolLiteral {
    let value = node.allText === 'true' ? true : false;
    return new BoolLiteral(validateNode(node, 'bool'), value);
}

export function createConditionalExpr(node: HeronAstNode): ConditionalExpr {
    validateNode(node, 'conditionalExpr')        
    if (node.children.length !== 2)
        throwError(node, 'Conditional expressions should have two children');
    let rightNode = validateNode(node.children[1], 'conditionalExprRight');
    if (rightNode.children.length !== 2)
        throwError(node, 'Right side of conditional expression should have two children');
    return new ConditionalExpr(node, 
        createExpr(node.children[0]), 
        createExpr(rightNode.children[0]), 
        createExpr(rightNode.children[1]));
}

// TODO: the fact that I am calling a lambda body an expression is a problem.
export function createLambdaExpr(node: HeronAstNode): Lambda {    
    return new Lambda(validateNode(node, 'lambdaExpr'), 
        node.children[0].children.map(c => getDef<FuncParamDef>(c, 'FuncParamDef')), 
        createExpr(node.children[1]));
}

export function createNumExpr(node: HeronAstNode): NumLiteral {
    let value = parseFloat(node.allText);
    return new NumLiteral(validateNode(node, 'number'), value);
}

export function createStrExpr(node: HeronAstNode): StrLiteral {
    return new StrLiteral(validateNode(node, 'string'), node.allText);
}

export function createVarNameExpr(node: HeronAstNode): VarName {
    let ref:Ref = node['ref'];
    if (!ref) throwError(node, "expected a reference");
    return new VarName(validateNode(node, 'varName'), node.allText, ref.defs);
}

export function createVarExpr(node: HeronAstNode): VarExpr {
    validateNode(node, 'varExpr');
    let defs = node.children[0].children.map(c => c.def as VarDef);
    let body = createExpr(node.children[1]);
    return new VarExpr(node, defs, body);
}

export function createVarAssignmentExpr(node: HeronAstNode): VarAssignmentExpr {
    validateNode(node, 'varExpr');
    let lvalue = validateNode(node.children[0], 'varName').allText;
    let op = validateNode(node.children[1].children[0], 'assignmentOp').allText;
    if (node.children[1].children.length !== 2) throwError(node, 'Expected two children on right side of assignment expression');
    if (op !== '=') throwError(node, 'All assignment operators are supposed to be rewritten: found ' + op);
    let rvalue = node.children[1].children[1];
    return new VarAssignmentExpr(node, lvalue, createExpr(rvalue));
}