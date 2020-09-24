var a = {a: 1}; 
// a ---> Object.prototype ---> null

var b = Object.create(a);
b.a = 2
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)
console.log(a)
var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); 