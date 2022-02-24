import { createApp, h, provide } from "vue";
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
import VueJsBridge, { $fetch } from "vue-bridge-gateway";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { DefaultApolloClient } from "@vue/apollo-composable";

const defaultClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient);
  },
  render() {
    return h(AppLayout);
  },
});
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
