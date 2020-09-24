let obj = {
    name: "hello"
}

function fn() {
    console.log(this.name)
}
fn();
fn.bind(obj)();