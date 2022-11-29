# :boom: K8s Disturber

[![CI](https://github.com/marklechtermann/k8sdisturber/actions/workflows/ci.yaml/badge.svg)](https://github.com/marklechtermann/k8sdisturber/actions/workflows/ci.yaml)

You know how it is, you want to explain Kubernetes to someone and you need an application to play with.  
K8sDisturber is such an application.

K8sDisturber is a simple application bases on .NET 7 and React.
It includes the following functions:

- Demonstration of health check with livez and readyz endpoints
- The behavior when memory and cpu limits are set
- Load test example for the load balancer
- Access to the environment variables
- Postresql database 
- PGAdmin support (UI for your database)
- Hostname, IP adresses, Instance name, UserId, ...

> **Never operate the K8sDisturber in a public cloud!**  
> Access to this application is not protected.  
> We use default passwords for everything, a lot of role * and other nasty stuff.  
> The operation of the K8sDisturber is for **demonstration purposes** only.
>
> I warned you :see_no_evil: :hear_no_evil: :speak_no_evil: ;-)

Deploy to Kubernetes: 

```bash
kubectl apply -f https://raw.githubusercontent.com/marklechtermann/k8sdisturber/master/kubernetes/k8sdisturber.yaml
```

Access **without** Ingress Controller:

```bash
kubectl port-forward service/k8sdisturber -n k8sdisturber 8080:8080
```
Got to this URL:  
**<http://localhost:8080/>**

Acces **with** a Ingress Controller: 

Got to this URL:  
**<http://disturber.127.0.0.1.nip.io/>**


## Database

If you want, then you can also use a database. On the route <http://pdadmin.127.0.0.1.nip.io/> you can see how your backend communicates with a database.  
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
sudo apt-get remove docker docker-engine docker.io containerd runc && \
sudo apt-get update && \
sudo apt-get install ca-certificates curl gnupg lsb-release && \
sudo mkdir -p /etc/apt/keyrings && \
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --yes --dearmor -o /etc/apt/keyrings/docker.gpg && \
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null  && \
sudo apt-get update && \
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin && \
sudo usermod -aG docker $USER && \
newgrp docker
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
kubectl get nodes
```

Enable the ingress controller addon:  

```bash
minikube addons enable ingress
```

Enable a tunnel to your local cluster:  

```bash
minikube tunnel
```

> Do not close this terminal as this process must stay alive for the tunnel to be accessible
> The command "minikube tunnel" asks the user for a password. Unfortunately this is not always displayed correctly by minikube.
> So please pay attention to the output of the following text "[sudo] password for user:".

## K9s

K9s is a terminal based UI to interact with your Kubernetes clusters. The aim of this project is to make it easier to navigate, observe and manage your deployed applications in the wild. K9s continually watches Kubernetes for changes and offers subsequent commands to interact with your observed resources.

<https://k9scli.io/>

```bash
mkdir k9s && \
curl -L -o k9s/k9s.tgz https://github.com/derailed/k9s/releases/download/$(curl  -s https://api.github.com/repos/derailed/k9s/releases/latest | grep tag_name | cut -d '"' -f 4)/k9s_Linux_x86_64.tar.gz && \
tar -xzf k9s/k9s.tgz -C k9s && \
sudo install k9s/k9s /usr/local/bin && \
rm -rf k9s
```

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
