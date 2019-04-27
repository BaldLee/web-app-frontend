<template>
  <div class="mycart">
    <div class="cartcol" v-for="item in cart" :key="item.id">
      <div class="cartimg">
        <img :src="item.imgsrc" height="240px">
      </div>
      <div class="cartinfo">
        <p>书名:{{item.name}}</p>
        <p>作者:{{item.author}}</p>
        <p>ISBN:{{item.isbn}}</p>
        <p>价格:{{item.price}}</p>
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
// import { truncate } from "fs";
export default {
  name: "MyCart",
  data: function() {
    return {
      cartId: [],
      cart: []
      // fresh: 0
      // iscartempty: 0
    };
  },
  // computed: {
  //   iscartempty: function() {
  //     var cat = this.cart;
  //     if (this.cart.lenth === 0) return true;
  //     return false;
  //   }
  // },
  created() {
    this.fetchdata();
  },
  methods: {
    cartdelete(book) {
      for (var i = 0; i < this.$global.mycart.length; i++) {
        if (this.$global.mycart[i].ISBN === book.ISBN) {
          this.$global.mycart.splice(i, 1);
          return;
        }
      }
      this.cart = this.$global.mycart;
    },
    clear: function() {
      this.$global.mycart = [];
      this.cart = this.$global.mycart;
    },
    submit: function() {
      var request = {
        cartId: [],
        ownerName: ""
      };
      request.ownerName = this.$global.username;
      request.cartId = this.cartId;
      console.log("request: " + JSON.stringify(request));
      this.$http({
        method: "post",
        header: { "Content-Type": "application/json" },
        url: "http://localhost:8082/ebook/orders/add",
        data: request
      }).then(response => {
        console.log(response.data);
        if (response.data === "order add done") {
          this.$global.mycart = [];
          this.cartId = this.$global.mycart;
          this.clear();
        }
      });
    },
    fetchdata: function() {
      var tmpcart = [];
      for (var i = 0; i < this.$global.mycart.length; i++) {
        var id = this.$global.mycart[i];
        this.cartId.push(id);
        this.$http({
          method: "post",
          headers: { "Content-Type": "application/json" },
          url: "http://localhost:8082/ebook/books/findbyid",
          data: id
        }).then(response => {
          console.log(response.data);
          tmpcart.push(response.data);
        });
      }
      this.cart = tmpcart;
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