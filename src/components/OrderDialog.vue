<template>
  <el-dialog
    class="orderdialog"
    :visible.sync="visible"
    title="订单详情"
    @close="$emit('update:isvisible', false);"
  >
    <div class="itemscol" v-for="(item,index) in items" :key="index">
      <div class="itemsimg">
        <img :src="item.book.imgsrc" height="40px">
      </div>
      <div class="itemsinfo">
        <span>
          <b>书名:</b>
          {{item.book.name}}
          <b>价格:</b>
          {{item.book.price}}
          <b>数量：</b>
          {{item.amount}}
        </span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "orderdialog",
  props: {
    isvisible: {
      type: Boolean,
      default: false
    },
    orderid: {
      type: Number,
      default: 1
    }
  },
  watch: {
    isvisible: function() {
      this.visible = this.isvisible;
    },
    orderid: function() {
      this.order = this.orderid;
      this.fetchdata();
    }
  },
  created() {
    this.fetchdata();
  },
  data: function() {
    return {
      visible: this.isvisible,
      order:this.orderid,
      items: {
        book: {
          name: "",
          price: "",
          imgsrc: ""
        },
        amount: 0
      }
    };
  },
  methods: {
    fetchdata() {
      this.$http({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:8082/ebook/orderitems/findbooksbyorderid",
        data: this.order
      }).then(response => {
        this.items = response.data;
        console.log(this.items);
      });
    }
  }
};
</script>

<style scoped>
.itemcol {
  margin: 10px;
  padding: 10px;
  background-color: rgb(170, 170, 170);
}

.iteminfo {
  float: right;
  margin-left: 50px;
  line-height: 6px;
}

.itemimg {
  float: left;
}
</style>