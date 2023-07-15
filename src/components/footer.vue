<template>
  <div :class="[$i18n.locale === 'en' ? 'footer-container-en' : '', 'footer-container']">
    <!-- 二维码 -->
    <div class="foot-code">
      <img src="~@/assets/images/home/erweima.png" alt="">
      <p>{{$t('translate.officialAccount')}}</p>
    </div>
    <!-- 联系方式 -->
    <div class="foot-phone">
      <p>027-87619950</p>
    </div>
    <!-- 说明 -->
    <div class="foot-info">
      <p>{{$t('translate.bannerJourney')}}</p>
      <p>{{$t('translate.travelExperience')}}</p>
    </div>
    <!-- 备案号 -->
    <div class="foot-num">
      <p @click="toUrl">{{$t('translate.record')}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {

    };
  },
  created() {
    
  },
  watch: {

  },
  methods: {
    toUrl() {
      window.open('https://beian.miit.gov.cn')
    }
  },
};
</script>

<style lang="less" scoped>
.footer-container {
  width: 100%;
  padding: 95px 0 50px;
  text-align: center;
  background: #596FA4;
  box-sizing: border-box;
  .foot-code{
    width: 200px;
    margin: 0 auto;
    text-align: center;
  }
  .foot-code img {
    width: 127px;
    height: 127px;
  }
  .foot-code p {
    padding: 10px 25px;
    margin: 20px auto 0;
    font-size: 17px;
    line-height: 24px;
    font-weight: bold;
    color: #FEFEFE;
    background: rgba(255,255,255,0.05);
    border-radius: 20px;
    box-sizing: border-box;
  }
  .foot-phone {
    width: 100%;
    margin-top: 50px;
    text-align: center;
    p {
      width: 245px;
      margin: 0 auto;
      font-size: 32px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #FFF;
      position: relative;
    }
    p::before {
      content: "";
      width: 35px;
      height: 36px;
      background-image: url('~@/assets/images/home/dianhua.png');
      background-size: 100% 100%;
      position: absolute;
      left: -50px;
      top: 0px;
    }
  }
  .foot-info {
    margin-top: 48px;
    p {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #FFF;
      line-height: 28px;
    }
  }
  .foot-num {
    margin-top: 48px;
    cursor: pointer;
    p {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #FFF;
    }
  }
}
.footer-container-en {
  .foot-code{
    width: 380px;
  }
}
</style>
