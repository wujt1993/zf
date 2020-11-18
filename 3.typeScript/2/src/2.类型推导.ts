// 一、类型推论
// 是指编程语言中能够自动推导出值的类型的能力，它是一些强静态类型语言中出现的特性
// 定义时未赋值就会推论成any类型
// 如果定义的时候就赋值就能利用到类型推论

let username1; //any
username1 = 10; //any
let username2 = 'zhufeng'; //string
// username2 = null;//不能将类型“null”分配给类型“string”。


//二、包装对象
// 在使用基本数据类型时   会将原始类型 包装成 对象类型
11..toString(); //Number(11).toString();
let num1:number = 1;
// let num2:number = new Number(1);//不能将类型“Number”分配给类型“number”。
let num2:number = Number(1);
let num3:Number = new Number(1);

//三、联合类型
let union1:string|number;
// union1.toString();
union1 = 3;
union1.toFixed();
union1 = '3';
union1.slice(0,-1);

//四、断言
// let ele:HTMLElement = document.getElementById("app"); // 已声明“ele”，但从未读取其值。
let ele:HTMLElement | null = document.getElementById("app");
ele!.style.color="#111";//!表示ele肯定存在
ele?.style?.color; // ele && ele.style && ele.style.color
(ele as HTMLElement).style.color = "#111";
//双重断言，破坏原有属性，不推荐使用
ele as any as boolean

//五、字面量类型和类型字面量
//字面量类型要求值与类型一致
const up:'UP' = 'UP'; 
// const up1:'UP1' = 'UP'; //不能将类型“"UP"”分配给类型“"UP1"”。ts(2322)



//六、 字符串字面量 vs 联合类型
//1、 字符串字面量类型用来约束取值只能是某几个字符串中的一个, 联合类型（Union Types）表示取值可以为多种类型中的一种
//2、字符串字面量 限定了使用该字面量的地方仅接受特定的值,联合类型 对于值并没有限定，仅仅限定值的类型需要保持一致

export {}