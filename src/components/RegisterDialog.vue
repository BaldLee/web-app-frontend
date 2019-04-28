<template>
  <el-dialog :visible.sync="visible" title="注册" @close="closedialog">
    <el-form ref="form" status-icon :rules="rules" :model="form">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="form.pass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="checkPass">
        <el-input v-model="form.checkPass" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="register('form')">注册</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "RegisiterDialog",
  data: function() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
      if (!reg.test(value)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    return {
      visible: this.isvisible,
      form: {
        username: "",
        pass: "",
        checkPass: "",
        email: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }]
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
    register: function(formName) {
      var flag = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          flag = true;
        } else {
          console.log("cannot submit");
          return false;
        }
        if (flag) {
          var newUser = {
            username: this.form.username,
            password: this.form.pass,
            status: 1,
            role: 0,
            email: this.form.email
          };
          this.$http({
            method: "post",
            url: "http://localhost:8082/ebook/users/add",
            data: newUser
          }).then(response => {
            console.log("add done: " + JSON.stringify(response.data));
            this.reset();
          });
        }
      });
    },
    closedialog: function() {
      this.$emit("update:isvisible", false);
      this.form.username = "";
      this.form.pass = "";
      this.form.checkPass = "";
      this.form.email = "";
    },
    reset() {
      this.form = { username: "", pass: "", checkPass: "", email: "" };
    }
  },
  watch: {
    isvisible: function() {
      this.visible = this.isvisible;
    }
  }
};
</script>