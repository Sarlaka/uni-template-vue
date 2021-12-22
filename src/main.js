/*
 * @Author: duchengdong
 * @Date: 2021-12-21 16:39:07
 * @LastEditors: duchengdong
 * @LastEditTime: 2021-12-22 20:11:42
 * @Description: 
 */
import Vue from 'vue'
import App from './App'
import * as config from 'config/config'
import store from './store'
import uView from 'uview-ui'

// 配置uview
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'

Vue.prototype.$config = config
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
