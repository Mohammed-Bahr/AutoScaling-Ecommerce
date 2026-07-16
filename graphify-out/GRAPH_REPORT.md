# Graph Report - .  (2026-07-16)

## Corpus Check
- 99 files · ~17,284 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 261 nodes · 458 edges · 21 communities (17 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Route Guards & Navigation|Route Guards & Navigation]]
- [[_COMMUNITY_Cart & Checkout|Cart & Checkout]]
- [[_COMMUNITY_Favorites System|Favorites System]]
- [[_COMMUNITY_Home & Product Discovery|Home & Product Discovery]]
- [[_COMMUNITY_Shop & Filters|Shop & Filters]]
- [[_COMMUNITY_User Auth Pages|User Auth Pages]]
- [[_COMMUNITY_RTK Query API Layer|RTK Query API Layer]]
- [[_COMMUNITY_Backend Server Setup|Backend Server Setup]]
- [[_COMMUNITY_Seed & Data Models|Seed & Data Models]]
- [[_COMMUNITY_Backend CRUD Controllers|Backend CRUD Controllers]]
- [[_COMMUNITY_Order Processing|Order Processing]]
- [[_COMMUNITY_User Management (Auth)|User Management (Auth)]]
- [[_COMMUNITY_Full Stack Architecture|Full Stack Architecture]]
- [[_COMMUNITY_Frontend State & Routing|Frontend State & Routing]]

## God Nodes (most connected - your core abstractions)
1. `React Router Routes` - 22 edges
2. `authSlice (user session)` - 10 edges
3. `Backend Express Server` - 10 edges
4. `userApiSlice` - 8 edges
5. `orderApiSlice` - 8 edges
6. `Redux Store` - 7 edges
7. `productApiSlice` - 7 edges
8. `apiSlice` - 6 edges
9. `cartSlice` - 6 edges
10. `categoryApiSlice` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Backend Express Server` --references--> `NGINX Ingress`  [INFERRED]
  backend/index.js → k8s/master-ecommerce/charts/my-frontend/templates/ingress.yaml
- `Backend Express Server` --references--> `Prometheus + Grafana`  [INFERRED]
  backend/index.js → k8s/monitoring-values.yaml
- `Frontend App (React SPA)` --references--> `docker-compose Stack`  [INFERRED]
  frontend/src/main.jsx → docker-compose.yaml
- `Frontend App (React SPA)` --references--> `Frontend Helm Chart`  [INFERRED]
  frontend/src/main.jsx → k8s/master-ecommerce/charts/my-frontend/Chart.yaml
- `Backend Express Server` --references--> `docker-compose Stack`  [INFERRED]
  backend/index.js → docker-compose.yaml

## Communities (21 total, 4 thin omitted)

### Community 9 - "Cart & Checkout"
Cohesion: 0.18
Nodes (3): addDecimals(), updateCart(), cartSlice

### Community 6 - "Favorites System"
Cohesion: 0.2
Nodes (5): addFavoriteToLocalStorage(), removeFavoriteFromLocalStorage(), getFavoritesFromLocalStorage(), favoriteSlice, selectFavoriteProduct()

### Community 10 - "RTK Query API Layer"
Cohesion: 0.27
Nodes (6): store, baseQuery, apiSlice, categoryApiSlice, orderApiSlice, userApiSlice

### Community 11 - "Backend Server Setup"
Cohesion: 0.17
Nodes (7): app, __filename, __dirname, router, storage, upload, uploadSingleImage

### Community 5 - "Seed & Data Models"
Cohesion: 0.12
Nodes (11): __filename, __dirname, PRODUCTS_FILE, categories, users, categorySchema, reviewSchema, productSchema (+3 more)

### Community 1 - "Backend CRUD Controllers"
Cohesion: 0.13
Nodes (19): createCategory, updateCategory, removeCategory, listCategory, readCategory, addProduct, updateProductDetails, removeProduct (+11 more)

### Community 4 - "Order Processing"
Cohesion: 0.21
Nodes (13): calcPrices(), createOrder(), getAllOrders(), getUserOrders(), countTotalOrders(), calculateTotalSales(), calcualteTotalSalesByDate(), findOrderById() (+5 more)

### Community 8 - "User Management (Auth)"
Cohesion: 0.24
Nodes (10): createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById (+2 more)

### Community 2 - "Full Stack Architecture"
Cohesion: 0.16
Nodes (22): Frontend App (React SPA), Backend Express Server, userController, orderController, User Model, Product Model, Order Model, Category Model (+14 more)

### Community 0 - "Frontend State & Routing"
Cohesion: 0.11
Nodes (38): React Router Routes, Redux Store, RTK Query apiSlice, authSlice (user session), cartSlice, favoriteSlice, shopSlice (filters), productApiSlice (+30 more)

## Knowledge Gaps
- **38 isolated node(s):** `router`, `store`, `baseQuery`, `categoryApiSlice`, `orderApiSlice` (+33 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `React Router Routes` connect `Frontend State & Routing` to `Full Stack Architecture`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `Backend Express Server` connect `Full Stack Architecture` to `Frontend State & Routing`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `Frontend App (React SPA)` connect `Full Stack Architecture` to `Frontend State & Routing`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `Backend Express Server` (e.g. with `docker-compose Stack` and `Backend Helm Chart`) actually correct?**
  _`Backend Express Server` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `orderApiSlice` (e.g. with `orderController` and `PayPal SDK (@paypal/react-paypal-js)`) actually correct?**
  _`orderApiSlice` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `router`, `store`, `baseQuery` to the rest of the system?**
  _38 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Route Guards & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._