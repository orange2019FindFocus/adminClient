import STATE from './state'
import ACTIONS from './actions'


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: STATE,
  mutations: {},
  actions: ACTIONS
})

export default store
