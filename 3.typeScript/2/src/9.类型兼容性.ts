//兼容性：从数据安全的角度考虑
//一、基本数据的兼容性
let a!:string|number;
let b!:string;
a = b;
// b = a; // 不能将类型“string | number”分配给类型“string”。

let a1!: {
    name:string
    age: number
}
let b1!: {
    name: string
    
}
// a1 = b1; //类型 "{ name: string; }" 中缺少属性 "age"，但类型 "{ name: string; age: number; }" 中需要该属性
b1 = a1;

//二、接口的兼容
interface A {
    name:string
    age: number
}

interface B{
    name:string
}

let a2!:A;
let b2!:B;
// a2 = b2; //类型 "B" 中缺少属性 "age"，但类型 "A" 中需要该属性
b2 = a2;


//三、函数兼容
//1、参数(参数少的可以赋值给多的)
let a3 = (p1: string, p2: string):string => p1+p2;
let b3 = (p1:string):string => p1;
// b3 = a3;
a3 = b3;

type Func<T> = (item: T, index: number) => void
function forEach<T>(arr: T[], cb: Func<T>) {
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i);
    }
}
forEach([1, 2, 3], (item) => {
    console.log(item);
});

//2、返回值（与基本类型兼容性一直）
type t1 = () => string|number
type t2 = () => number;
let a4!: t1;
let b4!: t2;
a4 = b4;

//四、函数的逆变与协变
//函数的参数是逆变的，返回值是协变的
//参数可以少，返回值可以多
class Parent {
    name!:string
}

class Child extends Parent {
    age!: number
}

class Grandson extends Child{
    addrees!: string
}

type Callback = (person: Child) => Child
function execCallback(cb: Callback) { }
let fn = (person: Parent) => new Grandson;
execCallback(fn);

//五、类兼容(结构一致则可以赋值)
class Perent {
    name: string = 'zf';
    age: number = 11
}
class Parent1 {
    name: string = 'zf';
    age: number = 11
}
let a6!: Parent;
let b6!: Parent1;
a6 = b6;

//六、泛型

interface I1<T>{}
let a7!:I1<number>;
let b7!:I1<string>;
a7 = b7;




export {}