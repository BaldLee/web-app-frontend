<template>
  <el-dialog
    class="bookdetail"
    :visible.sync="visible"
    title="编辑"
    @close="$emit('update:isvisible', false)"
  >
    <img :src="book.imgsrc" style="height:240px">
    <!-- <p>书名:{{book.name}}</p>
    <p>作者:{{book.author}}</p>
    <p>ISBN:{{book.isbn}}</p>
    <p>价格:{{book.price}}</p>
    <p>库存:{{book.amount}}</p>-->
    <el-form ref="form" :model="book">
      <el-form-item label="书名">
        <el-input v-model="book.name"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="book.author"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="book.price"></el-input>
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model="book.amount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="edit">修改</el-button>
      </el-form-item>
    </el-form>
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
        isbn: "",
        amount: "",
        id: 0,
        price: 0
      }
    };
  },
  methods: {
    // addtocart(book) {
    //   for (var i = 0; i < this.$global.mycart.length; i++) {
    //     if (this.$global.mycart[i].isbn === book.isbn) {
    //       this.visible = false;
    //       this.$emit("update:isvisible", false);
    //       alert("购物车中已存在该书！");
    //       return;
    //     }
    //   }
    //   this.$global.mycart.push(book);
    //   this.visible = false;
    //   this.$emit("update:isvisible", false);
    // },
    edit() {
      this.$http({
        method: post,
        url: "localhost:8082/ebook/book/update",
        data: this.book
      }).then(response => {
        console.log(response.data);
      });
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
