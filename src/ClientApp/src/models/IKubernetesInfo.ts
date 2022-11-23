import IPodInfo from "./IPodInfo";
import IReplicaStatus from "./IReplicaStatus";

export default interface IKubernetesInfo {
  podInfos?: IPodInfo[];
  replicaInfo?: IReplicaStatus;
}
