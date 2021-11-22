# K8s Disturber

## Supported environment variables

**`READINESSDELAY`**  
Sets the `http://localhost/api/readyz` to `true` after a defined time (milliseconds).

**`LIVENESSSDELAY`**  
Sets the `http://localhost/api/livez` to `true` after a defined time (milliseconds).

## Kubernetes

### IngressController

You need an IngressController if you want to play with the examples.
This example uses `Docker Desktop`. If you want to use a different Kubernetes/Docker installation, you may need to modify the Ingress rules.

And this is how you can install an IngressController

```bash
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

<https://kubernetes.github.io/ingress-nginx/deploy/>

### Deploy to Kubernetes

```bash
kubectl create namespace k8sdisturber
kubectl apply -f workloads.yaml
```

## Foward postgres database port to local machine

```bash
kubectl port-forward pod/postgresql-0 -n k8sdisturber 5432:5432
```

Connect local

```bash
psql -h localhost -p 5432 -U postgres
```
