/*
 * @Author: yangmiaomiao
 * @Date: 2021-09-14 13:49:35
 * @LastEditors: duchengdong
 * @LastEditTime: 2021-12-21 17:41:19
 * @Description:
 *  使用的时候get方法和set方法分别是：
 *  this.$store.dispatch('USER_ACTIONS', {name:'mavis});
 *  this.$store.commit('SET_USER_INFO', {name:'mavis});
 *  this.$store.getters.getUserInfo
 */
import Vue from 'vue'
import Vuex from 'vuex'
import storage from './models/storage'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	getters,
	modules: {
		storage,
	},
})
export default store
