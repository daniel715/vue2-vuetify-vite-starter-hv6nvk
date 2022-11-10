import axios from "axios";
import Vue from "vue";
import store from "@/store";

/**
 * creación de axios como prototipo para llmarlo con "this.$axios"
 */

Vue.prototype.$axios = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  onUploadProgress: progressEvent => {
    const { total, loaded } = progressEvent;
    const percent = Math.round((loaded * 100) / total);
    store.commit("app/setUploadPercentProgress", percent, { root: true });
  }
});