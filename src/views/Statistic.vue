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
      <br>
      累计消费金额: {{money}} 元
    </p>
  </div>
</template>

<script>
export default {
  name: "Statistic",
  data: function() {
    return {
      dates: "",
      money: 0
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
      this.$http({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "/ebook/orders/addbytime",
        data: request
      }).then(response => {
        this.money = response.data;
      });
    }
  }
};
</script>

<style scoped>
#button {
  float: left;
  margin-left: 20px;
}
#timepicker {
  float: left;
}
#selector {
  margin-left: 430px;
}
</style>
