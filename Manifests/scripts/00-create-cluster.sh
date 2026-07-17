#!/usr/bin/env bash
# 00-create-cluster.sh — creates a kind cluster named "mern" with port 80/443 mapped
set -euo pipefail

CLUSTER_NAME="${CLUSTER_NAME:-mern}"
KIND_CONFIG="$(dirname "$0")/kind-config.yaml"

echo ">>> Creating kind cluster '${CLUSTER_NAME}'"
kind create cluster --name "${CLUSTER_NAME}" --config "${KIND_CONFIG}"

echo ">>> Waiting for nodes..."
kubectl wait --for=condition=Ready nodes --all --timeout=120s

echo ">>> Cluster ready. Nodes:"
kubectl get nodes -o wide
