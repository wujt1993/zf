//js继承

//一、通过原型链
function Animal(name) {
    this.name = name;
    this.active = []
}


let a = new Animal("animal");

function Cat() {
    this.age = 1
}

Cat.prototype = a
let cat = new Cat();
cat.name = "tomcat"
cat.active.push("eat")
console.log(cat)
console.log(Animal.prototype)
console.log(Cat.prototype.__proto__ == a.__proto__)//true
console.log(a.__proto__ == Animal.prototype)//true
//cat.__proto__ = Cat.prototype
/**
 * cat 查找属性，查找本身 -> cat.__proto__ -> cat.__proto__.__proto__ => a.__prop__ => Animal.prototype
 * 
 * 缺点：
 * 包含引用类型值的原型属性会被所有实例共享，这会导致对一个实例的修改会影响另一个实例。在通过原型来实现继承时，原型实际上会变成另一个类型的实例。原先的实例属性就变成了现在的原型属性
 * 在创建子类型的实例时，不能向超类型的构造函数中传递参数
 */