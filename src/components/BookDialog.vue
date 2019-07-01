<template>
  <el-dialog
    class="bookstatic"
    :visible.sync="visible"
    title="书籍统计"
    @close="$emit('update:isvisible', false)"
  >
    <p>选择日期</p>
    <div id="selector">
      <div id="timepicker">
        <el-date-picker
          v-model="dates"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div id="button">
        <el-button @click="fresh">查询</el-button>
      </div>
    </div>
    <p>
      <br />
      累计出售：{{amount}} 本
    </p>
  </el-dialog>
</template>
<script>
export default {
  name: "BookDialog",
  props: {
    isvisible: {
      type: Boolean,
      default: false
    },
    thebook: {
      type: Object,
      default: function() {
        return {
          id: ""
        };
      }
    }
  },
  data: function() {
    return {
      visible: this.isvisible,
      book: {
        id: ""
      },
      dates: "",
      amount: 0
    };
  },
  methods: {
    fresh: function() {
      this.fetchdata();
    },
    fetchdata: function() {
      var request = {
        start: this.dates[0].getTime(),
        end: this.dates[1].getTime(),
        bookId: this.book.id
      };
      console.log(request.bookId);
      let jsonstring = JSON.stringify(request);
      this.$http({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "/ebook/orders/booksale",
        data: jsonstring
      }).then(response => {
        this.amount = response.data;
      });
    }
  },
  watch: {
    isvisible: function() {
      this.visible = this.isvisible;
      this.book = this.thebook;
    }
  }
};
</script>
<style>
#bookstatic {
  color: #333;
  text-align: center;
  line-height: 50px;
}
#button {
  /* float: left; */
  margin-top: 50px;
  margin-right: 0px;
}
#timepicker {
  /* float: left; */
  margin: 0px;
}
#selector {
  margin-left: 0px;
}
</style>
