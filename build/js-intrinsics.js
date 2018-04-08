"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.library = "\n\nfunction ImmutableArray(count, at) {\n    this.count = count;\n    this.at = at;\n}\n\nfunction toImmutable(xs) {\n    return new ImmutableArray(xs);\n}\n  \nfunction toMutable(xs) {\n    const count = xs.count;\n    const array = []; \n    for (let i=0; i < count; ++i)\n      array.push(xs.at(i));\n    return arrayFromJavaScript(array);\n}\n\nfunction arrayFromJavaScript(xs) {\n  return {\n    array: xs,\n    count: xs.length,\n    at: (i) => xs[i],\n  }\n}\n";
exports.intrinsics = {
    int: 'Math.round',
    float: function (x) { return x; },
    float2: function (x, y) { return ({ x: x, y: y }); },
    float3: function (x, y, z) { return ({ x: x, y: y, z: z }); },
    float4: function (x, y, z, w) { return ({ x: x, y: y, z: z, w: w }); },
    x: function (v) { return v.x; },
    y: function (v) { return v.y; },
    z: function (v) { return v.z; },
    w: function (v) { return v.w; },
    abs: 'Math.abs',
    acos: 'Math.acos',
    asin: 'Math.asin',
    atan: 'Math.atan',
    atan2: 'Math.atan2',
    ceil: 'Math.ceil',
    clamp: function (x, min, max) { return x < min ? min : x > max ? max : x; },
    cos: 'Math.cos',
    exp: 'Math.exp',
    floor: 'Math.floor',
    log: 'Math.log',
    pow: 'Math.pow',
    round: 'Math.round',
    sin: 'Math.sin',
    sign: function (x) { return x > 0 ? 1 : x < 0 ? -1 : 0; },
    sqrt: 'Math.sqrt',
    tan: 'Math.tan',
    op_add: function (x, y) { return x + y; },
    op_sub: function (x, y) { return x - y; },
    op_mul: function (x, y) { return x * y; },
    op_div: function (x, y) { return x / y; },
    op_mod: function (x, y) { return x % y; },
    op_gt: function (x, y) { return x > y; },
    op_gt_eq: function (x, y) { return x >= y; },
    op_lt: function (x, y) { return x < y; },
    op_lt_eq: function (x, y) { return x <= y; },
    op_not_eq: function (x, y) { return x !== y; },
    op_eq_eq: function (x, y) { return x === y; },
    op_amp_amp: function (x, y) { return x && y; },
    op_bar_bar: function (x, y) { return x || y; },
    op_hat_hat: function (x, y) { return !!(x ^ y); },
    op_not: function (x) { return !x; },
    op_negate: function (x) { return -x; },
    gen: 'toImmutable',
    count: function (xs) { return xs.count; },
    at: function (xs, i) { return xs.at(i); },
    mutable: 'toMutable',
    push: function (xs, x) { return (xs.array.push(x), xs); },
    set: function (xs, i, x) { return (xs.array[i] = x, xs); },
    array: function (xs) { return xs; },
    print: 'console.log',
    assert: function (condition) { if (!condition)
        throw new Error("assertion failed"); },
    mesh: function (vertexBuffer, indexBuffer) { return ({ vertexBuffer: vertexBuffer, indexBuffer: indexBuffer }); },
    vertexBuffer: function (mesh) { return mesh.vertexBuffer; },
    indexBuffer: function (mesh) { return mesh.indexBuffer; },
};
//# sourceMappingURL=js-intrinsics.js.map