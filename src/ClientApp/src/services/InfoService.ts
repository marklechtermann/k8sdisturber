import axios from "axios";
import { IApplicationEnvironmentInfo } from "../models/IApplicationEnvironmentInfo";

const BASE_URL = "";

export default {
  getInfo: async function (): Promise<IApplicationEnvironmentInfo> {
    var response = await axios.get<IApplicationEnvironmentInfo>(
      `${BASE_URL}/api/info`
    );
    return response.data;
  },
};
