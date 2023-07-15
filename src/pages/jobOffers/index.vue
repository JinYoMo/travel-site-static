<template>
    <div class="job-wrap">
	  <carousel v-if="jobShow" :carouselData="carouselData" :height="633"></carousel>
	  <div :class="[$i18n.locale === 'en' ? 'job-container-en' : '', 'job-container']">
		  <div v-if="jobShow" class="job-email flex wow animated bounceInDown">
			  <div class="email-cont flex">
				  <img src="@/assets/images/home/youxiang.png" alt="">
				  <div class="email-tip">
					  <p>{{$t('jobOffers.mailbox')}}：summertarcy@everest-biz.com</p>
					  <p>{{$t('jobOffers.firstReply')}}</p>
				  </div>
			  </div>
			  <div class="email-btn flex">
				  <button><a href="mailto:zzj@zhaozijing.cn">{{$t('jobOffers.immediateDelivery')}}</a></button>
			  </div>
		  </div>
		  <div v-if="jobShow" class="job-join">
			<div class="title-col wow animated slideInDown">
			  <p>{{$t('jobOffers.joinUs')}}</p>
			</div>
			<div class="job-cont wow animated slideInUp">
			  <ul class="job-tab flex">
				<li v-for="(item, index) in jobTabList" 
				 :class="tabIndex === index ? 'tab-active' : ''" :key="index"
				 @click="toggleJobTab(item, index)" >
					<p>{{$i18n.locale === 'zh' ? item.value : item.valueEn}}</p>
				</li>
		      </ul>
			  <div v-loading="loading" :class="[$i18n.locale === 'en' ? 'tab-box-en' : '', 'tab-box']">
				  <ul v-if="jobDetailList.length > 0">
					<li v-for="(item, index) in jobDetailList" :key="index">
					  <p v-html="$i18n.locale === 'zh' ? item.title : item.titleEn"></p>
					  <p v-html="$i18n.locale === 'zh' ? item.content : item.contentEn"></p>
					</li>
				  </ul>
				  <div v-else class="news-nodata">
					<img data-v-2f6854a2="" src="@assets/images/home/nodata.png">
					<p class="mt10">{{$t('translate.nodata')}}</p>
				  </div>
			  </div>
			</div>
		  </div>
		  <div class="job-strategy">
			<div class="title-col wow animated slideInDown">
			  <p>{{$t('jobOffers.talentStrategy')}}</p>
			</div>
			<ul class="strategy-cont wow animated slideInUp">
			  <li v-for="(item, index) in strategyList" :key="index" :class="[index % 2 !== 0 ? 'flex-row-reverse' : '', 'strategy-li flex']">
				<div class="strategy-img">
				  <div class="strategy-title">
					<p>{{item.title}}</p>
				  </div>
				  <img :src="item.imgUrl" alt="">
				</div>
				<div  class="strategy-info flex">
					<div v-if="index % 2 === 0"  class="strategy-text">
						<p>{{item.text}}</p>
					</div>
					<ul v-else class="strategy-attitude flex">
						<li v-for="(item, index) in attitudeList" :key="index" class="flex">
							<div class="attitude-img">
								<img src="~@/assets/images/home/reqing.png" alt="">
								<p class="attitude-word">{{item}}</p>
							</div>
							<p v-if="index !== 2" class="attitude-add">+</p>
						</li>
				    </ul>
				</div>
			  </li>
		    </ul>
		  </div>
		  <div class="job-environ">
			<div class="title-col wow animated slideInDown">
			  <p>{{$t('jobOffers.workEnvironment')}}</p>
			</div>
			<ul class="environ-cont flex wow animated slideInUp">
				<li v-for="(item, index) in environList" :key="index">
					<p>{{item.title}}</p>
					<p class="mt20">{{item.text}}</p>
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
		return {
			jobShow: false,  // 动画初始自动开始
			carouselData: [ 
			  {
				url: require("@assets/images/home/zhaopin-bg.png")
			  },
			],
			tabIndex: 0,
			jobId: '',
			jobTabList: [
				// {
				// 	value: '客服',
				// },
				// {
				// 	value: '机票销售',
				// },
			],
			loading: false,
			jobDetailList: [],
			strategyList: [
				{
					title: this.$t('jobOffers.employConcept'),
					text: this.$t('jobOffers.respectTalents'),
					imgUrl: require('@/assets/images/home/rencai-bg01.png'),
				},
				{
					title: this.$t('jobOffers.selectCriteria'),
					imgUrl: require('@/assets/images/home/rencai-bg02.png'),
				},
			],
			attitudeList: [ 
				this.$t('jobOffers.passion'), 
				this.$t('jobOffers.attitude'), 
				this.$t('jobOffers.Professional'), 
			],
			environList: [
				{
					title: this.$t('jobOffers.relaxedWork'), 
					text: this.$t('jobOffers.workCont'), 
				},
				{
					title: this.$t('jobOffers.welfareSystem'), 
					text: this.$t('jobOffers.welfareCont'), 
				},
				{
					title: this.$t('jobOffers.trainSystem'), 
					text: this.$t('jobOffers.trainCont'),
				},
			]			
		};
	},

	mounted() { 
	  this.jobShow = false
	  this.$nextTick(()=>{
		this.$wow.init()
		this.jobShow = true
	  })
	  this.getSysJobType()
	  this.getSysJobPage()
	},

	methods: {
		// 获取招聘信息类型
		getSysJobType() {
			let params = {
				typeId: '1358470065111252995',
				page: 1,
				limit: 10
			}
			this.$api['jobOffers/getSysJobType'](params).then(res => {
			  this.jobTabList = res.data
			  this.toggleJobTab(this.jobTabList[0], 0)
			})
			.catch(err => {
			  console.log(err);
			})
		},
		toggleJobTab(item, index) {
			this.tabIndex = index
			this.jobId = item.code
			this.getSysJobPage()
		},
		// 获取招聘列表
		getSysJobPage() {
			let params = {
				searchValue: '',
				type: this.jobId,
				status: 1,
				page: 1,
				limit: 10
			}
			this.loading = true
			this.$api['jobOffers/getSysJobPage'](params).then(res => {
			  this.jobDetailList = res.data
			  this.loading = false
			})
			.catch(err => {
			  this.loading = false
			  console.log(err);
			})
		},
	},
};
</script>

