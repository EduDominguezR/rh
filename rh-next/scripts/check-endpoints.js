// Quick endpoint checker — run while dev server is running (localhost:3000)
const endpoints = [
  '/trabajadores/api',
  '/plazas/api',
  '/autoridades/api',
  '/compatibilidad/api',
];

async function check() {
  const base = process.env.BASE_URL || 'http://localhost:3000';
  for (const path of endpoints) {
    const url = base + path;
    try {
      const res = await fetch(url);
      console.log(path, res.status, res.headers.get('content-type'));
      try { const json = await res.json(); console.log('  ok json keys:', Object.keys(json || {})); } catch (e) { console.log('  no json'); }
    } catch (err) {
      console.error(path, 'ERROR', err.message || err);
    }
  }
}

check();
