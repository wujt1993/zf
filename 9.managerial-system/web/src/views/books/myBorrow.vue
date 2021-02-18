<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="状态">
                <el-select v-model="formInline.state" placeholder="请选择状态" style="width: 100%" size="small">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item, key) in stateObj" :label="item" :key="key" :value="key"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onQuery" size="small" :loading="loading">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%" :max-height="700">
            <el-table-column prop="name" :show-overflow-tooltip="true" label="书名" min-width="120"></el-table-column>
            <el-table-column prop="time" :show-overflow-tooltip="true" label="借阅日期" width="120">
                <template slot-scope="scope">
                    {{formatDate(scope.row.startTime)}}
                </template>
            </el-table-column>
            <el-table-column prop="time" :show-overflow-tooltip="true" label="归还日期" width="120">
                <template slot-scope="scope">
                    {{formatDate(scope.row.endTime)}}
                </template>
            </el-table-column>
            <el-table-column prop="time" :show-overflow-tooltip="true" label="状态" min-width="120">
                <template slot-scope="scope">
                    {{getState(scope.row.state, scope.row.startTime, scope.row.endTime)}}
                </template>
            </el-table-column>
            <el-table-column prop="remark" :show-overflow-tooltip="true" label="备注" min-width="120">
            </el-table-column>
            <el-table-column label="操作" min-width="120">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" v-if="scope.row.state==1 || scope.row.state==4"
                        @click="handleRenew(scope.row.sId,scope.row.startTime, scope.row.endTime)">续借</el-button>
                    <!-- <el-button type="primary" size="small" v-if="scope.row.state==2 || scope.row.state==3"
                        @click="handleRenew(scope.row.id, scope.row.endTime, 'apply')">借阅</el-button>     -->
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
            title="申请续借"
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
                <el-button type="primary" @click="submitRenew" size="small" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import request from "@/util/request";
import {getQsData} from "@/util/common";
import DateUtil from '@/util/date'
export default {
    data() {
        return  {
            formInline: {
                state: '',
                pageSize: 10,
                currentPage: 1
            },
            stateObj: {
                "0": '申请中',
                "1": '通过',
                "2": '拒绝',
                "3": '已归还',
                "4": '催还',
                "5": '申请续借中'
            },
            total: 0,
            tableData: [],
            loading: false,
            borrowInfo: {
                id: '',
                startTime: '',
                endTime: '',
                time: '',
                remark: '',
            },
            dialogVisible: false
        }
    },
    methods: {
        submitRenew() {
            request({
                url: "/borrow/renew",
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
        handleRenew(id, startTime, endTime) {
            endTime = DateUtil.formatDate(DateUtil.getNextMonth(DateUtil.nextDate(endTime)), 'yyyy-MM-dd')
            this.borrowInfo = {
                id: id,
                startTime: startTime,
                endTime: endTime,
                time: [startTime, endTime],
                remark: this.borrowInfo.remark,
            }
            this.dialogVisible = true
        },
        getState(state, startTime, endTime) {
            if(state ==0) {
                return '申请中'
            }else if(state == 1) {
                let day = Math.ceil((new Date(endTime) - new Date()) / 3600 / 24 / 1000)
                let day1 = Math.ceil((new Date() - new Date(startTime)) / 3600 / 24 / 1000)
                if(day < 0) {
                    return '已逾期' + (day) + '天'
                }else {
                    if(day1 < 0) return '已借阅0天'
                    return '已借阅' + (day1) + '天'
                }
            }else if(state == 2) {
                return '拒绝'
            }else if(state == 3) {
                return '已归还'
            }else if(state == 4) {
                return '催还'
            }else if(state == 5) {
                return '申请续借中'
            }
        },
        formatDate(date, format="yyyy-MM-dd") {
            return DateUtil.formatDate(date, format)
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
                url: "/borrow/myApply",
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