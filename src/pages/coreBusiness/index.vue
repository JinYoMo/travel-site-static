<template>
	<div>
	  <carousel v-if="coreShow" :carouselData="carouselData">
		<template #carousel-cont>
		  <div class="carousel-text wow animated pulse">
			<div class="CN">{{$t('translate.serviceProvider')}}</div>
			<div class="EN">
				<div class="line"></div>
				<div class="text">
				To be the world class cross-border business service provider
				</div>
				<div class="line"></div>
			</div>
		  </div>
		  <div class="btn-row wow animated pulse">
			<el-button class="btn" @click="toPath">{{$t('translate.contactUs')}}</el-button>
		  </div>
		</template>
      </carousel>
	  <!-- 机票 -->
	  <div :class="[$i18n.locale === 'en' ? 'air-container-en' : '', 'air-container']">
		<div v-if="coreShow" class="title-col wow animated slideInDown">
		  <p>{{$t('coreBusiness.planeTicket')}}</p>
		</div>
		<p class="air-top wow animated pulse">{{$t('coreBusiness.fiveTicket')}}</p>
		<div class="air-cont wow animated slideInUp">
			<ul class="air-timeline flex">
				<li v-for="(item, index) in airList" :key="index">
					<div :class="`air-bg air-bg-${index + 1}`" @mouseover="overMouse(index)" @mouseleave="airFlag = false">
						<div class="air-img">
							<img :src="airIndex === index && airFlag ? item.iconActive : item.icon" alt="">
							<p class="mt10">{{item.title}}</p>
						</div>
						<div class="air-num mt20">
							<p>0{{index + 1}}</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	  </div>
	  <!-- 酒店 -->
	  <div class="hotel-container"> 
		<div class="title-col wow animated slideInDown">
		  <p>{{$t('coreBusiness.hotel')}}</p>
		</div>
		<ul class="hotel-cont flex wow animated slideInUp">
			<li v-for="(item, index) in hotImgList" :key="index">
				<img :src="item.imgUrl" alt="">
			</li>
		</ul>
		<p class="hotel-text wow animated pulse">{{$t('coreBusiness.coveringMore')}}</p>
	  </div>
	  <!-- 火车票 -->
	  <div :class="[$i18n.locale === 'en' ? 'train-container-en' : '', 'train-container']">
		<div class="title-col wow animated pulse">
		  <p>{{$t('coreBusiness.trainTickets')}}</p>
		</div>
		<p class="train-top wow animated pulse">{{$t('coreBusiness.informationSynchronization')}}</p>
		<ul class="train-cont flex wow animated slideInUp">
			<li v-for="(item, index) in trainImgList" :key="index">
				<img :src="item.imgUrl" alt="">
			</li>
		</ul>
	  </div>
	  <!-- 签证 -->
	  <div class="visa-container">
		<div class="title-col wow animated slideInDown">
		  <p>{{$t('coreBusiness.visa')}}</p>
		</div>
		<ul class="visa-cont flex wow animated slideInUp">
			<li v-for="(item, index) in visaList" :key="index">
				<img :src="item.imgUrl" alt="">
				<div class="visa-tip">
				  <p>{{item.text}}</p>
				</div>
			</li>
		</ul>
	  </div>
	  <!-- 中转地接 -->
	  <div class="transfer-container flex">
		<div class="transfer-info">
			<div class="title-col wow animated pulse">
				<p>{{$t('coreBusiness.transferGrounding')}}</p>
			</div>
			<ul class="transfer-tip wow animated slideInLeft">
				<li>{{$t('coreBusiness.businessReception')}}</li>
				<li>{{$t('coreBusiness.oneStopTransfer')}}</li>
			</ul>
		</div>
		<div class="transfer-img">
			<img src="~@/assets/images/home/zhongzhuan-bg01.png" alt="">
		</div>
	  </div>
	  <!-- 保险剩余 -->
	  <div class="insurance-container">
		  <ul class="insurance-tip flex">
			  <li v-for="(item, index) in insuranceList" :key="index" :class="[index%2 === 0 ? 'slideInUp' : 'slideInDown', 
			      insIndex === index ? 'tip-active' : '', 'insurance-li wow animated']">
				  <p class="mb20">{{item.title}}</p>
				  <p>{{item.text}}</p>
			  </li>
		  </ul>
		  <ul class="insurance-box flex">
			<li v-for="(item, index) in insuranceBoxList" 
              :class="[insIndex === index ? 'insurance-active slideInDown' : 'pulse', 'wow animated']" :key="index"
              @click="insIndex = index" >
			  <img :src="insIndex === index ? item.iconActive : item.icon" />
			  <p>{{item.title}}</p>
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
			coreShow: false, // 动画初始自动开始
			carouselData: [ 
				{
				url: require("@assets/images/home/banner01.jpg")
				},
			],			
			airIndex: 0,
			airFlag: false,
			airList: [
				{
					title: this.$t('coreBusiness.routesCoverage'),
					icon: require('@/assets/images/home/hangxian.png'),
					iconActive: require('@/assets/images/home/hangxian-white.png'),
				},
				{
					title: this.$t('coreBusiness.professionalTravel'),
					icon: require('@/assets/images/home/xingcheng.png'),
					iconActive: require('@/assets/images/home/xingcheng-white.png'),
				},
				{
					title: this.$t('coreBusiness.ensurePrice'),
					icon: require('@/assets/images/home/jiage-grey.png'),
					iconActive: require('@/assets/images/home/jiage-white.png'),
				},
			],
			hotImgList: [
				{
					imgUrl: require('@/assets/images/home/200.png')
				},
				{
					imgUrl: require('@/assets/images/home/10wan.png')
				},
				{
					imgUrl: require('@/assets/images/home/90.png')
				}
			],
			trainImgList: [
				{
					imgUrl: require('@/assets/images/home/huoche-bg01.png')
				},
				{
					imgUrl: require('@/assets/images/home/huoche-bg02.png')
				},
			],
			visaList: [
				{
					imgUrl: require('@/assets/images/home/qianzheng-bg01.png'),
					text: this.$t('coreBusiness.visaApplication'),
				},
				{
					imgUrl: require('@/assets/images/home/qianzheng-bg02.png'),
					text: this.$t('coreBusiness.visaTeam'),
				},
				{
					imgUrl: require('@/assets/images/home/qianzheng-bg03.png'),
					text: this.$t('coreBusiness.visaCenter'),
				},
			],
			insuranceList: [
				{
					title: this.$t('coreBusiness.insurance'),
					text: this.$t('coreBusiness.security'),
				},
				{
					title: this.$t('coreBusiness.independentTravel'),
					text: this.$t('coreBusiness.preferentialRoutes'),
				},
				{
					title: this.$t('coreBusiness.carRental'),
					text: this.$t('coreBusiness.carBusiness'),
				},
				{
					title: this.$t('coreBusiness.conferenceAffairs'),
					text: this.$t('coreBusiness.siteArrangement'),
				},
			],
			insIndex: 0,
			insuranceBoxList: [
				{
					title: this.$t('coreBusiness.insurance'),
					icon: require('@/assets/images/home/baoxian-blue.png'),
					iconActive: require('@/assets/images/home/baoxian.png'),
				},
				{
					title: this.$t('coreBusiness.independentTravel'),
					icon: require('@/assets/images/home/ziyouxing-blue.png'),
					iconActive: require('@/assets/images/home/ziyouxing.png'),
				},
				{
					title: this.$t('coreBusiness.carRental'),
					icon: require('@/assets/images/home/zuche-blue.png'),
					iconActive: require('@/assets/images/home/zuche.png'),
				},
				{
					title: this.$t('coreBusiness.conferenceAffairs'),
					icon: require('@/assets/images/home/huiwu-blue.png'),
					iconActive: require('@/assets/images/home/huiwu.png'),
				},
			]
		};
	},

	mounted() {
	  this.coreShow = false
	  this.$nextTick(()=>{
		this.$wow.init()
		this.coreShow = true
	  })
	},

	methods: {
		overMouse(index) {
			this.airIndex = index;
			this.airFlag = true
		},
	    toPath() {
		  this.$router.push ({
			path: '/contactUs',
		  })
		}
	},
};
</script>

