import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import router from "./route";
// import router from "./route-second-example"; //user any style you like



const app = createApp(App);

app.use(router);

app.mount("#app");
