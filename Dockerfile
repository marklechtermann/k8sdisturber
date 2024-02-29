FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

LABEL org.opencontainers.image.source=https://github.com/marklechtermann/k8sdisturber

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm 

WORKDIR /source

COPY src .

RUN dotnet publish -c release -o /app 

FROM mcr.microsoft.com/dotnet/aspnet:8.0

ARG K8SVERSION=local

WORKDIR /app

RUN apt update && \
    apt install -y htop curl net-tools vim &&\
    curl -L -o /usr/local/bin/kubectl "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    chmod +x /usr/local/bin/kubectl

RUN apt update && \
    apt-get clean

COPY --from=build /app .

ENV ASPNETCORE_URLS=http://+:8080
ENV K8SVERSION=${K8SVERSION}

USER 1000

ENTRYPOINT ["dotnet", "k8sdisturber.dll"]
