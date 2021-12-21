/*
 * @Author: yangmiaomiao
 * @Date: 2021-09-15 17:18:07
 * @LastEditors: duchengdong
 * @LastEditTime: 2021-12-21 17:52:01
 * @Description: 公共已经授权登陆的一些api
 */
import { requestNoAuth, requestAuth } from './request'

// 微信鉴权code接口获取用户openId和unionId
export async function wxLoginByCodeApi(code) {
    const url = `/doctor/login/minilogin?code=${code}`
    return await requestNoAuth({
        url: url,
        method: 'GET',
    })
}

//刷新Token
export async function refreshTokenApi(refreshToken) {
    const url = `/doctor/login/refreshToken?accessToken=${refreshToken}`
    return await requestNoAuth({
        url: url,
        method: 'GET',
    })
}