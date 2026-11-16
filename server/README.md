# Proton LabHub API

1. Create a PostgreSQL database named `proton_labhub`.
2. Run `psql -d proton_labhub -f schema.sql` from this directory to create and seed the illustrative `projects` table.
3. Copy `.env.example` to `.env` and supply valid PostgreSQL credentials (or a `DATABASE_URL`).
4. Run `npm install` and then `npm run dev`.

The API runs on port 5000 by default. The Vite client expects it at `http://localhost:5000/api`; override this with `VITE_API_URL` if needed.
