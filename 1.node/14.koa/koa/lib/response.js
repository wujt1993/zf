module.exports = {
    _body:undefined,
    get body(){
        return this._body;
    },
    set body(val){
        this.res.statusCode = 200; // 更改状态码是200
        this._body = val;
    }
}