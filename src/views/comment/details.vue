<template>
    <div>
        <el-dialog title="添加用户" :visible.sync="centerDialogVisible" width="800px" height="700px" class="main" center>
            <div class="text">
                <div class="admin_row">
                    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户头像">
                            <img class="tupian" :src="ruleForm.avatar" alt="">
                        </el-form-item>
                        <el-form-item label="评论的歌曲">
                            <el-input v-model="ruleForm.songName" :disabled="true">></el-input>
                        </el-form-item>

                        <el-form-item label="评论的时间">
                            <el-input v-model="ruleForm.createTime" :disabled="true">></el-input>
                        </el-form-item>
                        <el-form-item label="评论的内容">
                            <el-input type="textarea" v-model="ruleForm.content" :disabled="true">></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" @click="add('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                centerDialogVisible: false,
                ruleForm :{
                    avatar: '',
                    songName: '',
                    createTime: '',
                    content: ''
                }

            };
        },
        methods: {
            openAdd(val) {
                this.centerDialogVisible = true
                this.ruleForm.avatar ="prod-api"+val.avatar
                this.ruleForm.songName =val.songName
                this.ruleForm.createTime =val.createTime
                this.ruleForm.content =val.content
            },
            add(){
                this.centerDialogVisible = false
            },
            cancle() { //取消
                this.centerDialogVisible = false
                this.$parent.getData()
            }
        }
    };
</script>

<style lang="scss" scoped>
    .main {
        height: 800px;
    }

    .text {
        width: 100%;

    }

    .admin_row {
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .demo-ruleForm {
        width: 400px;

    }

    ::v-deep .el-textarea__inner {
        height: 126px;
    }

    ::v-deep .el-dialog {
        height: 688px;
    }
    .tupian{
        width: 150px;
        border-radius: 50%;
    }
</style>