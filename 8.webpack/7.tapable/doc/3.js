(function anonymous(name
) {
    "use strict";
    var _context;
    var _x = this._x;
    return new Promise((function (_resolve, _reject) {
            var _counter = 2;
            var _done = (function () {
                _resolve();
            });
            if (_counter <= 0) break;
            var _fn0 = _x[0];
            var _hasResult0 = false;
            var _promise0 = _fn0(name);
            _promise0.then((function (_result0) {
                if (--_counter === 0) _done();
            }), function (_err0) {
                if (_counter > 0) {
                    _error(_err0);
                    _counter = 0;
                }
            });
    }));

})