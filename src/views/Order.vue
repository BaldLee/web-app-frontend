<template>
  <div class="order">
    <input v-model="searchword" class="searchbar" placeholder=" Search...">
    <template>
      <el-table :data="order" style="width: 100%" :default-sort="{prop: 'id', order: 'descending'}">
        <el-table-column prop="id" label="订单号" sortable width="300"></el-table-column>
        <el-table-column prop="time" label="时间" sortable width="300"></el-table-column>
        <el-table-column prop="content" label="商品" sortable width="300"></el-table-column>
        <el-table-column prop="amount" label="金额" sortable width="300"></el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "Order",
  data: function() {
    return {
      searchword: "",
      order: []
    };
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