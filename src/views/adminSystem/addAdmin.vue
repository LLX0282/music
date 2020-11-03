<template>
    <div>
        <el-dialog title="创建管理员" :before-close="cancle" :visible.sync="centerDialogVisible" width="800px" height="700px"
            class="main" center>
            <div class="text">
                <div class="admin_row">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="管理员账号" prop="account">
                            <el-input v-model="ruleForm.account"></el-input>
                        </el-form-item>
                        <el-form-item label="管理员姓名" prop="nickName">
                            <el-input v-model="ruleForm.nickName"></el-input>
                        </el-form-item>
                        <el-form-item label="管理员性别" prop="sex">
                            <template>
                                <el-radio v-model="ruleForm.sex" label="0">男</el-radio>
                                <el-radio v-model="ruleForm.sex" label="1">女</el-radio>
                            </template>
                        </el-form-item>

                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
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
                ruleForm: {
                    account: '',
                    nickName: '',
                    remark: '',
                },
                rules: {
                    account: [{
                            required: true,
                            pattern: /^[a-zA-Z][a-zA-Z0-9]{2,16}$/,
                            message: '请输入2-16位数字或英文',
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 16,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    nickName: [{
                        required: true,
                        pattern: /^[\u4e00-\u9fa5]+$/,
                        message: '请输入1-10位中文',
                        trigger: 'blur'
                    }],
                    remark: [{
                        required: true,
                        message: '请输入备注',
                        trigger: 'blur'
                    }],
                    sex: [{
                        required: true,
                        message: '请选择性别',
                    }]
                }
            };
        },
        methods: {
            openAdd() {
                this.centerDialogVisible = true
            },
            add(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post("prod-api/music/backend/admin/create", this.ruleForm).then(res => {
                            if (res.data.code == 200) {
                                this.centerDialogVisible = false
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                });
                                this.ruleForm.account = ''
                                this.ruleForm.nickName = ''
                                this.ruleForm.remark = ''
                                this.ruleForm.sex =''
                                this.$parent.getData()
                            } else {
                                this.ruleForm.account = ''
                                this.ruleForm.nickName = ''
                                this.ruleForm.remark = ''
                                this.ruleForm.sex =''
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                                this.$parent.getData()
                            }
                        })
                    }
                })
                // this.$axios.post("prod-api/admin/create", this.ruleForm).then(res => {
                //     console.log(res)
                //     centerDialogVisible = false
                // })
            },
            cancle() { //取消
                this.centerDialogVisible = false
                this.ruleForm.account = ''
                this.ruleForm.nickName = ''
                this.ruleForm.remark = ''
                this.ruleForm.sex =''
                console.log(123)
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
        height: 545px;
    }
</style>