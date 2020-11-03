export default {
    functional: true,
    name: 'router-view',
    render(h, { data, parent }) { // class组件 Vue.extend  函数式组件 函数可以节省性能 缺陷就是没有实例
        let route = parent.$route; // 会做依赖收集了
        let depth = 0;
        let records = route.matched; // []
        data.routerView = true; // 渲染router-view时标记他是一个routerView

        // 看之前渲染过几个router-view 父 -> 子

        while (parent) { // _vnode 
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++;
            }
            parent = parent.$parent;
        }
        let record = records[depth];
        if (!record) {
            return h();
        }
        return h(record.component, data)
    }
}