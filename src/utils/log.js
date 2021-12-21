/*
 * @Author: yangmiaomiao
 * @Date: 2021-09-15 18:00:44
 * @LastEditors: duchengdong
 * @LastEditTime: 2021-12-21 17:57:14
 * @Description: 封装日志
 */
import {formatDate} from './date'
import {VERSION,ENV_PATH} from '@/config/config'

const canIUseLogManage = uni.canIUse('getLogManager')

const logger = canIUseLogManage ? uni.getLogManager({level: 0}) : null

const realtimeLogger = uni.getRealtimeLogManager ? uni.getRealtimeLogManager() : null

/**
 * 日志只打印到本地，不上传到服务器
 * @param {string} file 所在文件名
 * @param  {...any} arg 参数
 */

export function DEBUG(file, ...args) {
	console.debug(file, ' | ', ...args)
	if (canIUseLogManage) {
		logger && logger.debug(`[${VERSION}]`, file, ' | ', ...args)
	}
	realtimeLogger && realtimeLogger.info(`[${VERSION}]`, file, ' | ', ...args)
}

export function INFO(file, ...args) {
	console.info(file, ' | ', ...args)
	if (canIUseLogManage) {
		logger && logger.log(`[${VERSION}]`, file, ' | ', ...args)
	}
	realtimeLogger && realtimeLogger.info(`[${VERSION}]`, file, ' | ', ...args)
}

/**
 *
 * @param {string} file 所在文件名
 * @param {string} func 所在函数名
 * @param  {...any} arg 参数
 */
export function RUN(file, ...args) {
	console.log(file, ' | ', ...args)
	if (canIUseLogManage) {
		logger && logger.log(`[${VERSION}]`, file, ' | ', ...args)
	}
	realtimeLogger && realtimeLogger.info(`[${VERSION}]`, file, ' | ', ...args)

	// 记录到本地，用来logs页面展示
	// 展示本地存储能力
	let logs = uni.getStorageSync('logs') || []
	logs.unshift(`${formatDate(new Date())} ${file} | ${args[0]}`)
	uni.setStorageSync('logs', logs)
}

/**
 *
 * @param {string} file 所在文件名
 * @param {string} func 所在函数名
 * @param  {...any} arg 参数
 */
export function ERROR(file, ...args) {
	console.error(file, ' | ', ...args)
	if (canIUseLogManage) {
		logger && logger.warn(`[${VERSION}]`, file, ' | ', ...args)
	}
	if (realtimeLogger) {
		realtimeLogger.error(`[${VERSION}]`, file, ' | ', ...args)
		// 判断是否支持设置模糊搜索
		if (realtimeLogger.setFilterMsg) {
			try {
				realtimeLogger.setFilterMsg(`[${VERSION}] ${file} ${JSON.stringify(args)}`)
			} catch (e) {
				realtimeLogger.setFilterMsg(`[${VERSION}] ${file}`)
			}
		}
	}
}

export function getLogger(fileName) {
	return {
		DEBUG: function (...args) {
			if(ENV_PATH=="production") return
			DEBUG(fileName, ...args)
		},
		RUN: function (...args) {
			if(ENV_PATH=="production") return
			RUN(fileName, ...args)
		},
		ERROR: function (...args) {
			if(ENV_PATH=="production") return
			ERROR(fileName, ...args)
		},
		INFO: function (...args) {
			if(ENV_PATH=="production") return
			INFO(fileName, ...args)
		},
	}
}
