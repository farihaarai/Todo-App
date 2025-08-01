import { createApp } from "vue";
import App from "./App.vue";
import "mdb-vue-ui-kit/css/mdb.min.css";
import { createPinia } from "pinia";
import router from "./router";

// axios.defaults.baseURL = "http://localhost:8080/api";

const pinia = createPinia();

// axios

createApp(App).use(pinia).use(router).mount("#app");
