<template>
  <el-dialog
    class="userdetail"
    :visible.sync="visible"
    title="编辑"
    @close="$emit('update:isvisible', false)"
  >
    <el-form ref="form" :model="user">
      <!-- <el-form-item label="ID">
        <el-input v-model="user.id"></el-input>
      </el-form-item>-->
      <el-form-item label="用户名">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="deleteuser">删除</el-button>
        <el-button @click="edit">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "UserEditor",
  props: {
    isvisible: {
      type: Boolean,
      default: false
    },
    theuser: {
      type: Object,
      default: function() {
        return {
          id: "",
          username: "",
          password: ""
        };
      }
    }
  },
  data: function() {
    return {
      visible: this.isvisible,
      user: {
        id: "",
        username: "",
        password: ""
      }
    };
  },
  //   computed: {
  //     user: function() {
  //       return JSON.parse(JSON.stringify(this.theuser));
  //     }
  //   },
  methods: {
    edit() {
      this.$http({
        method: "post",
        url: "http://localhost:8082/ebook/users/update",
        data: this.user
      }).then(response => {
        console.log("user update: " + response.data);
        this.$emit("listenChild");
      });
      this.visible = false;
      this.$emit("update:isvisible", false);
    },
    deleteuser() {
      this.$http({
        method: "post",
        url: "http://localhost:8082/ebook/users/delete",
        data: this.user
      }).then(response => {
        console.log("user delete " + response.data);
        this.$emit("listenChild");
      });
      this.visible = false;
      this.$emit("update:isvisible", false);
    }
  },
  watch: {
    isvisible: function() {
      this.visible = this.isvisible;
      this.user = JSON.parse(JSON.stringify(this.theuser));
      this.user.password = "";
    },
    theuser: function() {
      this.user = JSON.parse(JSON.stringify(this.theuser));
      this.user.password = "";
    }
  }
};
</script>
<style>
#userdetail {
  color: #333;
  text-align: center;
  line-height: 50px;
}
</style>
