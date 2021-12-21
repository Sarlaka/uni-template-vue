/*
 * @Author: yangmiaomiao
 * @Date: 2021-09-14 11:54:59
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2021-12-07 11:20:28
 * @Description:
 */
//检测当前的小程序:版本自动更新
export function checkUpdateVersion() {
    //判断微信版本是否 兼容小程序更新机制API的使用
    if (uni.canIUse('getUpdateManager')) {
        //创建 UpdateManager 实例
        const updateManager = uni.getUpdateManager()
        //检测版本更新
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            // console.log(res, '版本自动更新')
            if (res.hasUpdate) {
                //监听小程序有版本更新事件
                updateManager.onUpdateReady(function () {
                    //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
                    updateManager.applyUpdate()
                })
                updateManager.onUpdateFailed(function () {
                    // 新版本下载失败
                    uni.showModal({
                        title: '已经有新版本喽~',
                        content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开呦~',
                    })
                })
            }
        })
    } else {
        //TODO 此时微信版本太低（一般而言版本都是支持的）
        uni.showModal({
            title: '溫馨提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        })
    }
}

/*
 * 校验是否开启了授权获取权限
 * options={auth: ''},
 */
export function authIsSetting(options) {
    return new Promise((resolve) => {
        uni.getSetting().then((res) => {
            console.log(res, 'authIsSetting')
            //是否有授权
            const authStatus = res[1].authSetting[options.auth]
            let data = {}
            if (typeof authStatus === 'undefined') {
                //未开启微信运动
                data = { code: 3, auth: authStatus, msg: '首次授权' }
            } else if (!authStatus) {
                //已开启微信运动,但是getWeRunDataAPI未授权
                data = { code: 2, auth: false, msg: '未授权' }
            } else {
                data = { code: 1, auth: true, msg: '已授权' }
            }
            resolve(data)
        })
    })
}
