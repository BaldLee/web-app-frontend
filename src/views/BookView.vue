<template>
  <div class="bookilst">
    <div v-for="item in books" :key="item.no">
      <div class="onebook" @click="showdetail(item)">
        <img class="viewbookimg" :src="'http://localhost:8082/ebook/image/' + item.imgId">
        <p>{{item.name}}</p>
      </div>
    </div>
    <BookDetail :thebook="booktoshow" :isvisible.sync="detailvisible"></BookDetail>
  </div>
</template>

<script>
import BookDetail from "@/components/BookDetail.vue";

export default {
  name: "BookView",
  components: {
    BookDetail
  },
  data: function() {
    return {
      booktoshow: {
        id:1,
        imgId: "",
        name: "",
        author: "",
        isbn: ""
      },
      books: [],
      detailvisible: false
    };
  },
  created() {
    this.fetchdata();
  },
  methods: {
    showdetail: function(book) {
      this.booktoshow = book;
      this.detailvisible = true;
    },
    fetchdata: function() {
      this.$http
        .post("/ebook/books/getall", {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.books = response.data;
        });
    }
  }
};
</script>

<style scoped>
.onebook {
  text-align: center;
  width: 240px;
  line-height: 20px;
  float: left;
  margin-right: 50px;
  margin-left: 30px;
}
.viewbookimg {
  height: 240px;
  margin: 0;
  padding: 0;
}
</style>
