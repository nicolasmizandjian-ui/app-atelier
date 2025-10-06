import React, { useState } from "react";
import { gql } from "../lib/monday";

const BOARD_ID = 7677892120;

export default function TestMonday() {
  const [loading, setLoading] = useState(false);
  const [cols, setCols] = useState<Array<{id:string; title:string; type:string}>>([]);
  const [err, setErr] = useState<string | null>(null);

  async function run() {
    setLoading(true); setErr(null);
    try {
      const data = await gql<{
        data: { boards: Array<{ id: string; name: string; columns: Array<{id:string; title:string; type:string}> }> }
      }>(`
        query($boardId: [ID!]!) {
          boards(ids: $boardId) { id name columns { id title type } }
        }
      `, { boardId: BOARD_ID });

      setCols(data?.data?.boards?.[0]?.columns || []);
    } catch (e:any) { setErr(e.message || "Erreur"); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 12 }}>
      <h3>Test API Monday (Board {BOARD_ID})</h3>
      <button onClick={run} disabled={loading} style={{ padding: "8px 12px", borderRadius: 8 }}>
        {loading ? "Chargement..." : "Lister les colonnes"}
      </button>
      {err && <p style={{ color: "crimson" }}>Erreur : {err}</p>}
      {cols.length > 0 && (
        <ul style={{ marginTop: 12 }}>
          {cols.map(c => (<li key={c.id}><code>{c.id}</code> — {c.title} <small>({c.type})</small></li>))}
        </ul>
      )}
    </div>
  );
}
