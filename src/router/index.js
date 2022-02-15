import { createWebHistory, createRouter } from "vue-router";
import Home from "@/pages/Home.vue";
import Profile from "@/pages/Profile.vue";
import Payment from "@/pages/Payment.vue";
import Detail from "@/pages/Detail.vue";
import Message from "@/pages/Message.vue";
import Upload from "@/pages/Upload.vue";
import NotFound from "@/pages/NotFound.vue";
import PlayGround from "../pages/PlayGround.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/details",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
  },
  {
    path: "/message",
    name: "Message",
    component: Message,
  },
  {
    path: "/playground",
    name: "Playground",
    component: PlayGround,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory("/#/"),
  routes,
});

export default router;
