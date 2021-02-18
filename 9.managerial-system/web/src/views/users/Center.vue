<template>
    <div class="useer-reset-container">
        <el-form class="demo-form-inline">
            <el-form-item v-for="item in user" :label="item.title" :key="item.name">
                <el-input v-model="item.value" :placeholder="item.placeholder" :type="item.type"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width:100%;">确定</el-button>
            </el-form-item>
        </el-form>
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
                    id: '2',
                    title: '原密码',
                    placeholder: '请输入原密码',
                    require: true,
                    type: 'password',
                    size: 'small',
                    name: 'password',
                    value: ''
                },
                {
                    id: '3',
                    title: '新密码',
                    placeholder: '请输入新密码',
                    require: true,
                    type: 'password',
                    size: 'small',
                    name: 'newPassword',
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
        onSubmit() {
            let obj = checkData(this.user)
            if(!obj) return
            this.loading = true
            request({
                url: "/user/resetPassword",
                method: 'post',
                data: getQsData(obj)
            }).then((res)=>{
                this.$message({
                    message: '重置成功',
                    type: 'success'
                })
                this.$router.push("/login")
            }).catch((res)=>{
                this.loading = false
            })
        }
    }
}
</script>
<style lang="scss">
    .useer-reset-container {
        width: 22rem;
        margin: 3rem auto;
        padding: 1.25rem;
        background: #f6f8fa;
        border: 1px solid #eaecef;
        border-radius: 6px;
    }
</style>