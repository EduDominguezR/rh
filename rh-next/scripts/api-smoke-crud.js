const base = process.env.BASE_URL || 'http://localhost:3000';

async function request(path, opts) {
  const url = base + path;
  const res = await fetch(url, opts);
  const json = await res.json().catch(() => null);
  return { status: res.status, json };
}

async function trabajadores() {
  console.log('\n-- Trabajadores --');
  const payload = { nombre: 'API-Juan', apellidoPaterno: 'AP', apellidoMaterno: 'AM', rfc: 'API-RFC-' + Date.now() };
  let r = await request('/trabajadores/api', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  console.log('POST', r.status, r.json);
  const rget = await request('/trabajadores/api');
  console.log('GET', rget.status, Array.isArray(rget.json?.data) ? rget.json.data.slice(0,3) : rget.json);
  // delete by id if returned
  if (r.json?.insertId) {
    const del = await request('/trabajadores/api', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: r.json.insertId }) });
    console.log('DELETE', del.status, del.json);
  }
  return r.json;
}

async function plazas() {
  console.log('\n-- Plazas --');
  const payload = { cdTrabajo: 'API-CD-' + Date.now(), clavePresupuestal: 'API-KP', categoria: 'Cat', descripcion: 'Desc', salario: '1000' };
  let r = await request('/plazas/api', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  console.log('POST', r.status, r.json);
  const rget = await request('/plazas/api');
  console.log('GET', rget.status, Array.isArray(rget.json?.data) ? rget.json.data.slice(0,3) : rget.json);
  if (r.json?.insertId) {
    const del = await request('/plazas/api', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: r.json.insertId }) });
    console.log('DELETE', del.status, del.json);
  }
  return r.json;
}

async function autoridades() {
  console.log('\n-- Autoridades --');
  const key = 'API-AUT-' + Date.now();
  const payload = { autoridad1: key, nombre: 'Nombre API', puesto: 'Puesto', plantel1: 'Plantel' };
  let r = await request('/autoridades/api', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  console.log('POST', r.status, r.json);
  const rget = await request('/autoridades/api');
  console.log('GET', rget.status, Array.isArray(rget.json?.data) ? rget.json.data.slice(0,3) : rget.json);
  // delete by autoridad_1 key
  const del = await request('/autoridades/api', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: key }) });
  console.log('DELETE', del.status, del.json);
  return { key, res: r.json };
}

async function compatibilidad(trabajadorId) {
  console.log('\n-- Compatibilidad --');
  const payload = { trabajador: trabajadorId, tipo: 9, tempIni: '2026-06-01', tempFin: '2026-06-30', plazaActiva: null, ciudad: 'API-City', horario: '09:00-17:00' };
  let r = await request('/compatibilidad/api', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  console.log('POST', r.status, r.json);
  const rget = await request('/compatibilidad/api');
  console.log('GET', rget.status, Array.isArray(rget.json?.data) ? rget.json.data.slice(0,3) : rget.json);
  // delete requires tipo and tempIni
  const del = await request('/compatibilidad/api', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tipo: payload.tipo, tempIni: payload.tempIni }) });
  console.log('DELETE', del.status, del.json);
  return r.json;
}

async function run() {
  const t = await trabajadores();
  const p = await plazas();
  const a = await autoridades();
  // get trabajador id: try insertId or fetch first trabajador
  let trabajadorId = t?.insertId ?? null;
  if (!trabajadorId) {
    const list = await request('/trabajadores/api');
    trabajadorId = list.json?.data?.[0]?.id ?? null;
  }
  await compatibilidad(trabajadorId);
  console.log('\nAPI smoke finished');
}

run().catch((e)=>{ console.error('Error in api smoke:', e); process.exit(1); });
