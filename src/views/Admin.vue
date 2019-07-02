<template>
  <div class="mainpage">
    <el-container>
      <el-header>
        <Header :login="loginvisible"></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AdminAsideMenu></AdminAsideMenu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import AdminAsideMenu from "@/components/AdminAsideMenu.vue";

export default {
  name: "Admin",
  components: {
    Header,
    AdminAsideMenu
  },
  data: function() {
    return {
      loginvisible: false
    };
  },
  created(){
    let body = {username:this.$global.username,password:this.$global.password};
    this.$http({
      method:"post",
      url:"/ebook/users/check",
      data:body
    }
    ).then(response=>{
      let result = response.data;
      if(result != 1){
        alert("请先登录！");
        this.$router.push("/");
      }
    })
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: rgb(255, 255, 255);
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 50px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 60px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 80px;
}
</style>
