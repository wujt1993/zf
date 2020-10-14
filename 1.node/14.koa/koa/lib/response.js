module.exports = {
    _body: undefined,
    get body() {
        return this._body;
    },
    set body(val) {
        this.res.statusCode = 200;
        this._body = val;
    }
}