<template>
    <div>
        <el-dialog title="密码修改" :visible.sync="centerDialogVisible" width="800px" height="700px" class="main" center>
            <div class="text">
                <div class="admin_row">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="原密码" prop="password">
                            <el-input v-model="ruleForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newpassword">
                            <el-input v-model="ruleForm.newpassword"></el-input>
                        </el-form-item>
                        <div class="allpassword">
                            <div class="password">
                                <div class='input_span'>
                                    <label style='margin-left:40px;'>强度:</label>
                                    <span id="one"></span>
                                    <span id="two"></span>
                                    <span id="three"></span>
                                </div>
                                <div id="font">
                                    <span>弱</span>
                                    <span>中</span>
                                    <span>强</span>
                                </div>
                            </div>
                        </div>
                        <el-form-item label="确认新密码" prop="checkpassword">
                            <el-input v-model="ruleForm.checkpassword"></el-input>
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
    export function checkStrong(sValue) {
        var modes = 0;
        //正则表达式验证符合要求的
        if (sValue.length < 1) return modes;
        if (/\d/.test(sValue)) modes++; //数字
        if (/[a-z]/.test(sValue)) modes++; //小写
        if (/[A-Z]/.test(sValue)) modes++; //大写  

        //逻辑处理
        switch (modes) {
            case 1:
                return 1;
                break;
            case 2:
                return 2;
                break;
            case 3:
                return 3;
                break;
        }
        return modes;
    }
    export default {
        data() {
            
            var validatePass2 = (rule, value, callback) => {
                var ze = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
                console.log(value)
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (ze.test(value)) {
                    if (value !== this.ruleForm.newpassword) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('请输6-16个英文字符或数字'));
                }
            };
            return {
                centerDialogVisible: false,
                ruleForm: {
                    password: '',
                    newpassword: '',
                    checkpassword: ''
                },
                rules: {
                    password: [{
                        required: true,
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,16}$/,
                        message: '请输入4-16位数字和英文',
                        trigger: 'blur'
                    }, ],
                    newpassword: [{
                            required: true,

                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,16}$/,
                            message: '请输入4-16位数字和英文',
                            trigger: 'blur'
                        },

                    ],
                    checkpassword: [{
                            required: true,
                            validator: validatePass2,
                            trigger: 'blur'
                        },

                    ],

                }
            };
        },
        watch: {
            'ruleForm.newpassword'(newValue, oldValue) {
                console.log(newValue);
                var one = document.getElementById('one');
                var two = document.getElementById('two');
                var three = document.getElementById('three');
                this.msgText = checkStrong(newValue);
                console.log(this.msgText);
                if (this.msgText > 1 || this.msgText == 1) {
                    one.style.backgroundColor = "red";
                } else {
                    one.style.backgroundColor = "#eee";
                }
                if (this.msgText > 2 || this.msgText == 2) {
                    two.style.backgroundColor = "orange";
                } else {
                    two.style.backgroundColor = "#eee";
                }
                if (this.msgText == 3) {
                    three.style.backgroundColor = "#00D1B2";
                } else {
                    three.style.backgroundColor = "#eee";
                }
            }
        },
        methods: {
            open() {
                this.centerDialogVisible = true
            },
            add(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.$axios.put("prod-api/music/backend/change/updatePassword/" + this.ruleForm
                            .password + "/" + this.ruleForm.newpassword).then(res => {
                            if (res.data.code == 200) {
                                this.centerDialogVisible = false
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: `/`,
                                })
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });

                            }
                        })
                    }
                })

            },
            cancle() { //取消
                this.centerDialogVisible = false
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
        height: auto;
    }

    // 密码 强度
    #inputValue {
        width: 240px;
        margin-left: 30px;
        padding-left: 10px;
        border-radius: 3px;
    }

    .input_span span {
        display: inline-block;
        width: 100px;
        height: 10px;
        background: #eee;
        line-height: 20px;
    }

    #one {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-right: 0px solid;
        margin-left: 20px;
        margin-right: 3px;
    }

    #two {
        border-left: 0px solid;
        border-right: 0px solid;
        margin-left: -5px;
        margin-right: 3px;
    }

    #three {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-left: 0px solid;
        margin-left: -5px;
    }

    #font span:nth-child(1) {
        color: red;
        margin-left: 116px;
    }

    #font span:nth-child(2) {
        color: orange;
        margin: 0 77px;
    }

    #font span:nth-child(3) {
        color: #00D1B2;
    }

    .password {
        position: relative;

        #font {
            position: absolute;
            top: 30px;
            left: 23px;
        }
    }
    .allpassword{
        margin-left: 10px;
        margin-top: -20px;
    }
</style>