<template>
    <div class="login-container">
        <div class="login-title">欢迎来到图书馆</div>
        <div class="login-form">
            <el-form class="demo-form-inline">
                <el-form-item :label="item.title" v-for="item in user" :key="item.name">
                    <el-input v-model="item.value" :placeholder="item.placeholder" size="small" :type="item.type"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" size="small" style="width: 100%" :loading="loading">注册</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="default" @click="onLogin" size="small" style="width: 100%">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import request from "@/util/request";
import {getQsData, checkData, setItem} from "@/util/common";
export default {
    data() {
        return {
            user: [
                {
                    id: '1',
                    title: '姓名',
                    placeholder: '请输入姓名',
                    require: true,
                    type: 'text',
                    size: 'small',
                    name: 'name',
                    value: ''
                },
                {
                    id: '2',
                    title: '学号',
                    placeholder: '请输入学号',
                    require: true,
                    type: 'text',
                    size: 'small',
                    name: 'workno',
                    value: ''
                },
                {
                    id: '3',
                    title: '密码',
                    placeholder: '请输入密码',
                    require: true,
                    type: 'password',
                    size: 'small',
                    name: 'password',
                    value: ''
                },
                {
                    id: '4',
                    title: '确认密码',
                    placeholder: '请输入确认密码',
                    require: true,
                    type: 'password',
                    size: 'small',
                    name: 'confirmPassword',
                    value: '',
                    notNeed: true,
                    callback: (current, cb) => {
                        setItem('3', (item)=>{
                            if(current.value !== item.value) {
                                cb('确认密码与密码不一致')
                            }else{
                                cb()
                            }
                            
                        }, this.user)
                    }
                }
            ],
            loading: false
        }
    },
    methods: {
        onLogin() {
            this.$router.push("/login")
        },
        onSubmit() {
            let obj = checkData(this.user)
            if(!obj) return
            this.loading = true
            request({
                url: "/user/register",
                method: 'post',
                data: getQsData(obj)
            }).then((res)=>{
                this.$message({
                    message: '注册成功',
                    type: 'success'
                })
                this.loading = false
                this.$router.push("/login")
            }).catch((res)=>{
                this.loading = fasle
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