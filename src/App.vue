<!--
 * @Author: duchengdong
 * @Date: 2021-12-21 16:39:07
 * @LastEditors: duchengdong
 * @LastEditTime: 2021-12-21 18:26:56
 * @Description: 
-->
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			console.log(this.$config)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
@import 'uview-ui/index.scss'; //引用uview-ui框架样式
@import 'styles/index.scss'; //引用自定义变量
@import 'styles/uview.scss'; //引用修改的uview-ui自定义养殖

// 在小程序中，不支持通配符*
page,
view,
image {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
}

page {
    background: $bg-color;
}
scroll-view {
    -webkit-overflow-scrolling: touch;
}
@font-face {
    font-family: D-DIN-PRO-SemiBold;
    src: url('~@/static/font/D-DIN-PRO-600-SemiBold.otf');
}

@font-face {
    font-family: Gotham-Bold;
    src: url('~@/static/font/Gotham-Bold 700.otf');
}
</style>