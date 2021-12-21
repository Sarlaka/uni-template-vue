import $store from '../store'
import { getStorage, setStorage, showToast } from '../utils/util'
import { wxLoginByCodeApi, refreshTokenApi } from './api'
import { TRY_LOGIN_NUM_LIMIT } from '@/config/config'

class AuthProvider {
    async onLogin() {
        setStorage('accessToken', 'wait')
        let res = await uni.checkSession()
        console.log(res, 'res--')
        // 强制获取token进行刷新
        let loginRes = await uni.login()
        const code = loginRes[1].code
        console.log(code, 'code==')
        return this.getUserDataByCode(code, TRY_LOGIN_NUM_LIMIT)
    }

    //根据微信鉴权code,获取用户openId 和 unionId（以及登录状态token）,失败后重新获取三次
    async getUserDataByCode(code, number = 1) {
        const res = await wxLoginByCodeApi(code)
        console.log(res, '根据微信鉴权code,获取用户openId')

        if (res && res.code == 100) {
            const { expireTime, token, openId, unionId, userType } = res.data
            const userInfo = { openId, unionId, userType }
            //1.存储token、token过期时间、以及用户信息
            setStorage('accessToken', token)
            setStorage('expireTime', expireTime)
            setStorage('userInfo', userInfo)
            $store.commit('SET_USER_INFO', userInfo)
            return token
        } else if (res.code == 105) {
            uni.showToast({
                title: '此用户已被禁用，请联系管理员',
                icon: 'none',
                duration: 3000,
            })
        } else {
            if (number > 1) {
                return this.getUserDataByCode(code, --number)
            } else {
                showToast(res.msg)
                return null
            }
        }
    }

    async getAccessToken() {
        const accessToken = getStorage('accessToken')
        const expiresTime = getStorage('expireTime')
        const curretnTime = new Date().getTime()
        if (accessToken === 'wait') {
            console.log('accessToken-wait')
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.getAccessToken().then((res) => {
                        resolve(res)
                    })
                }, 1900)
            })
        }
        if (accessToken === 'null' || accessToken === '' || curretnTime > expiresTime) {
            // 没有token或者超过了失效时间，需要重新登录
            console.log('onLogin')
            let res = await this.onLogin()
            return res
        }
        if (curretnTime + 5 * 60 * 1000 > expiresTime) {
            // 快要过期时，刷新token
            console.log('onRefreshToken')
            let res = await this.onRefreshToken(accessToken)
            return res
        } else {
            // 正常返回token
            return new Promise((resolve, reject) => {
                resolve(accessToken)
            })
        }
    }

    async onRefreshToken(accessToken) {
        setStorage('accessToken', 'wait')
        let res = await refreshTokenApi(accessToken)
        if (res.code === 100) {
            let { accessToken, expireTime } = res.data
            setStorage('accessToken', accessToken)
            setStorage('expireTime', expireTime)
            return accessToken
        } else {
            return null
        }
    }
}

export default new AuthProvider()
