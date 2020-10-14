
let o = {}
/**
 * __defineGetter__ 非标准、一般使用 Object.defineProperty代替
 */
// o.__defineGetter__("name", function() {
//     return 'zf'
// })

Object.defineProperty(o, "name", {
    get() {
        return 'zf';
    }
})

console.log(o.name)

/**
 * __defineSetter__ 非标准、一般使用 Object.defineProperty代替
 */

// o.__defineSetter__("age", function(val) {
//     this._age = val + 1;
// })


Object.defineProperty(o, "age", {
    set(val) {
        this._age = val + 1
    }
})

o.age = 10;
console.log(o._age)