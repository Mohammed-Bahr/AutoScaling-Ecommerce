# MERN Stack on Kubernetes (kind + Argo CD)

Production-ready K8s manifests for your MERN e-commerce project, designed to work
end-to-end on a local **kind** cluster and to be deployed via **Argo CD** (GitOps).

## Layout

```
Manifests/
├── base/                        # plain Kustomize base (every manifest lives here)
│   ├── 00-namespace.yaml
│   ├── 10-mongo-secret.yaml
│   ├── 11-mongo-pvc.yaml
│   ├── 12-mongo-statefulset.yaml   # MongoDB pod + headless Svc + client ClusterIP
│   ├── 13-mongo-init-configmap.yaml
│   ├── 20-backend-secret.yaml
│   ├── 21-backend-deployment.yaml
│   ├── 30-frontend-configmap.yaml
│   ├── 31-frontend-deployment.yaml
│   ├── 40-ingress.yaml
│   └── kustomization.yaml
├── overlays/
│   └── dev/                     # patches secrets + scales down replicas
│       └── kustomization.yaml
├── argocd/
│   └── application.yaml         # Argo CD Application pointing at overlays/dev
└── scripts/
    ├── kind-config.yaml
    ├── 00-create-cluster.sh
    ├── 01-install-storage.sh
    ├── 02-install-ingress.sh
    ├── 03-install-argocd.sh
    ├── 04-build-and-load-images.sh
    └── 05-port-forward-ui.sh
```

## One-time setup (on your dev machine)

Prereqs: `docker`, `kind`, `kubectl`, `helm` (optional), `argocd` CLI (optional).

```bash
# 1. Create the cluster with port 80/443 mapped to the host
./Manifests/scripts/00-create-cluster.sh

# 2. Install local-path-provisioner (gives kind a real StorageClass)
./Manifests/scripts/01-install-storage.sh

# 3. Install ingress-nginx (kind-optimized manifest)
./Manifests/scripts/02-install-ingress.sh

# 4. Install Argo CD and the Application
./Manifests/scripts/03-install-argocd.sh

# 5. Build the two images and load them into the kind cluster
./Manifests/scripts/04-build-and-load-images.sh
```

After step 5, Argo CD will see the manifests in this repo and sync them.
Give it ~30s and check:

```bash
kubectl -n mern get pods
kubectl -n mern get svc
kubectl -n mern get ingress
```

## Hitting the app

The ingress is configured with **no host** (so `http://localhost` works directly on kind):

- `http://localhost/`        → frontend (React SPA)
- `http://localhost/api/*`   → backend (Express, port 5000)

If port 80 is busy on your host, use port-forward instead:

```bash
./Manifests/scripts/05-port-forward-ui.sh
# then open http://localhost:8080
```

## Argo CD UI

```bash
kubectl port-forward -n argocd svc/argocd-server 8080:443
# open https://localhost:8080
# user: admin
# password:
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath='{.data.password}' | base64 -d
```

## Architecture decisions (the "why")

### MongoDB
- **StatefulSet** (not Deployment) so the data volume gets a stable identity and
  ordered rollout if you scale to a replica set later.
- **Headless Service** (`mongodb`) for the StatefulSet's stable DNS:
  `mongodb-0.mongodb.mern.svc.cluster.local`.
- **ClusterIP Service** (`mongodb-client`) for normal client connections from
  the backend — easier to point a connection string at one stable DNS name.
- **initContainer** fixes `/data/db` ownership to UID 999 (the `mongo` image's
  built-in user). The official `mongo` image runs as non-root, and an emptyDir
  on a fresh node is owned by root.
- **Init script** (ConfigMap mounted at `/docker-entrypoint-initdb.d`) creates
  the `appuser` on the `depi-project` database the first time the data
  directory is empty. Subsequent restarts are a no-op because the entrypoint
  script only runs init scripts when the DB is uninitialized.
- **PVC** uses `storageClassName: local-path` (installed by
  `01-install-storage.sh`). Don't omit this — kind has no default
  StorageClass out of the box and your pod will be stuck in `Pending`.

### Backend
- `MONGO_URI` is overridden via Secret to point at the in-cluster service
  (`mongodb-client:27017`). Your old `.env` value (`localhost:27017`) won't
  resolve inside a pod.
- `initContainer` waits for Mongo TCP before the app starts (avoids crash-loops
  that pollute Argo CD's sync history).
- `imagePullPolicy: IfNotPresent` so it can use images loaded by
  `kind load docker-image` (they're not on a registry).

### Frontend
- The Dockerfile you already have builds Vite and serves the static `dist/` via
  nginx with an SPA-friendly `nginx.conf` (already handles history-mode
  routing). Nothing to change there.
- We expose the API as `/api/*` via the ingress rewrite — your React code can
  call relative URLs and the browser hits the same origin. For Vite builds, set
  `VITE_API_BASE_URL=/api` at build time (the ConfigMap documents this).

### Ingress
- `ingressClassName: nginx` matches the kind-optimized ingress-nginx manifest.
- Path `/api(/|$)(.*)` with `rewrite-target: /$2` strips the `/api` prefix so
  the backend sees `/products`, `/login`, etc. as it did in dev.
- The no-host rule means `http://localhost` works directly, which is how kind
  routes traffic when you map container port 80 → host port 80.

### Argo CD
- `automated.prune + selfHeal = true` so drift is auto-corrected.
- `ServerSideApply=true` is recommended for Argo CD >= 2.10 to avoid
  field-manager conflicts when you also `kubectl apply` for debugging.
- One Application pointing at `Manifests/overlays/dev` — easiest mental model. Once
  it works, copy `overlays/dev` → `overlays/prod` and add a second
  Application.

## Connecting to MongoDB locally

```bash
kubectl -n mern port-forward svc/mongodb-client 27017:27017
# then in another terminal:
mongosh "mongodb://appuser:devapppw@localhost:27017/depi-project?authSource=depi-project"
```

## Customizing

- **Different image names**: edit `mern-backend:1.0.0` / `mern-frontend:1.0.0`
  in `21-backend-deployment.yaml` and `31-frontend-deployment.yaml`.
- **Replicas**: edit `overlays/dev/kustomization.yaml` patches.
- **Real prod secrets**: replace the Secret manifests with Sealed Secrets /
  External Secrets / SOPS — never commit real passwords.
- **TLS**: front the ingress with cert-manager and switch the cluster to use a
  Host like `mern.example.com` instead of no-host.

## Cleaning up

```bash
kind delete cluster --name mern
```
