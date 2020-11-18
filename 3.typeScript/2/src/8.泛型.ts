//一、指定函数参数
function getArray<T>(times: number, item: T):T[] {
    let result:T[] = [];
    for(let i = 0; i < times; i++) {
        result.push(item);
    }
    return result;
}
console.log(getArray<string>(4, 'a'));


function swap<T,K>(tuple:[T, K]):[K, T]{
    return [tuple[1], tuple[0]]
}


//泛型接口使用
interface ISum<T> { // 这里的T是使用接口的时候传入
    <U>(a: T, b: T): U // 这里的U是调用函数的时候传入
}
let sum: ISum<number> = <T>(a:number, b:number) => {
    return (a+b) as any as T
}
let s = sum<string>(1,2);

//默认泛型
interface I1<T=string> {
    name: T
}

let p:I1<number> = {
    name: 1
}

let p1:I1 = {
    name: '1'
}

//类中的泛型
class Person{
    name!: string
    age!: number
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

type p = new(name:string, age:number)=> Person
function fn1(clazz: new(name:string, age:number)=> Person) {

}
fn1(Person)

const getInstance = <T>(clazz:new(name:string, age:number)=> T, name: string , age:number):T => {
    return new clazz(name, age)
}

console.log(getInstance<Person>(Person, 'a', 1));

// createClass<Person>(Person)


//泛型约束
const getVal = <T,K extends keyof T>(obj:T,key:K) : T[K]=>{
    return obj[key];
}

export { }