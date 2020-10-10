<template>
    <div class="main">
        <div class="main_top">
            <div class="name">用户名：</div>
            <el-input v-model="input" class="work_name" placeholder="请输入内容"></el-input>
            <div class="block time">
                <span class="demonstration">时间：</span>
                <el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions"
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                </el-date-picker>
            </div>
            <template>
                <div class="name-flag">状态：</div>
                <div class="select">
                    <el-select v-model="value" clearable placeholder="请选择">
                        <el-option class="select_sun" v-for="item in options" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </template>
            <el-button type="primary" class="btn">查询</el-button>
        </div>
        <div class="all_btn">
            <el-button type="primary" class="btn">通过</el-button>
            <el-button type="primary" class="btn">屏蔽</el-button>
        </div>
        <!-- 管理员列表 -->
        <div class="user-list">
            <el-table ref="multipleTable" :data="tableData" height="470" style="width: 96%" tooltip-effect="dark"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="用户名" prop="account">

                </el-table-column>
                <el-table-column label="评论内容" prop="name">

                </el-table-column>
                <el-table-column label="评论时间" prop="remak">

                </el-table-column>
                <el-table-column prop="state" label="状态">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" class="btn">详情</el-button>
                        <el-button size="mini" v-if="scope.row.state==0" type="success"
                            @click="handleEdit(scope.$index, scope.row)">通过</el-button>
                        <el-button size="mini" v-if="scope.row.state==1" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">屏蔽
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 翻页 -->
            <div class="block foota">
                <div class="foot">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page.sync="currentPage2" :page-sizes="[100, 200, 300, 400]"
                        layout="sizes, prev, pager, next" :total="1000">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

                input: '',
                options: [{ //状态
                    value: '选项1',
                    label: '未通过'
                }, {
                    value: '选项2',
                    label: '已通过'
                }],
                value: '', //已选中
                multipleSelection: [], //选中的行
                currentPage2: 1, //分页
                tableData: [{
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 1
                },
                {
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 1
                },
                {
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 0
                },
                {
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 0
                },
                {
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 0
                },

                {
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 0
                },
                {
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 0
                },

                {
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 0
                },
                {
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 0
                },
                {
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 1
                },
                {
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 0
                },
                {
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 0
                },{
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 0
                },{
                    account: "llxxxxx",
                    name:"haha",
                    remak: "biezhu",
                    create_time:" 2020 - 2 - 19 12: 46",
                    state: 0
                }],
                //时间选择
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value2: ''
            }
        },
        mounted() {


        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //时间选择器

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

            //overflow: hidden;
            .btn {
                height: 45px;
                width: 85px;
                margin-left: 100px;
            }
        }
        .name {
            float: left;
            font-size: 18px;
        }

        .time {
            float: left;
            margin-left: 30px;
        }

        .work_name {
            width: 200px;
            height: 50px;
            float: left;
        }

        .name-flag {
            float: left;
            margin-left: 30px;
            font-size: 18px;
        }

        .select {
            float: left;
        }

        .all_btn {
            margin-top: 40px;
            margin-left: 20px;

            .btn {
                margin-right: 50px;
            }
        }
    }

    .user-list {
        margin-left: 20px;
    }

    .el-select-dropdown {
        top: 168px !important;
    }

    ::v-deep .el-input__inner {
        height: 48px;
        line-height: 48px;
    }

    ::v-deep .el-input--mini .el-input__inner {
        height: 28px;
        line-height: 28px;
    }

    .foota {
        width: 100%;
        position: relative;

        .foot {
            position: absolute;
            left: 30%;
            top: 40px;
        }
    }
</style>