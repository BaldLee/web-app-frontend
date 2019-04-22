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
      visible: this.isvisible,
      book: {
        imgsrc: "",
        name: "",
        author: "",
        isbn: ""
      }
    };
  },
  methods: {
    addtocart(book) {
      for (var i = 0; i < this.$global.mycart.length; i++) {
        if (this.$global.mycart[i].isbn === book.isbn) {
          this.visible = false;
          this.$emit("update:isvisible", false);
          alert("购物车中已存在该书！");
          return;
        }
      }
      this.$global.mycart.push(book);
      this.visible = false;
      this.$emit("update:isvisible", false);
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
