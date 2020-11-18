// 考虑入参和函数的返回值
// 声明 不赋值 就是any类型
// 1)
function sum(a:string, b:string):string {
    return a+b;
}


// 2） 如果使用的是表达式 你给他定义了类型，你可以把一个可以兼容的函数赋予给他
type Sum = (a1:string,b1:string)=>string 
// let sum1: (a1:string,b1:string)=>string = (a,b)=>{
//     return a+b
// }
// let sum1: Sum = (a,b) =>{
//     return a+b
// }

let sum1 = (a:string,b:string):string=>{
    return a+b
}


// 3）b? 表示b可以不传递
let sum2 = (a:string,b?:string) =>{
    console.log(a+b)
}
sum2('1');
sum2('1','2');

// 4）默认参数

let sum3 = (a:string, b:string="2"):string => {
    return a + b;
}

console.log(sum3("1"));
console.log(sum3("1","3"));

// 5）剩余参数
let sum4 = (a:string, ...b:string[])=>{
    console.log(a, b)
}
sum4("1","2","3")
sum4("1")

// 6) 函数重载

let obj: any={};
function attr(val: string): void;
function attr(val: number): void;
function attr(val:any):void {
    if (typeof val === 'string') {
        obj.name=val;
    } else {
        obj.age=val;
    }
}
attr('zfpx');
attr(9);
// attr(true);
console.log(obj);