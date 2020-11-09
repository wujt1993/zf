// ts自带类型推到的功能

let name; //当没有赋值的时候 默认是any
name = 'zhufeng'
name = 11;
console.log(name)

// 默认在初始化的是会进行类型推倒
let name1 = 'zhufeng';

// number Number  string String

// 在使用基本数据类型时   会将原始类型 包装成 对象类型
11..toString() // Number(11).toString()
let number1:number = 11;
let number2:Number = 11;
let number3:number = Number(11); // 11
// let number4:number = new Number(11)// {} 错误语法 不能把实例赋予给基本类型
// 类也是一个类型 他可以描述实例
let number5:Number = new Number(11)

export {}