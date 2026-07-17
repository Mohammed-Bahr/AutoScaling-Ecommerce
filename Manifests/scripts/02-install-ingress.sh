#!/usr/bin/env bash
# 02-install-ingress.sh — installs ingress-nginx, pinned for kind
set -euo pipefail

INGRESS_NGINX_VERSION="${INGRESS_NGINX_VERSION:-v1.11.2}"

echo ">>> Installing ingress-nginx ${INGRESS_NGINX_VERSION} (kind-optimized)"
kubectl apply -f "https://raw.githubusercontent.com/kubernetes/ingress-nginx/${INGRESS_NGINX_VERSION}/deploy/static/provider/kind/deploy.yaml"

echo ">>> Waiting for ingress-nginx controller to be Ready"
kubectl -n ingress-nginx wait --for=condition=Ready pod \
  -l app.kubernetes.io/component=controller --timeout=180s

echo ">>> Ingress-nginx ready."
kubectl -n ingress-nginx get svc ingress-nginx-controller
