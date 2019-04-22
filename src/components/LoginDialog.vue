<template>
  <el-dialog :visible.sync="visible" title="登录" @close="closedialog">
    <el-form ref="form" :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pw" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "LoginDialog",
  data: function() {
    return {
      visible: this.isvisible,
      form: {
        id: "",
        pw: ""
      }
    };
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    login: function() {
      var body = { username: this.form.id, password: this.form.pw };
      this.$http({
        method: "post",
        url: "http://localhost:8082/ebook/user/check",
        data: body
      }).then(response => {
        console.log("login response: " + response.data);
        var result = response.data;
        if (result === -1) {
          alert("用户名或密码错误！");
        }
        if (result === 0) {
          this.$router.push("/main/bookview");
          this.$global.username = this.form.id;
          this.visible = false;
        }
        if (result === 1) {
          this.$router.push("/admin");
          this.$global.username = this.form.id;
          this.visible = false;
        }
      });
      // this.$router.push("/main/bookview");
      // this.visible = false;
    },
    closedialog: function() {
      this.$emit("update:isvisible", false);
      this.form.id = "";
      this.form.pw = "";
    }
  },
  watch: {
    isvisible: function() {
      this.visible = this.isvisible;
    }
  }
};
</script>
