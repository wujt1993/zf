//交叉类型
interface Person1 {
    name: string
}

interface Person2 {
    age: number
}

type Person = Person1 & Person2

let person:Person = {
    age: 1,
    name: 'test'
}

interface Person3 {
    age: string
}

type Person4 = Person3 & Person2;
let neverStr = ():never => {throw Error()}
let person1:Person4 = {
    age: neverStr()
}


export {}