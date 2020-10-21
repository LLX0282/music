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
            <div class="selectBtn">
                <el-button type="primary" @click="select" class="btn">查询</el-button>
                <el-button type="primary" @click="resetting" class="btn">清空</el-button>
            </div>

        </div>
        <div class="all_btn">
            <el-button type="primary" @click="operate('enable')" class="btn">通过</el-button>
            <el-button type="primary" @click="operate('disable')" class="btn">屏蔽</el-button>
        </div>
        <!-- 管理员列表 -->
        <div class="user-list">
            <el-table ref="multipleTable" :data="tableData" height="470" style="width: 96%" tooltip-effect="dark"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="用户名" prop="nickName">

                </el-table-column>
                <el-table-column label="歌曲名" prop="songName">

                </el-table-column>
                <el-table-column label="评论内容" prop="content">

                </el-table-column>
                <el-table-column label="评论时间" prop="createTime">

                </el-table-column>
                <el-table-column prop="status" label="状态">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="xiangqing(scope.row)" class="btn">详情</el-button>
                        <el-button size="mini" v-if="scope.row.status=='已通过'" type="danger"
                            @click="handleEdit('disable', scope.row.commentId)">驳回</el-button>
                        <el-button size="mini" v-if="scope.row.status=='已驳回'" type="success"
                            @click="handleEdit('enable', scope.row.commentId)">通过
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 翻页 -->
            <div class="block foota">
                <div class="foot">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page.sync="page.pageNum" :page-sizes="[10, 20, 30, 40]"
                        layout="sizes, prev, pager, next" :total="1000">
                    </el-pagination>
                </div>
            </div>
        </div>
        <page ref="page"></page>
    </div>
</template>

<script>
    import page from './details'
    export default {
        components: {
            page
        },
        data() {
            return {
                page: {
                    pages: 0, //
                    total: 0, //总共多少条
                    pageSize: 10, //显示条数
                    pageNum: 1 //第几页
                },
                input: '',
                options: [{ //状态
                    value: '1',
                    label: '已驳回'
                }, {
                    value: '0',
                    label: '已通过'
                }],
                value: '', //已选中
                multipleSelection: [], //选中的行
                currentPage2: 1, //分页
                tableData: [],
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
            this.getData()

        },
        methods: {
            xiangqing(val) {
                this.$refs.page.openAdd(val)
            },
            select() {
                console.log(this.value2.toString())
                var chinaStandard = this.value2.toString()
                var Str = chinaStandard.lastIndexOf("\,");
                console.log(Str)
                this.value2 = this.timeData(chinaStandard.substring(0, Str)) + '/' + this.timeData(chinaStandard
                    .substring(Str + 1, chinaStandard.length))
                console.log(this.value2)
                this.getData()
            },
            timeData(chinaStandard) {
                var date = new Date(chinaStandard);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                var minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                let time = y + '-' + m + '-' + d + ' ' + h + ':' + minute;
                return time
            },
            resetting() {
                this.input = ''
                this.value2 = ''
                this.value = ''
            },
            getData() { //显示数据
                this.$axios.get("prod-api/music/backend/comment/list?" + "pageNum=" + this.page.pageNum + "&pageSize=" +
                    this.page.pageSize + '&searchValue=' + this.input + '&createTime=' + this.value2 + '&status=' +
                    this.value).then(res => {
                    if (res.data.code = 200) {
                        console.log(res.data.rows)
                        this.tableData = res.data.rows
                        for (var index in this.tableData) {
                            if (this.tableData[index].status == 0) {
                                this.tableData[index].status = '已通过'

                            } else if (this.tableData[index].status == 1) {
                                this.tableData[index].status = '已驳回'
                            }
                        }
                    }
                })
            },
            operate(cut) { //启用/停用
                if (cut == 'enable' && this.judgeState(cut) != 0) {
                    console.log(this.judgeState)
                    this.ask(cut)
                } else if (cut == 'enable' && this.judgeState(cut) == 0) {
                    this.$message({
                        message: '已启用的账号不能启用',
                        type: 'error'
                    });
                }
                if (cut == 'disable' && this.judgeState(cut) != 0) {
                    console.log(this.judgeState)
                    this.ask(cut)
                } else if (cut == 'disable' && this.judgeState(cut) == 0) {
                    this.$message({
                        message: '已禁用的账号不能禁用',
                        type: 'error'
                    });
                }
            },
            ask(cut) { //发送请求
                var arry = []
                for (var index in this.multipleSelection) {
                    arry.push(this.multipleSelection[index].commentId)
                }
                console.log(this.multipleSelection[0])
                this.$axios.put('prod-api/music/backend/comment/' + cut + '/' + arry).then(res => {
                    if (res.data.code == 200) {
                        console.log('成功')
                        this.getData()
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    } else {
                        this.getData()
                        this.$message({
                            message: '操作失败',
                            type: 'error'
                        });
                    }
                })
            },
            judgeState(cut) { //判断状态
                if (cut == 'enable') {
                    for (var index in this.multipleSelection) {
                        if (this.multipleSelection[index].status == '已启用') {
                            console.log(0)
                            return 0
                        }
                    }
                } else {
                    for (var index in this.multipleSelection) {
                        if (this.multipleSelection[index].status == '已禁用') {
                            return 0
                        }
                    }
                }
            },
            handleEdit(cut, data) { //行操作
                console.log(data)
                this.$axios.put('prod-api/music/backend/comment/' + cut + '/' + data).then(res => {
                    if (res.data.code == 200) {
                        console.log('成功')
                        this.getData()
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    } else {
                        this.getData()
                        this.$message({
                            message: '操作失败',
                            type: 'error'
                        });
                    }
                })
            },
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
                this.page.pageSize=val
                this.getData()
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.pageNum=val
                this.getData()
            },
            //时间选择器

        }
    }
</script>

<style lang="scss" scoped>
    .main {
        padding-left: 30px;
        //background-color: tomato;
        min-width: 1450px;
        height: 880px;

        .main_top {
            margin: 40px 0px 0px 20px;
            line-height: 50px;
            height: 50px;

            //overflow: hidden;
            .btn {
                height: 45px;
                width: 85px;
                margin-left: 65px;
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