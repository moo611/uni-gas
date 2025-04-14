<template>
	<map ref="mapRef" style="width: 100%;height: 100vh;" :show-location="true" :enable-satellite="true"
		:markers="state.markers" :latitude="state.latitude" :longitude="state.longitude" @markertap="onMarkerTap"></map>

	<cover-view class="bottom-view" v-show="showDialog">
		<cover-view style="margin: 30rpx;">名称：{{state.curMarker.name}}</cover-view>
		<cover-view style="margin: 30rpx;">地址：{{state.curMarker.address}}</cover-view>
		<!-- <cover-image src="@/static/map.png" style="width: 50rpx;height: 50rpx;"></cover-image> -->
		
		<cover-view
			style="position: absolute;bottom: 0; display: flex; align-items: center; justify-content: center; height: 100rpx; width: 100%;">
			<button style="color: red;" class="bottom-btn" @click="onCancel">取消</button>
			<button style="color: blue;" class="bottom-btn" @click="dirRoute">导航</button>
		</cover-view>
	</cover-view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import request from '../../utils/request.js'
	const showDialog = ref(false)
	const mapRef = ref('')
	const state = reactive({
		latitude: 0,
		longitude: 0,
		markers: [],
		curMarker: {}
	})
	uni.getLocation({
		type: "gcj02",
		success: (res) => {
			console.log(res)
			state.latitude = res.latitude
			state.longitude = res.longitude
		},
		fail: (err) => {
			console.log('定位失败', err)
		}
	})


	const getStations = () => {
		request({
			url: 'station/list',
			data: {
				pageNum: 1,
				pageSize: 10000
			},
			method: 'GET'
		}).then(res => {
			state.markers = res.list.map(item => {
				return {
					id: item.id,
					latitude: item.latitude,
					longitude: item.longitude,
					iconPath: '../../static/blue.png',
					width: 30,
					height: 30,
					address: item.address,
					name: item.name,
					
				}
			})
			console.log(state.markers)
			state.latitude = state.markers[0].latitude
			state.longitude = state.markers[0].longitude
		})
	}

	const onMarkerTap = (e) => {
		console.log(e.detail.markerId)
		const id = e.detail.markerId
		showDialog.value = true
		state.curMarker = state.markers.find(item => item.id == id)

	}

	const onCancel = () => {
		state.curMarker = {}
		showDialog.value = false
	}

	const dirRoute = () => {
		const {
			latitude,
			longitude,
			address
		} = state.curMarker;
		uni.openLocation({
			latitude: latitude,
			longitude: longitude,
			address: address,
			success: function(res) {
				// console.log('success',res)
			},
			fail: function(error) {
				console.log('error', error)
			}
		})
		//window.webview.jumpMap(latitude, longitude, state.selectedMarker.detailAddress);
	};


	getStations()
	
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.bottom-view {
		height: 240rpx;
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color: white;
	}

	.bottom-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 160rpx;
		margin: 20rpx;
		height: 60rpx;
	}
</style>