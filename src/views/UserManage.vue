<template>
  <div id="usermanage">
    <input v-model="searchword" class="searchbar" placeholder=" Search...">
    <el-table
      :data="userintable"
      style="width: 100%"
      :default-sort="{prop: 'id', order: 'ascending'}"
      @row-click="tableclick"
    >
      <el-table-column prop="id" label="ID" sortable width="150"></el-table-column>
      <el-table-column prop="username" label="名称" sortable width="150"></el-table-column>
      <el-table-column prop="roleString" label="权限" sortable width="150"></el-table-column>
      <el-table-column prop="password" label="密码密文" sortable width="600"></el-table-column>
    </el-table>
    <UserEditor :theuser="usertoedit" :isvisible.sync="editorvisible" @listenChild="fetchdata"></UserEditor>
  </div>
</template>

<script>
import UserEditor from "@/components/UserEditor.vue";

export default {
  name: "UserManage",
  components: {
    UserEditor
  },
  data: function() {
    return {
      searchword: "",
      users: [],
      userintable: [],
      usertoedit: {
        id: "",
        username: "",
        password: ""
      },
      editorvisible: false
    };
  },
  created() {
    this.fetchdata();
  },
  methods: {
    tableclick(row) {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].id === row.id) {
          this.showeditor(this.users[i]);
          return;
        }
      }
    },
    showeditor: function(user) {
      this.usertoedit = user;
      this.editorvisible = true;
    },
    fetchdata: function() {
      this.$http
        .post("http://localhost:8082/ebook/users/getall", {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.users = response.data;
          this.userintable = this.users;
          for (var i in this.userintable) {
            this.userintable[i].roleString = this.therole(this.userintable[i].role);
          }
          console.log(this.users);
        });
    },
    therole: function(rolenum) {
      if (rolenum === 0) return "USER";
      if (rolenum === 1) return "ADMIN";
      return "UNKNOWN";
    }
  },
  watch: {
    searchword: function() {
      if (this.searchword.length === 0) return;
      this.userintable = [];
      for (var i = 0; i < this.users.length; i++) {
        if (
          this.users[i].username
            .toLowerCase()
            .indexOf(this.searchword.toLowerCase()) > -1
        ) {
          this.userintable.push(this.users[i]);
        }
      }
    }
  }
};
</script>

<style scoped>
.searchbar {
  width: 200px;
  float: left;
  margin: 10px;
}
</style>
