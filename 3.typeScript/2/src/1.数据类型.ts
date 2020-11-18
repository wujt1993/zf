//数据类型：字符串、数字、布尔类型、数组、元组、枚举、void、undefined、null、never、对象类型

// 一、字符串
const str:string = "hello";
console.log(str);

//二、数字
const num:number = 0;

//三、布尔类型
const bool:boolean = true;

//四、数组
const arr:number[] = [1,2,3];
// arr[3] = '4';//不能将类型“string”分配给类型“number”


//五、元组
const tuple:[number, string ,boolean] = [1,'1',true];
// tuple[1] = 1;//不能将类型“number”分配给类型“string”
tuple.pop();
// tuple[3] = 1;//不能将类型“1”分配给类型“undefined”。

//六、枚举
enum myEnum{
    'admin',
    'user',
    'xxx'
}
// 默认可以正向取出 也可以反举
console.log(myEnum[0]);
console.log(myEnum['admin']);
//常量枚举
const enum constEnum{
    'admin',
    'user'
}
console.log(' 常量枚举 只是提供了一个类型', constEnum.admin)

//七、void,只能接受null，undefined。一般用于函数的返回值
let v:void = undefined;
// v = null;//严格模式下不支持

//八、undefined、null任何类型的子类型,如果strictNullChecks的值为true，则不能把null 和 undefined付给其他类型
let other:string = "";
// other = null;//不能将类型“null”分配给类型“string”。ts(2322)


//十、never：所有类型的子类型
//1）死循环 2）错误 3）类型判断时出现，保证完整性
function never1():never {
    // return 1;//不能将类型“number”分配给类型“never”。
    throw Error("");
}
const n1 = never1();

function never2():never {
    while(true) {}
}
const n2 = never2();

function never3(val:string|number){
    if(typeof val == 'string'){
        val
    }else if(typeof val == 'number'){
        val
    }else{
        val // never
    }
}


//十一、对象类型、非原始类型
let obj:object = [];
let obj1:object = {};
let obj2:object = function() {};