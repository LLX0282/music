<template>
    <div>
        <v-top></v-top>
        <div class="content">
            <v-tab class="left_tab"></v-tab>
            <div class="content-right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import vTop from "./Top"
    import vTab from "./Tab"
    export default {
        name: "home",
        components: { 
            vTop,
            vTab
        }
    }
</script>

<style lang="scss" scoped>
    .content{
        min-width: 1700px;
        overflow: hidden;
        height: 780px;
        //display: flex;
    }
    // .left_tab {
    //     float: left;
    // }

    .content-right {
        min-width: 1340px;
        margin-left: 310px;
    }
</style>