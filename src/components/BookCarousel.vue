<template>
  <div id="carousel">
    <el-carousel height="600px">
      <el-carousel-item v-for="item in books" :key="item.imgId">
        <h3>{{ item.id }}</h3>
        <img :src="'http://localhost:8082/ebook/image/' + item.imgId" alt="a" height="360px">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "BookCarousel",
  data: function() {
    return {
      books: []
    };
  },
  created() {
    this.fetchdata();
  },
  methods: {
    fetchdata: function() {
      this.$http
        .post("/ebook/books/getall", {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.books = response.data;
          console.log(this.books);
        });
    }
  }
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
