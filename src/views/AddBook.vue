<template>
  <div id="addbook">
    <el-form ref="form" :model="newbook">
      <el-form-item class="input" label="书名">
        <el-input v-model="newbook.name"></el-input>
      </el-form-item>
      <el-form-item class="input" label="作者">
        <el-input v-model="newbook.author"></el-input>
      </el-form-item>
      <el-form-item class="input" label="价格">
        <el-input v-model="newbook.price"></el-input>
      </el-form-item>
      <el-form-item class="input" label="库存">
        <el-input v-model="newbook.amount"></el-input>
      </el-form-item>
      <el-form-item class="input" label="ISBN">
        <el-input v-model="newbook.isbn"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="addbook">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddBook",
  data: function() {
    return {
      newbook: {
        name: "",
        author: "",
        price: 0,
        amount: 0,
        isbn: "",
        status: 0
      }
    };
  },
  methods: {
    addbook() {
      for (var i in this.newbook) {
        if (this.newbook[i].lenth === 0) {
          alert(i + "不能为空！");
          return;
        }
      }
      this.$http({
        method: "post",
        url: "http://localhost:8082/ebook/books/add",
        data: this.newbook
      }).then(response => {
        console.log("add done: " + response.data);
        this.reset();
      });
    },
    reset() {
      this.newbook = {
        name: "",
        author: "",
        price: 0,
        amount: 0,
        isbn: "",
        status: 0
      };
    }
  }
};
</script>

<style scoped>
/* .input {
  width: 600px;
} */
#addbook {
  width: 700px;
}
</style>
