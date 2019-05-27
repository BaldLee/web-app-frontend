<template>
  <div class="mycart">
    <div class="cartcol" v-for="(item,index) in cart" :key="index">
      <div class="cartimg">
        <img :src="item.imgsrc" height="240px">
      </div>
      <div class="cartinfo">
        <p>书名:{{item.name}}</p>
        <p>作者:{{item.author}}</p>
        <p>ISBN:{{item.isbn}}</p>
        <p>价格:{{item.price}}</p>
        <span>数量：{{item.orderamount}}</span>
      </div>
      <div class="cartbutton">
        <el-button @click="cartdelete(item)">删除</el-button>
      </div>
      <div style="clear:both"></div>
    </div>
    <div>
      <el-button @click="clear">清空</el-button>
      <el-button @click="submit">提交订单</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCart",
  data: function() {
    return {
      cart: []
    };
  },
  created() {
    this.fetchdata();
  },
  methods: {
    cartdelete(book) {
      for (var i = 0; i < this.$global.mycart.length; i++) {
        if (this.$global.mycart[i].id === book.id) {
          this.$global.mycart.splice(i, 1);
          return;
        }
      }
      this.fetchdata();
    },
    clear: function() {
      this.$global.mycart = [];
      this.cart = this.$global.mycart;
    },
    submit: function() {
      var request = {
        cartId: [],
        cartAmount: [],
        ownerName: ""
      };
      request.ownerName = this.$global.username;
      for (var i = 0; i < this.$global.mycart.length; i++) {
        request.cartId.push(this.$global.mycart[i].id);
        request.cartAmount.push(this.$global.mycart[i].orderamount);
      }
      console.log(JSON.stringify(request));
      this.$http({
        method: "post",
        url: "http://localhost:8082/ebook/orders/add",
        headers: { "Content-Type": "application/json" },
        data: request
      }).then(response => {
        var t = /too much:.*/;
        if (response.data === "order add done") {
          this.clear();
        }
        if (t.test(response.data)) {
          // var bookname = response.data.match(/too much:(\S*)/)[1];
          // console.log(bookname);
          alert(response.data);
        }
      });
    },
    fetchdata: function() {
      this.cart = this.$global.mycart;
    }
  }
};
</script>

<style scoped>
.cartcol {
  margin: 10px;
  padding: 10px;
  background-color: rgb(133, 216, 191);
}

.cartinfo {
  float: left;
  margin-left: 50px;
}

.cartimg {
  float: left;
}

.cartbutton {
  float: right;
  margin-right: 50px;
  margin-top: 80px;
}
</style>