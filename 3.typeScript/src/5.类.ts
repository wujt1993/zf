// 类 es6  类来调用的静态属性  私有的实例属性   共享的原型属性

// as 断言成xxx
// ! 非空断言
// ?  链判断运算符 有值取值 没值返回undefined


class Pointer {
    public x!:number // 表示实例上有这个属性
    public y!:number
    constructor(x:number,y?:number,...args:number[]){ // 这些参数 函数中的使用方式 这里都可以使用
        this.x = x;
        this.y = y as number
    }
    static a = 1; //只能类访问
}
let pointer = new Pointer(1,2,3,4,5,6);


// （public private protected） readonly 类的修饰符 
// public 表示 父类本身 子类 外面 都可以获取这个属性
// protected 受保护的  父类本身 子类 能访问到这个属性
// private 只有自己能访问到

// 如果constructor 被标识成了 private 或者 proteced 则此类不能被 new，被标识成了private 不能被子类继承

class Animal {
    name!: string //默认 public
    protected age!: number //只能本类及其子类使用
    readonly category!: string // 只能赋值一次
    private xxx!: string//本类使用

    constructor(name:string,age:number,category:string,xxx:string) {
        this.name = name;
        this.age = age;
        this.category = category;
        this.xxx = xxx;
    }

    say() {
        console.log("animal")
    }

    // setCategory(category: string) {
    //     this.category = category;//Cannot assign to 'category' because it is a read-only propert
    // }
}

const animal = new Animal('动物',1,'category', 'xxx');
// animal.age //属性“age”受保护，只能在类“Animal”及其子类中访问。
console.log(animal) 

class Dog extends Animal{
    constructor() {
        super('dog', 12, 'tomcat', 'yyy')
    }
    say(){ // 原型中的super指代的是 父类的原型
        super.say(); // Aniaml.prototype
        console.log('Dog say');
    }
}


export {}