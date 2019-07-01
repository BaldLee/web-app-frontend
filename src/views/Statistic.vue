<template>
  <div class="statistic">
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
      累计消费金额: {{money}} 元
      <br />
      累计购买书本：{{amount}} 本
    </p>
  </div>
</template>

<script>
export default {
  name: "Statistic",
  data: function() {
    return {
      dates: "",
      money: 0,
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
        username: this.$global.username
      };
      console.log(request.start);
      console.log(request.end);
      let jsonstring = JSON.stringify(request);
      this.$http({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "/ebook/orders/addbytime",
        data: jsonstring
      }).then(response => {
        this.money = response.data.money;
        this.amount = response.data.amount;
      });
    }
  }
};
</script>

<style scoped>
#button {
  float: center;
  margin-left: 0px;

}
#timepicker {
  float: center;
  margin-left:0px;
}
#selector {
  margin-left: 0px;
}
</style>
