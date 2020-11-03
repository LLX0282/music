<template>
    <div class="top">
        <div class="logo_text">
            <h1>音频管理后台</h1>
        </div>
        <div  @mouseenter="enter()" @mouseleave="leave()" class="ad_name">{{username}}
            <div class="select">
                <div class="row" @click="amend">修改密码</div>
                <div class="row" @click="out">退出登录</div>
            </div>
        </div>
        <amend ref="password"></amend>
    </div>
</template>

<script>
import amend from './amend'
    export default {
        components:{
            amend
        },
        data() {
            return {
                username: localStorage.getItem("username")
            }
        },
        methods:{
            enter(){
              var dom =  document.documentElement.getElementsByClassName('select')[0]
              console.log(dom)
              dom.style.display='block'
            dom.style.cursor='default'
            },
            leave(){
                var dom =  document.documentElement.getElementsByClassName('select')[0]
              console.log(dom)
              dom.style.display='none'
            },
            amend(){
                this.$refs.password.open()
            },
            out(){
                this.$router.push({
                            path: `/`,
                        })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .top {
        min-width: 1700px;
        height: 100px;
        background-color: #52575b;
        line-height: 100px;
        position: relative;

        .logo_text {
            position: absolute;
            color: #ffff;
            left: 120px;

            h1 {
                font-size: 30px;
            }
        }
        .ad_name {
            float: right;
            color: #fff;
            margin-right: 100px;
            font-size: 20px;
            position: relative;
           
            .select {
                position: absolute;
                width: 200px;
                
                background-color: #52575b;
                top: 79px;
                left: -80px;
                border-radius: 10px;
                
                display: none;
               .row{
                   width: 200px;
                   height: 50px;
                   text-align: center;
                   line-height: 50px;
                   color: #ffffff;
                   
               }
            }
        }

        .news {
            display: flex;
            float: right;
            color: #fff;
            margin-right: 120px;
            font-size: 20px;
            position: relative;

            .news-number {
                font-size: 14px;
                position: absolute;
                top: -10px;
                right: -16px;
            }
        }
    }
</style>