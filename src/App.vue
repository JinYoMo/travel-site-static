<template>
	<div id="app">
      <img class="logo" src="@/assets/images/home/logo.png" />
	  <nav-bar class="nav-bar"></nav-bar>
	  <div class="app-content">
		<div class="app-view">
		  <router-view></router-view>
		</div>
	  </div>
	</div>
</template>

<script>
import navBar from '@/components/nav-bar';


export default {
	name: 'App',
	components: {
		navBar,
	},
	data() {
		return {};
	},
	computed: {},
	created() {},
	watch: {
		'$route.path'() {
			this.$nextTick(() => {
				window.scrollTo(0, 0);
				document.body.scrollTop = document.documentElement.scrollTop = 0;
			});
		},
	},
	methods: {},
	mounted() {
		this.$nextTick(() => {
			window.scrollTo(0, 0);
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		});
	},
};
</script>

<style lang="less">
#app {
	position: relative;

	box-sizing: border-box;


.logo{
	width: 164px;
	height: 44px;
	position: absolute;
	top: 28px;
	left: 50px;
	z-index: 3;
}
	.nav-bar{
		position: absolute;
		top: 30px;
		right: 50px;
		z-index: 3;
	}
	.app-view {
		
	}
	
}
</style>
