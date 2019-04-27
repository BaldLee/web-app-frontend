<template>
  <el-dialog
    class="bookdetail"
    :visible.sync="visible"
    title="详情"
    @close="$emit('update:isvisible', false)"
  >
    <img :src="book.imgsrc" style="height:240px">
    <p>书名:{{book.name}}</p>
    <p>作者:{{book.author}}</p>
    <p>ISBN:{{book.isbn}}</p>
    <p>价格:{{book.price}}</p>
    <p>库存:{{book.amount}}</p>
    <p>简介：{{book.detail}}</p>
    <el-input-number v-model="num" :min="1"></el-input-number>
    <el-button @click="addtocart(book)">添加至购物车</el-button>
  </el-dialog>
</template>

<script>
export default {
  name: "BookView",
  props: {
    isvisible: {
      type: Boolean,
      default: false
    },
    thebook: {
      type: Object,
      default: function() {
        return {
          id: 1,
          imgsrc: "",
          name: "",
          author: "",
          isbn: ""
        };
      }
    }
  },
  data: function() {
    return {
      num: 1,
      visible: this.isvisible,
      book: {
        imgsrc: "",
        name: "",
        author: "",
        isbn: ""
      },
      detail: ""
    };
  },
  created() {
    this.fetchdata();
  },
  methods: {
    addtocart(book) {
      for (var i = 0; i < this.$global.mycart.length; i++) {
        if (this.$global.mycart[i].id === book.id) {
          this.$global.mycart[i].orderamount += this.num;
          this.visible = false;
          this.$emit("update:isvisible", false);
          return;
        }
      }
      book = Object.assign({}, book, { orderamount: this.num });
      this.$global.mycart.push(book);
      this.visible = false;
      this.$emit("update:isvisible", false);
    },
    fetchdata: function() {
      this.$http({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:8082/ebook/books/findbyid",
        data: this.thebook.id
      }).then(reponse => {
        this.book = reponse.data;
      });
    }
  },
  watch: {
    isvisible: function() {
      this.visible = this.isvisible;
      this.book = this.thebook;
    },
    thebook: function() {
      this.book = this.thebook;
    }
  }
};
</script>
<style>
#bookdetail {
  color: #333;
  text-align: center;
  line-height: 50px;
}
</style>
