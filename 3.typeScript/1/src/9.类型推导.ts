// 类型推断  
// 1.当赋值时会推断

let str = ''; // 不赋值时什么类型，会根据值进行推断
// str = 11; //不能将类型“number”分配给类型“string”。


// 2.函数默认会进行推断 函数会根据右边的赋值 推到左边的类型  不用特意标注类型
// 3.返回值的推断
const sum = (a:string,b:string)=>{
    return {a,b}
}
let sum1 = sum("1","2");//let sum1: {a: string; b: string;}


// 4.属性推断
let school = { // 需要限制必须要添加类型
    name:'zf',
    age:11,
}
let {name,age:ag1} = school; // 对象解构 取出属性会自动进行类型推到
console.log(ag1)

// 五.类型反推
// 可以使用typeof关键字反推变量类型

let person = {
    name:'zf',
    age:11
}
type Person = typeof person

let p1:Person = {
    name:'kinth',
    age: 8
}

// 六.索引访问操作符
interface IPerson {
    name:string,
    age:number,
    job:{
        address:string
    }
}
type job = IPerson['job'] // type job = { address: string; }

// 七.类型映射
interface IPerson {
    name:string,
    age:number
}

type MapPerson = {[key in keyof IPerson]:IPerson[key]}

export default {}