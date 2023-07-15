<template>
    <div class="contact-wrap">
	  <carousel v-if="contactShow" :carouselData="carouselData" :height="633">
		  <template #carousel-cont>
			<div :class="[$i18n.locale === 'zh' ? 'carousel-zh' : 'carousel-en', 'carousel-text', 'wow animated bounceIn']">
			  <p>{{$t('translate.keepContact')}}</p>
			</div>
		  </template>			  
	  </carousel>
	  <div :class="[$i18n.locale === 'en' ? 'contact-container-en' : '', 'contact-container']">
		<div v-if="contactShow" class="contact-serve wow animated bounceInDown">
			<div class="serve-top flex">
			  <div class="serve-cont flex">
				  <img src="@/assets/images/home/time-con.png" alt="">
				  <div class="serve-tip">
					  <p>{{$t('contactUs.hourService')}}</p>
					  <p>{{$t('contactUs.customerService')}}</p>
				  </div>
			  </div>
			  <!-- <div class="serve-btn flex">
				  <button><span>{{$t('contactUs.consultImmediate')}}</span></button>
			  </div> -->
			</div>
			<div class="serve-bottom mt20">
				<el-collapse v-model="activeNames" @change="handleChange">
					<el-collapse-item :title="$t('contactUs.wuhanEverest')" name="1">
						<ul class="flex flex-wrap"> 
							<li v-for="(item, index) in serveList" :key="index" class="mr20">                                     
								{{item}}
							</li>
						</ul>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>
		<div v-if="contactShow" class="contact-line">
		  <div class="line-map wow animated lightSpeedIn">
			<div class="amap-page-container">
			  <div :style="{width:'100%',height:'530px'}">
				<el-amap vid="amap" :plugin="plugin" class="amap-line" :center="center">
				</el-amap>
			  </div>
			</div>
		  </div>
		  <ul class="line-phone flex flex-wrap wow animated pulse">
			  <li v-for="(item, index) in phoneList" :key="index">
				  <p><span>{{item.name}}</span>: {{item.val}}</p>
			  </li>
		  </ul>
		</div>
		<div class="contact-way">
		  <div class="title-col wow animated slideInDown">
			<p>{{$t('contactUs.route')}}</p>
		  </div>
		  <ul class="way-cont flex wow animated slideInUp">
			  <li v-for="(item, index) in wayList" :key="index">
				  <div class="way-title flex">
					  <p>{{item.title}}</p>
					  <img :src="item.icon" alt="">
				  </div>
				  <div class="way-text mt20">
					  <p>{{item.text}}</p>
				  </div>
			  </li>
		  </ul>
		</div>
	  </div>
	  <!-- 底部 -->
	  <Footer />
	</div>
</template>

<script>
import carousel from '@/components/carousel';
import Footer from "@/components/footer";
export default {
	components: {
		carousel,
		Footer
	},
	data() {
		const self = this;
		return {
			contactShow: false,  // 动画初始自动开始
			carouselData: [ 
			  {
				url: require("@assets/images/home/connect-bg01.png")
			  },
			],
			activeNames: ['1'],
			serveList: [
				this.$t('contactUs.wuhanEverest'),
				this.$t('contactUs.beijingEverest'),
				this.$t('contactUs.shanghaiEverest'),
				this.$t('contactUs.hainanEverest'),
				this.$t('contactUs.mountEverest'), 
				this.$t('contactUs.KenyaEverest'), 
			],
			phoneList: [
				{
					name: this.$t('contactUs.hotline'),
					val: '027-87619950'
				},
				{
					name: this.$t('contactUs.serviceEmail'),
					val: 'lola-yourtravel@foxmail.com'
				},
				{
					name: this.$t('contactUs.address'),
					val: this.$t('contactUs.roomBlock'),
				},
			    {
					name: this.$t('contactUs.salesHotline'),
					val: '027-87619950'
				},
				{
					name: this.$t('contactUs.recruitmentEmail'),
					val: 'merle-yourtravel@foxmail.com'
				}
			],
			wayList: [
				{
					title: this.$t('contactUs.busRoutes'),
					icon: require('@/assets/images/home/gongjiao.png'),
					text: this.$t('contactUs.busStation'),
				},
				{
					title: this.$t('contactUs.metroLine'),
					icon: require('@/assets/images/home/ditie.png'),
					text: this.$t('contactUs.metroStation'),
				},
			],
			// 地图
			center: [114.31589, 30.55389],  // 湖北省武汉市武昌区
            lng: '114.31589',  // 经度
            lat: '30.55389',   // 纬度
            loaded: false,
            plugin: [{
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 100,          //超过10秒后停止定位，默认：无穷大
              maximumAge: 0,           //定位结果缓存0毫秒，默认：0
              convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
              showButton: true,        //显示定位按钮，默认：true
              buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
              showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
              showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
              panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
              zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
              extensions:'all',
              pName: 'Geolocation',
              events: {
                init(o) {
                  // o 是高德地图定位插件实例
                  o.getCurrentPosition((status, result) => {
                    console.log(result, 'getCurrentPosition')
                    if (result && result.position) {
                      self.lng = result.position.lng;
                      self.lat = result.position.lat;
                      self.center = [self.lng, self.lat];
                      self.loaded = true;
                      self.$nextTick();
                    }
                  });
                }
              }
            }]
		};
	},

	mounted() { 
	  this.contactShow = false
	  this.$nextTick(()=>{
		this.$wow.init()
		this.contactShow = true
	  })
	},

	methods: {
	  handleChange(val) {
        console.log(val);
      }
	},
};
</script>

