<template>
    <div class="main">
        <div class="main_top">
            <!-- <div class="name">用户名：</div>
            <el-input v-model="input" class="work_name" placeholder="请输入内容"></el-input> -->
            <template>
                <div class="allSelect">
                    <div class="name-flag">状态：</div>
                <div class="select">
                    <el-select v-model="value" clearable placeholder="请选择">
                        <el-option class="select_sun" v-for="item in options" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                </div>
                
                
            </template>
            <div class="block time">
                <span class="demonstration">时间：</span>
                <el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions"
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                </el-date-picker>
                <el-button type="primary" @click="select" class="btn">查询</el-button>
                <el-button type="primary" @click="clear" class="btnClear">重置</el-button>
                </div>
        </div>
        <!-- <div class="all_btn">
            <el-button type="primary" @click="add" class="btn">添加</el-button>
            <el-button type="primary" @click="operate('enable')" class="btn">启用</el-button>
            <el-button type="primary" @click="operate('disable')" class="btn">停用</el-button>
            <el-button type="primary" @click="reset()" class="btn">重置密码</el-button>
        </div> -->
        <!-- 用户列表 -->
        <div class="user-list">
            <el-table ref="multipleTable" :data="tableData" height="470" style="width: 96%" tooltip-effect="dark" 
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" align='center' show-overflow-tooltip  width="55">
                </el-table-column>
                <el-table-column label="操作对象" align='center' show-overflow-tooltip  prop="tableName" >
                </el-table-column>
                <el-table-column label="更新时间" align='center' show-overflow-tooltip  prop="updateTime" >
                </el-table-column>
                
                <el-table-column prop="updateBy" align='center' show-overflow-tooltip  label="操作人" >
                </el-table-column>
                <el-table-column prop="content" align='center' show-overflow-tooltip  label="操作内容" >
                </el-table-column>
                <el-table-column label="操作" align='center' show-overflow-tooltip  prop="operate" >
                </el-table-column>
                <!-- <el-table-column label="操作" align='center'>
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.status=='已启用'" type="danger"  @click="handleEdit('disable', scope.row.userId)">停用</el-button>
                        <el-button size="mini" v-if="scope.row.status=='已禁用'" type="success" @click="handleEdit('enable', scope.row.userId)">启用
                        </el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <div class="block">
                    <div class="foot">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page.sync="page.pageNum" :page-sizes="[10, 20, 30, 40]"
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
                value2: '',
                value3:'',
                page: {
                    pages: 0, //
                    total: 0, //总共多少条
                    pageSize: 10, //显示条数
                    pageNum: 1//第几页
                },
                input: '',
                options: [{ //状态
                    value: 'allTable',
                    label: '全部'
                },
               
                { //状态
                    value: 'comment',
                    label: '评论'
                }, 
                { //状态
                    value: 'song_type',
                    label: '分类'
                }, 
                { //状态
                    value: 'sys_user',
                    label: '用户'
                }, 
                 {
                    value: 'song',
                    label: '歌曲'
                }],
                value: 'allTable', //已选中
                multipleSelection: [], //选中的行
                currentPage2: 1, //分页
                tableData: []
            }
        },
        mounted() {
            this.getData()

        },
        methods: {
            select() {
                console.log(this.value2.toString())
                var chinaStandard = this.value2.toString()
                var Str = chinaStandard.lastIndexOf("\,");
                console.log(Str)
                if(this.value2!=''){
                  this.value2 = this.timeData(chinaStandard.substring(0, Str)) 
                  this.value3 = this.timeData(chinaStandard.substring(Str + 1, chinaStandard.length))  
                }
                
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
            getData(){//显示数据
                this.$axios.get("prod-api/music/backend/log/list?"+"pageNum="+this.page.pageNum+"&pageSize="+this.page.pageSize+'&tableName='+this.value+"&beginTime="+this.value2+"&endTime="+this.value3).then(res=>{
                    if(res.data.code=200){
                        console.log(res.data)
                        this.tableData=res.data.rows
                        for(var index in this.tableData){
                            if(this.tableData[index].tableName=='comment'){
                                    this.tableData[index].tableName="评论"
                            }else if(this.tableData[index].tableName=='song_type'){
                                    this.tableData[index].tableName="分类"
                            }
                            else if(this.tableData[index].tableName=='sys_user'){
                                    this.tableData[index].tableName="用户"
                            }
                            else if(this.tableData[index].tableName=='push'){
                                    this.tableData[index].tableName="推送"
                            }
                            else if(this.tableData[index].tableName=='song'){
                                    this.tableData[index].tableName="歌曲"
                            }
                        }
                    }
                })
            },
            
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.page.pageSize=val
                console.log(this.page.pageSize)
                this.getData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.pageNum=val
                this.getData()
            },
            clear(){//清楚输入想
                this.value3=''
                this.value2=''
                this.value="allTable"
                this.getData()
            },
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
            margin: 40px 0px 0px -43px;
            line-height: 50px;
            height: 50px;
            position: relative;
            .allSelect{
                float: left;
            }
            .block{
                left: 380px;
                position: absolute;
            }
            //overflow: hidden;
            .btn {
                height: 45px;
                width: 85px;
                margin-left: 200px;
            }
            .btnClear{
                height: 45px;
                width: 85px;
                margin-left: 50px;
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
            //margin-right: 50px;
            z-index: 1000;
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
        margin-top: 40px;
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
.block{
        width: 100%;
        position: relative;
        .foot{
            position: absolute;
            left: 30%;
            top: 40px;
        }
    }
</style>