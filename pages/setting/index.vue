<template>
	<view class="main">
		<NavBar title="设置"/>
		<image src="@/static/user.png" style="width: 100rpx;height: 100rpx;margin: 50rpx;"/>
		<text>{{user.nickname}}</text>
		
		
		<button type="warn" @click="logout" style="margin-top: 100rpx;">退出登录</button>
	</view>
</template>

<script setup>
	const user = toRefs(JSON.parse(uni.getStorageSync("user")))
	
	const logout=()=>{
		uni.clearStorage()
		uni.redirectTo({
			url:"/pages/login/login"
		})
	}
</script>

<style scoped>
	.main{
		flex-direction: column;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nav-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 150rpx;
	}
</style>