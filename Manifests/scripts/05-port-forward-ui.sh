#!/usr/bin/env bash
# 05-port-forward-ui.sh — quick way to hit the app via port-forward
# (alternative to using the ingress at http://localhost)
set -euo pipefail

echo ">>> Port-forwarding frontend on http://localhost:8080"
kubectl -n mern port-forward svc/frontend 8080:80
