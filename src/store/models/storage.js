/*
 * @Author: yangmiaomiao
 * @Date: 2021-09-14 13:49:35
 * @LastEditors: duchengdong
 * @LastEditTime: 2021-12-21 17:50:07
 * @Description:
 */
const storage = {
	state: {
		userInfo: null,
		tokenInfo: null,
		step: 0,
	},
	mutations: {
		//同步 //修改state
		SET_USER_INFO(state, data) {
			state.userInfo = data
		},
		SET_TOKEN_INFO(state, data) {
			state.tokenInfo = data
		},
		SET_WE_RUN_STEP(state, data) {
			state.step = data
		},
	},
	actions: {
		//异步
		USER_ACTIONS: ({commit}, data) => {
			commit('SET_USER_INFO', data)
		},
		TOKEN_ACTIONS: ({commit}, data) => {
			commit('SET_TOKEN_INFO', data)
		},
	},
}
export default storage
