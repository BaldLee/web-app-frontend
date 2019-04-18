<template>
  <div class="mycart">
    <div class="cartcol" v-for="item in cart" :key="item.no">
      <div class="cartimg">
        <img :src="item.imgsrc" height="240px">
      </div>
      <div class="cartinfo">
        <p>书名:{{item.name}}</p>
        <p>作者:{{item.author}}</p>
        <p>ISBN:{{item.ISBN}}</p>
      </div>
      <div class="cartbutton">
        <el-button @click="cartdelete(item)">删除</el-button>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCart",
  data: function() {
    return {
      isempty: true,
      cart: this.$global.mycart
    };
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