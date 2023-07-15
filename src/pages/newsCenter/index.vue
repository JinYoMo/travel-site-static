<template>
	<div class="news-wrap">
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
	  <!-- 最新动态 -->
	  <div :class="[$i18n.locale === 'en' ? 'news-container-en' : '', 'news-container']">
		<div v-if="newsShow" class="title-col wow animated slideInDown">
		  <p>{{$t('newsCenter.latestNews')}}</p>
		</div>
		<div v-loading="newestLoading" class="news-zon flex wow animated lightSpeedIn">
			<ul v-if="newestBoxList.length > 0">
			   <li v-for="(item, index) in newestBoxList" :key="index" class="flex">
				  <div class="news-img">
					<img :src="newestImg" alt="">
				  </div>
				  <div class="news-info flex">
					<div class="news-text">
					   <p>{{$i18n.locale === 'zh' ? item.title : item.titleEn}}</p>
					   <p class="omit-6" v-html="$i18n.locale === 'zh' ? item.contentText : item.contentEnText"></p>
					</div>
					<div class="news-detail flex">
						<p>{{item.publicTime && item.publicTime.slice(0,10)}}</p>
						<p @click="goDetail(item.id)">{{$i18n.locale === 'zh' ? '详细信息' : 'detailed info'}}-></p>
					</div>
				  </div>
				</li>
			</ul>
			<div v-if="newestBoxList.length > 0" class="news-btn">
			  <img :class="pageNum === 1 ? 'not-allow': ''" @click="toUpPage" src="@/assets/images/home/shang.png" alt="">
			  <img :class="pageNum === newestTotal ? 'not-allow': ''" @click="toDownPage" src="@/assets/images/home/xia.png" alt="">
			</div>
		</div>
		<ul v-if="newsBoxList.length > 0" :class="[$i18n.locale === 'en' ? 'news-box-en' : '', 'news-box flex wow animated flipInX']">
			<li v-for="(item, index) in newsBoxList" 
              :class="newsIndex === index ? 'news-active' : ''" :key="index"
              @click="toggleNewsType(item, index)" >
			  <div class="title-img flex">
				<img :src="newsIndex === index ? item.iconActive : item.icon" />
				<p>{{$i18n.locale === 'zh' ? item.value : item.valueEn}}</p>
			  </div>
			</li>
		</ul>
		<div v-loading="loading" :class="[$i18n.locale === 'en' ? 'news-all-en' : '', 'news-all']">
			<ul v-if="newsData.length > 0" class="news-list">
			  <li v-for="(item, index) in newsData" :key="index" 
				:class="[newsCurIndex === index ? 'list-active' : '', 
				index % 2 !== 0 ? 'slideInLeft' : 'slideInRight',
				'news-desc flex wow animated']"
				@click="newsCurIndex = index" >
				<div class="news-word">
					<p>{{$i18n.locale === 'zh' ? item.title : item.titleEn}}</p>
					<p class="omit-3" v-html="$i18n.locale === 'zh' ? item.contentText : item.contentEnText"></p>
				</div>
				<div class="news-tip flex">
					<div class="news-date">
						<p>{{item.publicTime && item.publicTime.slice(0,4)}}</p>
						<p>{{item.publicTime && item.publicTime.slice(5,10)}}</p>
					</div>
					<p class="news-det" @click="goDetail(item.id)">{{$i18n.locale === 'zh' ? '详细信息' : 'detailed info'}}-></p>
				</div>
			  </li>
		    </ul>
			<div v-else class="news-nodata">
				<img data-v-2f6854a2="" src="@assets/images/home/nodata.png">
                <p class="mt10">{{$t('translate.nodata')}}</p>
			</div>
			<div v-show="newsData.length > 0" class="news-pagination">
			  <el-pagination
				background
				layout="prev, pager, next"
				:page-size="pageSize"
				:total="total"
				:current-page="pageNow"
				@size-change="handleSizeChange"
				@current-change="currentclick">
			  </el-pagination>
			</div>
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
			newestBoxList: [],
			newestImg: require('@/assets/images/home/zuixin-bg01.png'),
			// newsObj: {
			// 	id: 1,
			// 	title: '接连取消航线　中美航线含金量骤降',
			// 	text: '中美航线曾被称为全世界最赚钱的跨洋航线之一，如今却遭遇含金量下滑窘境。8月22日北京商报记者从美国航空和夏威夷航空获悉，两家航企将于10月分别取消一条直飞中国的航线。值得关注的是，在几个月前美国航空刚刚宣布取消芝加哥至北京航线，而夏威夷航空叫停的檀香山至北京航线，是该公司旗下唯一直飞中国线路而夏威夷航空叫停的檀香山至北京航线，是该公司旗下唯一直飞中国线路而夏威夷航空叫停的檀香山至北京航线，是该公司旗下唯一直飞中国线路而夏威夷航空叫停的檀香山至北京航线，是该公司旗下唯一直飞中国线路',
			// 	imgUrl: require('@/assets/images/home/zuixin-bg01.png'),
			// 	date: '2022-7-23'
			// },
			newsIndex: 0,
			newsType: '',
			newsBoxList: [],
			newsBoxIconList: [
				{
					icon: require('@/assets/images/home/jituan.png'),
					iconActive: require('@/assets/images/home/jituan-white.png'),
				},
				{
					icon: require('@/assets/images/home/hangye.png'),
					iconActive: require('@/assets/images/home/hangye-white.png'),
				},
				{
					icon: require('@/assets/images/home/meiti.png'),
					iconActive: require('@/assets/images/home/meiti-white.png'),
				},
				{
					icon: require('@/assets/images/home/chuxing.png'),
					iconActive: require('@/assets/images/home/chuxing-white.png'),
				},
			],
			newsCurIndex: 0,
			newsData: [
			//   {
			// 	title: '接连取消航线　中美航线含金量骤降',
			// 	content: '中美航线曾被称为全世界最赚钱的跨洋航线之一，如今却遭遇含金量下滑窘境。8月22日北京商报记者从美国航空和夏威夷航空获悉，两家航企将于10月分别取消一条直飞中国的航线。值得关注的是，在几个月前美国航空刚刚宣布取消芝加哥至北京航线，而夏威夷航空叫停的檀香山至北京航线，是该公司旗下唯一直飞中国线路而夏威夷航空叫停的檀香山至北京航线，是该公司旗下唯一直飞中国线路而夏威夷航空叫停的檀香山至北京航线，是该公司旗下唯一直飞中国线路而夏威夷航空叫停的檀香山至北京航线，是该公司旗下唯一直飞中国线路',
			// 	imgUrl: require('@/assets/images/home/zuixin-bg01.png'),
			// 	date: '2022-7-23'
			//   },
			],
			pageNum: 1, // 最新动态当前页
			newestLoading: false,
			newestTotal: 0,
			loading: false,
			total: 0,
			pageSize: 10, // 每页显示条数
        	pageNow: 1,	
		};
	},
    mounted() {
	  this.newsShow = false
	  this.$nextTick(()=>{
		this.$wow.init()
		this.newsShow = true
	  })
	  this.getNewsType()
	  this.getSysNewNotice()
	},

	methods: {
		// 获取新闻类型
		getNewsType() {
			let params = {
				typeId: '1278911800547147777',
				page: 1,
				limit: 4
			}
			this.$api['newsCenter/getNewsType'](params).then(res => {
				this.newsBoxList = []
				let newsTypeData = [].concat(res.data)
				if (newsTypeData.length > 0) {
				  this.newsBoxIconList.forEach((item, index) => {
					this.newsBoxList.push({...item, ...newsTypeData[index]})
				  })
			      this.toggleNewsType(this.newsBoxList[0], 0)
				}
			})
			.catch(err => {
			  this.getSysCateNotice()
			  console.log(err);
			})
		},
		toggleNewsType(item, index) {
		  this.newsIndex = index
		  this.newsType = item.code
		  this.pageNow = 1
		  this.getSysCateNotice()
		},
		// 获取新闻分页列表-最新动态
		getSysNewNotice() {
			let params = {
				searchValue: '',
				type: 0,  // 最新动态
				page: this.pageNum,
				limit: 1
			}
			this.newestLoading = true
			this.$api['newsCenter/getSysNotice'](params).then(res => {
			   this.newestBoxList = res.data
			   this.newestTotal = res.count
			   this.newestLoading = false
			})
			.catch(err => {
			  this.newestLoading = false
			  console.log(err);
			})
		},
		// 获取新闻分页列表-分类列表
		getSysCateNotice() {
			let params = {
				searchValue: '',
				type: this.newsType,
				status: 1,
				page: this.pageNow,
				limit: this.pageSize
			}
			this.loading = true
			this.$api['newsCenter/getSysNotice'](params).then(res => {
				this.newsCurIndex = 0
				this.newsData = res.data
				this.total = res.count
			    this.loading = false
			})
			.catch(err => {
			  this.loading = false
			  console.log(err);
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
		toUpPage() {
			if (this.pageNum === 1) {
			   return
			}
			this.pageNum--;
			this.getSysNewNotice()
		},
		toDownPage() {
			if (this.pageNum === this.newestTotal) {
			   return
			}
			this.pageNum++;
			this.getSysNewNotice()
		},
		toPath() {
		  this.$router.push ({
			path: '/coreBusiness',
		  })
		},
		// 每页数据量发生改变
		handleSizeChange(val) {
			this.pageSize = val;
			this.pageNow = 1;
			this.getSysCateNotice()
		},
		currentclick(val) {
			this.pageNow = val;
			this.getSysCateNotice()
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
.news-wrap {
  width: 100%;
  background: #eee;
}
.news-container {
	width: 75%;
	margin: 68px auto 0;
	.title-col{
		width: 100%;
		text-align: center;
	}
	.title-col p {
		width: 145px;
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
			background-image: url('~@/assets/images/home/zuixin.png');
			background-size: 100% 100%;
			position: absolute;
			left: -50px;
			top: 6px;
		}
	}
	.news-zon {
	   width: 100%;
	   margin-top: 50px;
	   background: #fff;
	   position: relative;
	}
	.news-zon ul{
		width: 100%;
	   li {
		   width: 100%;
			.news-img {
				width: 50%;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.news-info {
		width: 50%;
		padding: 36px 0 78px;
		box-sizing: border-box;
		flex-wrap: wrap;
		position: relative;
	}
	.news-text {
		width: 85%;
		margin: 0 auto;
	}
	.news-text p:nth-child(1) {
		margin-bottom: 24px;
		font-size: 24px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #000000;
		line-height: 42px;
	}
	.news-text p:nth-child(2) {
		width: 100%;
		font-size: 20px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #585858;
		text-indent: 30px;
		line-height: 44px;
	}
	.news-detail {
		width: 85%;
		margin: 0 auto;
		justify-content: space-between;
		position: absolute;
		left: 7.5%;
		bottom: 24px;
		p {
			font-size: 20px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 42px;
		}
		p:nth-child(1) {
			color: #CDCDCD;
		}
		p:nth-child(2) {
			color: #134899;
			cursor: pointer;
		}
	}
	.news-btn {
		width: 50px;
		cursor: pointer;
		position: absolute;
		right: -50px;
		bottom: 0;
		img {
			width: 100%;
			height: 50px;
		}
	}
	ul.news-box {
		width: 100%;
		margin-top: 50px;
		justify-content: space-between;
	}
	ul.news-box li {
		width: 23%;
		height: 145px;
		text-align: center;
		background: #fff;
		cursor: pointer;
		position: relative;
		.title-img{
			height: 100%;
			text-align: center;
			align-items: center;
			justify-content: center;
		}
		.title-img p {
			margin-left: 16px;
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #000;
			line-height: 32px;
			text-align: left;
		}
		.title-img img {
			width: 32px;
			height: 32px;
			z-index: 0;
		}
		&.news-active {
			&::before {
				content: "";
				width: 100%;
				height: 100%;
				background-image: url('~@/assets/images/home/jituan-bg.png');
				background-size: 100% 100%;
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
			}
			p {
			  color: #fff;
			  font-weight: bold;
			  z-index: 1;
			}
		}
	}
	@media screen and (min-width:1280px) and (max-width:1440px){  // screen and 前两个可以省略。
	 ul.news-box-en {
		li .title-img img {
			width: 24px;
			height: 24px;
		}
		li .title-img p{
		  font-size: 16px;
		}
	  }
	}  // @media 结束
	@media screen and (min-width:1450px) and (max-width:1680px){  // screen and 前两个可以省略。
	 ul.news-box-en {
	   li .title-img img {
		 width: 30px;
		 height: 30px;
	   }
	   li .title-img p {
		  font-size: 20px;
		}
	 }
	}  // @media 结束
	.news-all {
	  width: 100%;
	  min-height: 350px;
	  margin-top: 50px;
	  position: relative;
	}
	ul.news-list {
	  width: 100%;
	}
	li.news-desc {
		width: 100%;
		padding: 30px;
		margin-bottom: 50px;
		background: #fff;
		box-sizing: border-box;
		cursor: pointer;
	}
	.news-word {
		width: 84%;
		padding-bottom: 36px;
		box-sizing: border-box;
	}
	.news-word p:nth-child(1) {
		margin-bottom: 24px;
		font-size: 24px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #000000;
		line-height: 42px;
	}
	.news-word p:nth-child(2) {
		width: 100%;
		font-size: 20px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #585858;
		line-height: 42px;
		text-indent: 30px;
	}
	.news-tip {
		width: 16%;
		flex-direction: column;
		justify-content: space-between;
		text-align: right;
		p {
			font-size: 20px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 42px;
		}
		.news-date p:nth-child(1) {
		   font-size: 36px;
		   color: #CDCDCD;
		}
		.news-date p:nth-child(2) {
			font-size: 18px;
		   color: #CDCDCD;
		}
		p.news-det {
			font-size: 20px;
			color: #134899;
			cursor: pointer;
		}
	}
	li.list-active {
		position: relative;
		&::before {
			content: "";
			width: 100%;
			height: 2px;
			background-image: url('~@/assets/images/home/line.png');
			background-size: 100% 100%;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
	.news-all .news-nodata {
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
	.news-all-en {
	  .news-nodata {
		margin-left: -180px;
	  }
	}
	.news-pagination {
		width: 100%;
		margin-bottom: 48px;
		text-align: center;
		/deep/ .el-pagination button {
			width: 48px;
			height: 48px;
			margin: 0 20px;
			background: #FFFFFF;
			border-radius: 2px 2px 2px 2px;
		}
		/deep/ .el-pager li {
			width: 48px;
			height: 48px;
			font-size: 21px;
			line-height: 48px;
			background: #eee;
			border-radius: 2px;
			&:hover {
			   color: #5B70A5;
			}
			&.active {
			  color: #fff;
			  background: #5B70A5;
		    }
		}
		/deep/ .el-pagination .btn-next .el-icon, 
		/deep/ .el-pagination .btn-prev .el-icon {
			font-size: 18px;
		}
	}
	.not-allow {
	   cursor: not-allowed;
	   opacity: 0.6;
	}
}
.news-container-en {
  .title-col p {
	width: 220px;
  }
}
</style>
