export const effect = (fn, options) =>{
    const effect = createReactiveEffect(fn);
    effect()
}

export const effectStack = [];
function createReactiveEffect(fn) {
    const effect = function reactiveEffect() {
        effectStack.push(effect)
        fn();
    }
    return effect;
}