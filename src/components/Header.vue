<template>
  <div class="Header-login">
    <img id="logo" src="https://pt.sjtu.edu.cn/picbucket/142226_155192404061.png" alt>
    <span id="headtitle">e-book store</span>
    <div v-if="loginvisible">
      <el-button @click="loginbutton">登录</el-button>
      <el-button @click="check">检查</el-button>
      <LoginDialog :isvisible.sync="dialogvisible"></LoginDialog>
    </div>
  </div>
</template>

<script>
import LoginDialog from "@/components/LoginDialog.vue";

export default {
  name: "Header",
  components: {
    LoginDialog
  },
  props: {
    login: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      dialogvisible: false,
      loginvisible: this.login
    };
  },
  methods: {
    loginbutton() {
      this.dialogvisible = true;
    },
    check() {
      var tmp;
      this.$http
        .post("http://localhost:8082/books", {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          console.log(response.data);
          tmp = response.data;
          alert(tmp);
        });
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
