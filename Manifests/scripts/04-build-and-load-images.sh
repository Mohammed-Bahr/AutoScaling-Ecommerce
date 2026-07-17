#!/usr/bin/env bash
# 04-build-and-load-images.sh — builds the two Docker images and loads them into kind.
#
# Assumes repo layout:
#   ./         (root, has package.json with backend/frontend subfolders)
#   ./backend/ (has its own package.json + Dockerfile; entrypoint index.js)
#   ./frontend/(has its own package.json + Dockerfile; builds to dist/, served by nginx)
#
# Adjust IMAGE_TAG / paths if your layout differs.
set -euo pipefail

CLUSTER_NAME="${CLUSTER_NAME:-mern}"
BACKEND_TAG="${BACKEND_TAG:-mern-backend:1.0.0}"
FRONTEND_TAG="${FRONTEND_TAG:-mern-frontend:1.0.0}"

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

echo ">>> Building backend -> ${BACKEND_TAG}"
docker build -t "${BACKEND_TAG}" -f "${REPO_ROOT}/backend/Dockerfile" "${REPO_ROOT}/backend"

echo ">>> Building frontend -> ${FRONTEND_TAG}"
docker build -t "${FRONTEND_TAG}" -f "${REPO_ROOT}/frontend/Dockerfile" "${REPO_ROOT}/frontend"

echo ">>> Loading images into kind cluster '${CLUSTER_NAME}'"
kind load docker-image "${BACKEND_TAG}" --name "${CLUSTER_NAME}"
kind load docker-image "${FRONTEND_TAG}" --name "${CLUSTER_NAME}"

echo ">>> Done. Images now available cluster-side."
