<template>
  <el-dialog
    class="bookdetail"
    :visible.sync="visible"
    title="编辑"
    @close="$emit('update:isvisible', false)"
  >
    <img :src="book.imgsrc" style="height:240px">
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
        <el-button @click="deletebook">删除</el-button>
        <el-button @click="edit">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "BookEditor",
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
  // computed: {
  //   book: function() {
  //     return JSON.parse(JSON.stringify(this.thebook));
  //   }
  // },
  methods: {
    edit() {
      this.$http({
        method: "post",
        url: "http://localhost:8082/ebook/books/update",
        headers: { "Content-Type": "application/json" },
        data: this.book
      }).then(response => {
        console.log("book update: " + response.data);
        this.$emit("listenChild");
      });
      this.visible = false;
      this.$emit("update:isvisible", false);
    },
    deletebook() {
      this.$http({
        method: "post",
        url: "http://localhost:8082/ebook/books/delete",
        headers: { "Content-Type": "application/json" },
        data: this.book.id
      }).then(response => {
        console.log("book delete " + response.data);
        this.$emit("listenChild");
      });
      this.visible = false;
      this.$emit("update:isvisible", false);
    }
  },
  watch: {
    isvisible: function() {
      this.visible = this.isvisible;
      this.book = JSON.parse(JSON.stringify(this.thebook));
    },
    thebook: function() {
      this.book = JSON.parse(JSON.stringify(this.thebook));
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
