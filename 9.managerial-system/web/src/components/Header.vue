<template>
    <div class="system-header">
        <div class="left-part">
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-submenu index="1">
                <template slot="title">{{username}}</template>
                <el-menu-item index="1-1">退出</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
    
</template>
<script>
import request from "@/util/request";
export default {
    data() {
        return {
            activeIndex: "1",
            moduleName: [],
            username: ''
        }
    },
    computed: {
    },
    methods: {
        handleSelect() {
            request({
                url: "/user/logout",
                method: 'get'
            }).then((res)=>{
                this.$router.push("/login")
            }).catch((res)=>{
            })
        },
    },
    mounted() {
        let user = sessionStorage.user ? JSON.parse(sessionStorage.user) : {}
        this.username = user.name
    }
}
</script>
<style lang="scss">
    .system-header{
        height: 100%;
        width: 100%;
        display: flex;
        line-height: 1;
        .left-part{
            flex: 1;
        }
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title{
        color: #333333
    }
</style>
