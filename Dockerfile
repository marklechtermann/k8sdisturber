FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs 

WORKDIR /source

COPY src .

RUN dotnet publish -c release -o /app 


FROM mcr.microsoft.com/dotnet/aspnet:6.0

ARG K8SVERSION=local

WORKDIR /app

RUN apt update && \
    apt install -y htop curl net-tools vim &&\
    apt-get clean

COPY --from=build /app .

ENV ASPNETCORE_URLS=http://+:8080
ENV K8SVERSION=${K8SVERSION}

USER 1000

ENTRYPOINT ["dotnet", "k8sdisturber.dll"]