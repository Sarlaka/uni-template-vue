/*
 * @Author: duchengdong
 * @Date: 2021-12-21 16:39:07
 * @LastEditors: duchengdong
 * @LastEditTime: 2021-12-21 17:42:04
 * @Description: 
 */
import Vue from 'vue'
import App from './App'
import * as config from 'config/config'
import store from './store'

Vue.prototype.$config = config
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
