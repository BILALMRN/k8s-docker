#!/bin/bash


# docker run -d -p 5000:5000 --restart=always --name private-registry registry:2  // 

# Define the Docker registry URL
REGISTRY_URL=localhost:5001

docker-compose build 


# Iterate over the services in the Docker Compose file
for service in "ms-iamlive" "ms-admins" "ms-products" "ms-stocks" "ms-users" "ms-orders"; do
    # you need deja build image
    # Build the Docker image for the service/container
    # docker-compose build $service

    # # Tag the image with the registry URL
    docker tag ${service} ${REGISTRY_URL}/${service}:latest

    # Push the image to the registry
    docker push ${REGISTRY_URL}/${service}:latest
done

#docker tag postgres:16.0-alpine3.18 localhost:5001/postgres:16.0-alpine3.18
docker push localhost:5001/postgres:16.0-alpine3.18


#docker tag mongo localhost:5001/mongo
docker push localhost:5001/mongo

# hostname -f

#https://www.digitalocean.com/community/tutorials/how-to-forward-ports-through-a-linux-gateway-with-iptables
