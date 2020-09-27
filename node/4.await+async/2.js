Promise.resolve().then(() => {
    console.log("then1");
    Promise.resolve().then(() => {
        console.log("then1-1");
        return Promise.resolve(); // x.then().then()
    }).then(() => {
        console.log("then1-2");
    });
})
.then(() => {
    console.log("then2");
})
.then(() => {
    console.log("then3");
})
.then(() => {
    console.log("then4");
})
.then(() => {
    console.log("then5");
})

//then1 then1-1 then2 then3 then4 then1-2 then5