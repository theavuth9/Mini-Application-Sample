<script>
import { Card, Loading, Button, Uploader } from "vant";
import _ from "lodash";
export default {
  components: {
    [Card.name]: Card,
    [Loading.name]: Loading,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
  },
  data() {
    return {
      file: {},
    };
  },
  computed: {
    getFile() {
      return _.get(this.file, "content");
    },
  },
  created() {
    // set bar title
    this.$bridge.callHandler("setBarTitle", { title: "Upload Page" });
  },
  methods: {
    onUpload() {
      // trigger native-app browse file
      this.$bridge.callHandler("uploadFile").then(() => {});
    },
  },
  mounted() {
    this.$bridge.registerHandler("getFileUpload", (data) => {
      console.log("getFileUpload", data);
      this.file = data;
    });
  },
};
</script>
<template>
  <div class="wrapper" style="margin-bottom: 60px">
    <h2 style="padding: 16px">Upload</h2>
    <div class="description">
      <van-button type="primary" @click="onUpload" block>
        Uplaod File
      </van-button>
      <!-- <van-uploader v-model="file" /> -->
      <div v-if="file.content">
        <img :src="`data:image/jpeg;base64, ${file.content}`" class="img" />
      </div>
      <pre>
        {{ file }}
      </pre>
    </div>
  </div>
</template>
<style lang="scss">
.wrapper {
  .description {
    padding: 16px;
    .img {
      width: 100%;
      height: 400px;
      object-fit: contain;
    }
  }
  // padding: 30px;
  h2 {
    padding: 16px 16px 0;
  }
}
body {
  background: #fff;
}
</style>
