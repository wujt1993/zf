const Hook = require("./Hook");
const HookCodeFactory = require("./hookCodeFactory");

class SyncHookCodeFactory extends HookCodeFactory {
    content({onDone}) {
        return this.callTapsSeries({onDone})
    }
}

const factory = new SyncHookCodeFactory();

class SyncHook extends Hook{

    compile(options) {
        factory.setup(this, options);
        return factory.create(options);
    }
}

module.exports = SyncHook;