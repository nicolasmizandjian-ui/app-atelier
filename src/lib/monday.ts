export async function gql<T=any>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch('/api/gql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
