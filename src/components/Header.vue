<template>
  <div class="Header-login">
    <img id="logo" src="https://pt.sjtu.edu.cn/picbucket/142226_155192404061.png" alt>
    <span id="headtitle">e-book store</span>
    <div v-if="dialogvisible">
      <el-button @click="loginbutton">登录</el-button>
      <el-button @click="registerbutton">注册</el-button>
      <LoginDialog :isvisible.sync="loginvisible"></LoginDialog>
      <RegisterDialog :isvisible.sync="registervisible"></RegisterDialog>
    </div>
  </div>
</template>

<script>
import LoginDialog from "@/components/LoginDialog.vue";
import RegisterDialog from "@/components/RegisterDialog.vue";

export default {
  name: "Header",
  components: {
    LoginDialog,
    RegisterDialog
  },
  props: {
    login: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      dialogvisible: this.login,
      registervisible: false,
      loginvisible: false
    };
  },
  methods: {
    loginbutton() {
      this.loginvisible = true;
    },
    // check() {
    //   var body = { username: "user1", password: "user1" };
    //   this.$http({
    //     method: "post",
    //     url: "http://localhost:8082/ebook/test",
    //     data: body
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //   });
    // }
    registerbutton() {
      this.registervisible = true;
    }
  }
};
</script>

<style scoped>
#logo {
  width: 50px;
  margin: 5px;
  float: left;
}

#headtitle {
  color: #333;
  text-align: center;
  vertical-align: middle;
  font-size: 30px;
  margin-left: 50px;
  float: left;
  margin-right: 1000px;
}
</style>
