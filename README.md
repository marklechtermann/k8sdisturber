# :boom: K8s Disturber

[![CI](https://github.com/marklechtermann/k8sdisturber/actions/workflows/ci.yaml/badge.svg)](https://github.com/marklechtermann/k8sdisturber/actions/workflows/ci.yaml)

You know how it is, you want to explain Kubernetes to someone and you need an application to play with?  
K8sDisturber is such an application.

K8sDisturber is a simple application bases on .NET 6 and React.
It includes the following functions:

- Demonstration of health check with livez and readyz endpoints
- The behavior when limits are set
- Access to the environment variables
- Hostname, IP adresses, Instance name, UserId, ...
- Database (postgresql) access (see the K8s YAML file for futher information)
- PGAdmin support (see the K8s YAML file for futher information)

> **Never operate the K8sDisturber in a public cloud!**  
> Access to this application is not protected.  
> The operation of the K8sDisturber is for demonstration purposes only.
>
> I warned you :see_no_evil: :hear_no_evil: :speak_no_evil: ;-)

## Start

### Ingress Controller

> In this example `helm` is used to install the ingress controller
> `https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash`  
> Further information: <https://helm.sh/docs/intro/install/>

You need an ingress controller if you want to play with the examples.
This example uses `Docker Desktop`. If you want to use a different Kubernetes/Docker installation, you may need to modify the Ingress rules.

And this is how you can install an ingress controller:

```bash
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

If you use the **K3s** in the **WSL**, then you may not be able to reach <http://localhost>.  
In this case, you can install the ingress controller like this. That should help.

```bash
helm install -n ingress ingress-nginx ingress-nginx/ingress-nginx --set controller.hostNetwork=true,controller.extraArgs.report-node-internal-ip-address=true,controller.service.type="",controller.kind=DaemonSet
```

Further information: <https://kubernetes.github.io/ingress-nginx/deploy/>

### Deploy to Kubernetes

```bash
cd kubernetes
kubectl create namespace k8sdisturber
kubectl apply -f k8sdisturber.yaml
```

Now you a ready to rock :metal: :  
<http://localhost>

If you want to get access to a database you can use the follwing command:

```bash
kubectl apply -f database.yaml
```

You can access the PGAdmin4 if yout want:  
<http://pgadmin.localhost>

## Supported environment variables

**`READINESSDELAY`**  
Sets the `http://localhost/api/readyz` to `true` after a defined time (milliseconds).
Default: 0

**`LIVENESSSDELAY`**  
Sets the `http://localhost/api/livez` to `true` after a defined time (milliseconds).  
Default: 0

**`DBHOSTNAME`**
The postgresql database hostname.  
Default: postgresql

**`DBUSER`**  
The postgresql database user.  
Default: postgres

**`DBNAME`**  
The postgresql database name.  
Default: k8sdisturber

**`DBPASSWORD`**  
The postgresql database name password.  
Default: mypassword

## For Developer

Here you can find information for developers

### Foward postgres database port to your local machine

If you run the postgresql database in Kubernetes, you can forward the ports to localhost.

```bash
kubectl port-forward pod/postgresql-0 -n k8sdisturber 5432:5432
```

Connect local

```bash
psql -h localhost -p 5432 -U postgres
```
