<template>
	<view class="main">
		<NavBar class="bar" title="设置"/>
		<image src="@/static/user.png" style="width: 100rpx;height: 100rpx;margin: 50rpx auto;"/>
		<view style="margin: 0 auto;">
			<text>{{user.nickname}}</text>
		</view>
		
		
		<button type="success" @click="feedback" style="margin-top: 100rpx;width: 80%;">写反馈</button>
		
		<button type="warn" @click="logout" style="margin-top: 100rpx;width: 80%;">退出登录</button>
	</view>
</template>

<script setup>
import request from '../../utils/request';
	const user = toRefs(JSON.parse(uni.getStorageSync("user")))
	
	const logout=()=>{
		uni.clearStorage()
		uni.redirectTo({
			url:"/pages/login/login"
		})
	}
	
	const feedback=()=>{
		
		
		uni.navigateTo({
			url:'/pages/setting/feedback'
		})
		
	}
	
</script>

<style scoped>
	.main{
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		
	}
	
	
</style>