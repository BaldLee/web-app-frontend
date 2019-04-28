<template>
  <div class="order">
    <input v-model="searchword" class="searchbar" placeholder=" Search...">
    <template>
      <el-table
        :data="orders"
        style="width: 100%"
        :default-sort="{prop: 'id', order: 'descending'}"
        @row-click="tableclick"
      >
        <el-table-column prop="id" label="订单号" sortable width="300"></el-table-column>
        <el-table-column prop="time" label="时间" sortable width="300"></el-table-column>
      </el-table>
    </template>
    <OrderDialog :isvisible.sync="detailvisible" :orderid="ordertoshow"></OrderDialog>
  </div>
</template>

<script>
import OrderDialog from "@/components/OrderDialog.vue";

export default {
  name: "Order",
  components: {
    OrderDialog
  },
  data: function() {
    return {
      searchword: "",
      order: [],
      detailvisible: false,
      ordertoshow: 1
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
      var username = this.$global.username;
      this.$http({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:8082/ebook/orders/findbyusername",
        data: username
      }).then(response => {
        this.order = response.data;
      });
    },
    tableclick(row) {
      this.ordertoshow = row.id;
      this.detailvisible = true;
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