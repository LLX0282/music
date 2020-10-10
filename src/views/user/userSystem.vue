<template>
    <div class="main">
        <div class="main_top">
            <div class="name">用户名：</div>
            <el-input v-model="input" class="work_name" placeholder="请输入内容"></el-input>
            <template>
                <div class="name-flag">状态：</div>
                <div class="select">
                    <el-select v-model="value" clearable placeholder="请选择">
                        <el-option class="select_sun" v-for="item in options" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button type="primary" class="btn">查询</el-button>
            </template>
        </div>
        <div class="all_btn">
            <el-button type="primary" @click="add" class="btn">启用</el-button>
            <el-button type="primary" class="btn">停用</el-button>
            <el-button type="primary" class="btn">重置密码</el-button>
        </div>
        <!-- 用户列表 -->
        <!-- <div class="user-list">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="日期" width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">启用</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">停用
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div> -->
        <div>{{this.list}}</div>
    </div>
</template>

<script>
    //import axios from '../../request/http';
    export default {
        data() {
            return {
                imform: {
                    title: "", //标题
                },
                list:{},
                page: {
                    pages: 0, //
                    total: 0, //总共多少条
                    pageSize: 10, //显示条数
                    pageNum: 1//第几页
                },
                input: '',
                options: [{ //状态
                    value: '选项1',
                    label: '已启用'
                }, {
                    value: '选项2',
                    label: '已停用'
                }],
                value: '', //已选中
                multipleSelection: [], //选中的行
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
            }
        },
        mounted() {
            //this.getnewList();
            // this.submitForm()
            // this.getData()
            this.ce()
        },
        methods: {
            getData(){
           this.$axios("prod-api/backend/user/list?"+"pageNum="
         +this.page.pageNum+'&pageSize='+this.page.pageSize+'&searchValue='
         +"").then(res=>{
           if(200==res.data.code){
             this.page.total=res.data.total//获取总条数
             this.list=res.data.rows;//获取列表数据`    
           }
         })
      },
      ce(){
          this.$axios.get("prod-api/ssmMusic/user/showUser/1.do").then(res=>{
              console.log(res.data);
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
            add(){
                this.page.pageNum++
                console.log(this.page.pageNum)
                this.getData()
            },
            //提交
            submitForm() {
                    
                        let paramForm = {
                            username: "liulinxin",
                            password: "liulinxin123",
                            userType: "01"
                        };
                        console.log(paramForm)
                        //连接接口
                        this.$axios.post("prod-api/common/login", paramForm).then(res => {
                            console.log(res.data.code)
                            if (200 == res.data.code) {
                                console.log("成功")
                                localStorage.setItem("token",res.data.token);
                            } else {
                                this.ruleForm.username = "";
                                this.ruleForm.password = "";
                                this.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        })
                ;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
                margin-left: 300px;
            }
        }

        .name {
            float: left;
            font-size: 18px;
        }

        .work_name {
            width: 200px;
            height: 50px;
            float: left;
        }

        .name-flag {
            float: left;
            margin-left: 60px;
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
</style>