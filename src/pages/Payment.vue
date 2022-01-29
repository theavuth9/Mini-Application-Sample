<script>
import { Button, Field, Form, Toast } from "vant";
export default {
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form,
    [Toast.name]: Toast,
  },
  data() {
    return {
      payment: {
        amount: "",
        account: "",
        currency: "USD",
      },
      doPayment: "",
      loading: false,
    };
  },
  methods: {
    onSubmit() {
      // this.loading = true;
      this.$bridge
        .callHandler("doPayment", this.payment)
        .then(() => {})
        .finally(() => {
          // this.loading = false;
        });
    },
  },
  created() {
    // set bar title
    this.$bridge.callHandler("setBarTitle", { title: "Payment Page" });
  },
};
</script>
<template>
  <div>
    <h2 style="padding: 16px">Payment</h2>
    <van-form @submit="onSubmit">
      <van-field
        v-model="payment.amount"
        label="Amount"
        placeholder="0.00"
        type="number"
        :rules="[{ required: true, message: 'Amount is required' }]"
      />
      <van-field
        v-model="payment.account"
        label="Account"
        placeholder="012345"
        :rules="[{ required: true, message: 'Account is required' }]"
      />

      <div style="margin: 16px">
        <van-button
          :loading="loading"
          round
          block
          type="primary"
          native-type="submit"
        >
          Submit
        </van-button>
      </div>
    </van-form>
    <!-- <h2>{{ doPayment }}</h2> -->
  </div>
</template>
