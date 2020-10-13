<template>
    <div class="main">
        <div class="main_top">
            <div class="name">分类名：</div>
            <el-input v-model="input" class="work_name" placeholder="请输入内容"></el-input>
            <el-button class="query" type="primary">查询</el-button>
        </div>
        <div>
            <!-- 分类列表 -->

            <div class="user-list">
                <div class="text">
                    <div class="left">
                        <div class="left_all">
                            <ul class="left_top">
                                <li class="leftName title">分类名</li>
                                <li class="leftBtn title">操作</li>
                            </ul>
                            <ul class="left_top">
                                <li class="leftName title">分类名</li>
                                <li class="leftBtn title">操作</li>
                            </ul>
                        </div>

                        <div class="music">
                            <ul class="music-wap" v-for="(item,i) in list" :key="i">
                                <li class="leftName">{{item.fenlei}}</li>
                                <li class="leftBtn">
                                    <el-button type="primary" @click="translate(item)">修改</el-button>
                                </li>
                            </ul>

                        </div>

                    </div>
                </div>
                <div class="block">
                    <div class="foot">

                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next"
                            :total="1000">
                        </el-pagination>

                    </div>
                </div>
            </div>
            <add-classify ref="add"></add-classify>
        </div>
    </div>
</template>

<script>
import addClassify from './addClassify'
    export default {
        components:{
                addClassify,
        },
        data() {
            return {
                currentPage1: 5,
                input: '',
                currentPage2: 1, //分页
                list: [{
                        fenlei: "古典音乐"
                    },
                    {
                        fenlei: "摇滚"
                    },
                    {
                        fenlei: "古典音乐"
                    },

                    {
                        fenlei: "古典音乐"
                    },
                    {
                        fenlei: "流行"
                    },
                    {
                        fenlei: "安静"
                    },
                    {
                        fenlei: "伤感"
                    },
                    {
                        fenlei: "摇滚"
                    },
                    {
                        fenlei: "古典音乐"
                    },

                    {
                        fenlei: "古典音乐"
                    },
                    {
                        fenlei: "流行"
                    },
                    {
                        fenlei: "流行"
                    },

                ],
                alltableData: {
                    songNumber: 50,
                    pageNum: 1,
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            translate(val){
                this.$refs.add.openAdd(val)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        padding-left: 30px;
        //background-color: tomato;
        min-width: 1340px;
        height: 880px;

        .main_top {
            margin: 40px 0px 0px 20px;
            line-height: 50px;
            height: 50px;
            margin-bottom: 30px;
            //overflow: hidden;
            .query {
                float: right;
                margin-right: 19.25%;
            }
        }

        .name {
            float: left;
        }

        .work_name {
            width: 200px;
            height: 50px;
            float: left;
        }

        .name-flag {
            float: left;
            margin-left: 60px;
        }

        .select {
            float: left;
        }

        .user-list {
            padding-left: 90px;
            min-width: 500px;
            height: 880px;

            .text {
                width: 90%;
                display: flex;

                .left {
                    width: 100%;
                    box-sizing: border-box;
                    height: 500px;

                    .left_all {
                        display: flex;

                    }

                    .music {
                        display: flex;
                        height: 550px;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        align-content: flex-start;

                        .music-wap {
                            width: 50%;
                            height: 80px;
                        }
                    }

                    .left_top {
                        width: 50%;
                    }

                    ul {
                        display: flex;

                        .leftName {
                            width: 70%;
                            height: 50px;
                            line-height: 50px;
                        }

                        .leftBtn {
                            width: 20%;
                            height: 50px;
                            padding-right: 20%;
                            line-height: 50px;
                            text-align: center;
                        }
                    }

                    .title {
                        color: #909399;
                    }
                }
            }

            img {
                width: 100px;
                height: 100px;
            }


        }
    }

    .el-select-dropdown {
        top: 168px !important;
    }

    .block {
        width: 100%;
        position: relative;

        .foot {
            position: absolute;
            left: 30%;
            top: 40px;
        }
    }
</style>