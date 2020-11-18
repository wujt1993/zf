// 装饰器 前端中使用 stage-3  可能后期会有变化
// 扩展属性和方法

function addSay(target: Function){ //修饰类 传一个参数：类本身

    setTimeout(()=>{
        console.log("-----------修饰类----------------")
        console.log(target === Person)
    },1000)
    
    target.prototype.say = function() {
        console.log("hello")
    }
}

function toUppcaseCase(target: any, key: string) { // 修饰变量 两个参数 ： 类的原型、变量名称
    setTimeout(()=>{
        console.log("-----------修饰变量----------------")
        console.log(target === Person.prototype)
        console.log(key)
    },2000)

    let value = '';
    Object.defineProperty(target, key, {
        get() {
            return value.toUpperCase();
        },
        set(newValue) {
            value = newValue;
        }
    })
}

function params(target: any, key: string, index: number) { // 修饰函数参数 三个参数 ： 类的原型、方法名称、参数索引
    setTimeout(()=>{
        console.log("-----------修饰方法参数----------------")
        console.log(target === Person.prototype)
        console.log(key)
        console.log(index)
    },3000)
}

function Emun(target: any, key: string, descriptor:PropertyDescriptor) {
    setTimeout(()=>{
        console.log("-----------修饰方法----------------")
        console.log(target === Person.prototype)
        console.log(key)
        console.log(descriptor)
    },4000)
}
@addSay
class Person {
    say!:Function

    @toUppcaseCase
    name:string = 'person'

    @Emun
    getName(a:string,@params xx: string) {

    }
}

const p = new Person();
p.say();
console.log(p.name);


export {}