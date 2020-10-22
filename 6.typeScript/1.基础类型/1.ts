var isDone: boolean = false;

var num2: number = 0b100;
var num8: number = 0o100;
var num10: number = 100;
var num16: number = 0x100;


var username: string = `Gene`;
var age: number = 37;
var sentence: string = `Hello, my name is ${ username }.

I'll be ${ age + 1 } years old next month.`;


var list: Array<number> = [1, 2, 3];
//list.push("abc");//类型“string”的参数不能赋给类型“number”的参数。

var xArr: [string, number];
// Initialize it
xArr = ['hello', 10]; // OK
// Initialize it incorrectly
//xArr = [10, 'hello']; // 不能将类型“string”分配给类型“number”
//xArr[3] = 'world';//不能将类型“"world"”分配给类型“undefined”
//xArr[6] = true; // Error, 布尔不是(string | number)类型


enum Color {Red, Green, Blue}
let c: Color = Color.Green;
// let c2: Color = Color.A; // 类型“typeof Color”上不存在属性“A”。


let notSure: any = 4; //any可以指定任何类型
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean


// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
let unusable: void = undefined;
// let unusable1: void = "aaa"; //不能将类型“string”分配给类型“void”。

// never类型表示的是那些永不存在的值的类型, 函数抛异常时返回类
