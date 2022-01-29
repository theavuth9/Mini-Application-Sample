<script>
import { Card, Loading, Button } from "vant";
export default {
  components: {
    [Card.name]: Card,
    [Loading.name]: Loading,
    [Button.name]: Button,
  },
  data() {
    return {
      listData: [],
      payment: {
        amount: "6",
        currency: "",
        account: +new Date() + "", // something that unique like transaction_id|invioce_id|ticket_id
      },
    };
  },
  created() {
    // set bar title
    this.$bridge.callHandler("setBarTitle", { title: "Detail Page" });
  },
  methods: {
    onSubmitUSD() {
      this.payment.currency = "USD";
      this.payment.amount = "6";
      this.$bridge.callHandler("doPayment", this.payment).then(() => {});
    },
    onSubmitKHR() {
      this.payment.currency = "KHR";
      this.payment.amount = "24000";
      this.$bridge.callHandler("doPayment", this.payment).then(() => {});
    },
  },
  mounted() {
    this.$bridge.registerHandler("getStatus", (data) => {
      console.log("Detail", data);
      let msg = "";
      if (typeof data === "string") {
        let msgString = JSON.parse(data);
        msg = msgString.status;
      } else {
        msg = data.status;
      }
      this.$router.push({
        path: "message",
        query: { message: msg },
      });
    });
  },
};
</script>
<template>
  <div class="wrapper" style="margin-bottom: 60px">
    <h2 style="padding: 16px">Detail</h2>
    <div class="description">
      <img src="https://img01.yzcdn.cn/vant/ipad.jpeg" class="img-detail" />
      <h3>Title of Product</h3>
      <h4>$ 6.00</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod possimus
        sequi aliquam, vel omnis pariatur, magni, eum molestiae saepe quam non
        ipsa at beatae eius repellat dolore velit nulla ab.
      </p>

      <van-button type="primary" @click="onSubmitUSD" block
        >Buy ($ 6.00)</van-button
      >
      <van-button
        type="primary"
        @click="onSubmitKHR"
        block
        style="margin-top: 10px"
        >Buy (៛ 24,000)</van-button
      >
    </div>
  </div>
</template>
<style lang="scss">
.wrapper {
  .description {
    padding: 16px;
    .img-detail {
      width: 100%;
      height: 200px;
      object-fit: contain;
    }
  }
  h2 {
    padding: 16px 16px 0;
  }
}
body {
  background: #f7f8fa;
}
</style>
