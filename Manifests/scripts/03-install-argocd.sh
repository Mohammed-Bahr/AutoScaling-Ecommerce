#!/usr/bin/env bash
# 03-install-argocd.sh — installs Argo CD (core, no HA) and the Application for our stack
set -euo pipefail

ARGOCD_VERSION="${ARGOCD_VERSION:-v2.13.1}"

echo ">>> Creating argocd namespace + installing Argo CD ${ARGOCD_VERSION}"
kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
kubectl apply -n argocd -f "https://raw.githubusercontent.com/argoproj/argo-cd/${ARGOCD_VERSION}/manifests/install.yaml"

echo ">>> Waiting for argocd-server to be Ready"
kubectl -n argocd wait --for=condition=Available deploy/argocd-server --timeout=300s

echo ">>> Patching argocd-server to NodePort for easy access (kind)"
kubectl -n argocd patch svc argocd-server -p '{"spec":{"type":"NodePort"}}' || true

echo ">>> Applying the MERN Application"
kubectl apply -f "$(dirname "$0")/../argocd/application.yaml"

echo
echo ">>> Done. To reach Argo CD UI:"
echo "    kubectl port-forward -n argocd svc/argocd-server 8080:443"
echo "    user: admin"
echo "    password: kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath='{.data.password}' | base64 -d"
