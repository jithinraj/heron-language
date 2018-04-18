// Generated using Heron on Tue Apr 17 2018 23:57:16 GMT-0400 (Eastern Daylight Time)
var heronMain = (function () {
function arrayFromJavaScript(xs) {
  return {
      count: xs.length,
      array: xs,
      at: (i) => xs[i]
  }
}

function toMutable(xs) {
  const count = xs.count;
  const array = []; 
  for (let i=0; i < count; ++i)
      array.push(xs.at(i));
  return arrayFromJavaScript(array);
}

function int(x) { return Math.round(x); }
function float(x) { return x; }
function float2(x, y) { return ({ x: x, y: y }); }
function float3(x, y, z) { return ({ x: x, y: y, z: z }); }
function float4(x, y, z, w) { return ({ x: x, y: y, z: z, w: w }); }
function x(v) { return v.x; }
function y(v) { return v.y; }
function z(v) { return v.z; }
function w(v) { return v.w; }
function abs(x) { return Math.abs(x); }
function acos(x) { return Math.acos(x); }
function asin(x) { return Math.asin(x); }
function atan(x) { return Math.atan(x); }
function atan2(y, x) { return Math.atan2(y, x); }
function ceil(x) { return Math.ceil(x); }
function cos(x) { return Math.cos(x); }
function exp(x) { return Math.exp(x); }
function floor(x) { return Math.floor(x); }
function log(x) { return Math.log(x); }
function pow(x, y) { return Math.pow(x, y); }
function round(x) { return Math.round(x); }
function sin(x) { return Math.sin(x); }
function sqrt(x) { return Math.sqrt(x); }
function tan(x) { return Math.tan(x); }
function clamp(x, min, max) { return x < min ? min : x > max ? max : x; };
function sign(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
function op_add(x, y) { return x + y; };
function op_sub(x, y) { return x - y; };
function op_mul(x, y) { return x * y; };
function op_div(x, y) { return x / y; };
function op_mod(x, y) { return x % y; };
function op_gt(x, y) { return x > y; };
function op_gt_eq(x, y) { return x >= y; };
function op_lt(x, y) { return x < y; };
function op_lt_eq(x, y) { return x <= y; };
function op_not_eq(x, y) { return x !== y; };
function op_eq_eq(x, y) { return x === y; };
function op_amp_amp(x, y) { return x && y; };
function op_bar_bar(x, y) { return x || y; };
function op_hat_hat(x, y) { return !!(x ^ y); };
function op_not(x) { return !x; };
function op_negate(x) { return -x; };
function count(xs) { return xs.count; };
function at(xs, i) { return xs.at(i); };
function array(count, at) { return { count, at }; }
function mutable(x) { return toMutable(x); }
function immutable(xs) { return array(xs.array.length, xs.at); }
function push(xs, x) { return (xs.array.push(x), xs); };
function set(xs, i, x) { return (xs.array[i] = x, xs); };
function print(x) { return console.log(x); }
function assert(condition) { if (!condition) throw new Error("assertion failed"); };
function mesh(vertexBuffer, indexBuffer) { return ({ vertexBuffer: vertexBuffer, indexBuffer: indexBuffer }); };
function vertexBuffer(mesh) { return mesh.vertexBuffer; };
function indexBuffer(mesh) { return mesh.indexBuffer; };

// Module heron:intrinsics:0.1
// file input\intrinsics.heron
const pi = 3.141592653589793;
const e = 2.718281828459045;
// (Func Int Float)
const float_41 = float;
// (Func Float Float Float2)
const float2_62 = float2;
// (Func Float2 Float)
const x_77 = x;
// (Func Float2 Float)
const y_92 = y;
// (Func Float Float Float Float3)
const float3_119 = float3;
// (Func Float3 Float)
const z_134 = z;
// (Func Float Float Float Float Float4)
const float4_167 = float4;
// (Func Float4 Float)
const w_182 = w;
// (Func Float Float)
const abs_197 = abs;
// (Func Float Float)
const acos_212 = acos;
// (Func Float Float)
const asin_227 = asin;
// (Func Float Float)
const atan_242 = atan;
// (Func Float Float Float)
const atan2_263 = atan2;
// (Func Float Float)
const ceil_278 = ceil;
// (Func Float Float Float Float)
const clamp_305 = clamp;
// (Func Float Float)
const cos_320 = cos;
// (Func Float Float)
const exp_335 = exp;
// (Func Float Float)
const floor_350 = floor;
// (Func Float Float)
const log_365 = log;
// (Func Float Float Float)
const pow_386 = pow;
// (Func Float Float)
const round_401 = round;
// (Func Float Float)
const sin_416 = sin;
// (Func Float Float)
const sign_431 = sign;
// (Func Float Float)
const sqrt_446 = sqrt;
// (Func Float Float)
const tan_461 = tan;
// (Func T0 T0 T0)
const op_add_485 = op_add;
// (Func T0 T0 T0)
const op_sub_509 = op_sub;
// (Func T0 T0 T0)
const op_mul_533 = op_mul;
// (Func T0 T0 T0)
const op_div_557 = op_div;
// (Func T0 T0 T0)
const op_mod_581 = op_mod;
// (Func T0 T0 Bool)
const op_gt_605 = op_gt;
// (Func T0 T0 Bool)
const op_gt_eq_629 = op_gt_eq;
// (Func T0 T0 Bool)
const op_lt_653 = op_lt;
// (Func T0 T0 Bool)
const op_lt_eq_677 = op_lt_eq;
// (Func Int Int Int)
const op_add_699 = op_add;
// (Func Int Int Int)
const op_sub_721 = op_sub;
// (Func Int Int Int)
const op_mul_743 = op_mul;
// (Func Int Int Int)
const op_div_765 = op_div;
// (Func Int Int Int)
const op_mod_787 = op_mod;
// (Func Float Float Float)
const op_add_809 = op_add;
// (Func Float Float Float)
const op_sub_831 = op_sub;
// (Func Float Float Float)
const op_mul_853 = op_mul;
// (Func Float Float Float)
const op_div_875 = op_div;
// (Func Float Float Float)
const op_mod_897 = op_mod;
// (Func Float2 Float2 Float2)
function op_add_949(a, b)
{
  return float2_62(op_add_485(x_77(a),x_77(b)),op_add_485(y_92(a),y_92(b)));
}
// (Func Float2 Float2 Float2)
function op_sub_1001(a, b)
{
  return float2_62(op_sub_509(x_77(a),x_77(b)),op_sub_509(y_92(a),y_92(b)));
}
// (Func Float2 Float2 Float2)
function op_mul_1053(a, b)
{
  return float2_62(op_mul_533(x_77(a),x_77(b)),op_mul_533(y_92(a),y_92(b)));
}
// (Func Float2 Float2 Float2)
function op_div_1105(a, b)
{
  return float2_62(op_div_557(x_77(a),x_77(b)),op_div_557(y_92(a),y_92(b)));
}
// (Func Float2 Float2 Float2)
function op_mod_1157(a, b)
{
  return float2_62(op_mod_581(x_77(a),x_77(b)),op_mod_581(y_92(a),y_92(b)));
}
// (Func Float3 Float3 Float3)
function op_add_1222(a, b)
{
  return float3_119(op_add_485(x_77(a),x_77(b)),op_add_485(y_92(a),y_92(b)),op_add_485(z_134(a),z_134(b)));
}
// (Func Float3 Float3 Float3)
function op_sub_1287(a, b)
{
  return float3_119(op_sub_509(x_77(a),x_77(b)),op_sub_509(y_92(a),y_92(b)),op_sub_509(z_134(a),z_134(b)));
}
// (Func Float3 Float3 Float3)
function op_mul_1352(a, b)
{
  return float3_119(op_mul_533(x_77(a),x_77(b)),op_mul_533(y_92(a),y_92(b)),op_mul_533(z_134(a),z_134(b)));
}
// (Func Float3 Float3 Float3)
function op_div_1417(a, b)
{
  return float3_119(op_div_557(x_77(a),x_77(b)),op_div_557(y_92(a),y_92(b)),op_div_557(z_134(a),z_134(b)));
}
// (Func Float3 Float3 Float3)
function op_mod_1482(a, b)
{
  return float3_119(op_mod_581(x_77(a),x_77(b)),op_mod_581(y_92(a),y_92(b)),op_mod_581(z_134(a),z_134(b)));
}
// (Func T0 T0 Bool)
const op_not_eq_1506 = op_not_eq;
// (Func T0 T0 Bool)
const op_eq_eq_1530 = op_eq_eq;
// (Func Bool Bool Bool)
const op_amp_amp_1552 = op_amp_amp;
// (Func Bool Bool Bool)
const op_bar_bar_1574 = op_bar_bar;
// (Func Bool Bool Bool)
const op_hat_hat_1596 = op_hat_hat;
// (Func Bool Bool)
const op_not_1611 = op_not;
// (Func Float Float)
const op_negate_1626 = op_negate;
// (Func Int (Func Int T0) (Array T0))
const array_1658 = array;
// (Func (Array T0) Int)
const count_1678 = count;
// (Func (Array T0) Int T0)
const at_1704 = at;
// (Func (Array T0) (ArrayBuilder T0))
const mutable_1727 = mutable;
// (Func (ArrayBuilder T0) T0 (ArrayBuilder T0))
const push_1756 = push;
// (Func (ArrayBuilder T0) Int T0 (ArrayBuilder T0))
const set_1791 = set;
// (Func (ArrayBuilder T0) (Array T0))
const immutable_1814 = immutable;
// (Func Float2 (Array Float))
function array_1837(v)
{
  return arrayFromJavaScript([x_77(v),y_92(v)]);
}
// (Func Float3 (Array Float))
function array_1865(v)
{
  return arrayFromJavaScript([x_77(v),y_92(v),z_134(v)]);
}
// (Func Float4 (Array Float))
function array_1898(v)
{
  return arrayFromJavaScript([x_77(v),y_92(v),z_134(v),w_182(v)]);
}
// (Func (Array Float) Float2)
function float2_1923(xs)
{
  return float2_62(op_obr_cbr_2158(xs,0),op_obr_cbr_2158(xs,1));
}
// (Func (Array Float) Float3)
function float3_1954(xs)
{
  return float3_119(op_obr_cbr_2158(xs,0),op_obr_cbr_2158(xs,1),op_obr_cbr_2158(xs,2));
}
// (Func (Array Float) Float4)
function float4_1991(xs)
{
  return float4_167(op_obr_cbr_2158(xs,0),op_obr_cbr_2158(xs,1),op_obr_cbr_2158(xs,2),op_obr_cbr_2158(xs,3));
}
// (Func (ArrayBuilder T0) (Array T0) (ArrayBuilder T0))
function pushMany_2044(xs, ys)
{
  for (let i0=0; i0 < ys.count; ++i0)
  {
    const y = ys.at(i0);
    {
      xs = push_1756(xs,y);
    }
  }
  return xs;
}
// (Func (Array T0) (Array T0))
function reify_2075(xs)
{
  return immutable_1814(mutable_1727(xs));
}
// (Func Int Int (Array Int))
function op_dot_dot_2123(from, upto)
{
  return array_1658(op_sub_509(upto,from),(i) => op_add_485(i,from));
}
// (Func (Array T0) Int T0)
function op_obr_cbr_2158(xs, i)
{
  return at_1704(xs,i);
}
// (Func T0 T1)
const print_2179 = print;
// (Func Bool T0)
const assert_2191 = assert;
// (Func (Array Float) (Array Int) Mesh)
const mesh_2218 = mesh;
// (Func Mesh (Array Float))
const vertexBuffer_2236 = vertexBuffer;
// (Func Mesh (Array Int))
const indexBuffer_2254 = indexBuffer;
// Module heron:geometry.vector:0.1
// file input\geometry-vector3.heron
const origin = vector_98(0,0,0);
const ones = vector_98(1,1,1);
const xaxis = vector_98(1,0,0);
const yaxis = vector_98(0,1,0);
const zaxis = vector_98(0,0,1);
// (Func Float Float Float Float3)
function vector_98(x, y, z)
{
  return float3_119(x,y,z);
}
// (Func Float Float3)
function vector_120(x)
{
  return vector_98(x,x,x);
}
// (Func Float3 Float3)
function vector_148(v)
{
  return vector_98(x_77(v),y_92(v),z_134(v));
}
// (Func (Array Float) Float3)
function vector_179(xs)
{
  return vector_98(op_obr_cbr_2158(xs,0),op_obr_cbr_2158(xs,1),op_obr_cbr_2158(xs,2));
}
// (Func Float3 (Array Float))
function array_204(v)
{
  return arrayFromJavaScript([x_77(v),y_92(v),z_134(v)]);
}
// (Func Float3 Float)
function sum_234(v)
{
  return op_add_485(op_add_485(x_77(v),y_92(v)),z_134(v));
}
// (Func Float3 Float3 Float)
function dot_257(a, b)
{
  return sum_234(op_mul_533(a,b));
}
// (Func Float3 Float)
function length_275(v)
{
  return sqrt_446(length2_291(v));
}
// (Func Float3 Float)
function length2_291(v)
{
  return dot_257(v,v);
}
// (Func Float3 Float3 Float)
function distance_314(a, b)
{
  return length_275(op_sub_509(a,b));
}
// (Func Float3 Float3 Float)
function distance2_337(a, b)
{
  return length2_291(op_sub_509(a,b));
}
// (Func Float3 Float)
function normal_356(v)
{
  return op_div_557(v,length_275(v));
}
// (Func Float3 Float3 Float3)
function cross_459(a, b)
{
  return vector_98(op_sub_509(op_mul_533(y_92(a),z_134(b)),op_mul_533(z_134(a),y_92(b))),op_sub_509(op_mul_533(z_134(a),x_77(b)),op_mul_533(x_77(a),z_134(b))),op_sub_509(op_mul_533(x_77(a),y_92(b)),op_mul_533(y_92(a),x_77(b))));
}
// (Func Float3 Float3 Float)
function reflect_494(v, n)
{
  return op_sub_509(v,op_mul_533(op_mul_533(n,dot_257(v,n)),2));
}
// (Func Float Float Float Float)
function lerp_531(a, b, x)
{
  return op_add_485(op_mul_533(a,op_sub_509(1,x)),op_mul_533(b,x));
}
// (Func Float3 Float3)
function negate_568(v)
{
  return vector_98(op_negate_1626(x_77(v)),op_negate_1626(y_92(v)),op_negate_1626(z_134(v)));
}
// Module heron:std.array:0.1
// file input\array.heron
// (Func T0 (Array T0))
function unit_16(x)
{
  return arrayFromJavaScript([x]);
}
// (Func (Array T0) (Func T0 T1) (Array T1))
function map_53(xs, f)
{
  return array_1658(count_1678(xs),(i) => f(op_obr_cbr_2158(xs,i)));
}
// (Func (Array T0) (Func T0 Int T1) (Array T1))
function mapWithIndex_92(xs, f)
{
  return array_1658(count_1678(xs),(i) => f(op_obr_cbr_2158(xs,i),i));
}
// (Func (Array T0) (Func Int T1) (Array T1))
function mapIndex_115(xs, f)
{
  return array_1658(count_1678(xs),f);
}
// (Func T0 T0 T0)
function min_140(x, y)
{
  return op_lt_eq_677(x,y) ? x : y;
}
// (Func T0 T0 T0)
function max_165(x, y)
{
  return op_gt_eq_629(x,y) ? x : y;
}
// (Func (Array T0) (Array T0) (Array T0))
function shorter_196(xs, ys)
{
  return op_lt_eq_677(count_1678(xs),count_1678(ys)) ? xs : ys;
}
// (Func (Array T0) (Array T0) (Array T0))
function longer_227(xs, ys)
{
  return op_gt_eq_629(count_1678(xs),count_1678(ys)) ? xs : ys;
}
// (Func (Array T0) Bool)
function empty_245(xs)
{
  return op_eq_eq_1530(count_1678(xs),0);
}
// (Func (Array T0) (Array Int) (Array T0))
function selectByIndex_274(xs, indices)
{
  return map_53(indices,(i) => at_1704(xs,i));
}
// (Func (Array T0) (Array Int))
function indices_292(xs)
{
  return op_dot_dot_2123(0,count_1678(xs));
}
// (Func (Array T0) (Array T0) (Func T0 T0 T1) (Array T1))
function zip_372(xs, ys, f)
{
  return op_lt_eq_677(count_1678(xs),count_1678(ys)) ? mapWithIndex_92(xs,(x, i) => f(x,op_obr_cbr_2158(ys,i))) : mapWithIndex_92(ys,(y, i) => f(op_obr_cbr_2158(xs,i),y));
}
// (Func (Array T0) (Func T0 Bool) Bool)
function all_408(xs, p)
{
  return reduce_1941(xs,true,(prev, x) => op_amp_amp_1552(prev,p(x)));
}
// (Func (Array T0) (Func T0 Bool) Bool)
function any_444(xs, p)
{
  return reduce_1941(xs,false,(prev, x) => op_bar_bar_1574(prev,p(x)));
}
// (Func (Array T0) (Func T0 Bool) Int)
function count_485(xs, p)
{
  return reduce_1941(xs,0,(prev, x) => p(x) ? op_add_485(prev,1) : prev);
}
// (Func (Array T0) (Array T1) Bool)
function eq_510(xs, ys)
{
  return op_eq_eq_1530(count_1678(xs),count_1678(ys));
}
// (Func (Array T0) (Func T0 Bool) (Array T0))
function filter_578(xs, p)
{
  let ys = mutable_1727(xs);
  let i = 0;
  for (let i1=0; i1 < xs.count; ++i1)
  {
    const x = xs.at(i1);
    {
      if (p(x))
      {
        ys = set_1791(ys,i++,x);
      }
      else
      { }
    }
  }
  return take_1008(immutable_1814(ys),i);
}
// (Func T0 Int (Array T0))
function repeat_607(x, n)
{
  return map_53(op_dot_dot_2123(0,n),(i) => x);
}
// (Func (Array T0) (Func T0 T0 T0) (Array T0))
function prefixScan_703(xs, op)
{
  if (empty_245(xs))
  {
    return xs;
  }
  else
  { }
  let ys = mutable_1727(repeat_607(op_obr_cbr_2158(xs,0),count_1678(xs)));
  for (let i2=0; i2 < op_dot_dot_2123(1,count_1678(ys)).count; ++i2)
  {
    const i = op_dot_dot_2123(1,count_1678(ys)).at(i2);
    {
      ys = set_1791(ys,i,op(op_obr_cbr_2158(xs,i),op_obr_cbr_2158(ys,op_sub_509(i,1))));
    }
  }
  return immutable_1814(ys);
}
// (Func (Array T0) (Array T0))
function adjacentDifferences_761(xs)
{
  return map_53(indices_292(xs),(i) => op_gt_605(i,0) ? op_sub_509(op_obr_cbr_2158(xs,i),op_obr_cbr_2158(xs,op_sub_509(i,1))) : op_obr_cbr_2158(xs,i));
}
// (Func (Array T0) Int Int (Array T0))
function slice_799(xs, from, to)
{
  return map_53(op_dot_dot_2123(from,to),(i) => at_1704(xs,i));
}
// (Func (Array T0) Int (Array T0))
function stride_846(xs, n)
{
  return map_53(op_dot_dot_2123(0,op_div_557(count_1678(xs),n)),(i) => op_obr_cbr_2158(xs,op_mul_533(i,n)));
}
// (Func (Array T0) Int Int (Array T0))
function stride_901(xs, from, n)
{
  return map_53(op_dot_dot_2123(0,op_div_557(count_1678(xs),n)),(i) => op_obr_cbr_2158(xs,op_add_485(from,op_mul_533(i,n))));
}
// (Func (Array T0) Int (Array (Array T0)))
function strides_937(xs, n)
{
  return map_53(op_dot_dot_2123(0,n),(i) => stride_846(xs,i,n));
}
// (Func (Array T0) Int (Array (Array T0)))
function slices_988(xs, n)
{
  return map_53(op_dot_dot_2123(0,n),(i) => slice_799(xs,op_mul_533(i,n),op_mul_533(op_add_485(i,1),n)));
}
// (Func (Array T0) Int (Array T0))
function take_1008(xs, n)
{
  return slice_799(xs,0,n);
}
// (Func (Array T0) Int Int (Array T1))
function take_1035(xs, i, n)
{
  return take_1008(skip_1064(xs,i),n);
}
// (Func (Array T0) Int (Array T1))
function skip_1064(xs, n)
{
  return slice_799(xs,n,op_sub_509(count_1678(xs),n));
}
// (Func (Array T0) Int (Array T1))
function drop_1091(xs, n)
{
  return take_1008(xs,op_sub_509(count_1678(xs),n));
}
// (Func (Array T0) Int (Array T1))
function last_1118(xs, n)
{
  return skip_1064(xs,op_sub_509(count_1678(xs),n));
}
// (Func (Array T0) T1 (Array T0))
function reverse_1162(xs, n)
{
  return map_53(indices_292(xs),(i) => op_obr_cbr_2158(xs,op_sub_509(op_sub_509(count_1678(xs),1),i)));
}
// (Func Int (Func Int T0) (Array T0))
function gen_1186(cnt, f)
{
  return map_53(op_dot_dot_2123(0,cnt),f);
}
// (Func (Array T0) (Array T0) (Array T0))
function concat_1254(xs, ys)
{
  return gen_1186(op_add_485(count_1678(xs),count_1678(ys)),(i) => op_lt_653(i,count_1678(xs)) ? op_obr_cbr_2158(xs,i) : op_obr_cbr_2158(ys,op_sub_509(i,count_1678(xs))));
}
// (Func (Array T0) Int Int (Array T0))
function cut_1316(xs, from, n)
{
  return gen_1186(op_sub_509(count_1678(xs),n),(i) => op_lt_653(i,from) ? op_obr_cbr_2158(xs,i) : op_obr_cbr_2158(xs,op_add_485(i,n)));
}
// (Func (Array T0) Int (Array T0) (Array T0))
function splice_1353(xs, from, ys)
{
  return concat_1254(concat_1254(take_1008(xs,from),ys),skip_1064(xs,from));
}
// (Func (Array Int) Int)
function sum_1371(xs)
{
  return reduce_1941(xs,0,op_add_485);
}
// (Func (Array Int) Int)
function product_1389(xs)
{
  return reduce_1941(xs,1,op_mul_533);
}
// (Func (Array Int) Int)
function average_1411(xs)
{
  return op_div_557(sum_1371(xs),count_1678(xs));
}
// (Func (Array T0) T0)
function min_1433(xs)
{
  return reduce_1941(xs,op_obr_cbr_2158(xs,0),min_140);
}
// (Func (Array T0) T0)
function max_1455(xs)
{
  return reduce_1941(xs,op_obr_cbr_2158(xs,0),max_165);
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function swapElements_1521(xs, i, j)
{
  let tmp = op_obr_cbr_2158(xs,i);
  xs = set_1791(xs,i,op_obr_cbr_2158(xs,j));
  xs = set_1791(xs,j,tmp);
  return xs;
}
// (Func (ArrayBuilder T0) Int Int Int)
function partition_1636(a, lo, hi)
{
  let p = op_obr_cbr_2158(a,lo);
  let i = op_sub_509(lo,1);
  let j = op_add_485(hi,1);
  while (true)
  {
    do
    {
      i++;
    }
    while (op_lt_653(op_obr_cbr_2158(a,i),p))
    do
    {
      j--;
    }
    while (op_gt_605(op_obr_cbr_2158(a,j),p))
    if (op_gt_eq_629(i,j))
    {
      return j;
    }
    else
    { }
    swapElements_1521(a,i,j);
  }
}
// (Func (ArrayBuilder T0) Int Int (ArrayBuilder T0))
function qsort_1705(a, lo, hi)
{
  if (op_lt_653(lo,hi))
  {
    let p = partition_1636(a,lo,hi);
    qsort_1705(a,lo,p);
    qsort_1705(a,op_add_485(p,1),hi);
  }
  else
  { }
  return a;
}
// (Func (Array T0) (Array T0))
function sort_1735(xs)
{
  return immutable_1814(qsort_1705(mutable_1727(xs),0,op_sub_509(count_1678(xs),1)));
}
// (Func (Array Int) Int)
function median_1835(xs)
{
  let ys = sort_1735(xs);
  return op_eq_eq_1530(op_mod_581(op_sub_509(count_1678(ys),1),2),0) ? op_obr_cbr_2158(ys,op_div_557(op_sub_509(count_1678(ys),1),2)) : op_add_485(op_obr_cbr_2158(ys,op_div_557(op_sub_509(count_1678(ys),2),2)),op_div_557(op_obr_cbr_2158(ys,op_div_557(count_1678(ys),2)),2));
}
// (Func (Array T0) Int Bool)
function inRange_1866(xs, n)
{
  return op_amp_amp_1552(op_gt_eq_629(n,0),op_lt_653(n,count_1678(xs)));
}
// (Func (Array T0) T1)
function last_1889(xs)
{
  return op_obr_cbr_2158(xs,op_sub_509(count_1678(xs),1));
}
// (Func (Array T0) T0)
function first_1904(xs)
{
  return op_obr_cbr_2158(xs,0);
}
// (Func (Array T0) T1 (Func T1 T0 T1) T1)
function reduce_1941(xs, acc, f)
{
  for (let i3=0; i3 < xs.count; ++i3)
  {
    const x = xs.at(i3);
    {
      acc = f(acc,x);
    }
  }
  return acc;
}
// (Func (Array (Array T0)) (Array T1))
function flatten_1958(xs)
{
  return reduce_1941(xs,arrayFromJavaScript([]),concat_1254);
}
// (Func (Array T0) (Func T0 (Array T1)) (Array T2))
function flatMap_1980(xs, f)
{
  return flatten_1958(map_53(xs,f));
}
// (Func (Array T0) (Array T1) (Func T0 T1 T2) (Array T3))
function cartesianProduct_2023(xs, ys, f)
{
  return flatMap_1980(xs,(x) => map_53(ys,(y) => f(x,y)));
}
// Module heron:geometry.mesh:0.1
// file input\geometry-mesh.heron
// imports heron:std.array:0.1
// imports heron:geometry.vector:0.1
const tetrahedron = mesh_2218(arrayFromJavaScript([1,1,1,op_negate_1626(1),op_negate_1626(1),1,op_negate_1626(1),1,op_negate_1626(1),1,op_negate_1626(1),op_negate_1626(1)]),arrayFromJavaScript([2,1,0,0,3,2,1,3,0,2,3,1]));
const cube = mesh_2218(arrayFromJavaScript([op_negate_1626(1),op_negate_1626(1),1,1,op_negate_1626(1),1,1,1,1,op_negate_1626(1),1,1,op_negate_1626(1),op_negate_1626(1),op_negate_1626(1),1,op_negate_1626(1),op_negate_1626(1),1,1,op_negate_1626(1),op_negate_1626(1),1,op_negate_1626(1)]),arrayFromJavaScript([0,1,2,2,3,0,1,5,6,6,2,1,7,6,5,5,4,7,4,0,3,3,7,4,4,5,1,1,0,4,3,2,6,6,7,3]));
const octahedron = mesh_2218(arrayFromJavaScript([1,0,0,op_negate_1626(1),0,0,0,1,0,0,op_negate_1626(1),0,0,0,1,0,0,op_negate_1626(1)]),arrayFromJavaScript([0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2]));
const dodecahedron = ((t) => ((r) => mesh_2218(arrayFromJavaScript([op_negate_1626(1),op_negate_1626(1),op_negate_1626(1),op_negate_1626(1),op_negate_1626(1),1,op_negate_1626(1),1,op_negate_1626(1),op_negate_1626(1),1,1,1,op_negate_1626(1),op_negate_1626(1),1,op_negate_1626(1),1,1,1,op_negate_1626(1),1,1,1,0,op_negate_1626(r),op_negate_1626(t),0,op_negate_1626(r),t,0,r,op_negate_1626(t),0,r,t,op_negate_1626(r),op_negate_1626(t),0,op_negate_1626(r),t,0,r,op_negate_1626(t),0,r,t,0,op_negate_1626(t),0,op_negate_1626(r),t,0,op_negate_1626(r),op_negate_1626(t),0,r,t,0,r]),arrayFromJavaScript([3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9])))(op_div_557(1,t))
)(op_div_557(op_add_485(1,sqrt_446(5)),2))
;
const icosahedron = ((t) => mesh_2218(arrayFromJavaScript([op_negate_1626(1),t,0,1,t,0,op_negate_1626(1),op_negate_1626(t),0,1,op_negate_1626(t),0,0,op_negate_1626(1),t,0,1,t,0,op_negate_1626(1),op_negate_1626(t),0,1,op_negate_1626(t),t,0,op_negate_1626(1),t,0,1,op_negate_1626(t),0,op_negate_1626(1),op_negate_1626(t),0,1]),arrayFromJavaScript([0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1])))(op_div_557(op_add_485(1,sqrt_446(5)),2))
;
// (Func (Array T0) Int Bool Bool (Array Int))
function quadStripToMeshIndices_966(vertices, rows, connectRows, connectCols)
{
  let cols = op_div_557(count_1678(vertices),rows);
  let nr = connectRows ? rows : op_sub_509(rows,1);
  let nc = connectCols ? cols : op_sub_509(cols,1);
  let indices = mutable_1727(arrayFromJavaScript([]));
  for (let i4=0; i4 < op_dot_dot_2123(0,nr).count; ++i4)
  {
    const row = op_dot_dot_2123(0,nr).at(i4);
    {
      for (let i5=0; i5 < op_dot_dot_2123(0,nc).count; ++i5)
      {
        const col = op_dot_dot_2123(0,nc).at(i5);
        {
          let a = op_add_485(col,op_mul_533(row,cols));
          let b = op_add_485(op_mod_581(op_add_485(col,1),cols),op_mul_533(row,cols));
          let c = op_add_485(op_mod_581(op_add_485(col,1),cols),op_mul_533(op_mod_581(op_add_485(row,1),rows),cols));
          let d = op_add_485(col,op_mul_533(op_mod_581(op_add_485(row,1),rows),cols));
          indices = pushMany_2044(indices,arrayFromJavaScript([a,b,d]));
          indices = pushMany_2044(indices,arrayFromJavaScript([b,c,d]));
        }
      }
    }
  }
  return immutable_1814(indices);
}
// (Func (Array Float3) (Array T0))
function vectorsToVertexBuffer_1001(xs)
{
  return flatMap_1980(xs,(v) => arrayFromJavaScript([x_77(v),y_92(v),z_134(v)]));
}
// (Func Float2 Float3)
function vector_1066(uv)
{
  return float3_119(op_mul_533(op_negate_1626(cos_320(x_77(uv))),sin_416(y_92(uv))),cos_320(x_77(uv)),op_mul_533(sin_416(x_77(uv)),sin_416(y_92(uv))));
}
// (Func T0 T0 T0 T0)
function rescale_1094(v, from, length)
{
  return op_add_485(from,op_mul_533(v,length));
}
// (Func (Func Float Float T0) Int Int Float Float Float Float Mesh)
function meshFromUV_1222(f, uCount, vCount, uStart, vStart, uLength, vLength)
{
  let points = cartesianProduct_2023(op_dot_dot_2123(0,vCount),op_dot_dot_2123(0,vCount),(u, v) => f(op_add_485(op_mul_533(op_div_557(u,float_41(uCount)),uLength),uStart),op_add_485(op_mul_533(op_div_557(v,float_41(vCount)),vLength),vStart)));
  let indices = quadStripToMeshIndices_966(points,vCount,true,true);
  return mesh_2218(vectorsToVertexBuffer_1001(points),indices);
}
// (Func (Func Float Float T0) Int Mesh)
function meshFromUV_1248(f, segments)
{
  return meshFromUV_1222(f,segments,segments,0,0,1,1);
}
// (Func Int Int Float3)
function spherePoint_1348(u, v)
{
  return vector_98(op_mul_533(op_negate_1626(cos_320(op_mul_533(op_mul_533(u,2),pi))),sin_416(op_mul_533(op_mul_533(v,2),pi))),cos_320(op_mul_533(op_mul_533(v,2),pi)),op_mul_533(sin_416(op_mul_533(op_mul_533(u,2),pi)),sin_416(op_mul_533(op_mul_533(v,2),pi))));
}
// (Func Int Mesh)
function sphere_1365(segments)
{
  return meshFromUV_1222(spherePoint_1348,segments);
}
// (Func Mesh)
function sphere_1376()
{
  return sphere_1365(32);
}
// (Func Int Float Float3)
function cylinderPoint_1424(u, v)
{
  return vector_98(sin_416(op_mul_533(op_mul_533(u,2),pi)),v,cos_320(op_mul_533(op_mul_533(u,2),pi)));
}
// (Func Int Mesh)
function cylinder_1441(segments)
{
  return meshFromUV_1222(cylinderPoint_1424,segments);
}
// (Func Mesh)
function cylinder_1452()
{
  return cylinder_1441(32);
}
// (Func Float Float Int Mesh)
function torus_1492(r1, r2, segments)
{
  return meshFromUV_1222((u, v) => torusPoint_1622(u,v,r1,r2),segments);
}
// (Func Int Int Float Float Float3)
function torusPoint_1622(u, v, r1, r2)
{
  return vector_98(op_mul_533(op_add_485(r1,op_mul_533(r2,cos_320(op_mul_533(op_mul_533(v,2),pi)))),cos_320(op_mul_533(op_mul_533(u,2),pi))),op_mul_533(op_add_485(r1,op_mul_533(r2,cos_320(op_mul_533(op_mul_533(v,2),pi)))),sin_416(op_mul_533(op_mul_533(u,2),pi))),op_mul_533(r2,sin_416(op_mul_533(op_mul_533(v,2),pi))));
}
// (Func Mesh)
function torus_1635()
{
  return torus_1492(10,2,32);
}
// (Func Mesh Int)
function vertexCount_1656(mesh)
{
  return op_div_557(count_1678(vertexBuffer_2236(mesh)),3);
}
// (Func Mesh Int)
function faceCount_1677(mesh)
{
  return op_div_557(count_1678(indexBuffer_2254(mesh)),3);
}
// (Func Mesh Int Float3)
function vertex_1707(mesh, i)
{
  return vector_98(take_1008(vertexBuffer_2236(mesh),op_mul_533(i,3),3));
}
// (Func Mesh (Array Float3))
function vertices_1737(mesh)
{
  return array_1658(vertexCount_1656(mesh),(i) => vertex_1707(mesh,i));
}
// (Func Mesh (Array Float) Mesh)
function setVertices_1760(m, points)
{
  return mesh_2218(points,indexBuffer_2254(m));
}
// (Func Mesh (Func Float3 Float) Mesh)
function transform_1787(m, f)
{
  return setVertices_1760(m,map_53(vertices_1737(m),f));
}
// (Func Mesh Float3 Mesh)
function translate_1816(m, amount)
{
  return transform_1787(m,(v) => op_add_485(v,amount));
}
// (Func Mesh Float3 Mesh)
function scale_1845(m, amount)
{
  return transform_1787(m,(v) => op_mul_533(v,amount));
}
// Module heron:tests:0.1
// file input\test.heron
// imports heron:std.array:0.1
// imports heron:geometry.mesh:0.1
// imports heron:geometry.vector:0.1
// (Func (Array (Func Float Float Float Mesh)))
function main_39()
{
  simpleArrayTest_439();
  return geometryTest_490();
}
// (Func T0)
function simpleArrayTest_439()
{
  let xs = arrayFromJavaScript([1,11,3]);
  print_2179("'Expect [1, 11, 3]'");
  print_2179(xs);
  print_2179("'Expect 1, 11, 3'");
  for (let i6=0; i6 < xs.count; ++i6)
  {
    const x = xs.at(i6);
    {
      print_2179(x);
    }
  }
  print_2179("'Expect 1'");
  print_2179(op_obr_cbr_2158(xs,0));
  print_2179("'Expect 3'");
  print_2179(count_1678(xs));
  print_2179("'Expect 1'");
  print_2179(first_1904(xs));
  print_2179("'Expect 3'");
  print_2179(last_1118(xs));
  print_2179("'Expect 1'");
  print_2179(min_140(xs));
  print_2179("'Expect 11'");
  print_2179(max_165(xs));
  let ys = mutable_1727(xs);
  ys = set_1791(ys,1,5);
  print_2179("'Expect 5'");
  print_2179(op_obr_cbr_2158(ys,1));
  print_2179("'Expect 1, 3, 11'");
  let zs = sort_1735(xs);
  for (let i7=0; i7 < zs.count; ++i7)
  {
    const z = zs.at(i7);
    {
      print_2179(z);
    }
  }
  print_2179("'Expect 3'");
  print_2179(median_1835(xs));
  print_2179("'Expect 15'");
  print_2179(sum_1371(xs));
  print_2179("'Expect 5'");
  print_2179(average_1411(xs));
}
// (Func Float Float Float Mesh)
function testSphere_481(offX, offY, offZ)
{
  let offset = vector_1066(offX,offY,offZ);
  return translate_1816(sphere_1365(32),offset);
}
// (Func (Array (Func Float Float Float Mesh)))
function geometryTest_490()
{
  return arrayFromJavaScript([testSphere_481]);
}

return main_39;
})();
