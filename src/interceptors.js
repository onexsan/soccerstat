import axios from "axios";
import store from "./store";

export default function setup() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (typeof error.response === "undefined") {
        store.dispatch("toggleError");
      }
      return Promise.reject(error);
    }
  );
}
