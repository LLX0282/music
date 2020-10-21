<template>
    <div class="main">
        <div class="main_top">
            <ul class="top">
                <li class="left">
                    <img :src="'prod-api/'+this.Musicdetail.avatar">
                </li>
                <li class=right>
                    <ul class="text">
                        <li class="musicName">歌曲名：{{this.Musicdetail.songName}}</li>
                        <li class="musicAder">歌手：{{this.Musicdetail.nickName}}</li>
                        <li class="btn"> <el-button  @click="out"  type="warning">返回</el-button></li>
                    </ul>
                    <ul class="text color">
                        <li class="musicName">发行时间：{{this.Musicdetail.createTime}}</li>

                    </ul>
                    <ul class="text color">
                        <li class="musicName">所属分类：{{this.Musicdetail.songTypeName}}</li>
                        <li class="musicAder"></li>
                    </ul>
                    <ul class="text color">
                        <li class="musicName">播放次数：{{this.Musicdetail.viewQuantity}}</li>
                        <li class="musicAder">收藏次数：{{this.Musicdetail.collecting}}</li>
                    </ul>
                </li>
            </ul>
            <ul class="center">
                <li class="centerLeft">个性签名</li>
                <li class="centerRight">
                    <audio :src="'prod-api/'+this.Musicdetail.file" controls="controls">
                        您的浏览器不支持 audio 标签。
                    </audio>
                </li>
            </ul>
            <div class="signature">
                {{this.Musicdetail.remark}}
            </div>
            <div class="musicText">
                歌词
            </div>
            <div class="musicMian">
                <pre>
                    <span>
{{this.Musicdetail.words}}
                    </span>

               </pre>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                Musicdetail:''
            }
        },
        created(){
            this.Musicdetail=JSON.parse(sessionStorage.getItem("Musicdetail"))
            console.log(JSON.parse(sessionStorage.getItem("Musicdetail")))
        },
        methods:{
            out(){
               this.$router.push({
                    path: `/audioSystem`,
                                    }) 
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        padding-left: 30px;
        //background-color: tomato;
        min-width: 1200px;
        height: 800px;
        margin-top: 60px;
        overflow: hidden;
        .main_top {
            margin: 0 auto;
            overflow: scroll;
            width: 1100px;
            .top {
                overflow: hidden;
            }
            .center {
                margin-top: 45px;
                overflow: hidden;

                .centerRight {
                    //float: left;
                    // width: 50px;
                    // height: 50px;
                    // line-height: 50px;
                     margin-left: 250px;
                    // text-align: center;


                    // border-radius: 5px;
                }

                .centerLeft {
                    float: left;
                    width: 150px;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    background-color: rgb(239, 78, 78);
                    color: #fff;
                    border-radius: 5px;
                }
            }

            .signature {
                width: 100%;
                height: 100px;
                margin-top: 30px;
                border-top: 1px solid rgb(138, 127, 127);
                border-bottom: 1px solid rgb(138, 127, 127);
                padding: 30px 30px;
                color: rgb(138, 127, 127);
            }

            .musicText {
                height: 50px;
                line-height: 50px;
                text-align: center;
                width: 100%;
                font-size: 20px;
            }

            .musicMian {
                text-align: center;
                font-size: 18px;
                line-height: 30px;
                height: 220px;

            }

            .left {
                float: left;
                width: 150px;
                height: 150px;
                border-radius: 20px;
                overflow: hidden;

                img {
                    width: 100%;
                }
            }

            .right {
                float: left;
                margin-left: 100px;
                position: relative;
                .musicName {
                    float: left;
                }

                .musicAder {
                    float: left;
                    margin-left: 50px;
                }
                .btn{
                    top: 10px;
                    left: 750px;
                    position: absolute;
                }
            }

            .text {
                overflow: hidden;
                margin-bottom: 20px;
            }

            .color {
                color: rgb(138, 127, 127);
            }
        }



    }

    .user-list {
        margin-left: 20px;
    }

    .el-select-dropdown {
        top: 168px !important;
    }

    ::v-deep .el-input__inner {
        height: 48px;
        line-height: 48px;
    }

    ::v-deep .el-input--mini .el-input__inner {
        height: 28px;
        line-height: 28px;
    }

    .content[data-v-8dc7cce2] {
        height: 880px;
    }

    ::-webkit-scrollbar {
        /*隐藏滚轮*/
        display: none;
    }
</style>