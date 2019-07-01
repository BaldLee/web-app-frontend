<template>
  <el-dialog
    class="orderdialog"
    :visible.sync="visible"
    title="订单详情"
    @close="$emit('update:isvisible', false);"
  >
    <div class="itemscol" v-for="(item,index) in items" :key="index">
      <div class="itemsimg">
        <img :src="'http://localhost:8082/ebook/image/' + item.Book.imgId" height="40px" />
      </div>
      <div class="itemsinfo">
        <span>
          <b>书名:</b>
          {{item.Book.name}}
          <b>价格:</b>
          {{item.Book.price}}
          <b>数量：</b>
          {{item.Amount}}
        </span>
      </div>
    </div>

    <p>
      <b>总价：</b>
      {{total}}
    </p>
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
      order: this.orderid,
      items: {
        Book: {
          name: "",
          price: "",
          imgId: ""
        },
        Amount: 0
      }
    };
  },
  computed: {
    total: function() {
      var result = 0;
      for (var i = 0; i < this.items.length; i++) {
        result += this.items[i].Book.price * this.items[i].Amount;
      }
      return result;
    }
  },
  methods: {
    fetchdata() {
      this.$http({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "/ebook/orderitems/findbooksbyorderid",
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