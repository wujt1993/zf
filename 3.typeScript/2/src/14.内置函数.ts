//内置函数

//一、partial 将属性转换为可选属性
interface Company {
    address: string
}

interface Person {
    name: string,
    age: number,
    company:Company
}
type DeepPartial<T> = {[p in keyof T]?: DeepPartial<T[p]> | undefined} 
// type Partial<T> = {[p in keyof T]?: T[p] | undefined} 
type newPerson = DeepPartial<Person>;
let p:newPerson = {
    company: {
        address: 'xxx'
    }
}


//二、required 将属性转为必填属性
type DeepRequired<T> = {[P in keyof T]-?: DeepRequired<T[P]>};
// type Required<T> = {[P in keyof T]-?: T[P]}
type requiredPerson = DeepRequired<newPerson>;
let p2:requiredPerson = {
    name: 'a',
    age: 1,
    company:{
        address: 'xxx'
    }
}

//三、Readonly
// type Readonly<T> = { readonly [P in keyof T]: T[P]}
type ReadonlyPreson = Readonly<Person>;

//四、Pick挑选所需的属性
type PickPerson = Pick<Person, 'name'| 'age'>;

//五.Record记录类型（会将K中的所有属性值都转换为T类型）
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

type PetsGroup = 'dog' | 'cat'
interface PetInfo{
    name: string,
    age: number
}

// type Pets = {
//     dog: PetInfo;
//     cat: PetInfo;
// }
type Pets = Record<PetsGroup, PetInfo>;
let animals: Pets = {
    dog: {
        name: "dog",
        age: 1
    },
    cat: {
        name: "cat",
        age: 2
    }
}



// 六.Omit忽略属性
// type Omit<T, K extends keyof any> = {[P in Exclude<keyof T, K>]: T[P]}
type OmitPreson = Omit<Person, 'name'| 'age'>;

export {}