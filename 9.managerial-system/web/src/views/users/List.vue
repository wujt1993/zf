<template>
    <div class="user-list-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="formInline.name" placeholder="姓名" size="small"></el-input>
            </el-form-item>
            <el-form-item label="学号">
                <el-input v-model="formInline.workno" placeholder="学号" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onQuery" size="small" :loading="loading">查询</el-button>
                <el-button type="warning" @click="onInsert" size="small" :loading="loading">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%" :max-height="700">
            <el-table-column prop="name" :show-overflow-tooltip="true" label="姓名" min-width="120"></el-table-column>
            <el-table-column prop="workno" :show-overflow-tooltip="true" label="学号" min-width="120"></el-table-column>
            <el-table-column prop="role" :show-overflow-tooltip="true" label="角色" width="120">
                <template slot-scope="scope">
                    {{roleObj[scope.row.role]}}
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="200">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row.id, 1, scope.row.role)" type="primary" size="small" 
                        v-if="scope.row.role === 0" :loading="loading">设 为 管 理 员</el-button>
                    <el-button @click="handleClick(scope.row.id, 0, scope.row.role)" type="primary" size="small" 
                        v-if="scope.row.role === 1" :loading="loading">设为普通用户</el-button> -->
                    <el-button @click="handleEdit(scope.row)" type="primary" size="small" 
                        v-if="scope.row.role !== 2" :loading="loading">编辑</el-button>    
                    <el-button @click="resetPassword(scope.row)" type="warning" size="small" 
                        v-if="scope.row.role !== 2" :loading="loading">重置密码</el-button>
                    <el-button type="danger" size="small" v-if="scope.row.role !== 2" @click="deleteObj(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="margin-top: 12px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="formInline.pageSize"
            layout="total,sizes, prev, pager, next"
            :total="total">
        </el-pagination>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="308px">
            <div>确定删除该用户</div>
            <div slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="deleteUser" size="small">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="userInfo.title"
            :visible.sync="dialogVisible1"
            width="468px">
            <div>
                <el-form ref="form" :model="userInfo" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="userInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="工号">
                        <el-input v-model="userInfo.workno" :disabled="userInfo.type=='update'"></el-input>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-select v-model="userInfo.role" placeholder="请选择角色" style="width: 100%">
                            <el-option label="普通用户" :value="0"></el-option>
                            <el-option label="管理员" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
                <el-button type="primary" @click="insertOrUpdate" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import request from "@/util/request";
import {getQsData} from "@/util/common";
export default {
    data() {
        return {
            formInline: {
                name: '',
                workno: '',
                pageSize: 10,
                currentPage: 1
            },
            tableData: [],
            total: 0,
            loading: false,
            dialogVisible: false,
            dialogVisible1: false,
            userInfo: {
                title: '新增用户',
                type: 'add',
                name: '',
                workno: '',
                role: 0,
                id: ''
            },
            roleObj: {
                0: '普通用户',
                1: '管理员',
                2: '超级管理员'
            }
        }
    },
    methods: {
        onInsert() {
            this.dialogVisible1 = true
            this.userInfo = {
                title: '新增用户',
                type: 'add',
                name: '',
                workno: '',
                role: 0,
                id: ''
            }
        },
        handleEdit(data) {
            this.dialogVisible1 = true
            this.userInfo = {
                title: '更新用户',
                type: 'update',
                name: data.name,
                workno: data.workno,
                role: data.role,
                id: data.id
            }
        },
        insertOrUpdate() {
            this.loading = true
            let url = '/user/insert'
            let obj = {
                name: this.userInfo.name,
                workno: this.userInfo.workno,
                role: this.userInfo.role,
            }
            if(this.userInfo.type == 'update') {
                url = 'user/update'
                obj.id = this.userInfo.id
            }
            request({
                url: url,
                method: 'post',
                data: getQsData(obj)
            }).then(res=>{
                this.$message({
                    message: '操作成功',
                    type: 'success'
                })
                this.onQuery()
                this.loading = false
                this.dialogVisible1 = false
            })
        },
        deleteObj(id) {
            this.userInfo.id = id
            this.dialogVisible = true
        },
        deleteUser() {
            this.loading = true
            let id = this.userInfo.id
            request({
                url: "/user/delete",
                method: 'post',
                data: getQsData({id})
            }).then(res=>{
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.onQuery()
                this.loading = false
                this.dialogVisible = false
            })
        },
        resetPassword(data) {
            this.loading = true
            let {id, salt} = data
            request({
                url: "/user/reset",
                method: 'post',
                data: getQsData({id, salt})
            }).then(res=>{
                this.$message({
                    message: '设置成功',
                    type: 'success'
                })
                this.onQuery()
                this.loading = false
            })
        },
        handleClick(id, role, oldRole) {
            this.loading = true
            request({
                url: "/user/setRole",
                method: 'post',
                data: getQsData({id, role, oldRole})
            }).then(res=>{
                this.$message({
                    message: '设置成功',
                    type: 'success'
                })
                this.onQuery()
                this.loading = false
            })
        },
        handleSizeChange(val) {
            this.formInline.pageSize = val
            this.formInline.currentPage = 1
            this.onQuery()
        },
        handleCurrentChange(val) {
            this.formInline.currentPage = val
            this.onQuery()
        },
        onQuery() {
            this.loading = true
            request({
                url: "/user/queryByPage",
                method: 'post',
                data: getQsData(this.formInline)
            }).then(res=>{
                this.tableData = res.data.list
                this.total = res.data.total
                this.loading = false
            })
        }
    },
    mounted() {
        this.onQuery()
    }
}
</script>