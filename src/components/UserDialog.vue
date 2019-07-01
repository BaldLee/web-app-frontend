<template>
  <el-dialog
    class="userstatic"
    :visible.sync="visible"
    title="用户统计"
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
      累计消费金额: {{money}} 元
      <br />
      累计购买书本：{{amount}} 本
    </p>
  </el-dialog>
</template>
<script>
export default {
  name: "UserDialog",
  props: {
    isvisible: {
      type: Boolean,
      default: false
    },
    theuser: {
      type: Object,
      default: function() {
        return {
          id: "",
          username: "",
          password: "",
          email: ""
        };
      }
    }
  },
  data: function() {
    return {
      visible: this.isvisible,
      user: {
        id: "",
        username: "",
        password: "",
        email: ""
      },
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
        username: this.user.username
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
  },
  watch: {
    isvisible: function() {
      this.visible = this.isvisible;
      this.user = this.theuser;
    }
  }
};
</script>
<style>
#userstatic {
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
