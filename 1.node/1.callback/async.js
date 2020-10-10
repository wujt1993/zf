//异步处理一般采用回调方式解决

function _println(times, callback) {
    return () => {
        --times == 0 && callback()
    }
    
}

let println = _println(2, ()=>{
    console.log(obj)
})
let obj = {}
setTimeout(()=>{
    obj.name = "test";
    println()
}, Math.random() * 1000)

setTimeout(()=>{
    obj.age = 1;
    println()
}, Math.random() * 1000)