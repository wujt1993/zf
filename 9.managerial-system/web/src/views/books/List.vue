<template>
    <div class="book-list-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="书名">
                <el-input v-model="formInline.name" placeholder="书名" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onQuery" size="small" :loading="loading">查询</el-button>
                <el-button type="warning" @click="onInsert" size="small" :loading="loading">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%" :max-height="700">
            <el-table-column prop="logo" label="封面" width="120">
                <template slot-scope="scope">
                    <img width="108" height="108" :src="scope.row.logo">
                </template>
            </el-table-column>
            <el-table-column prop="name" :show-overflow-tooltip="true" label="书名" min-width="120"></el-table-column>
            <el-table-column prop="author" :show-overflow-tooltip="true" label="作者" min-width="120"></el-table-column>
            <el-table-column prop="count" :show-overflow-tooltip="true" label="可借阅数" min-width="120"></el-table-column>
            <el-table-column prop="role" :show-overflow-tooltip="true" label="分类" min-width="120">
                <template slot-scope="scope">
                    {{categoryObj[scope.row.category] || ''}}
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="200">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="primary" size="small" 
                        v-if="scope.row.role !== 2" :loading="loading">编辑</el-button>    
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
            <div>确定删除该书籍</div>
            <div slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="deleteBook" size="small">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="bookInfo.title"
            :visible.sync="dialogVisible1"
            width="480px">
            <div>
                <el-form ref="form" :model="bookInfo" label-width="80px">
                    <el-form-item label="封面">
                        <div class="upload-div" @click="handleUpload">
                            <div class="no-logo" v-if="!logoPic">+</div>
                            <img :src="logoPic" v-else>
                        </div>
                        <input type="file" style="display: none" ref="upload" @change="changeFile">
                    </el-form-item>
                    <el-form-item label="书名">
                        <el-input v-model="bookInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="bookInfo.author"></el-input>
                    </el-form-item>
                    <el-form-item label="编号">
                        <el-input v-model="bookInfo.bookno"></el-input>
                    </el-form-item>
                    <el-form-item label="ISBN">
                        <el-input v-model="bookInfo.ISBN"></el-input>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-select v-model="bookInfo.category" placeholder="请选择分类" style="width: 100%">
                            <el-option  v-for="(item, key) in categoryObj" :label="item" :key="key" :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="存放位置">
                        <el-input v-model="bookInfo.location"></el-input>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input v-model="bookInfo.count"></el-input>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input v-model="bookInfo.introduction" type="textarea"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
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
            formInline: {
                name: '',
                pageSize: 10,
                currentPage: 1
            },
            bookInfo: {
                title: '新增书籍',
                type: 'add',
                name: '',
                logo: '',
                author: '',
                category: '',
                bookno: '',
                location: '',
                introduction: '',
                ISBN: '',
                count: '',
                id: ''
            },
            total: 0,
            tableData: [],
            logoPic: null,
            loading: false,
            dialogVisible: false,
            dialogVisible1: false,
            categoryObj: {

            }
        }
    },
    methods: {
        handleEdit(data) {
            this.dialogVisible1 = true
            this.bookInfo = {
                title: '更新书籍',
                type: 'update',
                name: data.name,
                logo: '',
                author:  data.author,
                category:  data.category,
                bookno: data.bookno,
                location: data.location,
                introduction: data.introduction,
                ISBN: data.ISBN,
                count: data.count,
                id: data.id
            }
            this.logoPic = data.logo
        },
        deleteBook() {
            this.loading = true
            let id = this.bookInfo.id
            request({
                url: "/book/delete",
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
        deleteObj(id) {
            this.bookInfo.id = id
            this.dialogVisible = true
        },
        async onQueryCategory() {
            this.loading = true
            await request({
                url: "/bookCategory/queryAll",
                method: 'post',
            }).then(res=>{
                let data = res.data
                for(let i = 0; i < data.length; i++) {
                    this.categoryObj[data[i].value] = data[i].name
                }
            })
        },
        handleUpload() {
            this.$refs.upload.click()
        },
        changeFile(e) {
            this.bookInfo.logo = e.target.files[0]
            this.logoPic = getObjectURL(this.bookInfo.logo)
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
                url: "/book/queryByPage",
                method: 'post',
                data: getQsData(this.formInline)
            }).then(res=>{
                this.tableData = res.data.list
                this.total = res.data.total
                this.loading = false
            })
        },
        insertOrUpdate() {
            this.loading = true
            let url = '/book/insert'
            let obj = {
                name: this.bookInfo.name,
                logo: this.bookInfo.logo,
                author: this.bookInfo.author,
                category: this.bookInfo.category,
                bookno: this.bookInfo.bookno,
                location: this.bookInfo.location,
                introduction: this.bookInfo.introduction,
                ISBN: this.bookInfo.ISBN,
                count: this.bookInfo.count,
            }
            if(this.bookInfo.type == 'update') {
                url = '/book/update'
                obj.id = this.bookInfo.id 
            }
            request({
                url: url,
                method: 'post',
                data: getFormData(obj)
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
        onInsert() {
            this.bookInfo = {
                title: '新增书籍',
                type: 'add',
                name: '',
                logo: '',
                author: '',
                category: '',
                bookno: '',
                location: '',
                introduction: '',
                ISBN: '',
                count: '',
                id: ''
            }
            this.dialogVisible1 = true
        }
    },
    async mounted() {
        await this.onQueryCategory()
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