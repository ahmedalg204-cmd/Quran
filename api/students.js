export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, apikey, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const SUPABASE_URL = "https://lqhtharryzdanqfeqsa.supabase.co";
  const SUPABASE_KEY = "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdGh0aGFycnl6ZGFucWZlcXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NTczODUsImV4cCI6MjEwMjIzMzM4NX0.-eC4fiA2qTczriN8dvVVko-v_OfS5b0foKXCo-Yiyvw";

  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  try {
    if (req.method === 'GET') {
      const { phone } = req.query;
      let url = `${SUPABASE_URL}/rest/v1/students?select=*&order=id.desc`;
      if (phone) url = `${SUPABASE_URL}/rest/v1/students?phone=ilike.*${phone}*&select=*`;
      const response = await fetch(url, { headers });
      return res.status(200).json(await response.json());
    }

    if (req.method === 'POST') {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/students`, {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body)
      });
      return res.status(200).json(await response.json());
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await fetch(`${SUPABASE_URL}/rest/v1/students?id=eq.${id}`, { method: 'DELETE', headers });
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
