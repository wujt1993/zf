//一.条件类型基本使用
interface Fish {
    name1: string
}

interface Water{
    name2: string
}

interface Bird {
    name3: string
}

interface Fly {
    name4: string
}

type Condition<T> = T extends Fish ? Water : Fly
let con1: Condition<Fish> = {
    name2: '水'
}

// 二.条件类型分发
let con2:Condition<Fish | Bird> = {
    // name2: 'water',
    name4: 'fly'
}

interface I1 {
    name: string
}

interface I2 {
    name: number
}

// {name: number|string}
let con3:I1|I2 = {
    // name: 1,
    name: '1'
}

//三、内置条件类型

//1、Exclude 类型排除
//<'1' | '2' | '3'> extends <'3' | '4'> =>
//<'1'> extends <'3' | '4'> | <'2'> extends <'3' | '4'> | <'3'> extends <'3' | '4'>
// type Exclude<T, U> =  T extends U ? never : T;
type MyExclude = Exclude<'1' | '2' | '3', '3' | '4'>; //type MyExclude = "1" | "2"

//2、Extract 类型抽取
// type Extract<T, U> = T extends U ? T : never;
type MyExtract = Extract<'1' | '2' | '3', '3' | '4'>; //type MyExtract = "3"

//3、NonNullable
// type NonNullable<T> = T extends null | undefined ? never : T;
type MyNo = NonNullable<null>; //type MyNo = never
type MyNo1 = NonNullable<undefined>; //type MyNo1 = never
type MyNo2 = NonNullable<'a'>; //type MyNo2 = "a"
type MyNo3 = NonNullable<MyNo1>; //type MyNo3 = never

//四.infer类型推断
function fn1(name: string, age: number):string {
    return name + age
}
//1、函数返回值类型
type Fn1 = typeof fn1
// type ReturnType<T extends (...args:any) => any> = T extends (...args:any) => infer R ? R : any; 
type MyReturn = ReturnType<Fn1>

//2、参数类型
type Parameters<T extends (...args:any) => any> = T extends (...args: infer P) => any ? P : never;  
type myParams = Parameters<Fn1> //type myParams = [name: string, age: number]

//3、构造函数参数类型 ConstructorParameters
class Person3 {
    constructor(name: string, age: number) { }
}
type p = typeof Person3;

// type ConstructorParameters<T extends new (...args:any) => any> = T extends new (...args: infer P) => any ? P : never;
type myCparams = ConstructorParameters<p>;

//4、InstanceType 实例类型
type InstanceType<T extends new (...args:any) => any> = T extends new (...args:any) => infer R ? R :any
type myPreturn = InstanceType<p>

// //五、infer实践
// //1、将数组类型转化为联合类型
// type ElementOf<T> = T extends Array<infer E> ? E : never;
// type TupleToUnion = ElementOf<[string, number, boolean]>;

// //2、将两个函数的参数转化为交叉类型
// type T1 = { name: string };
// type T2 = { age: number };
// type ToIntersection<T> = T extends ([(x: infer U) => any, (x: infer U) => any]) ? U : never;
// type t3 = ToIntersection<[(x:T1)=>any,(x:T2)=>any]>
// let xxx:t3 = {
//     name: '',
//     age: 1
// }


export {}