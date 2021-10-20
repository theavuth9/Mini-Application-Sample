import { createWebHistory, createRouter } from "vue-router";
import Home from "@/pages/Home.vue";
import Profile from "@/pages/Profile.vue";
import Payment from "@/pages/Payment.vue";
import Detail from "@/pages/Detail.vue";
import Message from "@/pages/Message.vue";
import NotFound from "@/pages/NotFound.vue";

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
    path: "/message",
    name: "Message",
    component: Message,
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
