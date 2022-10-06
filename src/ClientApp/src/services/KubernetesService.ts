import axios from "axios";
import KubernetesInfo from "../models/KubernetesInfo";
import Replicas from "../models/Replicas";

const BASE_URL = "";

export default {
  getInfo: async function (): Promise<KubernetesInfo> {
    var response = await axios.get<KubernetesInfo>(
      `${BASE_URL}/api/kubernetes/info`
    );
    return response.data;
  },
  getReplicas: async function (): Promise<Replicas> {
    var response = await axios.get<Replicas>(
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
