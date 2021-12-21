/*
 * @Author: yangmiaomiao
 * @Date: 2021-09-14 11:46:07
 * @LastEditors: duchengdong
 * @LastEditTime: 2021-12-21 17:54:45
 * @Description:
 */
import { API_PATH } from '@/config/config'
import AuthProvider from './AuthProvider.js'
import { getLogger } from '@/utils/log'
import { removeStorage } from '@/utils/util'

const logger = getLogger('network')

const request = (options, accessToken) => {
    const { url, method, data, contentType } = options
    let f = accessToken && { Authorization: accessToken }
    let requestOption = {
        url: API_PATH + url,
        method,
        data: data || {},
        header: {
            'content-Type': contentType || 'application/json; charset=UTF-8',
            ...f,
        },
    }
    if (options.showLoading) {
        uni.showLoading({ title: '加载中' })
    }

    function requestHideLoading() {
        if (options.showLoading) {
            setTimeout(() => {
                uni.hideLoading()
            }, 500)
        }
    }

    function requestShowToast(title) {
        setTimeout(() => {
            uni.showToast({
                title: title,
                icon: 'none',
                duration: 3000,
            })
        }, 200)
    }
    return uni.request(requestOption).then((res) => {
        requestHideLoading()
        if (res[0]) {
            requestShowToast('网络异常')
            throw new Error(res[0])
        }

        if (res[1].statusCode !== 200) {
            requestShowToast(res[1].data.error)
            throw new Error(res[1].data.error)
        }
        if (res[1].data.code == 401) {
            //token过期
            requestShowToast(res[1].data.msg)
            removeStorage('accessToken')
            removeStorage('expireTime')
            removeStorage('userInfo')
        }

        //登录接口不做此操作处理
        if (!options.reLaunch) {
            if (res[1].data.code == 105) {
                //用户禁用或用户不存在
                requestShowToast(res[1].data.msg)
                uni.reLaunch({
                    url: `/pages/login/login`,
                })
                removeStorage('accessToken')
                removeStorage('expireTime')
                removeStorage('userInfo')
            }
        }
        if (res[1].data.code !== 100) {
            //打印日志
            logger.ERROR('request error', requestOption, res[1].data)
        }
        return res[1].data
    })
}

//鉴权请求
export const requestAuth = async (options) => {
    const accessToken = await AuthProvider.getAccessToken()
    return request(options, accessToken)
}

//非鉴权请求
export const requestNoAuth = (options) => {
    return request(options)
}
