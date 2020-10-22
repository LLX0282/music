<template>
    <div class="main">
        <div class="main_top">
            <div class="name">推送主题：</div>
            <el-input v-model="searchValue" class="work_name" placeholder="请输入内容"></el-input>
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
            <el-button type="primary" @click="getData" class="btn">查询</el-button>
            <el-button type="primary" @click="search" class="btn">重置</el-button>
        </div>
        <div class="all_btn">
            <el-button type="primary" class="btn" @click="add">添加</el-button>
            <el-button type="primary" @click="operate('enable')" class="btn">启用</el-button>
            <el-button type="primary" @click="operate('disable')" class="btn">禁用</el-button>
        </div>
        <!-- 管理员列表 -->
        <div class="user-list">
            <el-table ref="multipleTable" :data="tableData" height="470" style="width: 96%" tooltip-effect="dark"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="推送主题" align='center' show-overflow-tooltip prop="title">
                </el-table-column>
                <el-table-column label="发布者" align='center' show-overflow-tooltip prop="createBy">
                </el-table-column>
                <el-table-column label="内容" align='center' show-overflow-tooltip prop="introduce">
                </el-table-column>
                <el-table-column label="图片" align='center' show-overflow-tooltip >
                    <template slot-scope="scope">
                        <img :src="'prod-api'+scope.row.imgUrl" alt="" class="img">
                    </template>
                </el-table-column>
                <el-table-column prop="status" align='center' show-overflow-tooltip label="状态">
                </el-table-column>
                <el-table-column label="操作" align='center' show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="tuisong( scope.row)">修改
                        </el-button>
                        <el-button size="mini" v-if="scope.row.status =='已禁用'" type="success"
                            @click="handleEdit('enable', scope.row.pushId)">启用</el-button>
                        <el-button size="mini" v-if="scope.row.status =='已启用'" type="danger"
                            @click="handleEdit('disable', scope.row.pushId)">禁用
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 翻页 -->
            <div class="block foota">
                <div class="foot">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page.sync="page.pageNum" :page-sizes="[10, 20, 30, 40]"
                        layout="sizes, prev, pager, next" :total="page.total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <add-pelling ref="add"></add-pelling>
        <modify ref="updata"></modify>
    </div>
</template>

<script>
    import addPelling from './addproelling'
    import modify from './modify'
    export default {
        components: {
            addPelling,
            modify
        },
        data() {
            return {
                searchValue: '',
                options: [{ //状态
                    value: '0',
                    label: '已启用'
                }, {
                    value: '1',
                    label: '已禁用'
                }],
                value: '', //已选中
                multipleSelection: [], //选中的行
                tableData: [],
                //时间选择
                value2: '',
                page: {
                    pages: 0, //
                    total: 0, //总共多少条
                    pageSize: 10, //显示条数
                    pageNum: 1 //第几页
                },
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() { //显示数据
                this.$axios.get("prod-api/music/backend/push/list?" + "pageNum=" + this.page.pageNum + "&pageSize=" +
                    this.page.pageSize + '&searchValue=' + this.searchValue + "&status=" + this.value).then(res => {
                    if (res.data.code = 200) {
                        console.log(res.data.rows)
                        this.tableData = res.data.rows
                        this.page.total = res.data.total
                        for (var index in this.tableData) {
                            if (this.tableData[index].status == 0) {
                                this.tableData[index].status = '已启用'
                            } else if (this.tableData[index].status == 1) {
                                this.tableData[index].status = '已禁用'
                            }
                            
                        }
                    }
                })
            },
            operate(cut) { //启用//停用
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
                    arry.push(this.multipleSelection[index].pushId)
                }
                this.$axios.put('prod-api/music/backend/push/' + cut + '/' + arry).then(res => {
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
            handleEdit(cut, data) {
                console.log(data)
                this.$axios.put('prod-api/music/backend/push/' + cut + '/' + data).then(res => {
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
                console.log(this.multipleSelection)
            },
            handleSizeChange(val) {
                console.log(val);
                this.page.pageSize = val
                console.log(this.page.pageSize)
                this.getData()
            },
            handleCurrentChange(val) {
                console.log(val);
                this.page.pageNum = val
                this.getData()
            },
            add() { //添加
                this.$refs.add.openAdd();
            },
            search() { //重置
                this.searchValue = ''
                this.value = ''
                this.getData()
            },
            tuisong(val){
                this.$refs.updata.openAdd(val);
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
    img{
        width: 50px;
        height: 50px;
    }
 ::v-deep .el-dialog{
     height: auto;
 }
</style>