<template>
  <div class="nav-bar-container">
    <router-link
      v-for="item in list"
      :key="item.id"
      :to="item.link"
      :class="{ active: item.active }"
      >{{$t('translate.'+ item.id)}}
    </router-link>
    <button class="nav-bar-btn" @click="changelanguage">
      <span>{{LanguageText}}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  data() {
    return {
      list: [
        {
            name: '首页',
            id: 'homePage',
            link: '/home',
            active: false
          },
          {
            name: '核心业务',
            id: 'coreBusiness',
            link: '/coreBusiness',
            active: false
          },
           {
            name: '优势服务',
            id: 'advantageService',
            link: '/advantageService',
            active: false
          },
           {
            name: '新闻中心',
            id: 'newsCenter',
            link: '/newsCenter',
            active: false
          },
           {
            name: '招聘信息',
            id: 'jobOffers',
            link: '/jobOffers',
            active: false
          },
           {
            name: '联系我们',
            id: 'contactUs',
            link: '/contactUs',
            active: false
          },
      ],
      LanguageText: 'zh',
    };
  },
  created() {
    this.changeActive(this.$route.path);
  },
  mounted() {
    this.initLang()
  },
  watch: {
    '$route.path'(newV, oldV) {
      if (newV || newV !== oldV) {
        this.changeActive(newV);
      }
    },
  },
  methods: {
    initLang() {
      this.LanguageText = !Number(sessionStorage.getItem('lanFlag')) ? 'zh' : 'en';
      this.$i18n.locale = this.LanguageText;
      sessionStorage.setItem("lang", this.LanguageText);
    },
    changeActive(active) {
      this.list.forEach(el => {
        if (active.includes(el.link)) {  
          this.$set(el, 'active', true);
        } else {
          this.$set(el, 'active', false);
        }
      });
    },
    /* 切换中英文 */
    changelanguage () {
      let lanFlag = Number(sessionStorage.getItem('lanFlag'))
      if (lanFlag === 1) {
         sessionStorage.setItem('lanFlag', 0)
      } else {
         sessionStorage.setItem('lanFlag', 1)
      }
      location.reload();
    },
  },
};
</script>

<style lang="less" scoped>
.nav-bar-container {
  width: 62%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;

  a {
    font-family: SourceHanSansCN-Regular;
	  font-size: 18px;
	  font-weight: normal;
	  letter-spacing: 1px;
	  color: #ffffff;
    
    line-height: 42px;
    text-decoration: none;
    &.router-link-active,
    &.active {
      border-bottom: 3px solid #fac000;
      font-weight: bold;
	    font-stretch: normal;
    }
  }
  .nav-bar-btn {
    width: 42px;
    height: 42px;
    background: #FAC000;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    span {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 36px;
    }
  }
}
</style>
