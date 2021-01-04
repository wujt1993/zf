function Fibonacci(n) {
    if(n < 2) return n;
    let a = 0, b = 1, c;
    for(let i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b =c;
    }
    return c;
} 

for(let i = 0; i < 20; i++) {
    console.log(Fibonacci(i))
}