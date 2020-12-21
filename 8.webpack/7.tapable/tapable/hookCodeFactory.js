class HookCodeFactory {


    setup(hookInstance, options) {
        //映射出来一个回调函数的数组赋给 hooks实例的_x属性
        //_x才是真正回调函数的数组
        hookInstance._x = options.taps.map(item=>item.fn);
    }

    init(options) {
        this.options = options;
    }
    deinit() {
        this.options = null;
    }
    args(options={}) {
        let {before, after} = options;
        let allArgs = this.options.args || [];
        if(before) allArgs = [...before, ...allArgs];
        if(after) allArgs = [...allArgs, after];
        if(allArgs.length > 0) {
            return allArgs.join(", ")
        }
        return ""
    }

    header() {
        let code = "";
        code = `
            var _x = this._x;
            
        `;
        if(this.options.interceptors.length > 0) {
            code += `
                var _taps = this.taps;\n
                var _interceptors = this.interceptors;\n
            `
        }
        for(let i = 0; i < this.options.interceptors.length; i++) {
            const interceptor=this.options.interceptors[i];
            if(interceptor.call){
                code += `_interceptors[${i}].call(${this.args({
                    before:interceptor.context?"_context":undefined
                })});\n`;
            }
        }
        return code;
    }
    create(options) {
        this.init(options);
        let fn;

        switch(this.options.type){
            case 'sync':
                fn = new Function(
                    this.args(),
                    this.header() + this.content({
                        onDone: ()=>""
                    })
                );
                break;
            case 'async': 
                fn = new Function(
                    this.args({after: '_callback'}),
                    this.header() + this.content({
                        onDone: () => "_callback()\n"
                    })
                )
            case 'promise':
                let content = `
                    return new Promise((function (_resolve, _reject) {
                        ${this.content({
                            onDone: () => "_resolve();\n"
                        })}
                    }));
                `;
                fn = new Function(
                    this.args(),
                    this.header() + content
                )    
        }

        this.deinit();
        return fn;
    }

    callTapsParallel({onDone}) {
        let code = "";
        code += `
            var _counter = ${this.options.taps.length};\n
            var _done = (function () {
                ${onDone()}
            });
        `
        for(let i=0;i<this.options.taps.length;i++){
            const done = () => `if (--_counter === 0) _done();\n`;

            code += this.callTap(i, {onDone: done})
        }
        return code;
    }
    callTapsSeries({onDone}) {
        if(this.options.taps.length == 0) {
            return onDone();
        }
        let code = "";
        let current = onDone;
        for(let i = this.options.taps.length - 1; i >= 0; i--){
            const content = this.callTap(i,{onDone:current});
            current = () => content;
        }

        code += current();
        return code;
    }

    callTap(tapIndex, {onDone}) {

        let code = "";
        let tap = this.options.taps[tapIndex];
        code += `var _fn${tapIndex} = _x[${tapIndex}];`

        for(let i = 0; i < this.options.interceptors.length; i++) {
            const interceptor=this.options.interceptors[i];
            code += `var _tap${tapIndex} = _taps[${tapIndex}];`;
            if(interceptor.tap){
                code += `_interceptors[${i}].tap(_tap${tapIndex});`;
            }
        }
        switch(tap.type) {
            case 'sync': 
                if(onDone) {
                    code += `_fn${tapIndex}(${this.args()});`
                    code += onDone();
                }
                break;
            case 'async': 
                let cbCode = `
                function (_err${tapIndex}) {
                    if (_err${tapIndex}) {
                        _callback(_err${tapIndex});
                    } else {
                        ${onDone()}
                    }
                }
                `;
                code+=`_fn${tapIndex}(${this.args({after:cbCode})});`; 
                break;   
            case 'promise':
                code += `
                    var _promise${tapIndex} = _fn${tapIndex}(${this.args()});
                    _promise${tapIndex}.then(
                        function () {
                            ${onDone()}
                        }
                    );
                `; 
                break

        }
        return code;
    }
}

module.exports = HookCodeFactory;