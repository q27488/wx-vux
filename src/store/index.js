import Vue from 'vue'
import Vuex from 'vuex'

import modal from './modules/modal'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    modal
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})
