import axios from "axios";

const apiManager = axios.create({
  baseURL: `https://${process.env.REACT_APP_AWS_TEST_BACKEND_SERVER}`,
});

apiManager.interceptors.request.use(
  (config) => {
    const localStorageToken = localStorage.getItem("accessToken");
    const jwtToken =
      localStorageToken === null ? "" : `Bearer ${localStorageToken}`;
    config.headers["authorization"] = jwtToken;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default apiManager;
