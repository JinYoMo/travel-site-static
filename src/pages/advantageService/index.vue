<template>
	<div class="adv-wrap">
	   <carousel v-if="advantageShow" :carouselData="carouselData" :height="857">
		  <template #carousel-cont>
			<div :class="[$i18n.locale === 'zh' ? 'carousel-zh' : 'carousel-en', 'carousel-text', 'wow animated bounceIn']">
				<p>{{$t('translate.bannerJourney')}}</p>
			</div>
		  </template>		   
	   </carousel>
	   <div v-if="advantageShow" class="advantage-container">
			<ul class="advantage-box flex">
				<li v-for="(item, index) in advantageBoxList" 
					:class="[advIndex === index ? 'advantage-active bounceInUp' : 'slideInDown','wow animated']" :key="index"
					@click="advIndex = index" class="advantage-item flex">
					<div class="advantage-icon">
						<img :src="advIndex === index ? item.iconActive : item.icon" alt="">
					</div>
					<p>{{item.text}}</p>
				</li>
			</ul>
	   </div>
	   <div :class="[$i18n.locale === 'en' ? 'outbound-container-en' : '', 'outbound-container']">
		  <div class="title-col wow animated slideInDown">
			<p>{{$t('advantageService.overseasAdvantages')}}</p>
		  </div>
		  <div class="outbound-cont flex">
			<ul class="outbound-box wow animated bounceInUp">
			  <li v-for="(item, index) in outboundBoxList" 
				:class="outIndex === index ? 'outbound-active' : ''" :key="index"
				@click="toggle(index)" >
				<img :src="outIndex === index ? item.iconActive : item.icon" />
				<p>{{item.title}}</p>
			  </li>
		    </ul>
			<div class="outbound-info flex wow animated slideInLeft">
			  <div class="outbound-text">
				<p>{{outboundBoxList[outIndex].title}}</p>
				<p>{{outboundBoxList[outIndex].text}}</p>
			  </div>
		    </div>
			<div class="outbound-img wow animated slideInRight">
				<img src="~@/assets/images/home/jingwai-bg.png" alt="">
			</div>
		  </div>
	   </div>
	   <div :class="[$i18n.locale === 'en' ? 'worth-container-en' : '', 'worth-container']"> 
		 <div class="title-col wow animated slideInDown">
		   <p>{{$t('advantageService.coreValues')}}</p>
		 </div>
		 <ul class="worth-cont flex">
			<li v-for="(item, index) in worthList"
			  :class="[worthIndex === index ? 'worth-active' : '', 'wow animated slideInDown']" :key="index"
			  @click="worthIndex = index">
			  <div class="worth-img">
				<img :src="worthIndex === index ? item.iconActive : item.icon" alt="">
				<p :title="item.text" class="text-ellipsis">{{item.text}}</p>
			  </div>
			  <div class="worth-point">
				  <p>0{{index + 1}}</p>
			  </div>
			</li>
		 </ul>
		 <div class="worth-line wow animated pulse">
			 <div class="line-cont"></div>
		 </div>
	   </div>
	   <div :class="[$i18n.locale === 'en' ? 'product-container-en' : '', 'product-container']">
		  <div class="title-col wow animated slideInDown">
			<p>{{$t('advantageService.productAdvantages')}}</p>
		  </div>
		  <ul class="product-cont">
			<li v-for="(item, index) in productList" :key="index" :class="[index % 2 !== 0 ? 'flex-row-reverse slideInLeft' : 'slideInRight', 'wow animated flex']">
			  <div class="product-info flex">
				<div class="product-text">
					<p>{{item.title}}</p>
					<p>{{item.text}}</p>
				</div>
			  </div>
			  <div class="product-img">
				<div class="title-img flex">
				  <img :src="item.icon" alt="">
				  <p class="ml20">{{item.title}}</p>
				</div>
				<img :src="item.imgUrl" alt="">
			  </div>
			</li>
		  </ul>
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
		return {
			advantageShow: false,  // 动画初始自动开始
			carouselData: [ 
			  {
				url: require("@assets/images/home/banner02.jpg")
			  },
			],
			advIndex: 0,
			advantageBoxList: [
			  {
				icon: require('@/assets/images/home/time-grow.png'),
                iconActive: require('@/assets/images/home/time.png'),
				text: this.$t('advantageService.continuousService'),
			  },
			  {
				icon: require('@/assets/images/home/jichang-grow.png'),
                iconActive: require('@/assets/images/home/jichang.png'),
				text: this.$t('advantageService.vipLounge'),
			  },
			  {
				icon: require('@/assets/images/home/jiage-grow.png'),
                iconActive: require('@/assets/images/home/jiage.png'),
				text: this.$t('advantageService.preferentialPrice'),
			  },
			  {
				icon: require('@/assets/images/home/hangsi-grow.png'),
                iconActive: require('@/assets/images/home/hangsi.png'),
				text: this.$t('advantageService.globalAirline'),
			  },
			  {
				icon: require('@/assets/images/home/chengben-grow.png'),
                iconActive: require('@/assets/images/home/chengben.png'),
				text: this.$t('advantageService.tripartiteAgreement'),
			  },
			  {
				icon: require('@/assets/images/home/xihao-grow.png'),
                iconActive: require('@/assets/images/home/xihao.png'),
				text: this.$t('advantageService.highLevelTravel'),
			  },
			  {
				icon: require('@/assets/images/home/hezuo-grow.png'),
                iconActive: require('@/assets/images/home/hezuo.png'),
				text: this.$t('advantageService.peakSeasonFlights'),
			  },
			  {
				icon: require('@/assets/images/home/fuwu-grow.png'),
                iconActive: require('@/assets/images/home/fuwu.png'),
				text: this.$t('advantageService.repetitiveDemand'),
			  },
			],
		    outIndex: 0,
			outboundBoxList: [
				{
					title: this.$t('advantageService.multiSettlement'),
					text: this.$t('advantageService.multiSupport'),
					icon: require('@/assets/images/home/duobizhong.png'),
					iconActive: require('@/assets/images/home/duobizhong-white.png'),
				},
				{
					title: this.$t('advantageService.overseasService'),
					text: this.$t('advantageService.overseasSupport'),
					icon: require('@/assets/images/home/haiwai.png'),
					iconActive: require('@/assets/images/home/haiwai-white.png'),
				},
				{
					title: this.$t('advantageService.emergencyServices'),
					text: this.$t('advantageService.emergencySupport'),
					icon: require('@/assets/images/home/yingji.png'),
					iconActive: require('@/assets/images/home/yingji-white.png'),
				},
				{
					title: this.$t('advantageService.chineseService'),
					text: this.$t('advantageService.chineseSupport'),
					icon: require('@/assets/images/home/china.png'),
					iconActive: require('@/assets/images/home/china-white.png'),
				},
				{
					title: this.$t('advantageService.specialPlane'),
					icon: require('@/assets/images/home/baoji.png'),
					text: this.$t('advantageService.specialSupport'),
					iconActive: require('@/assets/images/home/baoji-white.png'),
				},
			],
			worthIndex: 0,
			worthList: [
				{

					icon: require('@/assets/images/home/yuding-grow.png'),
					iconActive: require('@/assets/images/home/yuding.png'),
				    text: this.$t('advantageService.provideConvenience'),
				},
				{
					icon: require('@/assets/images/home/zhichi-grow.png'),
					iconActive: require('@/assets/images/home/zhichi.png'),
				    text: this.$t('advantageService.travelerSupport'),
				},
				{
					icon: require('@/assets/images/home/jieyue-grow.png'),
					iconActive: require('@/assets/images/home/jieyue.png'),
				    text: this.$t('advantageService.saveCosts'),
				},
				{
					icon: require('@/assets/images/home/feiyong-gorw.png'),
					iconActive: require('@/assets/images/home/feiyong.png'),
				    text: this.$t('advantageService.realizeCost'),
				},
				{
					icon: require('@/assets/images/home/baozhang-grow.png'),
					iconActive: require('@/assets/images/home/baozhang.png'),
				    text: this.$t('advantageService.provideSecurity'),
				}
			],
			productList: [
				{
					title: this.$t('advantageService.richFunctions'),
					text: this.$t('advantageService.richCont'),
					icon: require('@/assets/images/home/gongneng.png'),
					imgUrl: require('@/assets/images/home/chanpin-bg01.png'),
				},
				{
					title: this.$t('advantageService.convenientOperation'),
					text: this.$t('advantageService.optCont'),
					icon: require('@/assets/images/home/caozuo.png'),
					imgUrl: require('@/assets/images/home/chanpin-bg02.png'),
				},
				{
					title: this.$t('advantageService.safeReliable'),
					text: this.$t('advantageService.safeCont'),
					icon: require('@/assets/images/home/anquan.png'),
					imgUrl: require('@/assets/images/home/chanpin-bg03.png'),
				},
			]		
		};
	},

	mounted() {
	 this.advantageShow = false
	 this.$nextTick(()=>{
		this.$wow.init()
		this.advantageShow = true
	  })
	},

	methods: {
		toggle(index){
      	  this.outIndex = index;
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
	color: #FFFFFF;
	line-height: 64px;
  }
}
.carousel-zh {
    top: 45%;
    left: 50%;
    margin-top: -32px;
    margin-left: -280px;
}
.carousel-en {
    top: 48%;
    left: 50%;
    margin-top: -64px;
    margin-left: -610px;
}

