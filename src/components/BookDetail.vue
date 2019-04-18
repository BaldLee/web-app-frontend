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
    <p>ISBN:{{book.ISBN}}</p>
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
    }
  },
  data: function() {
    return {
      visible: this.isvisible,
      book: this.$global.bookdetail
    };
  },
  methods: {
    addtocart(book) {
      for (var i = 0; i < this.$global.mycart.length; i++) {
        if (this.$global.mycart[i].ISBN === book.ISBN) {
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
      this.book = this.$global.bookdetail;
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
