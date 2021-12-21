/*
 * @Author: yangmiaomiao
 * @Date: 2021-09-16 11:21:11
 * @LastEditors: mawenli
 * @LastEditTime: 2021-12-17 16:21:10
 * @Description:
 */
import { STORAGE_KEY } from '../config/config'

export const setStorage = (key, value) => {
    uni.setStorageSync(STORAGE_KEY + key, value)
}

export const getStorage = (key) => {
    return uni.getStorageSync(STORAGE_KEY + key)
}

export const removeStorage = (key) => {
    uni.removeStorageSync(STORAGE_KEY + key)
}

//客户端平台
export const systemPlatform = () => {
    return uni.getSystemInfoSync().platform
}

//支持 promise
export const showToast = (title = '', icon = 'none', duration = 3000, mask = false) => {
    return uni.showToast({
        title,
        icon,
        duration,
        mask,
    })
}

//获取启动小程序的 query 参数
export function getQueryEnv() {
    const options = uni.getLaunchOptionsSync()
    if (options.query && options.query.env) {
        return options.query.env
    }
    return ''
}

/** 判断字段是否为空 */
export const isEmpty = (obj) => {
    if (typeof obj == 'undefined' || obj == null || obj == '') {
        return true
    } else {
        return false
    }
}

//数字或字符串转千分位符号
export function toThousands(num) {
    if (isEmpty(num)) {
        return ''
    }
    if (typeof num == 'number') {
        num = (num || 0).toString()
    }
    let result = ''
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result
        num = num.slice(0, num.length - 3)
    }
    if (num) {
        result = num + result
    }
    return result
}

//json转url参数
export function parseParams(data) {
    try {
        var tempArr = []
        for (var i in data) {
            var key = encodeURIComponent(i)
            var value = encodeURIComponent(data[i])
            tempArr.push(key + '=' + value)
        }
        var urlParamsStr = tempArr.join('&')
        return urlParamsStr
    } catch (err) {
        return ''
    }
}

//短信验证码
export function patternCode(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value)
}
//手机号验证
export const patternPhone = (value) => {
    return new RegExp('^1[3-9][0-9]{9}$', 'i').test(value)
}
/**
 * 计算实际年龄，精确到天
 * @param {*} birthday array [year, month, day]
 * @return array
 */
export function getAge(strBirthday) {
    if (strBirthday)
        var returnAge,
            strBirthdayArr = strBirthday.split('-'),
            birthYear = strBirthdayArr[0],
            birthMonth = strBirthdayArr[1],
            birthDay = strBirthdayArr[2],
            d = new Date(),
            nowYear = d.getFullYear(),
            nowMonth = d.getMonth() + 1,
            nowDay = d.getDate()
    if (nowYear == birthYear) {
        returnAge = 0 //同年 则为0周岁
    } else {
        var ageDiff = nowYear - birthYear //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay //日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1
                } else {
                    returnAge = ageDiff
                }
            } else {
                var monthDiff = nowMonth - birthMonth //月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1
                } else {
                    returnAge = ageDiff
                }
            }
        } else {
            returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge //返回周岁年龄
}
