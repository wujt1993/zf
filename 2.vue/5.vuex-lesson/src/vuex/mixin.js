function vueInit() {
    if(this.$options.store) {
        this.$store = this.$options.store
    }else if(this.$parent && this.$parent.$store) {
        this.$store = this.$parent.$store
    }
}

export const applyMixin = (Vue) => {
    Vue.mixin({
        beforeCreate: vueInit
    })
}