<template>
	<div class="detail-wrap">
	  <carousel v-if="newsShow" :carouselData="carouselData" :height="867">
		<template #carousel-cont>
		  <div class="carousel-cont">
			<div class="carousel-text wow animated flipInX">
				<p>{{$t('translate.everestDynamics')}}</p>
				<p>{{$t('translate.knowUs')}}</p>
			</div>
			<div class="btn-row wow animated pulse">
				<el-button class="btn" @click="toPath">{{$t('translate.learnMore')}}</el-button>
			</div>
		  </div>
		</template>
	  </carousel>
	  <div v-if="newsShow" :class="[$i18n.locale === 'en' ? 'detail-container-en' : '', 'detail-container wow animated pulse']">
		<p class="title-top">{{$i18n.locale === 'zh' ? newsDetailObj.title : newsDetailObj.titleEn}}</p>
		<p class="title-time">{{newsDetailObj.publicTime}}</p>
		<div class="detail-cont flex flex-end">
		    <div class="detail-text">
				<p class="detail-nr" v-if="newsDetailObj.content" v-html="$i18n.locale === 'zh' ? newsDetailObj.content : newsDetailObj.contentEn"></p>
				 <div v-else class="news-nodata">
					<img data-v-2f6854a2="" src="@assets/images/home/nodata.png">
					<p class="mt10">{{$t('translate.nodata')}}</p>
				</div>
			</div>
			<!-- <div class="detail-btn">
				<img src="@/assets/images/home/shang.png" alt="">
				<img src="@/assets/images/home/xia.png" alt="">
			</div> -->
		</div>
		<div v-if="newsComList.length > 0" class="detail-com">
		  <div class="title-col">
			<p>{{$t('newsCenter.RecommendReading')}}</p>
		  </div>
		  <ul class="com-cont">
			  <li v-for="(item, index) in newsComList" :key="index" @click="goDetail(item.id)">
				  <p>{{$i18n.locale === 'zh' ? item.title : item.titleEn}}</p>
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
		    newsShow: false,  // 动画初始自动开始
			carouselData: [ 
			  {
				url: require("@assets/images/home/banner.jpg")
			  },
			],
			newsDetailObj: {
				// title: '接连取消航线　中美航线含金量骤降',
				// content: '中美航线曾被称为全世界最赚钱的跨洋航线之一，如今却遭遇含金量下滑窘境。8月22日北京商报记者从美国航空和夏威夷航空获悉，两家航企将于10月分别取消一条直飞中国的航线。值得关注的是，在几个月前美国航空刚刚宣布取消芝加哥至北京航线，而夏威夷航空叫停的檀香山至北京航线，是该公司旗下唯一直飞中国线路……',
				// publicTime: '2022-7-23'
			},
			newsComList: [
				// {
				// 	title: '接连取消航线　中美航线含金量骤降',
				// },
				// {
				// 	title: '接连取消航线　中美航线含金量骤降',
				// },
				// {
				// 	title: '接连取消航线　中美航线含金量骤降',
				// },
			],	
		};
	},

    mounted() {
	  this.newsShow = false
	  this.$nextTick(()=>{
		this.$wow.init()
		this.newsShow = true
	  })
	  this.getSysNoticeDetail()
	  this.getSysNewNotice()
	},

	methods: {
		// 获取新闻详情
		getSysNoticeDetail() {
			let params = {
			   id: this.$route.query.id,
			}
			this.$api['newsCenter/getSysNoticeDetail'](params).then(res => {
			  this.newsDetailObj = res.data
			})
			.catch(err => {
			  console.log(err);
			})
		},
		// 获取新闻分页列表-最新动态
		getSysNewNotice() {
			let params = {
				searchValue: '',
				type: 0,  // 最新动态
				page: 1,
				limit: 3
			}
			this.newestLoading = true
			this.$api['newsCenter/getSysNotice'](params).then(res => {
			   this.newsComList = res.data
			})
			.catch(err => {
			  console.log(err);
			})
		},
		toPath() {
		  this.$router.push ({
			path: '/coreBusiness',
		  })
		},
		goDetail(id) {
		  // 打开新页面
		  let { href } = this.$router.resolve({
			 path: '/newsDetail',
			 query: {
				id: id
			 }
		  })
		  window.open(href, "_blank")
		},
	},
};
</script>

<style lang="less" scoped>
.carousel-cont {
  position: absolute;
  top: 48%;
  left: 10%;
  margin-top: -150px;
}
.carousel-text p {
	font-size: 56px;
	font-family: Source Han Sans CN;
	font-weight: 300;
	color: #FFFFFF;
	line-height: 100px;
}
.btn-row {
  width: 100%;
  margin-top: 50px;
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
.detail-wrap {
  width: 100%;
  background: #eee;
}
.detail-container {
	width: 75%;
	margin: 58px auto 0;
	p.title-top {
		width: 100%;
		text-align: center;
		font-size: 36px;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #000;
		line-height: 42px;
	}
	p.title-time {
		width: 100%;
		margin: 48px 0;
		text-align: center;
		font-size: 24px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #585858;
		line-height: 42px;
	}
	.detail-cont {
		width: 100%;
		position: relative;
		margin-bottom: 50px;
		.detail-text {
			width: 100%;
			// width: calc(100% - 50px);
			min-height: 600px;
			padding: 50px;
			background: #fff;
			box-sizing: border-box;
			position: relative;
		}
		.detail-text p.detail-nr {
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #585858;
			line-height: 42px;
		    text-indent: 2em;
		}
		.detail-text .news-nodata {
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
		.detail-btn {
			width: 50px;
			cursor: pointer;
			img {
				width: 100%;
				height: 50px;
			}
		}
	}
	.detail-com {
		width: 100%;
		margin: 0 0 80px;
		.title-col {
		   width: 100%;
	    }
		.title-col p {
			width: 100%;
			padding-left: 36px;
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color:#1E478B;
			line-height: 30px;
			box-sizing: border-box;
			position: relative;
			&::before {
				content: "";
				width: 25px;
				height: 24px;
				background-image: url('~@/assets/images/home/tuijian.png');
				background-size: 100% 100%;
				position: absolute;
				left: 0;
				top: 3px;
			}
		}
	}
	ul.com-cont {
		width: 100%;
		margin-top: 32px;
		cursor: pointer;
		li {
			width: 100%;
			margin-bottom: 16px;
		}
		li p {
			font-size: 20px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #585858;
			line-height: 42px;
			&:hover {
				color: #1E478B;
			}
		}
	}
}
.detail-container-en {
	.detail-cont {
	  .detail-text .news-nodata {
		margin-left: -180px;
	  }
	}
}
</style>