.adv-wrap {
  width: 100%;
  background: #eee;
}
.advantage-container {
	width: 100%;
	padding: 50px 0 0;
	box-sizing: border-box;
	background: #fff;
  .advantage-box {
	width: 64%;
	margin: 0 auto;
	flex-wrap: wrap;
	.advantage-item {
		width: 50%;
		margin-bottom: 50px;
		cursor: pointer;
		align-items: center;
		p {
			max-width: 400px;
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #585858;
			line-height: 40px;
		}
	}
	.advantage-icon {
		min-width: 128px;
		height: 128px;
		padding-top: 40px;
		margin-right: 30px;
		background: #fff;
		border: 3px solid #949494;
		text-align: center;
		img {
		  width: 50px;
		  height: 50px;
		}
	}
	.advantage-active {
		.advantage-icon {
		  border: 3px solid #566B9F;
		}
		p {
		  color: #6E86BB;
		}
	}
  }
}
.outbound-container {
  width: 100%;
  background: #fff;
  .title-col{
	 width: 100%;
	 text-align: center;
  }
  .title-col p {
	 width: 228px;
	 margin: 0 auto;
	 font-size: 36px;
	 font-family: Source Han Sans CN;
	 font-weight: bold;
	 color: #1E478B;
	 line-height: 42px;
	 position: relative;
	 &::before {
		content: "";
		width: 40px;
		height: 40px;
		background-image: url('~@/assets/images/home/jingwai-title.png');
		background-size: 100% 100%;
		position: absolute;
		left: -50px;
		top: 2px;
	 }
   }
   .outbound-cont {
	   width: 100%;
	   margin-top: 50px;
	   position: relative;
   }
	ul.outbound-box {
		width: 150px;
		height: 90%;
		position: absolute;
		left: 50%;
		top: 50px;
		margin-left: -75px;
		background: #fff;
		box-shadow: 0px 1px 13px 0px rgba(207,207,207,0.75);
		z-index: 1;
	}
	ul.outbound-box li {
		min-width: 150px;
		height: 20%;
		text-align: center;
		box-sizing: border-box;
		cursor: pointer;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		&::before {
			content: "";
			width: 80%;
			height: 1px;
			background: #BBC4DA;
			position: absolute;
			left: 15px;
			bottom: 0;
		}
		img {
			width: 40px;
			height: 35px;
		}
		p {
			font-size: 12px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #BBC4DA;
			line-height: 36px;
		}
		&.outbound-active {
			background: #FAC000;
			border: 0;
			&::before {
				content: "";
				height: 0px;
			}
			p {
			  color: #fff;
			  font-weight: bold;
		    }
		}
		&:last-child {
			&::before {
				content: "";
				height: 0px;
			}
		}
	}
   .outbound-info {
		width: 50%;
		padding-bottom: 20px;
		box-sizing: border-box;
		background: #F4F6FC;
		align-items: center;
	}
	.outbound-text {
		width: 53%;
		margin: 0 auto;
	}
	.outbound-text p:nth-child(1) {
		margin-bottom: 24px;
		font-size: 24px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #000000;
		line-height: 42px;
	}
	.outbound-text p:nth-child(2) {
		width: 100%;
		list-style: disc;
		font-size: 20px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #585858;
		line-height: 44px;
	}
	.outbound-img {
		width: 50%;
		img {
			width: 100%;
			height: 100%;
		}
	}
}
.outbound-container-en {
  .title-col p {
	width: 530px;
  }
}
.worth-container {
	width: 100%;
	min-height: 622px;
	margin-top: 64px;
	padding: 64px 0 0;
	box-sizing: border-box;
	position: relative;
	&::before {
	    content: "";
		width: 100%;
		height: 100%;
		background-image: url('~@/assets/images/home/hexin-bg.jpg');
		background-size: 100% 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.title-col{
		width: 100%;
		text-align: center;
	}
	.title-col p {
		width: 150px;
		margin: 0 auto;
		font-size: 36px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #fff;
		line-height: 42px;
		position: relative;
		&::before {
			content: "";
			width: 37px;
			height: 41px;
			background-image: url('~@/assets/images/home/hexin.png');
			background-size: 100% 100%;
			position: absolute;
			left: -50px;
			top: 2px;
		}
	}
	.worth-cont {
		width: 96%;
		margin: 88px auto 0;
		justify-content: space-between;
		li {
			width: 18.6%;
			cursor: pointer;
			position: relative;
			z-index: 1;
		}
		li:before {
			content: "";
			width: 100%;
			height: 265px;
			background-image: url('~@/assets/images/home/weixuanzhong-bg.png');
			background-size: 100% 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
		}
		.worth-img {
			width: 100%;
			padding: 50px 0 0;
			text-align: center;
			box-sizing: border-box;
		}
		.worth-img img {
			width: 86px;
			height: 86px;
		}
		.worth-img p {
			margin-top: 70px;
			padding: 0 12px; 
			font-size: 20px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #585858;
			line-height: 42px;
			box-sizing: border-box;
		}
		.worth-point {
			position: relative;
			&::before {
				content: "";
				width: 16px;
				height: 16px;
				background: #CFD6E4;
				border-radius: 50%;
				position: absolute;
				top: 170px;
				left: 50%;
				margin-left: -8px;
			}
			p {
				font-size: 36px;
				font-family: Century Gothic;
				font-weight: 400;
				color: #CCD1DE;
				line-height: 42px;
				position: absolute;
				top: 200px;
				left: 50%;
				margin-left: -20px;
			}
		}
		li.worth-active {
			&::before {
			  height: 285px;
			  background-image: url('~@/assets/images/home/xuanzhong-bg.png');
			}
			.worth-img p {
			   color: #15499A;
			}
			.worth-point::before {
				content: "";
				width: 32px;
				height: 32px;
				background-image: url('~@/assets/images/home/xuanzhong.png');
				position: absolute;
				top: 162px;
				left: 50%;
				margin-left: -16px;
			}
			.worth-point p {
				color: #FAC000;
			}
		}
	}
	.worth-line {
		width: 100%;
		position: absolute;
		bottom: -86px;
	}
	.line-cont {
		width: 96%;
		padding: 0 108px;
		margin: 0 auto;
		height: 173px;
		background: #fff;
		box-sizing: border-box;
		&::before {
			content: "";
			width: 100%;
			height: 1px;
			background: #CCD1DE;
			position: absolute;
			left: 0;
			top: 50%;
		}
	}
}
.worth-container-en {
  .title-col p {
	width: 220px;
  }
}
.product-container {
  width: 100%;
  margin-top: 120px;
  padding: 16px 0 64px;
  box-sizing: border-box;
  .title-col{
	 width: 100%;
	 text-align: center;
  }
  .title-col p {
	 width: 150px;
	 margin: 0 auto;
	 font-size: 36px;
	 font-family: Source Han Sans CN;
	 font-weight: bold;
	 color: #1E478B;
	 line-height: 42px;
	 position: relative;
	 &::before {
		content: "";
		width: 40px;
		height: 40px;
		background-image: url('~@/assets/images/home/jingwai-title.png');
		background-size: 100% 100%;
		position: absolute;
		left: -50px;
		top: 2px;
	 }
   }
   ul.product-cont {
	   width: 100%;
	   li {
		   width: 100%;
		   padding: 0 36px;
		   margin-top: 50px;
		   box-sizing: border-box;
	   }
   }
   .product-info {
		width: 61%;
		padding: 20px 0;
		box-sizing: border-box;
		background: #fff;
		align-items: center;
	}
	.product-text {
		width: 65%;
		margin: 0 auto;
	}
	.product-text p:nth-child(1) {
		margin-bottom: 24px;
		font-size: 24px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #000000;
		line-height: 42px;
	}
	.product-text p:nth-child(2) {
		width: 100%;
		list-style: disc;
		font-size: 20px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #585858;
		line-height: 44px;
	}
	.product-img {
		width: 39%;
		position: relative;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.title-img{
	  text-align: center;
	  position: absolute;
	  left: 50%;
	  top: 46%;
	  margin-left: -80px;
    }
    .title-img p {
	    width: 100px;
		font-size: 24px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 42px;
	}
	.title-img img {
		width: 40px;
	    height: 40px;
	}
}
.product-container-en {
  .title-col p {
	width: 370px;
  }
  .product-cont {
	li:nth-child(1) .title-img {
	  margin-left: -120px;
	  p {
		width: 180px;
	  }
	}
	li:nth-child(2) .title-img {
	  margin-left: -165px;
	  p {
		width: 270px;
	  }
	}
	li:nth-child(3) .title-img {
	  margin-left: -135px;
	  p {
		width: 210px;
	  }
	}
  }
}
</style>
