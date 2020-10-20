<template>
    <div>
        <el-dialog title="修改推送" :visible.sync="centerDialogVisible" width="800px" height="700px" class="main" center>
            <div class="text">
                <div class="admin_row">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="推送主题" prop="title">
                            <el-input v-model="ruleForm.title"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="发布人" prop="createBy">
                            <el-input :disabled="true" v-model="ruleForm.createBy"></el-input>
                        </el-form-item> -->
                        <div class="upImg">
                            <!-- 上传图片 -->
                            <el-form-item label="主题图片" prop="title">
                            <el-upload :limit=1 ref='upload' action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card" :on-preview="handlePictureCardPreview"
                                :before-upload='beforeAvatarUpload' :on-remove="handleRemove"
                                :file-list="fileList">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            </el-form-item>
                            
                        </div>
                        <el-form-item label="主题内容" prop="introduce">
                            <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
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
                dialogImageUrl: '',
                dialogVisible: false,
                centerDialogVisible: false,
                ruleForm: {
                    title: '',
                    introduce: '',
                    //createBy: '',
                    imgUrl:'',
                    pushId:''
                },
                fileList: [{ url: ''}],
                rules: {
                    title: [{
                            required: true,
                            message: '请输入账号',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 11,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    // createBy: [{
                    //     required: true,
                    //     message: '请输入姓名',
                    //     trigger: 'blur'
                    // }],
                    introduce: [{
                        required: true,
                        message: '请输入备注',
                        trigger: 'blur'
                    }],
                }
            };
        },
        methods: {
            openAdd(val) {
                this.fileList[0].url='prod-api'+val.imgUrl
                this.centerDialogVisible = true
                console.log(val)
                this.ruleForm.title=val.title
                this.ruleForm.imgUrl= val.imgUrl
                this.ruleForm.introduce= val.introduce
                this.ruleForm.pushId= val.pushId
                console.log(val.imgUrl)
                //this.ruleForm.createBy = localStorage.getItem("username")
            },
            add(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        
                        this.$axios.put("prod-api/music/backend/push/update", this.ruleForm).then(res => {
                            if (res.data.code == 200) {
                                this.centerDialogVisible = false
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                });
                                this.$parent.getData()
                            } else {
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
                this.$parent.getData()
            },
            //文件列表移除文件时的钩子
            handleRemove(file) {
                console.log(file);
            },
            //点击文件列表中已上传的文件时的钩子
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //上传文件之前的钩子
            beforeAvatarUpload(file) {
                console.log(file)
                var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
                console.log(testmsg);
                const isJPG = testmsg === 'jpg';
                const isPNG = testmsg === 'png';
                const isLt2M = file.size / 1024 / 1024 < 10;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                } else if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                } else {
                    let fd = new FormData();
                    console.log(fd)
                    fd.append("file", file)

                    console.log(fd)
                    this.$axios.post('prod-api/music/common/upload', fd).then(res => {
                        if (200 == res.data.code) {
                            console.log(res.data.fileName);
                            this.ruleForm.imgUrl = res.data.fileName;
                        }
                    })
                    // this.$axios.post('prod-api/music/common/upload', fd).then(res => {
                    //     if (200 == res.data.code) {
                    //         console.log(res.data.fileName);
                    //         this.ruleForm.imgUrl = res.data.fileName;
                    //     }
                    // })
                    console.log(1)
                }

            },
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