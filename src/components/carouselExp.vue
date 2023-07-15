<template>
	<div>
		<div class="left" @click="goDetail">
			<el-carousel trigger="click" height="256px" :autoplay="false">
				<el-carousel-item v-for="(item, index) in eduData" :key="index">
					<img class="carousel-img" :src="item.url" alt="" />
					<div class="label">{{ item.title }}</div>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			eduData: [
				{ contentText: '测试...', coverUrl: 'https://download.zzjsedu.net.cn/edu-js-pro-V1-5/2021/11/18/17/3dcecad2-8931-4a2c-9ee2-a655e981da2e_zxgl_upload.png', date: '6/07', dateStr: '2022-06-07', id: 76417, link: 'http://jinshuitest.changyan.cn/bz-information/#/docDetailsNo?id=76417', moduleTypeId: '55', moduleTypeName: '教育', title: '测试', url: 'https://download.zzjsedu.net.cn/edu-js-pro-V1-5/2021/11/18/17/3dcecad2-8931-4a2c-9ee2-a655e981da2e_zxgl_upload.png' },
				{ contentText: '测试...', coverUrl: 'https://download.zzjsedu.net.cn/edu-js-pro-V1-5/2021/11/18/17/3dcecad2-8931-4a2c-9ee2-a655e981da2e_zxgl_upload.png', date: '6/07', dateStr: '2022-06-07', id: 76417, link: 'http://jinshuitest.changyan.cn/bz-information/#/docDetailsNo?id=76417', moduleTypeId: '55', moduleTypeName: '教育', title: '测试', url: 'https://download.zzjsedu.net.cn/edu-js-pro-V1-5/2021/11/18/17/3dcecad2-8931-4a2c-9ee2-a655e981da2e_zxgl_upload.png' },
				{ contentText: '测试...', coverUrl: 'https://download.zzjsedu.net.cn/edu-js-pro-V1-5/2021/11/18/17/3dcecad2-8931-4a2c-9ee2-a655e981da2e_zxgl_upload.png', date: '6/07', dateStr: '2022-06-07', id: 76417, link: 'http://jinshuitest.changyan.cn/bz-information/#/docDetailsNo?id=76417', moduleTypeId: '55', moduleTypeName: '教育', title: '测试', url: 'https://download.zzjsedu.net.cn/edu-js-pro-V1-5/2021/11/18/17/3dcecad2-8931-4a2c-9ee2-a655e981da2e_zxgl_upload.png' },
			],
		};
	},

	mounted() {},

	methods: {
		goDetail() {
			if (this.eduData[0] && this.eduData[0].link) {
				window.open(this.eduData[0].link, '_blank');
			}
		},
	},
};
</script>

<style lang="less" scoped>
.carousel-img {
	width: 100%;
}
</style>
