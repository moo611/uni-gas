<template>
	<view class="main">
		<NavBar title="优惠券"/>
		<view class="toper">
			<tabs :titles="[{
		    name: '待领取',
		    value: '0'
		  }, {
		    name: '已领取',
		    value: '1'
		  }, {
		    name: '已使用',
		    value: '2'
		  },]" v-model:active="activeTab" @click-tab="tabChange"></tabs>
		</view>
		<scroll-view class="scroll-view" :scroll-y="true" @scrolltolower="loadmore">
			<view v-for="(item, index) in state.data" :key="index" class="card">
				<view style="margin: 5rpx;"><text>编码:{{item.code}}</text></view>
				<view style="margin: 5rpx;"><text>名称:{{item.name}}</text></view>
				<view style="margin: 5rpx;"><text>折扣价:{{item.discount}}￥</text></view>

				<button size="mini" type="primary" @click="onReceive(item)" v-show="activeTab=='0'"
					class="btn">领取</button>
				<button size="mini" type="primary" @click="onUse(item)" v-show="activeTab=='1'" class="btn">使用</button>
				<view style="background-color: #f0f0f0;height: 2rpx; position: absolute; bottom: 0;width: 100%;" />
			</view>
		</scroll-view>
	</view>

</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue"
	import request from '../../utils/request.js'
	import {
		message
	} from "../../utils/util.js";
	const activeTab = ref('0')
	const queryParams = reactive({
		pageNum: 1,
		pageSize: 10,
		status: '0',
		receiver: ''
	})
	const state = reactive({
		data: []
	})

	const tabChange = () => {

		const value = activeTab.value
		if (value == '0') {
			queryParams.status = '0'
			queryParams.receiver = ''
		} else if (value == '1') {
			queryParams.status = '1'
			queryParams.receiver = JSON.parse(uni.getStorageSync("user")).username
		} else {
			queryParams.status = '2'
			queryParams.receiver = JSON.parse(uni.getStorageSync("user")).username
		}

		refresh()

	}

	const refresh = () => {
		isEnd = false
		isLoading = false
		queryParams.pageNum = 1
		state.data = []
		request({
			url: 'coupon/list',
			data: queryParams,
			method: 'GET'
		}).then(res => {
			queryParams.pageNum++
			state.data = res.list
		})
	}
	let isEnd = false
	let isLoading = false

	const loadmore = () => {
		if (isEnd || isLoading) {
			return
		}
		isLoading = true
		request({
			url: 'coupon/list',
			data: queryParams,
			method: 'GET'
		}).then(res => {
			isLoading = false
			if (res.list.length == 0) {
				isEnd = true
			} else {
				queryParams.pageNum++
				state.data = state.data.concat(res.list)
			}

		})
	}

	const onReceive = (item) => {
		item.status = '1'
		item.receiver = JSON.parse(uni.getStorageSync("user")).username
		request({
			url: 'coupon',
			data: item,
			method: 'PUT'
		}).then(res => {
			message.toast('领取成功')
			refresh()
		})
	}

	const onUse = (item) => {
		item.status = '2'
		request({
			url: 'coupon',
			data: item,
			method: 'PUT'
		}).then(res => {
			message.toast('使用成功')
			refresh()
		})
	}

	refresh()
</script>

<style scoped>
	.toper {
		/* height: 90rpx; */
		width: 100%;
	}

	.scroll-view {
		width: 100%;
		/* height: 100%; */
		flex: 1;
		overflow: hidden;

		box-sizing: border-box;
	}

	.card {
		/* margin: 10rpx; */
		box-sizing: border-box;
		padding: 20rpx;
		width: 100%;
		height: 200rpx;
		background-color: white;
		position: relative;
	}

	.btn {
		position: absolute;
		right: 20rpx;
		top: 20rpx;

	}

	.main {
		height: 100vh;
		display: flex;
		flex-direction: column;

	}


	
</style>