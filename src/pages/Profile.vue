<script>
import { Field, CellGroup } from "vant";
export default {
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
  },
  data() {
    return {
      profile: {
        id: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        sex: "",
      },
    };
  },
  created() {
    // set bar title
    this.$bridge.callHandler("setBarTitle", { title: "Profile Page" });
  },
  mounted() {
    // get profile from native app
    this.$bridge.callHandler("getProfile").then((data) => {
      console.log("response", data);
      if (typeof data === "string") {
        this.profile = JSON.parse(data);
      } else {
        this.profile = data;
      }
    });
  },
};
</script>
<template>
  <div>
    <h2 style="padding: 16px">Profile</h2>
    <van-cell-group lable="Profile">
      <van-field v-model="profile.id" label="ID" />
      <van-field v-model="profile.firstName" label="Frist name" />
      <van-field v-model="profile.middleName" label="Middle name" />
      <van-field v-model="profile.lastName" label="Last name" />
      <van-field v-model="profile.email" label="Email" />
      <van-field v-model="profile.phone" label="Phone" />
      <van-field v-model="profile.sex" label="Gender" />
    </van-cell-group>
  </div>
</template>
