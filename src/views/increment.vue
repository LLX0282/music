<template>
    <div>
        <h2>简单的vuex使用</h2>
        <div>
            <input type="button" value="-" @click="de">
            <span>{{num}}</span>
            <input type="button" value="+" @click="add">
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    export default {
        computed:{
            num(){
                return this.$store.state.count
            }
        },
        methods:{
            // add(){
            //     this.$store.commit("addMutations",5)
            // },
            add(){
                this.$store.dispatch("addAction")
            },
            de(){
                this.$store.commit("de")
            }
        }
    }
</script>

<style scoped>

</style>