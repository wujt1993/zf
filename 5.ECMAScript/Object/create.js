// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__

const person = {
    isHuman: false,
    printIntroduction: function () {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
};

const me = Object.create(person);

console.log(person)
console.log(me.__proto__ === person)

let me1 = {};
console.log(me1.__proto__ === Object.prototype)



// Shape - 父类(superclass)
function Shape() {
    this.x = 0;
    this.y = 0;
}

// 父类的方法
Shape.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
    Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
    rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
    rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'