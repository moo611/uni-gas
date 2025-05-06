<template>
	<view class="main">
		<NavBar title="商品" :showBack="true" />
		<view style="margin: 40rpx;">
			<text>名称：{{state.data.name}}</text>
		</view>
		<!-- <view style="margin: 40rpx;">
			<text>下单时间：{{getCurrentTime()}}</text>
		</view> -->
		<view style="margin: 40rpx;">
			<text>数量（升）</text>
			<input class="my-input" v-model="number" placeholder="请输入" type="number"/>
		</view>
		<view style="margin: 40rpx;">
			<text>支付方式：</text>
		</view>
		<view style="margin: 40rpx;">
			<radio-group @change="radioChange">
				<view style="display: flex; align-items: center;height: 50rpx;">
					<text style="margin-right: 10rpx;">微信</text>
					<radio :value="1" :checked="1 == current" />
				</view>
				<view style="display: flex; align-items: center;height: 50rpx;">
					<text style="margin-right: 10rpx;">支付宝</text>
					<radio :value="2" :checked="2 == current" />
				</view>

			</radio-group>

		</view>
		<view class="bottom-view">
			<view style="flex: 1;" />
			<text>{{getTotalPrice()}}￥</text>
			<button size="mini" @click="pay">支付</button>
		</view>

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
	const state = reactive({
		data: {},
		id: ''
	})
	const number = ref(1)
	const current = ref(1)
	const radioChange = (e) => {
		current.value = e.detail.value
	}
	const getTotalPrice=()=>{
		return (state.data.price*number.value).toFixed(2)
	}
	onLoad((options) => {
		state.id = options.id
		getInfo()
	})
	const getCurrentTime = () => {
		const now = new Date();

		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
		const day = String(now.getDate()).padStart(2, '0');

		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}
	const getInfo = () => {
		request({
			url: 'product/' + state.id,
			method: 'GET'
		}).then(res => {
			state.data = res
		})
	}

	const pay = () => {

		uni.showToast({
			title: '支付成功',
			duration: 2000,
			mask: true
		});



	}
</script>

<style scoped>
	.main {
		height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.bottom-view {
		box-sizing: border-box;
		padding: 10rpx;
		width: 100%;
		position: absolute;
		bottom: 0;
		height: 100rpx;
		display: flex;
		align-items: center;
	}
	.my-input {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		height: 80rpx;
	}
</style>