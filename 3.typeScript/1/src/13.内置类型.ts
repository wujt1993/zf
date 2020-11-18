// 内置类型

// #一.Partial转化可选属性
interface Company {
    num: number
}
interface Person {
    name: string,
    age: string,
    company: Company
}
// type Partial<T> = { [K in keyof T]?: T[K] }; 实现原理
type PartialPerson = Partial<Person>;
// 遍历所有的属性将属性设置为可选属性,但是无法实现深度转化!

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
type DeepPartialPerson = DeepPartial<Person>;

// 我们可以实现深度转化,如果值是对象继续深度转化。

// #二.Required转化必填属性
interface Company {
    num: number
}
interface Person {
    name: string,
    age: string,
    company: Company
}
type PartialPerson1 = Partial<Person>;
type Required<T> = {[K in keyof T]-?:T[K]} 
type RequiredPerson = Required<PartialPerson1>
// 将所有的属性转化成必填属性

// #三.Readonly转化仅读属性
type Readonly<T> = { readonly [K in keyof T]: T[K] }
type RequiredPerson1 = Readonly<Person>
// 将所有属性变为仅读状态

// #四.Pick挑选所需的属性
type Pick<T, U extends keyof T> = { [P in U]: T[P] }
type PickPerson = Pick<Person, 'name' | 'age'>
// 在已有类型中挑选所需属性

// #五.Record记录类型
type Record<K extends keyof any, T> = { [P in K]  : T }
let person: Record<string, any> = { name: 'zf', age: 11 };
// 实现map方法，我们经常用record类型表示映射类型

function map<T extends keyof any, K, U>(obj: Record<T, K>, callback: (item: K, key: T) => U) {
    let result = {} as Record<T, U>
    for (let key in obj) {
        result[key] = callback(obj[key], key)
    }
    return result
}
const r = map({ name: 'zf', age: 11 }, (item, key) => {
    return item
});


// #六.Omit忽略属性
let person1 = {
    name: 'zhufeng',
    age: 11,
    address: '回龙观'
}
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type OmitAddress = Omit<typeof person1, 'address'>
// 忽略person中的address属性 (先排除掉不需要的key，在通过key选出需要的属性)


export default {}