import PodInfo from "./PodInfo";
import ReplicaStatus from "./ReplicaStatus";

export default interface KubernetesInfo {
  podInfos?: PodInfo[];
  replicaInfo?: ReplicaStatus;
}
