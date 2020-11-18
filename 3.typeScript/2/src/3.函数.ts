//一、函数

//1、函数的定义： 可以指定参数的类型和返回值的类型

function fn1(name:string):void{
    console.log(`hello ${name}`);
    // return "";//不能将类型“string”分配给类型“void”
}
fn1('world');

//2、函数表达式
// let fn2:(param1:string,param2:string)=>string = (param1:string,param2:string) =>{
//     return param1 + param2;
// }
type fnParam = (param1:string,param2:string)=>string
let fn2:fnParam = (param1, param2)=>{
    return param1 + param2;
}


//3、没有返回值
let fn3 = (name:string):void =>{
    return undefined
}

//4、可选参数
let fn4 = (name:string, age?:number) =>{
    console.log(name, '----------->', age)
}
fn4('wujt', 28);
fn4('wujt')

//5、默认参数
let fn5 = (url:string, methods:string='get') =>{
    console.log(url, methods)
}
fn5('www.baidu.com');
fn5('www.baidu.com', 'post');

//6、剩余参数
let fn6 = (...parmas:string[]) => {
    console.log(parmas)
}
fn6('1','2');

//7、重载:表现为给同一个函数提供多个函数类型定义
let obj: any={};
function fn7(value:number):number[];
function fn7(value:string):string[];
function fn7(value:number|string):number[]|string[]{
    if(typeof value == 'number') {
        return value.toString().split("").map(item=>parseInt(item));
    }else{
        return value.split("");
    }
}
console.log(fn7(123));
console.log(fn7('123'));




export {}