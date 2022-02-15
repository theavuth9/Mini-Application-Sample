<template>
  <div class="wrapper" style="margin-bottom: 60px">
    <div class="wrap-menu">
      <input
        class="input-url"
        v-model="api"
        type="text"
        placeholder="API URL"
      />
      <button @click="clearResult">Clear Result</button>
    </div>
    <div class="card">
      <div class="header">
        <div class="title">Axios</div>
        <div class="button">
          <button @click="axiosRequest">GET</button>
        </div>
      </div>
      <div class="result">
        <div class="result-title">Result</div>
        <pre>{{ axiosResult }}</pre>
      </div>
    </div>

    <div class="card">
      <div class="header">
        <div class="title">Fetch</div>
        <div class="button">
          <button @click="fetchRequest">GET</button>
        </div>
      </div>
      <div class="result">
        <div class="result-title">Result</div>
        <pre>{{ fetchResult }}</pre>
      </div>
    </div>

    <div class="card">
      <div class="header">
        <div class="title">Ajax</div>
        <div class="button">
          <button @click="ajaxRequest">GET</button>
        </div>
      </div>
      <div class="result">
        <div class="result-title">Result</div>
        <pre>{{ ajaxResult }}</pre>
      </div>
    </div>

    <div class="card">
      <div class="header">
        <div class="title">XML HTTP Request</div>
        <div class="button">
          <button @click="xmlRequest()">GET</button>
        </div>
      </div>
      <div class="result">
        <div class="result-title">Result</div>
        <pre>{{ xmlResult }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import $ from "jquery";

let axiosResult = ref({});
let fetchResult = ref({});
let ajaxResult = ref({});
let xmlResult = ref({});

const api = ref("https://jsonplaceholder.typicode.com/users");

function fetchRequest() {
  fetch(api.value)
    .then((res) => res.json())
    .then((data) => {
      fetchResult.value = data;
    })
    .catch((err) => {
      console.log("status: ", err.status);
      fetchResult.value = err.response;
    });
}

function axiosRequest() {
  axios
    .get(api.value)
    .then((res) => {
      axiosResult.value = res.data;
    })
    .catch((err) => {
      axiosResult.value = err;
    });
}

function ajaxRequest() {
  $(document).ready(function () {
    $.ajax({
      url: api.value,
      type: "GET",
      success: function (result) {
        ajaxResult.value = result;
      },
      error: function (error) {
        ajaxResult.value = error;
      },
    });
  });
}

function xmlRequest() {
  let req = new XMLHttpRequest();
  req.open("GET", api.value);
  req.send();
  req.onload = () => {
    if (req.status === 200) {
      xmlResult.value = JSON.parse(req.response);
    } else {
      xmlResult.value = req.statusText;
    }
  };
}

function clearResult() {
  axiosResult.value = {};
  fetchResult.value = {};
  ajaxResult.value = {};
  xmlResult.value = {};
}
</script>

<style lang="scss" scoped>
.wrap-menu {
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  input.input-url {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #e6ebf1;
    margin-right: 10px;
    font-size: 12px;
  }
}
button {
  background-color: aliceblue;
  border: 1px solid #e6ebf1;
  border-radius: 6px;
  color: darkblue;
  font-size: 12px;
  padding: 6px 10px;

  &:active {
    background-color: #e6ebf1;
    color: darkblue;
  }
}
.card {
  padding: 8px;
  border: 1px solid #e6ebf1;
  border-radius: 6px;
  margin: 8px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-size: 16px;
  }
  .result {
    position: relative;
    .result-title {
      position: absolute;
      top: 4px;
      left: 4px;
      background-color: #e6ebf1;
      border-radius: 3px;
      padding: 2px 4px;
    }
    pre {
      max-height: 300px;
      overflow-y: auto;
      color: #20a10f;
    }
    background: #f7f8fa;
    padding: 6px;
    margin-top: 8px;
    text-transform: uppercase;
    font-size: 10px;
  }
}
</style>