<style lang="less" scoped>
.job-wrap {
  width: 100%;
  background: #eee;
}
.job-container {
	width: 75%;
	margin: 0 auto;
	.job-email {
		width: 100%;
		padding: 50px;
		margin-top: -90px;
		box-sizing: border-box;
		background: #fff;
		justify-content: space-between;
		position: relative;
		z-index: 2;
	}
	.email-cont {
		width: 70%;
		align-items: center;
	}
	.email-cont img {
		width: 95px;
		height: 77px;
	}
	.email-tip {
		margin-left: 55px;
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
			color: #000;
			line-height: 36px;
		}
	} 
	.email-btn {
		min-width: 200px;
		align-items: center;
	}
	.email-btn button {
		width: 100%;
		height: 70px;
		padding: 0 10px;
		background: #FAC000;
		border: 0;
		cursor: pointer;
		box-sizing: border-box;
		a {
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000;
			line-height: 42px;
			text-decoration: none;
		}
	}
	.job-join {
		width: 100%;
		padding: 56px 0 20px;
		box-sizing: border-box;
	    .title-col {
		   width: 100%;
	    }
		.title-col p {
			width: 100%;
			padding-left: 40px;
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #15499A;
			line-height: 30px;
			box-sizing: border-box;
			position: relative;
			&::before {
				content: "";
				width: 31px;
				height: 24px;
				background-image: url('~@/assets/images/home/jiaru.png');
				background-size: 100% 100%;
				position: absolute;
				left: 0;
				top: 4px;
			}
		}
	}
	.job-cont {
	   width: 100%;
	   margin-top: 50px;
	}
	ul.job-tab {
		width: 100%;
		border-bottom: 1px solid #15499A;
	}
	ul.job-tab li {
		min-width: 180px;
		padding: 0 10px;
		height: 62px;
		text-align: center;
		background: #F8F8F8;
		box-sizing: border-box;
		cursor: pointer;
		p {
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000;
			line-height: 62px;
		}
		&.tab-active {
			background: #FAC000;
			p {
			  font-weight: bold;
			  color: #000;
			}
		}
	}
	.tab-box {
		width: 100%;
		min-height: 730px;
		margin-top: 48px;
		padding: 45px 36px;
		box-sizing: border-box;
		background: #fff;
		position: relative;
		ul {
			width: 100%;
		}
		li p {
			font-size: 24px;
			font-family: Source Han Sans CN;
			color: #000;
			line-height: 50px;
		}
		.news-nodata {
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -105px;
			margin-top: -100px;
			text-align: center;
			img {
				width: 150px;
				height: 150px;
			}
			p {
				font-size: 20px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #585858;
				line-height: 44px;
			}
	    }
	}
	.tab-box-en {
	  .news-nodata {
		margin-left: -180px;
	  }
	}
	.job-strategy {
		width: 100%;
		padding: 36px 0 0;
		box-sizing: border-box;
	    .title-col {
		   width: 100%;
	    }
		.title-col p {
			width: 100%;
			padding-left: 40px;
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #15499A;
			line-height: 30px;
			box-sizing: border-box;
			position: relative;
			&::before {
				content: "";
				width: 31px;
				height: 24px;
				background-image: url('~@/assets/images/home/ren.png');
				background-size: 100% 100%;
				position: absolute;
				left: 0;
				top: 4px;
			}
		}
	}
	ul.strategy-cont {
	   width: 100%;
	   margin-top: 50px;
	   li.strategy-li {
		   width: 100%;
		   margin-bottom: 36px;
	   }
   }
	.strategy-img {
		width: 31%;
		position: relative;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.strategy-title{
	  text-align: center;
	  position: absolute;
	  left: 50%;
	  top: 50%;
	  margin-left: -50px;
	  margin-top: -21px;
    }
    .strategy-title p {
	    width: 100px;
		font-size: 24px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #566B9F;
		line-height: 42px;
	}
	.strategy-info {
		width: 69%;
		padding: 24px 0;
		box-sizing: border-box;
		background: #fff;
		text-align: center;
		align-items: center;  // 上下居中
	}
	.strategy-text {
		width: 65%;
		margin: 0 auto;
	}
	.strategy-text p {
		font-size: 20px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #15499A;
		line-height: 32px;
		letter-spacing: 5px;
	}
	ul.strategy-attitude {
		width: 63%;
		margin: 0 auto;
		justify-content: space-between;
	}
	ul.strategy-attitude li {
		width: 30%;
		align-items: center;
		position: relative;
		.attitude-img {
		  position: relative;
		}
		img {
			width: 113px;
			height: 113px;
		}
		p.attitude-word {
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #566B9F;
			line-height: 32px;
			position: absolute;
			left: 50%;
    		bottom: 20px;
    		margin-left: -24px;
		}
		&:last-child p{
    		margin-left: -36px;
		}
		.attitude-add {
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #15499A;
			position: absolute;
			right: 0;
			bottom: 50%;
			margin-right: 12px;
		}
	}
	@media screen and (min-width:1280px) and (max-width:1440px){  // screen and 前两个可以省略。
	  ul.strategy-attitude {
		width: 65%;
	  }
	  ul.strategy-attitude li {
		width: 35%;
	  }
	}  // @media 结束
	@media screen and (min-width:1440px) and (max-width:1680px){  // screen and 前两个可以省略。
	  ul.strategy-attitude {
		width: 63%;
	  }
	  ul.strategy-attitude li {
		width: 32%;
	  }
	}  // @media 结束
	.job-environ {
		width: 100%;
		padding: 20px 0 80px;
		box-sizing: border-box;
	    .title-col {
		   width: 100%;
	    }
		.title-col p {
			width: 100%;
			padding-left: 40px;
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #15499A;
			line-height: 30px;
			box-sizing: border-box;
			position: relative;
			&::before {
				content: "";
				width: 31px;
				height: 24px;
				background-image: url('~@/assets/images/home/huanjing.png');
				background-size: 100% 100%;
				position: absolute;
				left: 0;
				top: 4px;
			}
		}
	}
	ul.environ-cont {
		width: 100%;
		margin-top: 50px;
		justify-content: space-between;
		li {
			width: 31%;
			min-height: 206px;
			padding: 32px 28px;
			box-sizing: border-box;
			background: #fff;
			cursor: pointer;
			position: relative;
			&::after {
				content: "";
				width: 2px;
				height: 100%;
				background-image: url('~@/assets/images/home/zhaopin-line.png');
				position: absolute;
				right: 0;
				top: 0;
			}
		}
		p:nth-child(1) {
			font-size: 20px;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #000000;
			line-height: 30px;
		}
		p:nth-child(2) {
			font-size: 18px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #585858;
			line-height: 30px;
		}
	}
}
.job-container-en {
	.strategy-title{
	  margin-left: -130px;
	  margin-top: -21px;
    }
    .strategy-title p {
	  width: 260px;
	}
	.strategy-text p {
	  letter-spacing: 0px;
	}
	ul.strategy-attitude li p.attitude-word {
	  font-size: 14px;
	  font-weight: bold;
	}
	ul.strategy-attitude li:last-child p {
      margin-left: -42px;
    }
}
</style>
