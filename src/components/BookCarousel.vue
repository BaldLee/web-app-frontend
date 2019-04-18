<template>
  <div id="carousel">
    <el-carousel height="600px">
      <el-carousel-item v-for="item in books" :key="item.no">
        <h3>{{ item.no }}</h3>
        <img :src="item.imgsrc" alt="a" height="360px">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "BookCarousel",
  data: function() {
    return {
      books:this.$global.books, 
    };
  },
  methods: {
  },
  computed: {}
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
