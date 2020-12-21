(function anonymous(name
) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    _fn0(name);
    var _fn1 = _x[1];
    _fn1(name);
})
let fn = new Function('a', 'return 1');
console.log(fn())