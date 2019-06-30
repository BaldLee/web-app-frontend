<template>
  <div id="addbook">
    <el-upload
      class="image-uploader"
      action="http://localhost:8082/ebook/image/upload"
      name="image"
      :show-file-list="false"
      :on-success="handleSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="cover">
      <i v-else class="el-icon-plus image-uploader-icon"></i>
    </el-upload>
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
        status: 0,
        imgId: ""
      },
      formdata: new FormData(),
      imageUrl: ""
    };
  },
  methods: {
    upload: function(e) {
      e.preventDefault();
      var files = e.target.files;
      this.formdata = new FormData();
      this.formdata.append("img", files[0]);
      console.log("uoloaded file");
      console.log(this.formdata);
    },
    handleSuccess(res,file) {
      console.log(res);
      let str = res;
      if (str.match("upload success") !=null) {
        let id = str.slice(19);
        this.newbook.imgId = id;
      }
      console.log(this.newbook.imgId);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    addbook() {
      for (var i in this.newbook) {
        if (this.newbook[i].lenth === 0) {
          alert(i + "不能为空！");
          return;
        }
      }
      this.$http({
        method: "post",
        url: "/ebook/books/add",
        data: this.newbook
      }).then(response => {
        alert("添加图书成功");
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
        status: 0,
        imgId: ""
      };
      this.formdata = "";
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
.image-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.image-uploader .el-upload:hover {
  border-color: #409eff;
}
.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.cover {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
