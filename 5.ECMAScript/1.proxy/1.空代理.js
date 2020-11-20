let target = {
    id: 1
}

let handler = {

}

let proxy = new Proxy(target, handler);


//id 属性会访问同一个值
console.log(target.id); // 1
console.log(proxy.id); // 1

//目标对象赋值 会影响代理对象
target.id = 2;
console.log(proxy.id);//2

//代理对象赋值 会影响目标对象
proxy.id = 3;
console.log(target.id);//3

// hasOwnProperty()方法在两个地方
// 都会应用到目标对象
console.log(target.hasOwnProperty('id')); // true
console.log(proxy.hasOwnProperty('id')); // true


// Proxy.prototype 是 undefined
// 因此不能使用 instanceof 操作符
// console.log(target instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check
// console.log(proxy instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check


// 严格相等可以用来区分代理和目标
console.log(target == proxy); // false
console.log(target === proxy); // false