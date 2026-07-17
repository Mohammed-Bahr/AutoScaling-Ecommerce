#!/usr/bin/env bash
# 01-install-storage.sh — installs local-path-provisioner (default kind StorageClass)
set -euo pipefail

echo ">>> Applying local-path-provisioner (rancher/local-path-provisioner)"
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/v0.0.30/deploy/local-path-provisioner.yaml

echo ">>> Marking local-path as default StorageClass"
kubectl patch storageclass local-path \
  -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'

echo ">>> Storage classes:"
kubectl get storageclass
