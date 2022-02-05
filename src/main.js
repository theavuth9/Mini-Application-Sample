import { createApp } from "vue";
import AppLayout from "./layout/index.vue";
import router from "./router";
import store from "./store";
import helper from "./helpers";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "./plugins/global-config";
import axios from "axios";
import VueAxios from "vue-axios";
import errorHandler from "./plugins/interceptor";
import VueJsBridge, { $fetch } from "custom-bridge-js";
// import VueJsBridge from "vue-webview-js-bridge";

const app = createApp(AppLayout);
app.config.devtools = true;

const requireComponent = require.context(
  "./components",
  true,
  /(st-)[\w-]+\.vue$/
);
requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/ui\/|^\.\/ui-custom\//, "").replace(/\.\w+$/, "")
    )
  );
  app.component(componentName, componentConfig.default || componentConfig);
});
errorHandler($fetch);

app.use(VueJsBridge);
app.use(VueAxios, axios);
app.mixin(helper).use(router).use(store).mount("#app");
