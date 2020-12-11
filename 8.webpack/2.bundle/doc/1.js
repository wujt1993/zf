console.log(Object.prototype.toString.call("1")); // [object String]
let Person = {}
console.log(Object.prototype.toString.call(Person)); // [object Object]
Object.defineProperty(Person,Symbol.toStringTag, {value:'person'});
console.log(Object.prototype.toString.call(Person)); // [object person]