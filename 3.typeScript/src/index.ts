// 接口可以被实现 被继承 type不能 
// type可以写联合类型 

// 1) 描述对象
// 能用接口用接口，不能用换成type
interface IFullName {
    firstName:string,
    lastName:string
} 
// // interface 可以描述 （属性 方法 类） 

const fullName = (obj:IFullName):IFullName =>{
    return obj
}
fullName({firstName:'z',lastName:'f'})


// 2) 描述函数
interface IFullName1 {
    (firtName: string, lastName: string): string;
}

// const fullName1 = (firtName: string, lastName: string): string => {
//     return firtName + lastName
// }

const fullName1:IFullName1 = (firtName, lastName) => {
    return firtName + lastName
}


// 混合类型 计数器  一个函数返回一个函数，返回的函数有属性
interface ICount {
    count:number,
    // ():number,

}
const fn:ICount = (count):number => {
    return count
    // return ++fn.count
}
// fn.count = 0
console.log(fn())
console.log(fn())