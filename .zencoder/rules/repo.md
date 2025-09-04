# Repo Overview

- Root: c:\Users\SHAKIT\Desktop\Work-Flow\AI\AI
- Backends:
  - workflow-backend: Express + Mongo + JWT auth
  - social-backend: Express + in-memory auth + social integrations
- Frontend:
  - work-flow: Vite + React app
- Entrypoint: server.js delegates to social-backend/server.js

# Notes
- Auth bypass can be toggled via env BYPASS_AUTH=true in both backends.
- Standard git flow: add/commit/push to main.