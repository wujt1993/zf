//二、构造继承

// 定义一个动物类
function Animal(name) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉！');
    }
}
// 原型方法
Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
};


function Cat(name) {
    Animal.call(this);
    this.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat.name);
cat.sleep();
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true

/**
 * 特点：
 * 解决了子类实例共享父类引用属性的问题
 * 创建子类实例时，可以向父类传递参数
 * 可以实现多继承（call多个父类对象）
 * 
 * 
 * 缺点：
 * 实例并不是父类的实例，只是子类的实例
 * 只能继承父类的实例属性和方法，不能继承原型属性/方法
 * 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
 */