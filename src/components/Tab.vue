<template>
    <div class="tab">
        <el-col :span="12" class="left">
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo bg" @open="handleOpen" @close="handleClose"
                background-color="#52575b" text-color="#fff" active-text-color="#ffd04b" router>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="iconfont icon-yinyue icon_pic"></i>
                        <span>音频管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item class="sun" index="/audioSystem">审核歌曲</el-menu-item>
                        <!-- <el-menu-item class="sun" index="/workDetails">作品详情</el-menu-item> -->
                        <el-menu-item class="sun" index="/classify">分类管理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="/comment">
                    <i class="iconfont icon-pinglun-copy icon_pic"></i>
                    <span slot="title">评论管理</span>
                </el-menu-item>
                <el-menu-item index="/userSystem" >
                    <i class="iconfont icon-yonghu icon_pic icon_witch"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item v-if="role=='admin'" index="/adminSystem">
                    <i class="iconfont icon-guanliyuan icon_pic1 icon_witch"></i>
                    <span slot="title">管理员管理</span>
                </el-menu-item>
                <el-menu-item index="/propellingMovement">
                    <i class="iconfont icon-push icon_pic3 icon_witch"></i>
                    <span slot="title">推送</span>
                </el-menu-item>
                <el-menu-item index="/ststistics">
                    <i class="el-icon-help icon_pic3 icon_witch"></i>
                    <span slot="title">统计</span>
                </el-menu-item>
                <el-menu-item v-if="role=='admin'" index="/adminRecord">
                    <i class="iconfont icon-jilu icon_pic4"></i>
                    <span slot="title">管理员操作记录</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              role: localStorage.getItem("role") 
            }
        },
        mounted(){
            
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
                this.$router.push({path:"audioSystem"})
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style lang="scss" scoped>
 .tab{
     width: 310px;
     height: 840px;
     background-color: #52575b;
     position: absolute;
     top: 100px;
     .left{
         width: 100.2%;
         
         
     }
     .bg{
         background-color: #52575b;
     }
     
     span{
         font-size: 20px;
     }
     .icon_pic{
         margin-left: 40px;
         margin-right: 15px;
         font-size: 20px;
     }
     .icon_pic1{
         margin-left: 41px;
         margin-right: 13px;
     }
     .icon_pic3{
         margin-left: 40px;
         margin-right: 13px;
     }
     .icon_pic4{
         margin-left: 42px;
         margin-right: 12px;
         font-size: 20px;
     }
     .icon_witch{
         font-size: 22px !important;
     }
 }
.sun{
    margin-left: 70px;
}
</style>