<style lang="less" scoped>
.carousel-text {
    position: absolute;
  p {
	font-size: 56px;
	font-family: Source Han Sans CN;
	font-weight: 300;
	color: #566B9F;
	line-height: 64px;
  }
}
.carousel-zh {
    top: 45%;
    left: 50%;
    margin-top: -32px;
    margin-left: -364px;
}
.carousel-en {
    top: 45%;
    left: 50%;
    margin-top: -32px;
    margin-left: -650px;
}
.contact-wrap {
  width: 100%;
  background: #eee;
}
.contact-container {
	width: 75%;
	margin: 0 auto;
	.contact-serve {
		width: 100%;
		padding: 42px 50px;
		margin-top: -150px;
		box-sizing: border-box;
		background: #fff;
		position: relative;
		z-index: 2;
	}
	.serve-top {
		width: 100%;
		justify-content: space-between;
	}
	.serve-cont {
		width: 70%;
		align-items: center;
	}
	.serve-cont img {
		width: 100px;
		height: 90px;
	}
	.serve-tip {
		margin-left: 50px;
		p:nth-child(1) {
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000;
			line-height: 42px;
		}
		p:nth-child(2) {
			font-size: 20px;
			font-family: Source Han Sans CN;
			color: #585858;
			line-height: 36px;
		}
	} 
	// .serve-btn {
	// 	min-width: 200px;
	// 	align-items: center;
	// }
	// .serve-btn button {
	// 	width: 100%;
	// 	height: 70px;
	// 	padding: 0 10px;
	// 	background: #FAC000;
	// 	border: 0;
	// 	cursor: pointer;
	// 	box-sizing: border-box;
	// 	span {
	// 		font-size: 24px;
	// 		font-family: Source Han Sans CN;
	// 		font-weight: 400;
	// 		color: #000;
	// 		line-height: 42px;
	// 	}
	// }
	.serve-bottom {
		width: 100%;
		/deep/ .el-collapse {
			border: 0;
		}
		/deep/.el-collapse-item__header {
			height: 65px;
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #134899;
			line-height: 42px;
			border-bottom: 1px solid #15499A;
		}
		/deep/ .el-collapse-item__wrap {
			border: 0;
		}
		/deep/ .el-collapse-item__content {
			margin-top: 20px;
			padding: 0;
			li {
				font-size: 20px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #737373;
				line-height: 42px;
			}
		}
	}
	.contact-line {
	  width: 100%;
	  margin-top: 50px;
	}
	.line-map {
		width: 100%;
		min-height: 530px;
		padding: 16px;
		box-sizing: border-box;
		background: #fff;
	}
	.line-phone {
		width: 100%;
		margin-top: 40px;
		li {
			width: 33.33%;
			font-size: 16px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000;
			line-height: 32px;
		}
		li p span {
			font-weight: bold;
		}
	}
	.contact-way {
		width: 100%;
		margin: 48px auto 50px;
		.title-col{
			width: 100%;
			text-align: center;
		}
		.title-col p {
			width: 100px;
			margin: 0 auto;
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #134899;
			line-height: 42px;
			position: relative;
			&::before {
				content: "";
				width: 26px;
				height: 25px;
				background-image: url('~@/assets/images/home/luxian.png');
				background-size: 100% 100%;
				position: absolute;
				left: -40px;
				top: 10px;
			}
		}
		ul.way-cont {
			width: 100%;
			margin: 48px 0 28px;
			justify-content: space-between;
		}
		.way-cont li {
			width: 48%;
		}
		.way-title {
			width: 100%;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #B5B5B5;
		}
		.way-title p {
			font-size: 20px;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
			line-height: 56px;
		}
		.way-title img {
			width: 25px;
			height: 25px;
		}
		.way-text p{
			font-size: 16px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #585858;
			line-height: 30px;
		}
	}
}
.contact-container-en {
  .contact-way {
    .title-col p {
	  width: 75px;
    }
  }
}
</style>
