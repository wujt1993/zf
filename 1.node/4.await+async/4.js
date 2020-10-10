console.log(1);
async function async () {
    console.log(2);
    //  new Promise((resolve)=>resolve().then();
    // 默认新版本 await 后面的代码 相当于后面会把await下面的代码放到then中
    // 老的版本 会被解析出两个then
    await console.log(3)// Promise.resolve( console.log(3);).then()
    console.log(4)
}
setTimeout(() => {
	console.log(5);
}, 0);
const promise = new Promise((resolve, reject) => {
    console.log(6);
    resolve(7)
})
promise.then(res => {
	console.log(res)//7
})
async(); 
console.log(8);

//1 - 6 - 2 - 3 - 8 - 7 - 4 - 5

