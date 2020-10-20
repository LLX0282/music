<template>
    <div class="main">
        <div class="main_top">
            <div class="name">作品名：</div>
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
            </template>
            <el-button type="primary" @click="select" class="btn selcet">查询</el-button>
            <el-button type="primary" @click="resetting" class="btn">重置</el-button>
        </div>
        <div>
            <!-- 用户列表 -->
            <div class="user-list">
                <el-table ref="alltableData" :data="alltableData" height="550" style="width: 96%"
                    tooltip-effect="dark"   @row-click='row' @selection-change="handleSelectionChange">
                    <el-table-column label="" width="120">
                        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
                        <template>
                            <div class="iconfont icon-yinle music"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="songName" label="作品名">
                    </el-table-column>
                    <el-table-column prop="songTime" label="时长">
                    </el-table-column>
                    <el-table-column prop="songTypeName" label="歌曲类型">
                    </el-table-column>
                    <el-table-column prop="createTime" label="发布时间">
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.status=='审核中'||scope.row.status=='已驳回'" size="mini" type="success" @click.stop="handleEdit('approved', scope.row.songId)">通过
                            </el-button>
                            <el-button v-if="scope.row.status=='审核中'||scope.row.status=='已通过'" size="mini" type="danger" @click.stop="handleEdit('unapproved', scope.row.songId)">驳回
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block foota">
                <div class="foot">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page.sync="page.pageNum" :page-sizes="[10, 20, 30, 40]"
                        layout="sizes, prev, pager, next" :total="1000">
                    </el-pagination>
                </div>
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
                currentPage2: 1, //分页
                options: [{
                    value: 0,
                    label: '审核中'
                }, {
                    value: 1,
                    label: '已通过'
                }, {
                    value: 2,
                    label: '未通过'
                }],
                page: {
                    pages: 0, //
                    total: 0, //总共多少条
                    pageSize: 10, //显示条数
                    pageNum: 1 //第几页
                },
                value: '',
                alltableData:[]
            }
        },
        mounted(){
            this.getData()
        },
        methods: {
            getData() { //显示数据
                this.$axios.get("prod-api/music/backend/song/list?" + "pageNum=" + this.page.pageNum + "&pageSize=" +
                    this.page.pageSize + '&searchValue=' + this.input +'&status=' +this.value).then(res => {
                    if (res.data.code = 200) {
                        console.log(res.data.rows)
                        this.alltableData = res.data.rows
                        for (var index in this.alltableData) {
                            if (this.alltableData[index].status == 0) {
                                this.alltableData[index].status = '审核中'

                            } else if (this.alltableData[index].status == 1) {
                                this.alltableData[index].status = '已通过'
                            }else if (this.alltableData[index].status == 2) {
                                this.alltableData[index].status = '已驳回'
                            }
                        }
                    }
                })
            },
            handleEdit(cut,data){//行操作
                console.log(data)
                this.$axios.put('prod-api/music/backend/song/'+cut+'/'+data).then(res=>{
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
            select(){
                this.getData()
            },
            resetting(){
                this.input=''
                this.value=''
                this.getData()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.page.pageSize=val
                console.log(this.page.pageSize)
                this.getData()
            },
            handleCurrentChange(val) {
                this.page.pageNum=val
                this.getData()
                console.log(`当前页: ${val}`);
            },
            row(val){//点击一行 里的数据
                console.log(val)
                this.$router.push({
                            path: `/workDetails.vue`,
                        })
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
            padding-left: 30px;
            min-width: 500px;
            height: 880px;

            img {
                width: 100px;
                height: 100px;
            }

            .music {
                font-size: 30px;
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
    .btn {
                margin-right: 50px;
            }
    .selcet{
        margin-left: 350px;
    }
</style>