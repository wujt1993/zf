const {SyncHook} = require("./tapable");
const hook = new SyncHook(["name"]);
hook.intercept({
    register: (tapInfo) =>{
        console.log("step1","拦截器1 开始 ~register", JSON.stringify(tapInfo));
        tapInfo.register1 = 'register1';
        return tapInfo
    },
    tap: (tapInfo) => {
        console.log("step3","拦截器1 开始 ~tap", JSON.stringify(tapInfo));

    },
    call: (name) => {
        console.log("step2","拦截器1 开始 ~call", name);
    }
})

hook.intercept({
    register: (tapInfo) =>{
        console.log("step1","拦截器2 开始 ~register", JSON.stringify(tapInfo));
        tapInfo.register1 = 'register1';
        return tapInfo
    },
    tap: (tapInfo) => {
        console.log("step3","拦截器2 开始 ~tap", JSON.stringify(tapInfo));

    },
    call: (name) => {
        console.log("step2","拦截器2 开始 ~call", name);
    }
})

hook.tap({name:'t1'}, (name)=>{
    console.log("1", name)
})
hook.tap({name:'t2'},(name)=>{
    console.log("2", name)
})

hook.call("zf");