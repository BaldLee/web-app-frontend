<template>
  <div class="asidemenu">
    <el-col :span="24">
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="toBookview">
          <i class="el-icon-menu"></i>
          <span slot="title">书籍浏览</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toSearch">
          <i class="el-icon-menu"></i>
          <span slot="title">书籍搜索</span>
        </el-menu-item>
        <el-menu-item index="3" @click="toMycart">
          <i class="el-icon-menu"></i>
          <span slot="title">我的购物车</span>
        </el-menu-item>
        <el-menu-item index="4" @click="toOrder">
          <i class="el-icon-menu"></i>
          <span slot="title">订单管理</span>
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
    toBookview: function() {
      this.$router.push("/main/bookview");
    },
    toSearch: function() {
      this.$router.push("/main/search");
    },
    toMycart: function() {
      this.$router.push("/main/mycart");
    },
    toOrder: function() {
      this.$router.push("/main/order");
    }
  }
};
</script>
