#!/usr/bin/env bash

POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-password}"

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

if ! command -v docker > /dev/null ; then
    echo "Error: docker not found!"
    exit 1
fi


if ! docker info &> /dev/null; then
    echo "Error: Is the docker daemon running?"
    exit 1
fi

echo "Starting postres server on port 5431"
echo "user: postgres"
echo "Password: ${POSTGRES_PASSWORD}"

docker run --name postgres --rm -v ${SCRIPT_DIR}/0_setup.sh:/docker-entrypoint-initdb.d/0_setup.sh -p 5432:5432 -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD -it postgres:14 