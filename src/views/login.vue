<template>
    <div class="main">
        <div class="login">
            <div class="name">
                <div class="left">管理员账号：</div>
                <el-input class="right" v-model="username" placeholder="请输入账号"></el-input>
            </div>
            <div class="name two">
                <div class="left">管理员密码：</div>
                <el-input class="right" placeholder="请输入密码" v-model="password" show-password></el-input>
            </div>
            <el-button class="btn" @click.native.prevent="submit" @keydown.enter.native='submit' type="primary">登录
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                username: "llx02",
                password: "123456."
            }
        },
        mounted() {

        },
        created() {
            var _self = this;
            document.onkeydown = function (e) {
                if (window.event == undefined) {
                    var key = e.keyCode;
                } else {
                    var key = window.event.keyCode;
                }
                if (key == 13) {
                    _self.submit();
                }
            }
        },
        methods: {

            getData() { //登录接口
                let paramForm = {
                    username: this.username,
                    password: this.password,
                    userType: '01'
                };
                this.$axios.post("prod-api/music/common/login", paramForm).then(res => {
                    if (200 == res.data.code) {
                        console.log("成功")
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("username", this.username);
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        this.$axios.get("prod-api/music/common/getLoginInfo").then(res => {
                            if (res.data.code == 200) {
                                console.log(res.data.roles[0])
                                if (res.data.roles[0] == "backend"||res.data.roles[0] == "admin") {
                                    localStorage.setItem("role", res.data.roles[0]);
                                    this.$router.push({
                                        path: `/audioSystem`,
                                    })
                                } else {
                                    this.$message({
                                        message:'请用管理员账号登录',
                                        type: 'error'
                                    });
                                }
                            }
                        })

                        this.username = '',
                            this.password = ''
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                        this.username = '',
                            this.password = ''
                    }
                })
            },
            submit() {
                console.log(1)
                this.getData();
            },

        }
    }
</script>

<style lang="scss" scoped>
    .main {
        position: relative;
        width: 100%;
        height: 800px;
    }

    .login {
        width: 800px;
        height: 500px;
        background-color: #52575b;
        border-radius: 10px;
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .name {
            width: 400px;
            overflow: hidden;
            height: 60px;
            line-height: 60px;
            position: absolute;
            top: 100px;
            left: 200px;

            .left {
                float: left;
                color: #ffffff;
            }

            .right {
                float: left;
                width: 300px;
            }
        }

        .two {
            top: 200px;
        }

        .btn {
            width: 200px;
            position: absolute;
            bottom: 110px;
            left: 344px;
        }
    }
</style>