// 泛型 特性 就是为了 在声明时不能确定类型，只有在使用的时候 才能决定类型
// 函数 接口、类型别名 类

// 函数中使用泛型 
function createArray<T>(tiems: number, item: T) {
    let arr = [];
    for(let i = 0; i < tiems; i++) {
        arr.push(item);
    }
    return arr;
}

let arr = createArray(3,'AAA'); // 不传入类型 ts 也会自动推到类型


// 泛型可以使用多个
// 元组  [string,numer] => [number,string]
// A,B 代表类型变量
function swap<A,B>(tuple:[A,B]):([B,A]){
     return [tuple[1],tuple[0]]
}
let s = swap([1,'string']); // 不传类型自动推导
let s2 = swap<string, number>(['a',1]);


// 函数表达式的写法
// 写到函数上的泛型表示调用函数时 传入具体类型 ，写在接口后面的标识使用接口时传入类型
interface MySwap<A, B>{
     (tuple: [A, B]): [B, A]
}
interface IArr<B> {
    [key:string]:B // 可索引接口
}

const arr1:IArr<String>= {a:"1",b: "2"};
// 在接口使用时传递参数
//       定义变量(类型)    var b = unkown
// const swap2 = <B>(tuple:IArr<B>):IArr<B> => {
//     return {a: tuple['b'],b: tuple['a']}
// }
// let r1 = swap2({a:1, b:2});
// console.log(r1)

// 求和函数 我希望求合
const sum = <T extends string>(a: T, b: T): T => {
    return (a + b) as T;
}
// 只要传入的两个参数类型一致即可
let r1 = sum<string>('1', '2'); // 1和2 得具备数字的能力 ， 约束T 都是number类型 只要拥有number能加的功能就可以
// 泛型约束  约束泛型的能力

// 我希望你传入的数据 只要是带有length属性的即可
// type WithLen = {length:number}
interface WithLen {
    length: number
}
// T 满足里面的条件
function getType<T extends WithLen>(obj: T) {
    return obj.length
}

let a = {length:"a"}
let r2 = getType([]);
// let r3 = getType(a);// Argument of type '{ length: string; }' is not assignable to parameter of type 'WithLen'.


// 默认泛型 不传递 默认给与类型 
interface DStr<T = string> {
    name: T   // 可能是数组 、 number 、boolean
}
type T1 = DStr
type T2 = DStr<number>
type T3 = DStr<boolean>
let str: T3 = { name: true };


// 约束属性   keyof 表示取对象中的所有key属性 
const getVal = <T extends Object,K extends keyof T>(obj: T, key: K) => {

}
getVal({ a: 1, b: 2 }, 'b');
type t1 = keyof any; // number string symbol
type t2 = keyof string 



class MyArray <T>{
    public arr:T[] = []
    add(v:T){
        this.arr.push(v);
    }
    getMaxNum():T{
        let arr = this.arr;
        let max = arr[0];
        for(let i = 1 ; i< arr.length;i++){
            let current = arr[i];
            current > max ? max = current : void 0;
        }
        return max;
    }
}
let arr2 = new MyArray<number>()
arr2.add(1);
arr2.add(3);
arr2.add(2);
arr2.getMaxNum()

export default {};