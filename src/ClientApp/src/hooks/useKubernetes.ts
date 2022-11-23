import IKubernetesInfo from "../models/IKubernetesInfo";

export default function useKubernetes(): {
  data?: IKubernetesInfo;
  updateReplica?: (count: number) => void;
} {
  return {};
}
