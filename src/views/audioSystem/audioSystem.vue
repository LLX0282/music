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
        </div>
        <div>
            <!-- 用户列表 -->
            <div class="user-list">
                <el-table ref="alltableData.list" :data="alltableData.list" height="550" style="width: 96%"
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
                    <el-table-column prop="songType" label="歌曲类型">
                    </el-table-column>
                    <el-table-column prop="createTime" label="发布时间">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="success" @click.stop="handleEdit(scope.$index, scope.row)">通过
                            </el-button>
                            <el-button size="mini" type="danger" @click.stop="handleDelete(scope.$index, scope.row)">驳回
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <div class="foot">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page.sync="currentPage2" :page-sizes="[100, 200, 300, 400]"
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
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                value: '',
                alltableData: {
                    songNumber: 50,
                    pageNum: 1,
                    list: [{
                            songName: '两只老虎',
                            songAddress: 'localhost/music/song',
                            createTime: '2009年11月11日',
                            songType: 0,
                            status: 1,
                            songTime: '3分45秒'
                        },
                        {
                            songName: '两只老虎',
                            songAddress: 'localhost/music/song',
                            createTime: '2009年11月11日',
                            songType: 0,
                            status: 1,
                            songTime: '3分45秒'
                        },
                        {
                            songName: '两只老虎',
                            songAddress: 'localhost/music/song',
                            createTime: '2009年11月11日',
                            songType: 0,
                            status: 1,
                            songTime: '3分45秒'
                        },
                        {
                            songName: '两只老虎',
                            songAddress: 'localhost/music/song',
                            createTime: '2009年11月11日',
                            songType: 0,
                            status: 1,
                            songTime: '3分45秒'
                        },
                        {
                            songName: '两只老虎',
                            songAddress: 'localhost/music/song',
                            createTime: '2009年11月11日',
                            songType: 0,
                            status: 1,
                            songTime: '3分45秒'
                        },
                        {
                            songName: '两只老虎',
                            songAddress: 'localhost/music/song',
                            createTime: '2009年11月11日',
                            songType: 0,
                            status: 1,
                            songTime: '3分45秒'
                        }, {
                            songName: '两只老虎',
                            songAddress: 'localhost/music/song',
                            createTime: '2009年11月11日',
                            songType: 0,
                            status: 1,
                            songTime: '3分45秒'
                        }, {
                            songName: '两只老虎',
                            songAddress: 'localhost/music/song',
                            createTime: '2009年11月11日',
                            songType: 0,
                            status: 1,
                            songTime: '3分45秒'
                        },
                        {
                            songName: '两只老虎',
                            songAddress: 'localhost/music/song',
                            createTime: '2009年11月11日',
                            songType: 0,
                            status: 1,
                            songTime: '3分45秒'
                        }, {
                            songName: '两只老虎',
                            songAddress: 'localhost/music/song',
                            createTime: '2009年11月11日',
                            songType: 0,
                            status: 1,
                            songTime: '3分45秒'
                        },
                    ]
                }
            }
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
                console.log(val)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
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
</style>