<template>
    <div class="system-aside">
        <div class="system-title">
            <div>
                {{webName}}
            </div>
        </div>
        <div class="system-menu">
            <el-menu 
                :default-active="ativeUrl" 
                class="el-menu-vertical-demo"
                background-color="#001529"
                text-color="#fff"
                :router="true"
                active-text-color="#fff">
                <el-submenu :index="item.id" v-for="item in menu" :key="item.id">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item-group>
                        <template>
                            <div v-for="item1 in item.children" :key="item1.url">
                                
                                <el-menu-item  :index="item1.url" v-if="!item1.isHide">{{item1.name}}</el-menu-item>
                            </div>
                        </template>
                        
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            webName: '图书管理系统',
            ativeUrl: '',
            map: {},
            role: JSON.parse(sessionStorage.user).role,
            menu: []
        }
    },
    watch: {
        $route() {
            this.ativeUrl = this.$route.path
        }
    },
    methods: {
        initMenu() {
            this.menu = [
                {
                    id: "1",
                    name: '图书管理',
                    icon: 'el-icon-notebook-2',
                    children: [
                        {
                            name: '图书查询',
                            url: '/book/query'
                        },
                        {
                            name: '我的借阅',
                            url: '/book/myBorrow'
                        },
                        {
                            name: '借阅审批',
                            url: '/book/approval',
                            isHide: this.role == 0
                        },
                        {
                            name: '图书维护',
                            url: '/book/list',
                            isHide: this.role == 0
                        },
                        {
                            name: '图书分类',
                            url: '/book/category',
                            isHide: this.role == 0
                        }
                    
                    ]
                },
                {
                    id: "2",
                    name: '系统管理',
                    icon: 'el-icon-user',
                    children: [
                        {
                            name: '修改密码',
                            url: '/user/reset'
                        },
                        {
                            name: '用户管理',
                            url: '/user/List',
                            isHide: this.role !== 2
                        }
                    ]
                }
            ] 
        }
    },
    mounted() {
        this.ativeUrl = this.$route.path
        this.initMenu()
    }
}
</script>
<style lang="scss">
    .system-aside{
        height: 100%;
        width: 100%;
        overflow: hidden;
        .system-title{
            height: 74px;
            padding: 15px;
            box-sizing: border-box;
            & > div{
                height: 44px;
                line-height: 44px;
                width: 192px;
                margin: 0 auto;
                color: #fff;
                text-align: center;
                background: #2d8cf0;
                border-radius: 12px 0 12px 0;
                font-size: 1.5rem;
                letter-spacing: 3px;
                font-weight: bold;
            }
        }
        .system-menu {
            height: calc(100% - 74px);
            overflow: auto;
            .num-tip {
                position: absolute;
                right: 32px;
                font-size: 12px;
                background: red;
                width: 18px;
                height: 18px;
                line-height: 18px;
                text-align: center;
                border-radius: 50%;
                top: 16px;
            }
        }
    }
    .el-menu-item.is-active{
        background: #2d8cf0 !important;
    }
    .el-submenu__title i{
        color:#fff
    }
</style>