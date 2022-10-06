using System.Collections;
using System.Linq;
using System.Net;
using k8s;
using k8s.Models;
using k8sdisturber.Models;

namespace k8sdisturber.Services
{
    public class KubernetesService
    {
        public KubernetesService()
        {
            var envPodNamespace = Environment.GetEnvironmentVariable("KUBERNETES_NAMESPACE");
            K8sDisturberNamespace = string.IsNullOrEmpty(envPodNamespace) ? "k8sdisturber" : envPodNamespace;

            KubernetesClientConfiguration config;
            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("KUBERNETES_SERVICE_HOST")))
            {
                config = KubernetesClientConfiguration.InClusterConfig();
            }
            else
            {
                config = KubernetesClientConfiguration.BuildConfigFromConfigFile();
            }

            Client = new Kubernetes(config);
        }

        public Kubernetes? Client { get; }

        public string K8sDisturberNamespace { get; }

        public KubernetesInfo GetInfo()
        {
            var info = new KubernetesInfo();
            if (Client != null)
            {
                info.PodInfos.AddRange(Client.CoreV1.ListNamespacedPod(K8sDisturberNamespace).Items.Select(pod =>
                {
                    return new PodInfo()
                    {
                        Name = pod.Metadata.Name,
                        Ip = pod.Status.PodIP,
                        Phase = pod.Status.Phase,
                        StartTime = pod.Status.StartTime
                    };
                }
                ));

                var ggg = Client.ReadNamespacedDeploymentScale("k8sdisturber", K8sDisturberNamespace);

                var replicaSet = Client.ListNamespacedReplicaSet(K8sDisturberNamespace).Items.FirstOrDefault(i => i.Metadata.Labels.Contains(new("app", "k8sdisturber")));
                if (replicaSet != null)
                {
                    info.ReplicaStatus.AvailableReplicas = replicaSet.Status.AvailableReplicas;
                    info.ReplicaStatus.ReadyReplicas = replicaSet.Status.ReadyReplicas;
                    info.ReplicaStatus.Replicas = replicaSet.Status.Replicas;
                }
            }

            return info;
        }

        public DeploymentScale GetDeploymentScale()
        {
            var deploymentScale = new DeploymentScale();
            if (Client != null)
            {
                var scale = Client.ReadNamespacedDeploymentScale("k8sdisturber", K8sDisturberNamespace);
                deploymentScale.Replicas = scale.Spec.Replicas ?? -1;
            }

            return deploymentScale;
        }

        public DeploymentScale SetDeploymentScale(DeploymentScale deploymentScale)
        {
            if (Client != null && deploymentScale.Replicas >= 0 && deploymentScale.Replicas < 20)
            {
                var scale = Client.ReadNamespacedDeploymentScale("k8sdisturber", K8sDisturberNamespace);
                scale.Spec.Replicas = deploymentScale.Replicas;
                Client.ReplaceNamespacedDeploymentScale(scale, "k8sdisturber", K8sDisturberNamespace);
            }

            return GetDeploymentScale();
        }
    }
}