Promise.resolve(1)
.then(x=>x+1) // 2
.then(x=>{throw new Error('my error')})
.catch(()=>1) 
.then(x=>x+1) //2
.then(x=>console.log(x))
.catch(console.err)