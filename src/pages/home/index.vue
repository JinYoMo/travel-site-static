<template>
  <div>
    <carousel v-if="homeShow" :carouselData="carouselData">
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
    <!-- 企业简介 -->
    <div class="about-container" >
      <div v-if="homeShow" class="title-col wow animated slideInDown">
        <div class="EN">About</div>
        <div class="CN">{{$t('home.companyProfile')}}</div>
      </div>
      <div class="wow animated pulse">
        <p class="text text-pd omit-3">{{ text }}</p>
        <p class="text omit-5">{{ text2 }}</p>
      </div>
    </div>
    <!-- 企业文化 -->
    <div class="culture-container clearfix">
      <div class="title-col wow animated slideInUp">
        <div class="EN">Culture</div>
        <div class="CN fr">{{$t('home.corporatCulture')}}</div>
      </div>
      <ul :class="[$i18n.locale === 'en' ? 'culture-content-en' : '', 'culture-content flex wow animated slideInDown']">
        <div class="culture-left">
          <div class="flex">
            <li v-for="(item, index) in cultureTop" :key="index" class="cont-item flex flex-start">
              <img :src="item.imgUrl" />
              <div class="cont-text">
                <p>{{item.title}}</p>
                <p class="mt10">{{item.info}}</p>
              </div>
            </li>
          </div>
          <div class="culture-bom flex">
            <li v-for="(item, index) in cultureBottom" :key="index" class="cont-item flex flex-end">
              <div class="cont-text text-right">
                <p>{{item.title}}</p>
                <p class="mt10">{{item.info}}</p>
              </div>
              <img :src="item.imgUrl" />
            </li>
          </div>
        </div>
        <div v-for="(item, index) in cultureRight" :key="index" class="culture-right">
          <img :src="item.imgUrl" />
          <div class="cont-text">
            <p>{{item.title}}</p>
            <p :title="item.info" class="mt10 omit-3">{{item.info}}</p>
          </div>
        </div>
      </ul>
    </div>
    <!-- 核心业务 -->
    <div class="business-container clearfix">
      <div class="title-col wow animated slideInUp">
        <div class="EN">Product</div>
        <div class="CN">{{$t('home.coreBusiness')}}</div>
      </div>
      <div class="bus-cont flex wow animated slideInUp">
        <ul :class="[$i18n.locale === 'en' ? 'tab-title-en' : '', 'tab-title']">
          <li 
            v-for="(item, index) in busList" 
            :class="curIndex === index ? 'tab-active' : ''" :key="index"
            @click="toggle(index)"
          ><img :src="curIndex === index ? item.iconActive : item.icon" />{{item.title}}<i class="el-icon-arrow-right"></i></li>
        </ul>
        <div class="tab-cont">
          <div class="tab-text">
            <p>{{busList[curIndex].content}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 战略布局 -->
    <div :class="[$i18n.locale === 'en' ? 'strategic-container-en' : '', 'strategic-container clearfix']">
      <div class="title-col wow animated slideInUp">
        <div class="EN">Development</div>
        <div class="CN">{{$t('home.strategicLayout')}}</div>
      </div>
      <div class="strategic-cont wow animated slideInUp">
        <div class="strategic-map">
          <img src="~@/assets/images/home/map.png" alt="">
          <ul class="strategic-adress"> 
            <li v-for="(item, index) in serveList" :class="Object.values(strategicMap)[strIndex].includes(item) ? 'str-active' : ''" :key="index">                                     
              <p><i class="el-icon-location-information"></i>{{item}}</p>
            </li>
          </ul>
        </div>
        <ul class="strategic-label">
          <li v-for="(item, index) in Object.keys(strategicMap)" 
            :class="strIndex === index ? 'str-active' : ''" :key="index"
            @click="strIndex = index" ><p>{{ item }}</p></li>
        </ul>
      </div>
    </div>
    <!-- 底部 -->
    <Footer />
  </div>
</template>

<script>
import carousel from "@/components/carousel";
import Footer from "@/components/footer";
export default {
  components: {
    carousel,
    Footer,
  },
  data() {
    return {
      homeShow: false,  // 动画初始自动开始
      carouselData: [ 
        {
          url: require("@assets/images/home/banner01.jpg")
        },
      ],
      text: this.$t('home.profileTextOne'),
      text2: this.$t('home.profileTextTwo'),
      cultureTop: [
        {
          title: this.$t('home.corporateVision'),
          info: this.$t('home.beOneProvider'),
          imgUrl: require('@/assets/images/home/yuanjing.png')
        },
        {
          title: this.$t('home.enterpriseSpirit'),
          info: this.$t('home.notAfraidDifficulties'),
          imgUrl: require('@/assets/images/home/spirit.png')
        },
      ],
      cultureBottom: [
        {
          title: this.$t('home.coreValues'),
          info: this.$t('home.responsibility'),
          imgUrl: require('@/assets/images/home/jiazhiguan.png')
        },
        {
          title: this.$t('home.talentConcept'),
          info: this.$t('home.respectTalents'),
          imgUrl: require('@/assets/images/home/rencai.jpg')
        },
      ],
      cultureRight: [
        {
          title: this.$t('home.managementIdea'),
          info: this.$t('home.integrity'),
          imgUrl: require('@/assets/images/home/linian.png')
        },
      ],
      curIndex: 0,
      busList: [
        {
            title: this.$t('home.planeTicket'),
            icon: require('@/assets/images/home/jipiao.png'),
            iconActive: require('@/assets/images/home/jipiao-blue.png'),
            content: this.$t('home.planeCoverage'),
        },
        {
            title: this.$t('home.hotel'),
            icon: require('@/assets/images/home/jiudian.png'),
            iconActive: require('@/assets/images/home/jiudian-blue.png'),
            content: this.$t('home.hotelCoverage'),
        },
        {
            title: this.$t('home.trainTickets'),
            icon: require('@/assets/images/home/huochepiao.png'),
            iconActive: require('@/assets/images/home/huochepiao-blue.png'),
            content: this.$t('home.trainCoverage'),
        },
        {
            title: this.$t('home.visa'),
            icon: require('@/assets/images/home/qianzheng.png'),
            iconActive: require('@/assets/images/home/qianzheng-blue.png'),
            content: this.$t('home.visaCoverage'),
        },
        {
            title: this.$t('home.transferGround'),
            icon: require('@/assets/images/home/zhongzhuan.png'),
            iconActive: require('@/assets/images/home/zhongzhuan-blue.png'),
            content: this.$t('home.transferCoverage'),
        },
        {
            title: this.$t('home.insurance'),
            icon: require('@/assets/images/home/baoxian.png'),
            iconActive: require('@/assets/images/home/baoxian-blue.png'),
            content: this.$t('home.insuranceCoverage'),
        },
        {
            title: this.$t('home.independentTravel'),
            icon: require('@/assets/images/home/ziyouxing.png'),
            iconActive: require('@/assets/images/home/ziyouxing-blue.png'),
            content: this.$t('home.independentCoverage'),
        },
        {
            title: this.$t('home.carRental'),
            icon: require('@/assets/images/home/zuche.png'),
            iconActive: require('@/assets/images/home/zuche-blue.png'),
            content: this.$t('home.carCoverage'),
        },
        {
            title: this.$t('home.conferenceAffairs'),
            icon: require('@/assets/images/home/huiwu.png'),
            iconActive: require('@/assets/images/home/huiwu-blue.png'),
            content: this.$t('home.conferenceCoverage'),
        },
      ],
      serveList: [
				this.$t('home.USAEverest'),
				this.$t('home.baEverest'),
				this.$t('home.franceEverest'),
				this.$t('home.qatarEverest'),
				this.$t('home.pakistanEverest'),
        this.$t('home.indoEverest'),
        this.$t('home.egEverest'),
        this.$t('home.ethEverest'),
        this.$t('home.kenyaEverest'),
        this.$t('home.beijingEverest'),
        this.$t('home.wuhanEverest'),
        this.$t('home.shanghaiEverest'),
        this.$t('home.hainanEverest'),
			],
      strIndex: 0,
      strategicMap: {
        [this.$t('home.subsidiaryCompany')]: [
          this.$t('home.egEverest'),
          this.$t('home.ethEverest'),
          this.$t('home.kenyaEverest'),
          this.$t('home.beijingEverest'),
          this.$t('home.wuhanEverest'),
          this.$t('home.shanghaiEverest'),
          this.$t('home.hainanEverest'),
        ],
        [this.$t('home.futureCompany')]: [
          this.$t('home.USAEverest'),
				  this.$t('home.baEverest'),
				  this.$t('home.franceEverest'),
				  this.$t('home.qatarEverest'),
				  this.$t('home.pakistanEverest'),
          this.$t('home.indoEverest'),
        ],
      }
    };
  },
 created(){
   
 },
  mounted() { 
    this.homeShow = false
    this.$nextTick(()=>{
      this.$wow.init()
      this.homeShow = true
    })
  },

  methods: { 
    toggle(index){
      this.curIndex = index;
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
.about-container {
  width: 100%;
  height: 776px;
  padding: 0 50px;
  box-sizing: border-box;
  position: relative;
  background: #fff;
  &::before {
    content: "";
    width: calc(100% - 100px);
    height: 716px;
    background-image: url('~@/assets/images/home/bg01.jpg');
    background-size: 100% 100%;
    position: absolute;
    left: 50px;
    right: 50px;
    top: 60px;
  }
  .title-col {
    position: absolute;
    top: -68px;
    left: 50px;
    z-index: 2;
    background: #ffffff;
    padding: 78px 24px;
    box-shadow: 0px 1px 13px 0px rgba(207,207,207,0.75);
    box-sizing: border-box;
    .EN {
      font-size: 60px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #1E478B;
      line-height: 42px;
      opacity: 0.3;
    }
    .CN {
      font-size: 36px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #1E478B;
      line-height: 42px;
      margin-top: 50px;
    }
    &::after {
      content: "";
      width: 71px;
      height: 9px;
      background: #FFC000;
      position: absolute;
      top: 146px;
      left: 28px;
    }
  }
  .text {
    max-width: 38%;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #585858;
    line-height: 42px;
    text-indent: 2em;
    padding-left: 29px;
  }
  .text-pd {
    padding-top: 344px;
  }
}
.culture-container {
  width: 100%;
  position: relative;
  background: #fff;
  padding: 54px 50px 0;
  box-sizing: border-box;
  .title-col {
    position: absolute;
    top: 54px;
    right: 50px;
    text-align: right;
    .EN {
      font-size: 60px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #1E478B;
      line-height: 42px;
      opacity: 0.3;
    }
    .CN {
      width: 80%;
      font-size: 28px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #1E478B;
      line-height: 42px;
      margin-top: 60px;
    }
    &::after {
      content: "";
      width: 71px;
      height: 9px;
      background: #FFC000;
      position: absolute;
      top: 72px;
      right: 0;
    }
  }
  .culture-content {
    width: 100%;
    margin-top: 105px;
    padding-right: 10%;
    box-sizing: border-box;
    .culture-left {
      width: 80%;
      position: relative;
      background: #fff;
    }
    .cont-item {
      width: 50%;
      margin-right: 12px;
    }
    .cont-item img {
      width: 48%;
      height: 256px;
      display: block;
    }
    .cont-item:nth-child(1) .cont-text,.cont-item:nth-child(2) .cont-text {
      width: 52%;
      padding: 32px 24px 24px;
      background: linear-gradient(90deg, rgba(81,126,184,0.2) 0%, rgba(255,255,255,0) 100%);
      box-sizing: border-box;
      position: relative;
      &::before {
        left: 0;
        top: 0;
      }
    }
    .culture-bom {
      width: 100%;
      position: absolute;
      left: 0;
      top: 200px;
    }
    .culture-bom .cont-item .cont-text {
      width: 52%;
      padding: 32px 24px 24px;
      background: linear-gradient(-90deg, rgba(81,126,184,0.2) 0%, rgba(255,255,255,0) 100%);
      box-sizing: border-box;
      position: relative;
      &::before {
        left: calc(100% - 9px);
        top: 0;
      }
    }
    .culture-right {
      width: 18%;
    }
    .culture-right img {
      width: 100%;
      height: 256px;
      display: block;
    }
    .culture-right .cont-text {
      width: 100%;
      height: 200px;
      padding: 48px 24px 24px;
      background: linear-gradient(90deg, rgba(81,126,184,0.2) 0%, rgba(255,255,255,0) 100%);
      box-sizing: border-box;
      position: relative;
      &::before {
        width: 27px;
        height: 9px;
        left: 0;
        top: 0;
      }
    }
    .cont-text p {
      font-family: Source Han Sans CN;
    }
    .cont-text p:nth-child(1) {
      font-size: 24px;
      line-height: 24px;
      font-weight: 500;
      color: #000;
    }
    .cont-text p:nth-child(2) {
      font-size: 20px;
      line-height: 36px;
      font-weight: 400;
      color: #585858;
    }
    .cont-text::before {
      content: "";
      width: 9px;
      height: 27px;
      background: #637AAC;
      position: absolute;
    }
  }
  .culture-content-en .cont-text p:nth-child(2) {
    line-height: 24px;
  }
}
.business-container{
  width: 100%;
  background: #fff;
  position: relative;
  .title-col {
    margin-top: 90px;
    text-align: center;
    position: relative;
    .EN {
      font-size: 60px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #1E478B;
      line-height: 42px;
      opacity: 0.3;
    }
    .CN {
      font-size: 36px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #1E478B;
      line-height: 42px;
      margin-top: 60px;
    }
    &::after {
      content: "";
      width: 71px;
      height: 9px;
      background: #FFC000;
      position: absolute;
      top: 72px;
      left: 50%;
      margin-left: -35px;
    }
  }
  .bus-cont {
    width: 100%;
    padding: 48px 50px 0;
    position: relative;
    &::before {
      content: "";
      width: 100%;
      min-height: 685px;
      background-image: url('~@/assets/images/home/bg02.jpg');
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 48px;
    }
  }
  .tab-title {
    width: 27%;
    min-height: 685px;
    background: rgba(57,87,137,0.2);
    z-index: 0;
    cursor: pointer;
  }
  .tab-title li{
    width: 100%;
    height: 76px;
    padding-left: 46%;
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #fff;
    line-height: 75px;
    text-align: left;
    position: relative;
    box-sizing: border-box;
  }
  .tab-title li.tab-active{
    color:#134899;
    background: #fff;
  }
  .tab-title li img {
    width: 36px;
    height: 36px;
    position: absolute;
    left: 31%;
    top: 19px;
  }
  .tab-title li i {
    font-size: 24px;
    position: absolute;
    right: 24px;
    top: 50%;
    margin-top: -12px;
  }
  .tab-title-en li{
    padding-left: 26%;
  }
  .tab-title-en li img {
    left: 12%;
  }
  @media screen and (min-width:1280px) and (max-width:1440px){  // screen and 前两个可以省略。
	  .tab-title-en li{
       padding-left: 19%;
       font-size: 18px;
    }
    .tab-title-en li img {
      width: 28px;
      height: 28px;
      left: 7%;
      top: 22px;
    }
	}  // @media 结束
	@media screen and (min-width:1450px) and (max-width:1680px){  // screen and 前两个可以省略。
	  .tab-title-en li{
       padding-left: 19%;
       font-size: 22px;
    }
    .tab-title-en li img {
      width: 30px;
      height: 30px;
      left: 7%;
      top: 22px;
    }
	}  // @media 结束
  .tab-cont {
    width: 100%;
    position: relative;
  }
  .tab-cont .tab-text{
    width: 63%;
    padding: 93px 60px;
    border: 5px solid #FFFFFF;
    background: rgba(57,87,137,0.2);
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -33%;
    margin-top: -120px;
    text-align: center;
    box-sizing: border-box;
  }
  .tab-text p {
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 42px;
  }
}
.strategic-container{
  width: 100%;
  background: #fff;
  position: relative;
  .title-col {
    margin-top: 90px;
    text-align: center;
    position: relative;
    .EN {
      font-size: 60px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #1E478B;
      line-height: 42px;
      opacity: 0.3;
    }
    .CN {
      font-size: 36px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #1E478B;
      line-height: 42px;
      margin-top: 60px;
    }
    &::after {
      content: "";
      width: 71px;
      height: 9px;
      background: #FFC000;
      position: absolute;
      top: 72px;
      left: 50%;
      margin-left: -35px;
    }
  }
  .strategic-cont {
    width: 100%;
    padding: 56px 0;
    box-sizing: border-box;
    background: #fff;
  }
  .strategic-map {
    width: 85%;
    margin: 0 auto;
    position: relative;
  }
  .strategic-map img {
    width: 100%;
    height: 871px;
    display: block;
  }
  .strategic-adress {
    li {
      cursor: pointer;
    }
    li p {
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #134899;
      line-height: 42px;
      opacity: 0.6;
    }
    li:hover p {
      font-weight: bold;
      i {
        font-weight: bold;
      }
    }
    li:nth-child(1) {
      position: absolute;
      left: 27%;
      top: 29%;
    }
    li:nth-child(2) {
      position: absolute;
      left: 32%;
      top: 62%;
    }
    li:nth-child(3) {
      position: absolute;
      left: 46%;
      top: 32%;
    }
    li:nth-child(4) {
      position: absolute;
      left: 62%;
      top: 46%;
    }
    li:nth-child(5) {
      position: absolute;
      left: 56%;
      top: 40%;
    }
    li:nth-child(6) {
      position: absolute;
      left: 76%;
      top: 64%;
    }
    li:nth-child(7) {
      position: absolute;
      left: 54%;
      top: 43%;
    }
    li:nth-child(8) {
      position: absolute;
      left: 57%;
      top: 52%;
    }
    li:nth-child(9) {
      position: absolute;
      left: 57%;
      top: 60%;
    }
    li:nth-child(10) {
      position: absolute;
      right: 15%;
      top: 36%;
    }
    li:nth-child(11) {
      position: absolute;
      right: 17%;
      top: 43%;
    }
    li:nth-child(12) {
      position: absolute;
      right: 14%;
      top: 40%;
    }
    li:nth-child(13) {
      position: absolute;
      right: 17%;
      top: 48%;
    }
  }
  ul.strategic-label {
    position: absolute;
    left: 209px;
    bottom: 90px;
  }
  ul.strategic-label li {
    list-style: disc;
    cursor: pointer;
    p {
      font-size: 20px;
      color: #15499A;
      line-height: 40px;
      font-weight: 400;
      opacity: 0.6;
    }
  }
  ul.strategic-label li, ul.strategic-adress li { 
    &.str-active p{
      opacity: 1;
    }
  }
}
.strategic-container-en {
  .strategic-adress li p {
    font-size: 16px;
  }
  ul.strategic-label li p {
    font-size: 18px;
  }
}
</style>
