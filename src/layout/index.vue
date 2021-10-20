<script>
// import AppHeader f m "@/components/the-footer";
import { Tabbar, TabbarItem, Dialog } from "vant";
export default {
  name: "AppLayout",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      active: 0,
      icon: {
        active: "https://img01.yzcdn.cn/vant/user-active.png",
        inactive: "https://img01.yzcdn.cn/vant/user-inactive.png",
      },
    };
  },
  watch: {
    $route(val) {
      switch (val.name) {
        case "Profile":
          this.active = 0;
          break;
        case "Payment":
          this.active = 1;
          break;
        default:
          this.active = 0;
          break;
      }
    },
  },
  mounted() {
    this.$bridge.registerHandler("doBackAction", () => {
      this.$router.go(-1);
    });
    this.$bridge.registerHandler("closeApp", () => {
      // callback({ status: true });
      this.handleCloseApp();
    });
  },
  methods: {
    handleChange(val) {
      console.log("handleChange", val);
      setTimeout(() => {
        this.active = val;
      }, 100);
    },
    handleCloseApp() {
      Dialog.confirm({
        title: "Leave Mini Application?",
        cancelButtonText: "Cancel",
        confirmButtonText: "Leave",
      })
        .then(() => {
          this.$bridge.callHandler("closeApp").then(() => {});
        })
        .catch(() => {});
    },
  },
};
</script>

<template>
  <div>
    <!-- <AppHeader /> -->
    <div>
      <router-view />
    </div>
    <van-tabbar v-model="active" @change="handleChange">
      <van-tabbar-item to="/" icon="wap-home-o">Home</van-tabbar-item>
      <van-tabbar-item to="/profile">
        <span>Profile</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/payment" icon="idcard">Payment</van-tabbar-item> -->
    </van-tabbar>
    <!-- <AppFooter /> -->
  </div>
</template>
