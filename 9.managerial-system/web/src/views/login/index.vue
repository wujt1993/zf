<template>
    <div class="login-container">
        <div class="login-title">欢迎来到图书馆</div>
        <div class="login-form">
            <el-form :model="user" class="demo-form-inline">
                <el-form-item label="学号">
                    <el-input v-model="user.workno" placeholder="请输入学号" size="small"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="user.password" type="password" placeholder="请输入密码" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" size="small" style="width: 100%" :loading="loading">登录</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="default" @click="onRegister" size="small" style="width: 100%">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import request from "@/util/request";
import {getQsData} from "@/util/common";
export default {
    data() {
        return {
            user: {
                password: '123456',
                workno: '19500000'
            },
            loading: false
        }
    },
    methods: {
        onRegister() {
            this.$router.push("/register");
        },
        onSubmit() {
            this.loading = true
            request({
                url: "/user/login",
                method: 'post',
                data: getQsData({
                    workno: this.user.workno,
                    password: this.user.password
                }),
            }).then((res)=>{
                this.$router.push("/")
                this.loading = false
            }).catch((res)=>{
                this.loading = false
            })
        }
    }
}
</script>
<style lang="scss">
    .login-container {
        width: 22rem;
        margin: 9rem auto;
        .login-title {
            text-align: center;
            font-size: 1.5rem;
        }
        .login-form {
            margin-top: 1.25rem;
            padding: 1.25rem;
            background: #f6f8fa;
            border: 1px solid #eaecef;
            border-radius: 6px;
        }
        .el-form-item__label {
            line-height: 24px;
        }
    }
</style>