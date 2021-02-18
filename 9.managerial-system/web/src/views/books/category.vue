<template>
    <div class="book-list-container">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="warning" @click="onInsert" size="small" :loading="loading">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%" :max-height="500">
            <el-table-column prop="name" :show-overflow-tooltip="true" label="名称" min-width="120"></el-table-column>
            <el-table-column prop="value" :show-overflow-tooltip="true" label="值" min-width="120"></el-table-column>
            <el-table-column label="操作" min-width="200">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="primary" size="small" 
                        v-if="scope.row.role !== 2" :loading="loading">编辑</el-button>    
                    <el-button type="danger" size="small" v-if="scope.row.role !== 2" @click="deleteObj(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible1"
            width="308px">
            <div>确定删除该分类</div>
            <div slot="footer">
                <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
                <el-button type="primary" @click="deleteBookCategory" size="small">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="bookCategoryInfo.title"
            :visible.sync="dialogVisible"
            width="480px">
            <div>
                <el-form ref="form" :model="bookCategoryInfo" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="bookCategoryInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="值">
                        <el-input v-model="bookCategoryInfo.value"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="insertOrUpdate" size="small" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import request from "@/util/request";
import {getObjectURL, getFormData, getQsData} from "@/util/common";
export default{
    data() {
        return {
            bookCategoryInfo: {
                title: '新增分类',
                type: 'add',
                name: '',
                value: '',
                id: ''
            },
            total: 0,
            tableData: [],
            loading: false,
            dialogVisible: false,
            dialogVisible1: false,
        }
    },
    methods: {
        deleteObj(id) {
            this.bookCategoryInfo.id = id
            this.dialogVisible1 = true
        },
        deleteBookCategory() {
            this.loading = true
            let id = this.bookCategoryInfo.id
            request({
                url: "/bookCategory/delete",
                method: 'post',
                data: getQsData({id})
            }).then(res=>{
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.onQuery()
                this.loading = false
                this.dialogVisible1 = false
            })
        },
        onQuery() {
            this.loading = true
            request({
                url: "/bookCategory/queryAll",
                method: 'post',
            }).then(res=>{
                this.tableData = res.data
                this.loading = false
            })
        },
        insertOrUpdate() {
            this.loading = true
            let url = '/bookCategory/insert'
            let obj = {
                name: this.bookCategoryInfo.name,
                value: this.bookCategoryInfo.value,
            }
            if(this.bookCategoryInfo.type == 'update') {
                url = '/bookCategory/update'
                obj.id = this.bookCategoryInfo.id 
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
                this.dialogVisible = false
            })
        },
        handleEdit(data) {
            this.dialogVisible = true
            this.bookCategoryInfo = {
                title: '更新分类',
                type: 'update',
                name: data.name,
                value: data.value,
                id: data.id
            }
        },
        onInsert() {
            this.bookCategoryInfo = {
                title: '新增分类',
                type: 'add',
                value: '',
                id: ''
            }
            this.dialogVisible = true
        }
    },
    async mounted() {
        this.onQuery()
    }
}
</script>
<style lang="scss">
    .upload-div {
        width: 108px;
        height: 108px;
        cursor: pointer;
        .no-logo {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 1px solid #ccc;
            line-height: 106px;
            text-align: center;
            font-size: 48px;
            color: #ccc;
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>