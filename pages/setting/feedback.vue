<template>
	<view class="main">
		<NavBar title="反馈" :showBack="true" />
		<view class="my-input-div">
			<text>内容</text>
			<input class="my-input" v-model="form.content" placeholder="请输入" />
		</view>

		<button @click="send">发送</button>
	</view>
</template>

<script setup>
	import {
		reactive
	} from 'vue';
	import request from '../../utils/request';
	import {
		message
	} from '../../utils/util';
	const form = reactive({
		content: '',
		username: ''
	})
	const send = () => {
		const user = JSON.parse(uni.getStorageSync("user"))
		form.username = user.username
		console.log(form)
		request({
			url: 'feedback',
			data: form,
			method: 'POST'
		}).then(res => {
			message.success('反馈成功')
		})
	}
</script>

<style scoped>
	.main {
		height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.my-input-div {
		width: 80%;
		margin: 20rpx auto;
	}

	.my-input {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		height: 80rpx;
	}
</style>