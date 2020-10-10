function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();

console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());



function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}

var b = foo(5);
console.log(b.next())//{value:6, done: false}    x=5
console.log(b.next(12))//{value: 8, done: false}  y=24
console.log(b.next(13)) // {value: 42, done: true} z=13