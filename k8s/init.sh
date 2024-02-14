#!/bin/bash


# Create a kind cluster
  ./buildCluster.sh

  # Display cluster information
  kubectl cluster-info

# Wait for the nodes to be ready
  kubectl wait --for=condition=ready node --all --timeout=300s

#---------------- loadbalancer/metallb-native -------------

  # kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.13.7/config/manifests/metallb-native.yaml

  kubectl apply -f ./loadbalancer/metallb-native.yaml

  kubectl wait --namespace metallb-system \
                --for=condition=ready pod \
                --selector=app=metallb \
                --timeout=120s

  docker network inspect -f '{{.IPAM.Config}}' kind

  # kubectl apply -f https://kind.sigs.k8s.io/examples/loadbalancer/metallb-config.yaml
  kubectl apply -f ./loadbalancer/metallb-config.yaml

#-------------------------------------------------------------

# Deploy ingress-nginx
  kubectl apply -f ./ingress-nginx/deploy.yaml

  kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s

  #afichage the services
  kubectl --namespace default get services -o wide 

# Build privateRegistry
  ./privateRegistry/build.sh

# Create kubernetes namespace ecommerce:
 kubectl apply -f ./namespace.yaml

# Create kubernetes deployment DB from file: 
 kubectl apply -f ./DB/

# Create kubernetes deployment and service from file: 
 kubectl apply -f ./theApp/

# Exposing the App Using an Ingress base sur create object angress
  kubectl apply -f ./ingress-nginx/ingress.yaml



