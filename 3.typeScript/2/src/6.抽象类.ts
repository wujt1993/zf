//一、抽象类
// 抽象描述一种抽象的概念，无法被实例化，只能被继承
// 无法创建抽象类的实例
// 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现

abstract class Person{
    abstract say():void
}

class P1 extends Person{
    say() {
        console.log('p1')
    }
}

class P2 extends Person{
    say() {
        console.log('p2')
    }
}


//多态：由继承而产生了相关的不同的类，对同一个方法可以有不同的行为
let p1:Person = new P1();
let p2:Person = new P2();
p1.say();
p2.say();


export {}