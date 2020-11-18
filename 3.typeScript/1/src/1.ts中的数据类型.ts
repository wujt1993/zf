// 1.基础类型: 数字、字符串、布尔类型、元组、数组、枚举、null、undefined、void、never、对象类型 

// 数字 字符串 布尔类型
// 所有的类型 : 后面的都是类型 = 后面的都是值
let num:number = 10;
let str:string = 'zf';
let bool:boolean = true;

console.log('数字：',num, '　字符串：',str, '　布尔',bool);

// 元组  表示长度和个数都 （内容存放类型）都限制好了 
let tuple:[string,number,boolean] = ['zf',11,true];
// tuple[3] = 1; //Type '1' is not assignable to type 'undefined'.不能通过索引添加数据
tuple.push(1);
//tuple.push({});//类型“{}”的参数不能赋给类型“string | number | boolean”的参数。不能将类型“{}”分配给类型“true”
console.log(tuple)


// 数组  存放一类类型的集合 
let arr1:number[] = [1,2,3];
let arr2:string[] = ['1','2'];

// 联合类型可以看作并集  既能使用数字 又能使用字符串
let arr3:(number|string)[] = [1,2,3,'4'];
let arr4:Array<number | string> = [1,2,3,'5'];
let arr5:any[] = [1, 'a', true, {}]; // 什么都能方法

// 枚举类型
enum USER_ROLE {
    USER='a', // 默认下标是从0开始
    ADMIN=1, //如果是数字，则会累加，如果不是，则需要给下一个赋值
    MANAGER
}
// 默认可以正向取出 也可以反举
console.log(USER_ROLE.USER); // a
console.log(USER_ROLE[1]); // ADMIN

// 常量枚举 只是提供了一个类型
const enum USER_ROLE_1{ // 语义化
    USER = 'user',
    ADMIN = 'admin'
}
console.log(USER_ROLE_1.USER)


// null 和 undefined
// 任何类型的子类型  ,在严格模式下 只能将null 和 undefined 赋予给 null undefined
let str2:number | string |undefined;
// str2 = null;

// void 空类型 只能接受 null 和undefined 。 一般用于函数的返回值
// 函数默认的返回值是undefined, 默认在严格模式下不能将null 赋给void
// let v:void;
// v = null;

// never类型 永远不 是任何类型的子类型 可以把never赋予给任何类型
// 永远达不到的情况有三种 1） 错误  2） 死循环  3） 类型判断时会出现never

function MyError():never{
    throw new Error("");
}
function whileTrue():never{
    while (true) { }
}
function byType(val:string|number){
    if(typeof val == 'string'){
        val
    }else if(typeof val == 'number'){
        val
    }else{
        val // never
    }
}
// let n:never = MyError();


// Symbol BigInt   symbol 表示独一无二 元编程会用到 stringToFlag iterator ....
let s1:symbol = Symbol('123');
let s2 = Symbol('123');
console.log(s1 == s2);



// BigInt
let num1:bigint = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
let num2 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2);

// console.log(Number)


// 对象类型 非原始数据类型 object

const create = (obj:object)=>{

}
// create(1); // 基本类型
// create(null); 
create({})
create([])
create(function(){});


export {} // 防止模块间的干扰