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
                <el-button type="primary" @click="getData" class="btn">查询</el-button>
                <el-button type="primary" @click="clear" class="btnClear">重置</el-button>
            </template>
        </div>
        <div class="all_btn">
            <el-button type="primary" @click="add" class="btn">添加</el-button>
            <el-button type="primary" @click="operate('enable')" class="btn">启用</el-button>
            <el-button type="primary" @click="operate('disable')" class="btn">停用</el-button>
            <el-button type="primary" @click="reset()" class="btn">重置密码</el-button>
        </div>
        <!-- 用户列表 -->
        <div class="user-list">
            <el-table ref="multipleTable" :data="tableData" height="470" style="width: 96%" tooltip-effect="dark" 
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" align='center' show-overflow-tooltip  width="55">
                </el-table-column>
                <el-table-column label="用户账号" align='center' show-overflow-tooltip  prop="account" >
                </el-table-column>
                <el-table-column label="姓名" align='center' show-overflow-tooltip  prop="nickName" >
                </el-table-column>
                <el-table-column label="手机号" align='center' show-overflow-tooltip  prop="phoneNumber" >
                </el-table-column>
                <el-table-column prop="remark" align='center' show-overflow-tooltip  label="个人简介" >
                </el-table-column>
                <el-table-column prop="sex" align='center' show-overflow-tooltip  label="性别" >
                </el-table-column>
                <el-table-column prop="email" align='center' show-overflow-tooltip  label="邮箱" >
                </el-table-column>
                <el-table-column label="状态" align='center' show-overflow-tooltip  prop="status" >
                </el-table-column>
                <el-table-column label="操作" align='center'>
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.status=='已启用'" type="danger"  @click="handleEdit('disable', scope.row.userId)">停用</el-button>
                        <el-button size="mini" v-if="scope.row.status=='已禁用'" type="success" @click="handleEdit('enable', scope.row.userId)">启用
                        </el-button>
                    </template>
                </el-table-column>
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
        <add-user ref="addUser"></add-user>
    </div>
</template>
<script>
import addUser from './addUser'
    export default {
        components: { 
            addUser,
        },
        data() {
            return {
                page: {
                    pages: 0, //
                    total: 0, //总共多少条
                    pageSize: 10, //显示条数
                    pageNum: 1//第几页
                },
                input: '',
                options: [{ //状态
                    value: '0',
                    label: '已启用'
                }, {
                    value: '1',
                    label: '已停用'
                }],
                value: '', //已选中
                multipleSelection: [], //选中的行
                currentPage2: 1, //分页
                tableData: []
            }
        },
        mounted() {
            this.getData()

        },
        methods: {
            getData(){//显示数据
                this.$axios.get("prod-api/music/backend/user/list?"+"pageNum="+this.page.pageNum+"&pageSize="+this.page.pageSize+'&searchValue='+this.input+'&status='+this.value).then(res=>{
                    if(res.data.code=200){
                        console.log(res.data.rows)
                        this.tableData=res.data.rows
                        for(var index in this.tableData )
                        {   if(this.tableData[index].sex==0){
                            this.tableData[index].sex='男'
                            }
                            else if(this.tableData[index].sex==1)
                            this.tableData[index].sex='女'
                            if( this.tableData[index].status==0){
                                this.tableData[index].status='已启用'
                                
                            }
                            else if(this.tableData[index].status==1){
                                this.tableData[index].status='已禁用'
                            }
                        }
                    }
                })
            },
            add(){
                this.$refs.addUser.openAdd();
            },
            reset(){
                var arry=[]
                for( var index in this.multipleSelection){
                    arry.push(this.multipleSelection[index].userId)
                }
                this.$axios.put('prod-api/music/backend/user/reset/'+arry).then(res=>{
                    if(res.data.code==200){
                        console.log('成功')
                        this.getData()
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }else{
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
                this.input=''
                this.value=''
            },
            handleEdit(cut,data){//行操作
                console.log(data)
                this.$axios.put('prod-api/music/backend/user/'+cut+'/'+data).then(res=>{
                    if(res.data.code==200){
                        console.log('成功')
                        this.getData()
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }else{
                        this.getData()
                        this.$message({
                            message: '操作失败',
                            type: 'error'
                        });
                    }
                })
            },
            operate(cut){//启用/停用
                if(cut=='enable'&&this.judgeState(cut)!=0){
                    console.log(this.judgeState)
                    this.ask(cut)
                }else if(cut=='enable'&&this.judgeState(cut)==0){
                    this.$message({
                            message: '已启用的账号不能启用',
                            type: 'error'
                        });
                }
                if(cut=='disable'&&this.judgeState(cut)!=0){
                    console.log(this.judgeState)
                    this.ask(cut)
                }else if(cut=='disable'&&this.judgeState(cut)==0){
                    this.$message({
                            message: '已禁用的账号不能禁用',
                            type: 'error'
                        });
                }
            },
            ask(cut){//发送请求
                var arry=[]
                for( var index in this.multipleSelection){
                    arry.push(this.multipleSelection[index].userId)
                }
                console.log(this.multipleSelection[0])
                this.$axios.put('prod-api/music/backend/user/'+cut+'/'+arry).then(res=>{
                    if(res.data.code==200){
                        console.log('成功')
                        this.getData()
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }else{
                        this.getData()
                        this.$message({
                            message: '操作失败',
                            type: 'error'
                        });
                    }
                })
            },
            judgeState(cut){//判断状态
                if (cut=='enable'){
                    for(var index in this.multipleSelection){
                        if(this.multipleSelection[index].status=='已启用'){
                            console.log(0)
                            return 0
                        }
                    }
                }
                else{
                    for(var index in this.multipleSelection){
                        if(this.multipleSelection[index].status=='已禁用'){
                            return 0
                        }
                    }
                }
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
            margin: 40px 0px 0px 20px;
            line-height: 50px;
            height: 50px;

            //overflow: hidden;
            .btn {
                height: 45px;
                width: 85px;
                margin-left: 300px;
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