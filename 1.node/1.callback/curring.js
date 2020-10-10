//固定参数
const curring = (fn, arr=[]) =>{
    let len = fn.length;
    return function(...args) {
        let newArr = [...arr, ...args]
        if(newArr.length === len) {
            return fn(...newArr)
        } else {
            return curring(fn, newArr);
        }
        
    }
}

function add(a,b,c,d,e) {
    console.log(a+b+c+d+e);
}

let newAdd = curring(add);


//不固定参数
function add() {
    let _args = Array.prototype.slice.call(arguments);
    let _adder = function() {
        _args = [..._args, ...arguments];
        return _adder
    }
    _adder.toString = function() {
        return _args.reduce((a,b)=>{
            return a + b
        })
    }
    return _adder;
}
console.log(add(1)(2))