<template>
  <div id="ordermanage">
    <input v-model="searchword" class="searchbar" placeholder=" Search...">
    <template>
      <el-table
        :data="ordersintable"
        style="width: 100%"
        :default-sort="{prop: 'id', order: 'ascending'}"
        @row-click="tableclick"
      >
        <el-table-column prop="id" label="订单号" sortable width="250"></el-table-column>
        <el-table-column prop="owner" label="所有者ID" sortable width="250"></el-table-column>
        <el-table-column prop="time" label="时间" sortable width="300"></el-table-column>
      </el-table>
    </template>
    <!-- <OrderDialog :isvisible.sync="detailvisible" :orderid="ordertoshow"></OrderDialog> -->
  </div>
</template>

<script>
import OrderDialog from "@/components/OrderDialog.vue";

export default {
  name: "OrderManage",
  components: {
    OrderDialog
  },
  data: function() {
    return {
      searchword: "",
      orders: [],
      detailvisible: false,
      ordertoshow: 1,
      orderintable: []
    };
  },
  computed: {
    ordersintable: function() {
      var tmp = JSON.parse(JSON.stringify(this.orderintable));
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
      // var username = this.$global.username;
      this.$http
        .post("http://localhost:8082/ebook/orders/getall", {
          headers: {
            "Content-Type": "application/json"
          }
        })
        // ({
        //   method: "post",
        //   headers: { "Content-Type": "application/json" },
        //   url: "http://localhost:8082/ebook/orders/getall"
        // })
        .then(response => {
          console.log(response.data);
          this.orders = response.data;
          this.orderintable = this.orders;
        });
    },
    tableclick(row) {
      this.ordertoshow = row.id;
      this.detailvisible = true;
    }
  },
  watch: {
    searchword: function() {
      this.orderintable = [];
      for (var i = 0; i < this.orders.length; i++) {
        if (
          this.orders[i].id
            .toLowerCase()
            .indexOf(this.searchword.toLowerCase()) > -1
        ) {
          this.orderintable.push(this.orders[i]);
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
