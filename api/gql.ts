// api/gql.ts  (Serverless Function - Node runtime)
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST is allowed' });
    return;
  }

  const token = process.env.MONDAY_TOKEN;
  if (!token) {
    res.status(500).json({ error: 'Missing MONDAY_TOKEN env var' });
    return;
  }

  const { query, variables } = (req.body ?? {}) as { query?: string; variables?: any };
  if (!query) {
    res.status(400).json({ error: "Missing GraphQL 'query'" });
    return;
  }

  const r = await fetch('https://api.monday.com/v2', {
    method: 'POST',
    headers: {
      Authorization: token,              // pas de "Bearer"
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  });

  const data = await r.json();
  res.status(r.ok ? 200 : 500).json(data);
}
