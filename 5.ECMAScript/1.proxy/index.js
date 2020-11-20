let target = {
    id: 1,
    obj: {
        name: 'target'
    }
}

let handler = {
    // 捕获器在处理程序对象中以方法名为键
    //只有在代理对象上获取对象才会触发捕获器。在目标对象上执行这些操作仍然会产生正常的行为。
    get() {
        return 'proxy id'
    }
}

let proxy = new Proxy(target, handler);

console.log(target.id); // 1
console.log(proxy.id); // 'proxy id'

console.log(Object.create(target)['id']); // 1
console.log(Object.create(proxy)['id']); // 'proxy id'