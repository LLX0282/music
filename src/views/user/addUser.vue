<template>
    <div>
        <el-dialog title="创建管理员" :visible.sync="centerDialogVisible" width="800px" height= "700px" class="main" center>
            <div class="text">
                <div class="admin_row">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户账号" prop="account">
                            <el-input v-model="ruleForm.account"></el-input>
                        </el-form-item>
                        <el-form-item label="用户姓名" prop="nickName">
                            <el-input v-model="ruleForm.nickName"></el-input>
                        </el-form-item>
                        <el-form-item label="用户性别" prop="sex">
                            <template>
                                <el-radio v-model="ruleForm.sex" label="0">男</el-radio>
                                <el-radio v-model="ruleForm.sex" label="1">女</el-radio>
                            </template>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="ruleForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phoneNumber">
                            <el-input v-model="ruleForm.phoneNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="个人介绍" prop="remark">
                            <el-input type="textarea"  v-model="ruleForm.remark"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle" >取 消</el-button>
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
                    sex: '0'
                },
                rules: {
                    account: [{
                            required: true,
                            message: '请输入账号',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    nickName: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    remark: [{
                        required: true,
                        message: '请输入个性签名',
                        trigger: 'blur'
                    }],
                    sex: [{
                        required: true,
                    }],
                    email:[{
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                    }],
                    phoneNumber:[{
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur'
                    }],
                }
            };
        },
        methods: {
            openAdd() {
                this.centerDialogVisible = true
            },
            add(ruleForm) {
                this.$refs[ruleForm].validate((valid) =>{
                    if(valid){
                        this.$axios.post("prod-api/music/backend/user/create",this.ruleForm).then(res => {
                        if(res.data.code==200){
                            this.centerDialogVisible = false
                            this.$message({
                            message:res.data.msg ,
                            type: 'success'
                        });
                        this.$parent.getData()
                        }else{
                            this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                        this.$parent.getData()
                        }
                     })
                    }
                })
            },
            cancle(){//取消
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
    ::v-deep .el-textarea__inner{
        height: 126px;
    }
    ::v-deep .el-dialog {
        height: 688px;
    }
</style>