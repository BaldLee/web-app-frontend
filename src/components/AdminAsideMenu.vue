<template>
  <div class="adminasidemenu">
    <el-col :span="24">
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="toBookManage">
          <i class="el-icon-menu"></i>
          <span slot="title">书籍管理</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toAddBook">
          <i class="el-icon-menu"></i>
          <span slot="title">添加书籍</span>
        </el-menu-item>
        <el-menu-item index="3" @click="toUserManage">
          <i class="el-icon-menu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="toAddUser">
          <i class="el-icon-menu"></i>
          <span slot="title">添加用户</span>
        </el-menu-item>
        <el-menu-item index="5" @click="toOrderManage">
          <i class="el-icon-menu"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="6" @click="toUserStatic">
          <i class="el-icon-menu"></i>
          <span slot="title">用户统计</span>
        </el-menu-item>
        <el-menu-item index="7" @click="toBookStatic">
          <i class="el-icon-menu"></i>
          <span slot="title">书籍统计</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "AsidMenu",
  data: function() {
    return {};
  },
  methods: {
    toBookManage: function() {
      this.$router.push("/admin/bookmanage");
    },
    toAddBook: function() {
      this.$router.push("/admin/addbook");
    },
    toUserManage: function() {
      this.$router.push("/admin/usermanage");
    },
    toAddUser: function() {
      this.$router.push("/admin/adduser");
    },
    toOrderManage: function() {
      this.$router.push("/admin/ordermanage");
    },
    toUserStatic:function(){
      this.$router.push("/admin/userstatic")
    },
    toBookStatic:function(){
      this.$router.push("/admin/bookstatic")
    }
  }
};
</script>
