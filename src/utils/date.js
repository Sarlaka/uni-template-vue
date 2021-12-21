/*
 * @Author: yangmiaomiao
 * @Date: 2021-09-14 11:56:52
 * @LastEditors: duchengdong
 * @LastEditTime: 2021-12-21 18:58:12
 * @Description:
 */
// 时间格式化
export const formatDate = (time, type) => {
    if (typeof time == 'string') {
        if (time.includes('-') || time.includes('T')) {
            time = time.replace(/\-/g, '/')
            if (time.includes('T')) {
                time = time.replace('T', ' ')
            }
        }
    }
    let date = new Date(time)
    let YY = date.getFullYear()
    let MM = date.getMonth() + 1
    MM = MM < 10 ? '0' + MM : MM //月补0
    let DD = date.getDate()
    DD = DD < 10 ? '0' + DD : DD //天补0
    let hh = date.getHours()
    hh = hh < 10 ? '0' + hh : hh //小时补0
    let mm = date.getMinutes()
    mm = mm < 10 ? '0' + mm : mm //分钟补0
    let ss = date.getSeconds()
    ss = ss < 10 ? '0' + ss : ss //秒补0

    let result = YY + '-' + MM + '-' + DD //默认 YYYY-MM- DD
    switch (type) {
        case 'YYYY-MM-DD hh:mm:ss':
            result = YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss
            break
        case 'YYYY-MM-DD hh:mm':
            result = YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm
            break
        case 'YYYY-MM-DD':
            result = YY + '-' + MM + '-' + DD
            break
        case 'YYYY-MM':
            result = YY + '-' + MM
            break
        case 'YYYY/MM/DD hh:mm:ss':
            result = YY + '/' + MM + '/' + DD + ' ' + hh + ':' + mm + ':' + ss
            break
        case 'YYYY/MM/DD hh:mm':
            result = YY + '/' + MM + '/' + DD + ' ' + hh + ':' + mm
            break
        case 'YYYY/MM/DD':
            result = YY + '/' + MM + '/' + DD
            break
        case 'YYYY/MM':
            result = YY + '/' + MM
            break
        case 'YYYY年MM月DD日 hh:mm:ss':
            result = YY + '年' + MM + '月' + DD + '日' + ' ' + hh + ':' + mm + ':' + ss
            break
        case 'YYYY年MM月DD日 hh:mm':
            result = YY + '年' + MM + '月' + DD + '日' + ' ' + hh + ':' + mm
            break
        case 'YYYY年MM月DD日':
            result = YY + '年' + MM + '月' + DD + '日'
            break
        case 'YYYY年MM月':
            result = YY + '年' + MM + '月'
            break
        case 'hh:mm':
            result = hh + ':' + mm
            break
        default:
            break
    }
    return result
}
// *********** 开始 ***********

// 计算一周的开始日期和结束日期
function getWeekArray(offset = 0) {
    var now = new Date()
    var nowTime = now.getTime()
    var day = now.getDay() // 当周第几天
    var dayTimesamp = 24 * 60 * 60 * 1000 // 一周的时间ms数
    var weekTimesamp = 7 * dayTimesamp
    var offsetTimesamp = weekTimesamp * offset // 偏移周的时间

    var startTime = nowTime - (day - 1) * dayTimesamp + offsetTimesamp
    var endTime = nowTime + (7 - day) * dayTimesamp + offsetTimesamp
    startTime = new Date(startTime)
    endTime = new Date(endTime)
    // 计算周的开始日期
    var startTimeY = startTime.getFullYear()
    var startTimeM = startTime.getMonth() + 1
    var startTimeD = startTime.getDate()
    startTimeM = startTimeM < 10 ? '0' + startTimeM : startTimeM
    startTimeD = startTimeD < 10 ? '0' + startTimeD : startTimeD
    var startDay = startTimeY + '-' + startTimeM + '-' + startTimeD
    // 计算周的结束日期
    var endTimeY = endTime.getFullYear()
    var endTimeM = endTime.getMonth() + 1
    var endTimeD = endTime.getDate()
    endTimeM = endTimeM < 10 ? '0' + endTimeM : endTimeM
    endTimeD = endTimeD < 10 ? '0' + endTimeD : endTimeD
    var endDay = endTimeY + '-' + endTimeM + '-' + endTimeD

    return [startDay,endDay]
}

export const msgTimeFormat = date => {
	let str = ''
	let time = date.replace(/-/g, '/').substr(0, 16)
    let [weekStart,weekEnd] = getWeekArray()
	let newTime = new Date(time.toString()).getTime() //传进来时间的时间戳
	// 判断是否当天
	if (new Date(time.toString()).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
		return (str = `${time.substr(11, 5)}`)
	}
	if (new Date(time.toString()).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0) == -86400000) {
		return (str = `昨天 ${time.substr(11, 5)}`)
	}
	//判断是不是在本周
	if (newTime > new Date(`${weekStart} 00:00`).getTime() && new Date(`${weekEnd} 23:59`).getTime() > newTime) {
		console.log('在本周内')
		var weekArray = new Array('日', '一', '二', '三', '四', '五', '六')
		var week = weekArray[new Date(time.toString()).getDay()]
		return (str = `周${week} ${time.substr(11, 5)}`)
	}
	return time
}

// *********** 结束 ***********
