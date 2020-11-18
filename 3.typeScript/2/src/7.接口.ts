//1、接口可以描述对象的形状，少属性，或多属性都会报错
interface I1 {
    name: string
}

let p: I1 = {
    name: "p",
    // age: 1, //不能将类型“{ name: string; age: number; }”分配给类型“Interface1”
}


//2、行为抽象化

interface I2 {
    say(): void
}
class Person1 implements I2 {
    say() {
        console.log('hello p1')
    }
}

class Person2 implements I2 {
    say() {
        console.log('hello p2')
    }
}
let p1: I2 = new Person1();
let p2: I2 = new Person2();
p1.say();
p2.say();


//3、无法预先知道有哪些新的属性的时候,可以使用 `[propName:string]:any`,propName名字是任意的
interface I3 {
    name: string,
    [propName: string]: any
}
let p3: I3 = {
    name: 'p3',
    age: 11,
    xxx: true
}

//4、接口修饰函数
interface I4 {
    (name: string): string,
    name: string
}

let p4: I4 = (name: string) => {
    return name
}
p4.name = 'name'

//5、可索引接口
interface I5 {
    [index: number]: string
}
let p5: I5 = ['a', 'b'];
let p6: I5 = { 1: 'a' }
class Test {
    id!: number
    constructor(id: number) {
        this.id = id;
    }
}

interface I6 {
    // [index:Test]: number //索引签名参数类型必须为 "string" 或 "number"。
    [index: string]: number
}
let p7: I6 = { a: 1 }

class Animal {
    constructor(public name: string) {
    }
}
//不加new是修饰函数的,加new是修饰类的
interface WithNameClass {
    new(name: string): Animal
}
function createAnimal(clazz: WithNameClass, name: string) {
    return new clazz(name);
}
let a = createAnimal(Animal, 'zhufeng');
console.log(a.name);



export { }