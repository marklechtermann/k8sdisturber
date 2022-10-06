import axios from "axios";
import { ApplicationEnvironmentInfo } from "../models/ApplicationEnvironmentInfo";

const BASE_URL = "";

export default {
  getInfo: async function (): Promise<ApplicationEnvironmentInfo> {
    var response = await axios.get<ApplicationEnvironmentInfo>(
      `${BASE_URL}/api/info`
    );
    return response.data;
  },
};
