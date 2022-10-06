import axios from "axios";

const BASE_URL = "";

export default {
  getReadyZ: function (): Promise<number> {
    return axios
      .get(`${BASE_URL}/api/readyz`)
      .then((response) => response.status)
      .catch((error) => error.response.status);
  },

  getLiveZ: function (): Promise<number> {
    return axios
      .get(`${BASE_URL}/api/livez`)
      .then((response) => response.status)
      .catch((error) => error.response.status);
  },
};
