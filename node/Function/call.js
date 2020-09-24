Function.prototype.call = function(context) {
    context = context ? Object(context) : window;
    context.fn = this;
    let args = [];
    for(let i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    let r = context.fn(...args);
    delete context.fn;
    return r;
}

// function fn1() {
//     console.log(this, arguments)
// }

// fn1.call(this, 1,2,3);

/**
 * call的特点
 * 1）可以改变我们当前函数的this指向
 * 2）还会让当前函数执行
 */

 function fn2() {
     console.log("2")
 }
 function fn3() {
     console.log("3")
 }

//  fn2.call(fn3) // 2
fn2.call.call(fn3)//3


