<template>
	<view class="main">
		<NavBar title="商品"/>
		
		<scroll-view class="scroll-view" :scroll-y="true" @scrolltolower="loadmore">
			<view v-for="(item, index) in state.data" :key="index" class="card">
				
				<image style="width: 100rpx;height: 100rpx;" src="../../static/gas.png"/>
				<view style="flex: 1;height: 100%;margin-left: 30rpx;">
					<view style="margin: 5rpx;"><text>名称:{{item.name}}</text></view>
					<view style="margin: 5rpx;"><text>油价:{{item.price}}￥/升</text></view>
				</view>
				<button size="mini" style="height: 60rpx;" @click="onpay(item.id)">购买</button>
				<!-- <view style="background-color: #f0f0f0;height: 2rpx; position: absolute; bottom: 0;width: 100%;"/> -->
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
		
	})
	const state = reactive({
		data: []
	})
	
	let isEnd = false 
	let isLoading = false

	const refresh = () => {
		isEnd=false
		isLoading=false
		queryParams.pageNum = 1
		state.data = []
		request({
			url: 'product/list',
			data: queryParams,
			method: 'GET'
		}).then(res => {
			queryParams.pageNum++
			state.data = res.list
		})
	}

	const loadmore = () => {
		if(isEnd || isLoading){
			return
		}
		isLoading=true
		request({
			url: 'product/list',
			data: queryParams,
			method: 'GET'
		}).then(res => {
			isLoading=false
			if(res.list.length == 0){
				isEnd=true
			}else{
				queryParams.pageNum++
				state.data = state.data.concat(res.list)
			}
			
		})
	}
	
	const onpay=(id)=>{
		uni.navigateTo({
			url:"/pages/product/pay?id="+id,
			
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
		padding:20rpx;
		width: 100%;
		height: 200rpx;
		background-color: white;
		display: flex;
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