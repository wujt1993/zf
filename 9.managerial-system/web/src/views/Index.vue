<template>
    <el-container>
        <el-aside width="256px" v-if="isLogin">
            <Aside></Aside>
        </el-aside>
        <el-container v-if="isLogin">
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import request from "@/util/request";
import Header from "@/components/Header"
import Aside from "@/components/Aside"
export default {
    data() {
        return {
            isLogin: false,
            user: {}
        }
    },
    methods: {
        getInfo() {
            request({
                url: "/user/info",
                method: 'get'
            }).then((res)=>{
                sessionStorage.user = JSON.stringify(res.data)
                this.user = res.data
                this.isLogin = true
            }).catch((res)=>{
            })
        }
    },
    components: {
        Header,
        Aside
    },
    mounted() {
        this.getInfo()
    },
}
</script>
<style lang="scss">
    .el-container{
        width: 100%;
        height: 100%;
    }
    .el-header {
        background-color: #fff;
        border-bottom: 1px solid #001529
    }
    .el-main{
        background-color: #fff;
        
    }
    .el-aside {
        background-color: #001529;
        color: rgba(255, 255, 255, 0.7)
    }
</style>