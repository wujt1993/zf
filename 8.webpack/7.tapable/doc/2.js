(function anonymous(name, _callback
) {
    "use strict";
    var _x = this._x;
        var _counter = 2;
        var _done = (function () {
            _callback();
        });
        var _fn0 = _x[0];
        _fn0(name, (function (_err0) {
            if (_err0) {
                if (_counter > 0) {
                    _callback(_err0);
                    _counter = 0;
                }
            } else {
                if (--_counter === 0) _done();
            }
        }));

})