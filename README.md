# :boom: K8s Disturber

[![CI](https://github.com/marklechtermann/k8sdisturber/actions/workflows/ci.yaml/badge.svg)](https://github.com/marklechtermann/k8sdisturber/actions/workflows/ci.yaml)
[![CodeQL](https://github.com/marklechtermann/k8sdisturber/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/marklechtermann/k8sdisturber/actions/workflows/codeql-analysis.yml)

You know how it is, you want to explain Kubernetes to someone and you need an application to play with.  
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

## Deploy to Kubernetes

```bash
kubectl apply -f https://raw.githubusercontent.com/marklechtermann/k8sdisturber/master/kubernetes/k8sdisturber.yaml
```

Access without an ingress controller:  

```bash
kubectl port-forward service/k8sdisturber -n k8sdisturber 8080:8080
```

Now you a ready to rock :metal: :  

**<http://localhost:8080/>**

## K8sDisturber with Ingress Controller

**<http://disturber.127.0.0.1.nip.io/>**

If you don't have an ingress controller, read the documentation carefully wire everything up.  

> In this example `helm` is used to install the ingress controller  
> `curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash`  
> Further information: <https://helm.sh/docs/intro/install/>

You need an ingress controller if you want to play with this example.
This example uses `Docker Desktop`. If you want to use a different Kubernetes/Docker installation, you may need to modify the Ingress rules.

And this is how you can install an ingress controller:

```bash
helm upgrade --install ingress-nginx ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --repo https://kubernetes.github.io/ingress-nginx 
```

Further information: <https://kubernetes.github.io/ingress-nginx/deploy/>

## Database

If you want, then you can also use a database. On the route <http://localhost/database> you can see how your backend communicates with a database.  
For this, you need to load another Kubernetes manifest into your cluster.

```bash
kubectl apply -f https://raw.githubusercontent.com/marklechtermann/k8sdisturber/master/kubernetes/database.yaml
```

You can access the PGAdmin4 if your want:  

**<http://pdadmin.127.0.0.1.nip.io/>**

User: admin@example.org  
Pass: password  

## Kubernetes Dashboard

You can install a Kubernetes dashboard if you want:  

```bash
kubectl apply -f https://raw.githubusercontent.com/marklechtermann/k8sdisturber/master/kubernetes/dashboard.yaml
curl -s https://raw.githubusercontent.com/marklechtermann/k8sdisturber/master/kubernetes/login.sh | sh
```

## Kubernetes and WSL2
An easy way to install K8s is the WSL2.  

<https://docs.microsoft.com/en-us/windows/wsl/install>

If you have Ubuntu installed, then you can very easily install Docker in minikube.  

```bash
sudo apt update
sudo apt install docker
```

The WSL did not start Docker automatically.  

```bash
sudo service docker start
```

Check if Docker is running:  

```bash
docker run hello-world
```

Now you can install minikube:  

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

```bash 
kubectl get pods -A
```

Enable the ingress controller addon:  

```bash
minikube addons enable ingress
```

Enable a tunnel to your local cluster:  

```bash
minikube tunnel
```

> The command "minikube tunnel" asks the user for a password. Unfortunately this is not always displayed correctly by minikube.
> So please pay attention to the output of the following text "[sudo] password for <user>:".


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
Default: password

## For Developer

Here you can find information for developers.

## Start a local postgres database

```bash
scripts/start-local-database.sh
```

## Foward postgres database port to your local machine

If you run the postgresql database in Kubernetes, you can forward the ports to localhost.

```bash
kubectl port-forward pod/postgresql-0 -n k8sdisturber 5432:5432
```

Connect to the database from your local machine with the psql client:

```bash
psql -h localhost -p 5432 -U postgres
```
