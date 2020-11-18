//装饰器


function classAdd(target:Function) {
    console.log('~ classAdd ~');
    setTimeout(()=>{
        console.log('类装饰器，传一个参：类本身',target === Person)
    },0)

    target.prototype.say = function() {
        console.log('say:hello')
    }

}

function UpperCase(target:any, key:string) {
    console.log('~ UpperCase ~');
    setTimeout(()=>{
        console.log('实例属性装饰器，传两个参：类的原型、属性名称',target === Person.prototype, key)
    },0)
    let value = target[key]
    Object.defineProperty(target, key, {
        get() {
            return value.toUpperCase()
        },
        set(val:string) {
            value = val
        }
    })
    
}


function lowerCase(target:any, key:string) {
    console.log('~ lowerCase ~');
    setTimeout(()=>{
        console.log('静态属性装饰器，传两个参：类本身、属性名称',target === Person, key)
    },0)
    let value = target[key]
    Object.defineProperty(target, key, {
        get() {
            return value.toLowerCase()
        },
        set(val:string) {
            value = val
        }
    })
    
}


function eatAdd(target:any, key:string, descriptor:PropertyDescriptor) {
    console.log('~ eatAdd ~');
    let fn = target[key];
    descriptor.value = () => {
        console.log('before========================')
        fn()
        console.log('after========================')

    }
}
function param(target: any, keyName:string, index: number) {
    console.log(`~ param_${index} ~`)
}

@classAdd
class Person {
    say!:Function

    @UpperCase
    name:string = 'test'

    @lowerCase
    static subname:string = "Sub"

    @eatAdd
    eat(@param p1:string, @param p2:string) {
        console.log(p1,"================= eat ========================",'p2');
    }
}

let p = new Person();
p.say();
console.log(p.name);
p.eat('p1','p2');

export {}


