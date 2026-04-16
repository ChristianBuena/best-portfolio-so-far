
# Dual-Identity Portfolio Design

This repository contains Christian Buena's dual-identity portfolio project.

## Running the code

1. Install dependencies:

```bash
npm i
```

2. Create a local environment file:

```bash
cp .env.example .env
```

3. Fill in your SMTP credentials in `.env`.

4. Start frontend + SMTP backend together:

```bash
npm run dev
```

This starts:
- Vite frontend on `http://localhost:5173`
- SMTP backend API on `http://localhost:8787`

## SMTP API

- `POST /api/contact`
- Required JSON body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Your message"
}
```

The frontend contact form already uses this endpoint.
  # best-portfolio-so-far
