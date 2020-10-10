<template>
    <div class="top">
        <div class="logo_text">
            <h1>音频管理后台</h1>
        </div>
        <div class="ad_name">{{username}}</div>
        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                username:localStorage.getItem("username")
            }
        }
    }
</script>

<style lang="scss" scoped>
    .top {
        min-width: 1440px;
        height: 100px;
        background-color: #52575b;
        line-height: 100px;
        position: relative;

        .logo_text {
            position: absolute;
            color: #ffff;
            left: 120px;
            h1{
                font-size: 30px;
            }
        }

        .ad_name {
            float: right;
            color: #fff;
            margin-right: 70px;
            font-size: 20px;
        }

        .news {
            display: flex;
            float: right;
            color: #fff;
            margin-right: 120px;
            font-size: 20px;
            position: relative;
            .news-number{
                font-size: 14px;
                position: absolute;
                top:-10px;
                right: -16px;
            }
        }
    }
</style>