# Supabase setup

Project URL:

```txt
https://jiqexosvdftmzedasnlf.supabase.co
```

## Required environment variables

The application uses Supabase as a Postgres database through Drizzle. Set these
variables in Vercel and in `.env.local` for local development:

```env
POSTGRES_URL="postgresql://postgres:[DB_PASSWORD]@db.jiqexosvdftmzedasnlf.supabase.co:5432/postgres?sslmode=require"
NEXT_PUBLIC_SUPABASE_URL="https://jiqexosvdftmzedasnlf.supabase.co"
OPENROUTER_API_KEY="..."
FAPSHI_API_USER="..."
FAPSHI_API_KEY="..."
FAPSHI_ENV="live"
```

Use the exact connection string from Supabase Dashboard -> Database -> Connect.
If Supabase recommends the transaction pooler for production, use that URL as
`POSTGRES_URL` instead.

## Apply database migrations

After `POSTGRES_URL` is configured:

```bash
corepack pnpm db:migrate
```

The same SQL migrations are also mirrored in this folder:

- `supabase/migrations/20260709153600_user_plan_and_credits.sql`
- `supabase/migrations/20260709154000_ai_usage_telemetry.sql`

You can run them manually in Supabase SQL Editor if needed.

## Security note

Never paste Supabase personal access tokens or service-role keys into chat,
commits, screenshots, or client-side environment variables. If a token was
shared publicly, revoke it and create a new one before deploying.
