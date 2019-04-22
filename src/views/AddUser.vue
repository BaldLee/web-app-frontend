<template>
  <div id="AddUser">
    <el-form ref="form" :model="newuser">
      <el-form-item class="input" label="用户名">
        <el-input v-model="newuser.username"></el-input>
      </el-form-item>
      <el-form-item class="input" label="密码">
        <el-input v-model="newuser.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="adduser">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddUser",
  data: function() {
    return {
      newuser: {
        username: "",
        password: "",
        role: 0
      }
    };
  },
  methods: {
    adduser() {
      for (var i in this.newuser) {
        if (this.newuser[i].lenth === 0) {
          alert(i + "不能为空！");
          return;
        }
      }
      this.$http({
        method: "post",
        url: "http://localhost:8082/ebook/users/add",
        data: this.newuser
      }).then(response => {
        console.log("add done: " + response.data);
        this.reset();
      });
    },
    reset() {
      this.newuser = {
        username: "",
        password: "",
        role: 0
      };
    }
  }
};
</script>

<style scoped>
</style>
