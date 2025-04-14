<template>
	<view class="toper">
		<view class="toper-item-box">
			<text>{{props.title}}</text>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['title'])

	const menuButton = uni.getMenuButtonBoundingClientRect()
	let {
		height,
		top,
		bottom
	} = menuButton
	// const txtTop = top - (height / 2) + 'px'
	const txtTop = (top - 10) + 'px'
	const barHeight = (bottom + 10) + 'px'
</script>

<style scoped>
	.toper-item-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding-top: v-bind("txtTop");
		flex: 1;
	}

	.toper {
		display: flex;
		flex-direction: column;
		height: v-bind('barHeight');
	}
</style>