//类型推断
//一、赋值推断
let a = 1; // let a: number


//二、返回值推断
function fn(a:string, b:string) {
    return a + b;
}
let a2 = fn('a', 'b'); // let a2: string


//三、函数推断
type fntype = (a:string, b:string) => string
const fn2:fntype = (a,b)=>{
    return a + b
}

//四、属性推断
let person = {
    name: 'zf',
    age: 11
}

let {name, age} = person; //let name: string   let age: number

//五、类型反推
// type Person = {
//     name: string;
//     age: number;
// }
type Person = typeof person;

//六、索引访问操作符
interface Person1 {
    name: string,
    address: {
        province: string
    }
}
// type address = {
//     province: string;
// }
type address = Person1['address'];


//七、类型映射
interface IPerson {
    name:string,
    age:number
}
// type MapPerson = {
//     name: string;
//     age: number;
// }
type MapPerson = {[key in keyof IPerson]:IPerson[key]}

export {}