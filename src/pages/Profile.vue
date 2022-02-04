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
      fileNID: {},
    };
  },
  created() {
    // set bar title
    this.$bridge.callHandler("setBarTitle", { title: "Profile Page" });
  },
  mounted() {
    // get profile from native app
    this.$bridge.callHandler("getProfile").then((data) => {
      this.profile = data;
    });
    this.$bridge.callHandler("getNID").then((data) => {
      this.fileNID = data;
    });
  },
};
</script>
<template>
  <div>
    <h2 style="padding: 16px">Profile</h2>
    <div v-if="fileNID.content" class="file-nid">
      <img :src="`data:image/jpeg;base64, ${fileNID.content}`" class="img" />
    </div>
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
<style>
.file-nid {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.file-nid img {
  width: 80%;
  display: flex;
}
</style>
