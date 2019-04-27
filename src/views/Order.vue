<template>
  <div class="order">
    <input v-model="searchword" class="searchbar" placeholder=" Search...">
    <template>
      <el-table
        :data="orders"
        style="width: 100%"
        :default-sort="{prop: 'id', order: 'descending'}"
      >
        <el-table-column prop="id" label="订单号" sortable width="300"></el-table-column>
        <el-table-column prop="time" label="时间" sortable width="300"></el-table-column>
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
  },
  computed: {
    orders: function() {
      var tmp = JSON.parse(JSON.stringify(this.order));
      for (var i = 0; i < tmp.length; i++) {
        tmp[i].time =
          new Date(tmp[i].time).toLocaleDateString().replace(/\//g, "-") +
          " " +
          new Date(tmp[i].time).toTimeString().substr(0, 8);
      }
      return tmp;
    }
  },
  created() {
    this.fetchdata();
  },
  methods: {
    fetchdata: function() {
      // this.$http({
      //   method: "post",
      //   headers: { "Content-Type": "application/json" },
      //   url: "http://localhost:8082/ebook/orders/getall"
      // }).then(reponse => {
      //   this.order = response.data;
      // });
      this.$http
        .post("http://localhost:8082/ebook/orders/getall", {
          headers: { "Content-Type": "application/json" }
        })
        .then(response => {
          this.order = response.data;
        });
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