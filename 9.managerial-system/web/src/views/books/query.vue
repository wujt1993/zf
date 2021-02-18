<template>
    <div class="book-list-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="书名">
                <el-input v-model="formInline.name" placeholder="书名" size="small"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="formInline.category" placeholder="请选择分类" style="width: 100%">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item, key) in categoryObj" :label="item" :key="key" :value="key"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onQuery" size="small" :loading="loading">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="book-list-content">
            <div class="book-list-content-item" v-for="item in tableData" :key="item.id">
                <div>
                    <div class="item-left">
                        <img :src="item.logo">
                        <div class="item-count">剩余：{{item.count}}</div>
                        <div>
                            <el-button type="primary" size="small" style="width: 100%" 
                                :disabled="item.state == 0 || item.state == 1 || item.count <= 0 || item.state == 4" @click="handleApply(item.id)">
                                {{getState(item.state, item.count)}}
                            </el-button>
                        </div>
                    </div>
                    <div class="item-right">
                        <div>书名：{{item.name}}</div>
                        <div>类别：{{categoryObj[item.category]}}</div>
                        <div>作者：{{item.author}}</div>
                        <div>地点：{{item.location}}</div>
                        <div :title="item.introduction">简介：{{item.introduction}}</div>
                    </div>
                </div>
            </div>
        </div>
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
            title="申请借阅"
            :visible.sync="dialogVisible"
            width="480px">
            <div>
                <el-form ref="form" :model="borrowInfo" label-width="80px">
                    <el-form-item label="借阅时间">
                        <el-date-picker
                            v-model="borrowInfo.time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="borrowInfo.remark" type="textarea" placeholder="备注......" :rows="5"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="submitApply" size="small" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import request from "@/util/request"
import {getQsData} from "@/util/common"
import DateUtil from '@/util/date'
export default{
    data() {
        return {
            formInline: {
                name: '',
                category: '',
                pageSize: 10,
                currentPage: 1
            },
            total: 0,
            tableData: [],
            loading: false,
            categoryObj: {
            },
            dialogVisible: false,
            borrowInfo: {
                bookId: '',
                startTime: DateUtil.formatDate(new Date(), 'yyyy-MM-dd'),
                endTime: DateUtil.formatDate(DateUtil.getNextMonth(new Date()), 'yyyy-MM-dd'),
                time: [new Date(), DateUtil.getNextMonth(new Date())],
                remark: ''
            }
        }
    },
    watch: {
        'borrowInfo.time'() {
            if(this.borrowInfo.time) {
                this.borrowInfo.startTime = DateUtil.formatDate(this.borrowInfo.time[0], 'yyyy-MM-dd')
                this.borrowInfo.endTime = DateUtil.formatDate(this.borrowInfo.time[1], 'yyyy-MM-dd')
            }
        }
    },
    methods: {
        submitApply() {
            request({
                url: "/borrow/apply",
                method: 'post',
                data: getQsData(this.borrowInfo)
            }).then(res=>{
                this.$message({
                    message: '申请成功',
                    type: 'success'
                })
                this.dialogVisible = false
                this.onQuery()
            })
        },
        handleApply(id) {
            this.dialogVisible = true
            this.borrowInfo.bookId = id
        },
        getState(state, count) {
            if(count <= 0) {
                return '已借完'
            } 
            if(state == 0){
                return '审批中'
            } else if(state == 1) {
                return '已借阅'
            } else if(state == 4) {
                return '催还'
            } else {
                return '借阅'
            }
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
                url: "/borrow/queryAllBookByPage",
                method: 'post',
                data: getQsData(this.formInline)
            }).then(res=>{
                this.tableData = res.data.list
                this.total = res.data.total
                this.loading = false
            })
        },
    },
    async mounted() {
        await this.onQueryCategory()
        this.onQuery()
    }
}
</script>
<style lang="scss">
    .book-list-container{
        height: 100%;
        overflow: auto;
        .book-list-content{
            display: flex;
            flex-wrap: wrap;
            .book-list-content-item {
                width: 25%;
                padding: 12px;
                box-sizing: border-box;
                & > div{
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    padding: 12px;
                    height: 180px;
                    display: flex;
                    overflow: hidden;
                    .item-left {
                        width: 96px;
                        padding-right: 12px;
                        margin-right: 12px;
                        border-right: 1px solid #ccc;
                        img {
                            width: 100%;
                            height: 106px;
                        }
                        .item-count {
                            padding: 9px 0
                        }
                    }
                    .item-right {
                        flex: 1;
                        & > div{
                            margin-bottom: 6px;
                            overflow: hidden;
                            text-overflow: ellipsis; 
                            display: -webkit-box;
                            -webkit-line-clamp: 4;
                            -webkit-box-orient: vertical;
                            color: #333;
                        }
                    }
                }
            }
        }
    }
</style>