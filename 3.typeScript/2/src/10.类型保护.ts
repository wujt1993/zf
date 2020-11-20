//类型保护（通过判断识别所执行的代码块，自动识别变量属性和方法）

//一、typeof
function fn1(val: string|number) {
    if(typeof val == "string") {
        val
    }else {
        val
    }
}
//二、instanceof
class Dog{}
class Cat{}
function fn2(clazz: new () => Dog | Cat){
    return new clazz;
} 

let instance = fn2(Dog);
if(instance instanceof Dog) {
    instance
}else{
    instance
}


//三、in

class Fish{
    swiming!: string
}
class Bird {
    fly!: string
}

function fn3(animal: Fish|Bird) {
    if('swiming' in animal) {
        animal //(parameter) animal: Fish
    }else {
        animal //(parameter) animal: Bird
    }
}

//四、可识别联合类型
interface btn1 {
    id: 1
}

interface btn2 {
    id: 2
}

function fn4(btn: btn1 | btn2) {
    if(btn.id == 1) {
        btn //btn: btn1
    }else{
        btn
    }
}


//五、null(这里要注意的是ts无法检测内部函数变量类型)

const addPrefix = (num?: number) => {
    num = num || 1.1;
    function prefix(fix: string) {
        // return fix + num.toFixed() //对象可能为“未定义”
        return fix + num?.toFixed()
    }
    return prefix('zf');
}
console.log(addPrefix());


//六、自定义
function isFish(animal: Fish | Bird):animal is Fish{
    return 'swiming' in animal
}

function fn6(animal: Fish | Bird){
    if(isFish(animal)) {
        animal
    }else{
        animal
    }
}

//七、完整性
const isAssertion = (obj: never) => { }
interface I1 {id:1}
interface I2 {id:2}
interface I3 {id:3}
type type1 = I1|I2|I3
function fn7(obj: type1) {
    switch (obj.id) {
        case 1:
            
            break;
    
        default:
            // isAssertion(obj);//类型“I2 | I3”的参数不能赋给类型“never”的参数。
            break;
    }
}

export {}