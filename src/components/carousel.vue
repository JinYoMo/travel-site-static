<template>
  <div class="carousel-container">
    <el-carousel trigger="click" :height="`${height}px`" :autoplay="false">
      <el-carousel-item v-for="(item, index) in carouselData" :key="index">
        <img class="carousel-img" :src="item.url" />
        <slot name= 'carousel-cont'></slot>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    carouselData: {
       type: Array,
       default: () => [
          {
            url: require("@assets/images/home/banner01.jpg")
          },
        ]
    },
    height: {
      type: Number,
      default: 890
    }
  },
  data() {
    return {
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.carousel-container {
  position: relative;
  .carousel-img {
    width: 100%;
    height: 100%;
  }
}
</style>
