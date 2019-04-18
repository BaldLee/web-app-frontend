<template>
  <div class="mainpage">
    <el-container>
      <el-header>
        <Header :login="loginvisible"></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AsideMenu></AsideMenu>
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
import AsideMenu from "@/components/AsideMenu.vue";
//import { METHODS } from "http";

export default {
  name: "MainPage",
  components: {
    Header,
    AsideMenu
  },
  data: function() {
    return {
      loginvisible: false
    };
  },
  methods: {}
};
</script>

<style scpoed>
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

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