<style lang="less" scoped>
.carousel-text {
  width: 863px;
  padding: 34px 106px;
  position: absolute;
  top: 45%;
  left: 50%;
  margin-top: -83px;
  margin-left: -426px;
  background: rgba(75, 101, 159, 0.3);
  box-sizing: border-box;
  .CN {
    font-size: 56px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: #fff;
    line-height: 64px;
  }
  .EN {
    display: flex;
    align-items: center;
    margin-top: 32px;
    .text {
      padding: 0 5px;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #FFFFFF;
      line-height: 24px;
    }
    .line {
      width: 66px;
      height: 1px;
      background: #fff;
    }
  }
}
.btn-row {
  width: 100%;
  position: absolute;
  bottom: 155px;
  text-align: center;
  .btn {
    width: 200px;
    border-radius: 0;
    padding: 20px 0;
    background: #fff;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
	color: #000;
	text-align: center;
    box-sizing: border-box;
  }
}
.air-container {
	width: 100%;
	margin-top: 68px;
	.title-col{
		width: 100%;
		text-align: center;
	}
	.title-col p {
		width: 75px;
		margin: 0 auto;
		font-size: 36px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #1E478B;
		line-height: 42px;
		position: relative;
		&::before {
			content: "";
			width: 33px;
			height: 33px;
			background-image: url('~@/assets/images/home/jipiao-blue.png');
			background-size: 100% 100%;
			position: absolute;
			left: -50px;
			top: 5px;
		}
	}
	.air-top {
		width: 100%;
		margin-top: 60px;
		padding: 0 20px;
		text-align: center;
		font-size: 20px;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #585858;
		line-height: 42px;
		box-sizing: border-box;
	}
	.air-cont {
		width: 100%;
		position: relative;
		&::before {
			content: "";
			width: 100%;
			height: 1px;
			background:  #6E86BB;
			position: absolute;
			left: 0;
			top: 230px;
		}
	}
	.air-timeline {
	    width: 60%;
		margin: 0 auto;
		padding-top: 100px;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
	}
	.air-timeline li {
		width: 33.33%;
		text-align: center;
		cursor: pointer;
	}
	.air-bg {
		width: 62%;
		margin: 0 auto;
		position: relative;
		&:hover {
			&::before {
				content: "";
				width: 100%;
				height: 350px;
				position: absolute;
				left: 0;
				top: -48%;
				background-size: 100% 100%;
			}
			.air-img {
				&::before {
					content: "";
					width: 0;
					height: 0;
				}
				p {
					color: #fff;
					font-weight: bold;
				}
			}
			.air-num p{
				color: #fff;
			}
		}
	}
	.air-bg-1:hover {
		top: 70px;
		&::before {
			background-image: url('~@/assets/images/home/jipiao-bg01.png');
		}
	}
	.air-bg-2:hover {
		top: 70px;
		&::before {
			background-image: url('~@/assets/images/home/jipiao-bg02.png');
		}
	}
	.air-bg-3:hover {
		top: 70px;
		&::before {
			background-image: url('~@/assets/images/home/jipiao-bg03.png');
		}
	}
	.air-img {
		width: 100%;
		padding-bottom: 36px;
		text-align: center;
		box-sizing: border-box;
		position: relative;
		&::before {
			content: "";
			width: 22px;
			height: 22px;
			background: #FFFFFF;
			border: 1px solid #4285C5;
			border-radius: 50%;
			position: absolute;
			left: 45%;
			bottom: 0;
		}
	}
	.air-img img {
		width: 50px;
		height: 50px;
	}
	.air-img p {
		font-size: 20px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #585858;
		line-height: 42px;
	}
	.air-num p{
		font-size: 86px;
		font-family: Microsoft YaHei;
		font-weight: 300;
		color: #5A6FA3;
	}
}
.air-container-en {
  .title-col p {
	width: 220px;
  }	
  .air-img p {
	font-size: 18px;
  }
}
.hotel-container {
	width: 100%;
	min-height: 494px;
	margin-top: 100px;
	padding: 98px 0 0;
	box-sizing: border-box;
	position: relative;
	&::before {
	    content: "";
		width: 100%;
		height: 100%;
		background-image: url('~@/assets/images/home/banner01.jpg');
		background-size: 100% 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
	}
	.title-col{
		width: 100%;
		text-align: center;
	}
	.title-col p {
		width: 75px;
		margin: 0 auto;
		font-size: 36px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #fff;
		line-height: 42px;
		position: relative;
		&::before {
			content: "";
			width: 33px;
			height: 33px;
			background-image: url('~@/assets/images/home/jiudian.png');
			background-size: 100% 100%;
			position: absolute;
			left: -50px;
			top: 5px;
		}
	}
	.hotel-cont {
		width: 50%;
		margin: 60px auto 0;
		justify-content: space-between;
		li {
			width: 144px;
			height: 144px;
			z-index: 1;
		}
		li img {
			width: 100%;
			height: 100%;
		}
	}
	.hotel-text {
		width: 100%;
		margin-top: 50px;
		padding: 0 20px;
		font-size: 20px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFF;
		line-height: 32px;
		text-align: center;
		box-sizing: border-box;
	}
}
.train-container {
	width: 100%;
	margin-top: 60px;
	.title-col{
		width: 100%;
		text-align: center;
	}
	.title-col p {
		width: 108px;
		margin: 0 auto;
		font-size: 36px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #1E478B;
		line-height: 42px;
		position: relative;
		&::before {
			content: "";
			width: 36px;
			height: 40px;
			background-image: url('~@/assets/images/home/huochepiao-blue.png');
			background-size: 100% 100%;
			position: absolute;
			left: -50px;
			top: 3px;
		}
	}
	.train-top {
		margin-top: 45px;
		text-align: center;
		font-size: 20px;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #585858;
		line-height: 42px;
	}
	.train-cont {
		width: 75%;
		padding: 0 0 48px;
		margin: 60px auto 0;
		justify-content: space-between;
		box-sizing: border-box;
		li:nth-child(1) {
			width: 58%;
		}
		li:nth-child(2) {
			width: 39%;
		}
		li img {
			width: 100%;
			height: 100%;
		}
	}
}
.train-container-en {
  .title-col p {
	width: 230px;
  }
}
.visa-container {
	width: 100%;
	margin-top: 60px;
	cursor: pointer;
	.title-col{
		width: 100%;
		text-align: center;
	}
	.title-col p {
		width: 75px;
		margin: 0 auto;
		font-size: 36px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #1E478B;
		line-height: 42px;
		position: relative;
		&::before {
			content: "";
			width: 35px;
			height: 34px;
			background-image: url('~@/assets/images/home/qianzheng-blue.png');
			background-size: 100% 100%;
			position: absolute;
			left: -45px;
			top: 5px;
		}
	}
	.visa-cont {
		width: 75%;
		padding: 24px 0;
		margin: 36px auto 0;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.visa-cont li {
		width: 32%;
		background: #fff;
		position: relative;
		box-shadow: 0px 1px 9px 0px rgba(217,217,217,0.75);
        &::before {
			content: "";
			width: 100%;
			height: 1px;
			background-image: url('~@/assets/images/home/qianzheng-line.jpg');
			background-size: 100% 100%;
			position: absolute;
			left: 0;
			bottom: 0;
		}
		&:hover {
		  box-shadow: 1px 4px 12px 1px rgba(217,217,217,0.75);
		}
		img {
			width: 100%;
			height: 300px;
		}
		.visa-tip {
			width: 100%;
			padding: 40px 33px 28px;
			text-align: center;
			box-sizing: border-box;
		}
		.visa-tip p {
			font-size: 20px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #585858;
			line-height: 32px;
		}
	}
}
.transfer-container {
	width: 100%;
	margin: 60px 0 36px;
	.transfer-info {
		width: 50%;
		padding: 120px 100px 90px 239px;
		box-sizing: border-box;
		background: linear-gradient(45deg, #8CA8DC 0%, #556A9F 100%);
	}
	.title-col{
		width: 100%;
	}
	.title-col p {
		padding-left: 24px;
		font-size: 36px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #fff;
		line-height: 42px;
		position: relative;
		box-sizing: border-box;
		&::before {
			content: "";
			width: 38px;
			height: 37px;
			background-image: url('~@/assets/images/home/zhongzhuan.png');
			background-size: 100% 100%;
			position: absolute;
			left: -24px;
			top: 3px;
		}
	}
	ul.transfer-tip {
		width: 100%;
		margin-top: 36px;
	}
	ul.transfer-tip li {
		width: 100%;
		list-style: disc;
		font-size: 20px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 42px;
	}
	.transfer-img {
		width: 50%;
		img {
			width: 100%;
			height: 100%;
		}
	}
}
.insurance-container {
  width: 75%;
  padding: 48px 0 84px;
  margin: 0 auto;
  box-sizing: border-box;
  ul.insurance-tip {
	  width: 100%;
	  flex-wrap: wrap;
  }
  ul.insurance-tip li.insurance-li {
	  width: 50%;
	  padding: 12px 32px;
	  margin-bottom: 60px;
	  box-sizing: border-box;
	  p:nth-child(1){
		font-size: 36px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #1E478B;
		line-height: 42px;
	  }
	  p:nth-child(2) {
		font-size: 20px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #585858;
		line-height: 42px;
	  }
  }
  ul.insurance-tip li.tip-active {
	  p:nth-child(2) {
		font-weight: 600;
	  }
  }
  ul.insurance-box {
	width: 64%;
	margin: 0 auto;
	justify-content: space-between;
  }
  ul.insurance-box li {
	  width: 157px;
	  height: 145px;
	  padding-top: 40px;
	  border: 1px solid #6E86BB;
	  text-align: center;
	  box-sizing: border-box;
	  cursor: pointer;
	  img {
		width: 40px;
		height: 40px;
	  }
	  p {
		font-size: 14px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #6E86BB;
		line-height: 42px;
	  }
	  &.insurance-active {
		background: #FAC000;
		border: 0;
		p {
		 color: #fff;
		 font-weight: bold;
	    }
	  }
   }
}
@media screen and (min-width:1280px) and (max-width:1440px){  // screen and 前两个可以省略。
  .air-container-en {
	.title-col p {
	  width: 220px;
	}	
	.air-img p {
	  font-size: 12px;
	}
  }
}  // @media 结束
@media screen and (min-width:1450px) and (max-width:1680px){  // screen and 前两个可以省略。
  .air-container-en {
	.title-col p {
	  width: 220px;
	}	
	.air-img p {
	  font-size: 14px;
	}
  }
}  // @media 结束
</style>
