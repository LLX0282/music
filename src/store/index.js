import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var store = new Vuex.Store({
  state:{
    count : 100
  },
  mutations:{
    addMutations(state,n){
      state.count+=n
    },
    de(state){
      state.count--
    }
  },
  actions:{
    addAction(context){
      console.log(context)
      // setTimeout(() => {
      //   context.commit("addMutations",5)
      // }, 1000);
    }
  }
})
export default store;


