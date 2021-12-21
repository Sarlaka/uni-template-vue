<!--
 * @Author: duchengdong
 * @Date: 2021-12-21 16:39:07
 * @LastEditors: duchengdong
 * @LastEditTime: 2021-12-21 19:50:48
 * @Description: 
-->
<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title" @click="add">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello Gemii',
			}
		},
		onLoad() {
		},
		computed:{
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
