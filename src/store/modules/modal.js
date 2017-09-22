/**
 * Created by Administrator on 2017/7/22
 */
import * as types from '../mutation-types'

// initial state
const state = {
  loading:false,
  alert:{
    show:false,
    type:"",
    msg:"",
    time:1500,
  }
}

// getters
const getters = {
  getLoading: state => state.loading,
  getAlert: state => state.alert
}


// actions
const actions = {

}

// mutations
const mutations = {
  //是否开启loadding弹窗
  [types.MODAL_LOADING_OPEN](state) {
    // console.log("state.loading = true")
    state.loading = true
  },
  [types.MODAL_LOADING_CLOSE](state) {
    // console.log("state.loading = false")
    state.loading = false
  },

  //展示弹窗
  [types.SHOW_ALERT](state,{type,msg,time}) {
    state.alert = {show:true,msg};
    switch (type){
      case 'success':
            state.alert.type = 'alert-success'
            break;
      case 'error':
            state.alert.type = 'alert-error'
            break;
    }
    state.alert.time = time || 1500;
  },

  [types.HIDE_ALERT](state){
    state.alert = {
      show:false,
      type:'',
      msg:'',
      time:1500
    };
  }


}


export default {
  state,
  getters,
  actions,
  mutations
}
