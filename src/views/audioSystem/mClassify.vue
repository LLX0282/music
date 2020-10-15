<template>
    <div>
        <el-dialog title="分类修改" :visible.sync="centerDialogVisible" width="800px" height= "700px" class="main" center>
            <div class="text">
                <div class="admin_row">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="分类名" prop="account">
                            <el-input v-model="ruleForm.account"></el-input>
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
                   
                },
                rules: {
                    account: [{
                            required: true,
                            message: '分类名',
                            trigger: 'blur'
                        },
                        {
                            
                            message: '请输入分类名',
                            trigger: 'blur'
                        }
                    ],
                    
                }
            };
        },
        methods: {
            openAdd(val) {
                this.centerDialogVisible = true
                console.log(val)
                this.ruleForm.account=val.name
            },
            add(ruleForm) {
                this.$refs[ruleForm].validate((valid) =>{
                    if(valid){
                        this.$axios.put("prod-api/music/backend/songType/update", this.ruleForm).then(res => {
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
        height: 297px;
    }
</style>