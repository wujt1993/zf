async function fn1() {
    let a = 1;
    await new Promise((resolve, reject)=>{
        setTimeout(()=>{
            a=100
            resolve("ok")
        },1000)
        
    }).then(data=>{
        a = 300
    }).then(data=>{
        setTimeout(()=>{
            a = 400
        })
    });
    return a
    // console.log(res)
}

fn1().then(data=>{
    console.log(data)
})

