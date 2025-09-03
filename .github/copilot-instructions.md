# Copilot Instructions for habbit

## Project Overview

-   **Habbit** is a full-stack habit tracking app: React (frontend) + Django (backend).
-   **Frontend**: `/frontend` (React, TypeScript, Vite)
-   **Backend**: `/backend` (Django, REST API in `/backend/api`)
-   **Database**: SQLite (`backend/db.sqlite3`)

## Architecture & Data Flow

-   **Frontend** communicates with backend via REST endpoints defined in `backend/api/views.py` and `backend/api/urls.py`.
-   **Backend** models are in `backend/api/models.py`.
-   **Frontend** state and API calls are managed in `frontend/src/context/` and `frontend/src/api.ts`.
-   **Authentication**: Context-based in frontend (`AuthProvider.tsx`, `useAuth.ts`), likely token-based.

## Developer Workflows

-   **Frontend**:
    -   Install: `pnpm i` in `/frontend`
    -   Dev server: `pnpm run dev`
    -   Build: `pnpm run build` (required before PRs/commits)
-   **Backend**:
    -   Create venv: `python -m venv env`
    -   Activate: `source env/bin/activate`
    -   Install deps: `pip install -r requirements.txt`
    -   Migrations: `python manage.py makemigrations && python manage.py migrate`
    -   Run server: `python manage.py runserver`

## Conventions & Patterns

-   **Frontend**:
    -   Components in `src/components/`, pages in `src/pages/`, context in `src/context/`
    -   Use React context for auth and shared state
    -   API calls abstracted in `src/api.ts`
    -   Use Vite for builds/config (`vite.config.ts`)
    -   Use Heroicons for icons
-   **Backend**:
    -   Django REST API: serializers in `api/serializers.py`, views in `api/views.py`, URLs in `api/urls.py`
    -   Models in `api/models.py`, migrations in `api/migrations/`
    -   Use Django admin for management (`api/admin.py`)

## Integration Points

-   **Frontend <-> Backend**: All data flows through REST API endpoints
-   **Auth**: Managed in frontend context, backend likely expects tokens
-   **Build/Deploy**: Always build frontend before PRs/commits; backend uses Procfile for deployment

## Examples

-   To add a new habit model: update `api/models.py`, run migrations, update serializers/views/urls
-   To add a new frontend feature: create component in `src/components/`, update context/api as needed

## Key Files

-   `/frontend/src/api.ts` — API calls
-   `/frontend/src/context/AuthProvider.tsx` — Auth logic
-   `/backend/api/models.py` — Data models
-   `/backend/api/views.py` — API endpoints
-   `/backend/api/serializers.py` — Data serialization
-   `/backend/api/urls.py` — API routing

---

For unclear or missing conventions, ask for clarification before making assumptions.
