import axios from "axios";
import IKubernetesInfo from "../models/IKubernetesInfo";
import IReplicas from "../models/IReplicas";

const BASE_URL = "";

export default {
  getInfo: async function (): Promise<IKubernetesInfo> {
    var response = await axios.get<IKubernetesInfo>(
      `${BASE_URL}/api/kubernetes/info`
    );
    return response.data;
  },
  getReplicas: async function (): Promise<IReplicas> {
    var response = await axios.get<IReplicas>(
      `${BASE_URL}/api/kubernetes/deploymentscale`
    );
    return response.data;
  },
  setReplicas: async function (count: number) {
    var response = await axios.put(
      `${BASE_URL}/api/kubernetes/deploymentscale`,
      { replicas: count }
    );
    return response.data;
  },
};
