export default {
    name:'router-link',
    props: {
        to: {
            type: String,
            require: true
        },
        tag: {
            type: String,
            default: 'a'
        }
    },
    render(h) {
        let tag = this.tag;
        return <tag onClick={()=>{
            this.$router.push(this.to)
        }}>{this.$slots.default}</tag>
        // console.log(this.$slots)
        // return h(this.tag, {}, this.$slots.default)
    }
}