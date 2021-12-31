/*
 * @Author: yangmiaomiao
 * @Date: 2021-09-15 18:20:08
 * @LastEditors: duchengdong
 * @LastEditTime: 2021-12-31 15:09:46
 * @Description:
 */
// 系统配置
const APPID = 'wxfd5bcb4481ba4dec' // 小程序appId
const APPNAME = '稳糖医路'
const STORAGE_NAME = 'luozhen' //storage 参数
const VER_SION = '1.0.0' // 版本号，用于日志区分
const TRY_LOGIN_LIMIT = 1 //登录状态态重试次数，默认1次，可修改
const NODE_ENV = process.env.UNI_TYPE //环境变量

const CONFIGS = {
	development: {
		API_HOST: 'https://test.server.roche.rnhos.com',
		IMG_PATH_HOST: 'https://diabetes-rn.oss-cn-shanghai.aliyuncs.com',
		STORAGE_NAME: STORAGE_NAME + '_dev_',
	},
	test: {
		API_HOST: 'https://test.server.roche.rnhos.com',
		IMG_PATH_HOST: 'https://diabetes-rn.oss-cn-shanghai.aliyuncs.com',
		STORAGE_NAME: STORAGE_NAME + '_test_',
	},
	production: {
		API_HOST: 'https://server.roche.rnhos.com',
		IMG_PATH_HOST: 'https://diabetes-rn.oss-cn-shanghai.aliyuncs.com',
		STORAGE_NAME: STORAGE_NAME + '_prod_',
	},
}

const IMG_FILE = '/luozhen-doctor-images'
const config = CONFIGS[NODE_ENV]

//导出的数据
export const APP_ID = APPID
export const APP_NAME = APPNAME
export const VERSION = VER_SION //版本号
export const TRY_LOGIN_NUM_LIMIT = TRY_LOGIN_LIMIT //登录状态重试次数
export const ENV_PATH = NODE_ENV //env环境
export const API_PATH = config.API_HOST //最终的环境地址
export const PUBLIC_IMG_PATH = config.IMG_PATH_HOST + IMG_FILE //上传到阿里云的图片地址
export const UPLOAD_FILE_URL = config.API_HOST + '/file/upload' //上传图片地址
export const STORAGE_KEY = config.STORAGE_NAME //storage 存储的前缀
