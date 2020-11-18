//一、类的定义
class Person{
    name!: string //! :断言该属性一定会存在
    say():void{
        console.log("hello " + this.name)
    }
}

let p1 = new Person();
p1.name = 'world';
p1.say();

//二、构造函数
// 主要用于初始化类的成员变量属性
// 类的对象创建时自动调用执行
// 没有返回值
class Person1{
    myName!: string
    constructor(name: string) {
        this.myName = name;
    }
    get name():string {
        return this.name;
    }
    set name(name:string) {
        this.myName = name;
    }
}

//三、readonly
// readonly修饰的变量只能在构造函数中初始化
// 在 TypeScript 中，const 是常量标志符，其值不能被重新分配
// TypeScript 的类型系统同样也允许将 interface、type、 class 上的属性标识为 readonly
// readonly 实际上只是在编译阶段进行代码检查。而 const 则会在运行时检查（在支持 const 语法的 JavaScript 运行时环境中）
class Person2 {
    readonly name!: string
    constructor(name: string) {
        this.name = name
    }
    setName(name:string) {
        // this.name = name;//无法分配到 "name" ，因为它是只读属性
    }
}
let p2 = new Person2('wujt');
// p2.name = 'numy';


// 四、继承
// 子类继承父类后子类的实例就拥有了父类中的属性和方法，可以增强代码的可复用性
// 将子类公用的方法抽象出来放在父类中，自己的特殊逻辑放在子类中重写父类的逻辑
// super可以调用父类上的方法和属性

class Person3 {
    name!: string
    age!: number
    constructor(name:string, age:number) {
        this.name = name;
        this.age = age;
    } 
    
    getName():string{
        return this.name
    }     

    say():void{
        console.log('say')
    }
}

class Student extends Person3 {
    no!:number
    constructor(name:string, age: number, no:number) {
        super(name, age);
        this.no = no
    }

    say():void{
        super.say();
        console.log("student~")
    }
}

let s1 = new Student('s1',11,1);
s1.say();


//五、类的修饰符
//public：任何地方可以访问,默认为public
//protected: 本类及子类都可以使用
//private: 本类
class Person4 {
    name!:string
    protected age!: number
    private idno!: string

}

class Student1 extends Person4{
    constructor(name:string, age: number, idno: string) {
        super();
        this.name = name;
        this.age = age;
        // this.idno = idno;//属性“idno”为私有属性，只能在类“Person4”中访问
    }
}

let s2 = new Student1('s2',11,'1');
console.log(s2.name);
// console.log(s2.age);//属性“age”受保护，只能在类“Person4”及其子类中访问
// console.log(s2.idno);//属性“idno”为私有属性，只能在类“Person4”中访问。


// 六、静态属性 静态方法
class Person5 {
    static className = "Person5"
    name = 'person5'
}

let p5 = new Person5();
console.log(p5.name);
console.log(Person5.className);