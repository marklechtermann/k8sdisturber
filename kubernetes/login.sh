#!/usr/bin/env bash

echo ""
echo "http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/."
echo ""

if [ $(command -v explorer.exe) ]; then
    explorer.exe http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/.
fi

echo "Access Token:"
echo "########################"
echo ""
kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/kubernetes-dashboard -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"
echo ""
echo ""
echo "########################"

kubectl proxy