<template>
  <el-dialog
    class="bookdetail"
    :visible.sync="visible"
    title="编辑"
    @close="$emit('update:isvisible', false)"
  >
    <el-upload
      class="image-uploader"
      action="http://localhost:8082/ebook/image/upload"
      name="image"
      :show-file-list="false"
      :on-success="handleSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="cover">
    </el-upload>
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
          imgId: "",
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
        imgId: "",
        name: "",
        author: "",
        isbn: "",
        amount: "",
        id: 0,
        price: 0
      },
      imageUrl: ""
    };
  },
  methods: {
    edit() {
      this.$http({
        method: "post",
        url: "/ebook/books/update",
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
        url: "/ebook/books/delete",
        headers: { "Content-Type": "application/json" },
        data: this.book.id
      }).then(response => {
        console.log("book delete " + response.data);
        this.$emit("listenChild");
      });
      this.visible = false;
      this.$emit("update:isvisible", false);
    },
    handleSuccess(res,file) {
      console.log(res);
      alert("图片上传成功");
      this.imageUrl = URL.createObjectURL(file.raw);
      this.book.imgId = res.slice(19);
    }
  },
  watch: {
    isvisible: function() {
      this.visible = this.isvisible;
      this.book = JSON.parse(JSON.stringify(this.thebook));
      this.imageUrl = "http://localhost:8082/ebook/image/" + this.book.imgId;
    },
    thebook: function() {
      this.book = JSON.parse(JSON.stringify(this.thebook));
      this.imageUrl = "http://localhost:8082/ebook/image/" + this.book.imgId;
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
