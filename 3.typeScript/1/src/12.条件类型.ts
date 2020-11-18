// 条件类型基本使用
// 可以使用extends关键字和三元表达式，实现条件判断

interface Fish {
    name1: string
}
interface Water {
    name2: string
}
interface Bird {
    name3: string
}
interface Sky {
    name4: string
}
type Condition<T> = T extends Fish ? Water : Sky;
let con1: Condition<Fish> = { name2: '水' }
let con2: Condition<Bird> = { name4: '水' }



// #二.条件类型分发
let con3: Condition<Fish|Bird> = { name2: '水' };
con3 = {name4: '1'}
// 这里会用每一项依次进行分发,最终采用联合类型作为结果,等价于:
type c1 = Condition<Fish>;
type c2 = Condition<Bird>;
type c = c1 | c2


// #三.内置条件类型
// 1.Exclude排除类型
type Exclude<T, U> = T extends U ? never : T;
type MyExclude = Exclude<'1' | '2' | '3' | '4', '1' | '2'> // '3' | '4'
type MyExclude2 = Exclude<'1' | '2', '1' | '2'> //never

// 2.Extract抽取类型
type Extract<T, U> = T extends U ? T : never;
type MyExtract = Extract<'1' | '2' | '3', '1' | '2'> // '1' | '2'
type MyExtract2 = Extract<'3', '1' | '2'> // never


// 3.NoNullable 非空检测
type NonNullable<T> = T extends null | undefined ? never : T
type MyNone = NonNullable<'a' | null | undefined> // 'a'
type MyNone1 = NonNullable<null | undefined> // never


// #四.infer类型推断
// 1.ReturnType返回值类型
function getUser(a: number, b: number) {
  return { name: 'zf', age: 10 }
}
// (a: number, b: number) => {
//     name: string;
//     age: number;
// }
type a = typeof getUser

type ReturnType<T> = T extends (...args: any) => infer R ? R : never
type MyReturn = ReturnType<typeof getUser>


// 2.Parameters 参数类型
type Parameters<T> = T extends (...args: infer R) => any ? R : any;
type MyParams = Parameters<typeof getUser>;


// 3.ConstructorParameters构造函数参数类型
class Person {
  constructor(name: string, age: number) { }
}
type ConstructorParameters<T> = T extends { new(...args: infer R): any } ? R : never
type MyConstructor = ConstructorParameters<typeof Person>


// 4.InstanceType 实例类型
type InstanceType<T> = T extends { new(...args: any): infer R } ? R : any
type MyInstance = InstanceType<typeof Person>


// #五.infer实践
// 将数组类型转化为联合类型

type ElementOf<T> = T extends Array<infer E> ? E : never;
type TupleToUnion = ElementOf<[string, number, boolean]>;


// 将两个函数的参数转化为交叉类型
type T1 = { name: string };
type T2 = { age: number };
type ToIntersection<T> = T extends ([(x: infer U) => any, (x: infer U) => any]) ? U : never;
type t3 = ToIntersection<[(x:T1)=>any,(x:T2)=>any]>

// 表示要把T1、T2赋予给x，那么x的值就是T1、T2的交集。（参数是逆变的可以传父类）
// TS的类型：TS主要是为了代码的安全性来考虑。所以所有的兼容性问题都要从安全性来考虑!

export default {}