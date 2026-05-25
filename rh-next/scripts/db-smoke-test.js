const pool = require('../utils/db');

async function run() {
  const conn = await pool.getConnection();
  const results = [];
  try {
    // Trabajadores
    const trabCount = await conn.query('SELECT COUNT(*) AS total FROM trabajadores');
    results.push({ table: 'trabajadores', count: Array.isArray(trabCount[0]) ? trabCount[0][0].total : trabCount[0].total });
    const tNombre = 'Juan';
    const tRFC = 'PRU123';
    let tId = null;
    try {
      const tRes = await conn.query('INSERT INTO trabajadores (apPaterno, apMaterno, nombre, RFC) VALUES (?, ?, ?, ?)', ['Prueba', 'Insercion', tNombre, tRFC]);
      tId = tRes.insertId || (Array.isArray(tRes[0]) ? tRes[0].insertId : null);
    } catch (e) {
      if (e && e.code === 'ER_DUP_ENTRY') {
        const existing = await conn.query('SELECT ID_Trabajador AS id FROM trabajadores WHERE RFC=? LIMIT 1', [tRFC]);
        const ex = Array.isArray(existing[0]) ? existing[0][0] : existing[0];
        tId = ex?.id ?? null;
      } else throw e;
    }
    results.push({ table: 'trabajadores', insertId: tId });
    const tRow = await conn.query('SELECT * FROM trabajadores WHERE nombre=? AND RFC=? ORDER BY ID_Trabajador DESC LIMIT 1', [tNombre, tRFC]);
    results.push({ table: 'trabajadores', row: Array.isArray(tRow[0]) ? tRow[0][0] : tRow[0] });
    await conn.query('DELETE FROM trabajadores WHERE nombre=? AND RFC=?', [tNombre, tRFC]);

    // Plazas
    const plCount = await conn.query('SELECT COUNT(*) AS total FROM plazas');
    results.push({ table: 'plazas', count: Array.isArray(plCount[0]) ? plCount[0][0].total : plCount[0].total });
    const pCd = 'CD-PRU';
    const pClave = 'KP-PRU';
    let pId = null;
    try {
      const pRes = await conn.query('INSERT INTO plazas (cdTrabajo, clavePresupuestal, categoria, descripcion, salario) VALUES (?, ?, ?, ?, ?)', [pCd, pClave, 'Cat', 'Descripción prueba', 1234]);
      pId = pRes.insertId || (Array.isArray(pRes[0]) ? pRes[0].insertId : null);
    } catch (e) {
      if (e && e.code === 'ER_DUP_ENTRY') {
        const existing = await conn.query('SELECT id FROM plazas WHERE cdTrabajo=? AND clavePresupuestal=? LIMIT 1', [pCd, pClave]);
        const ex = Array.isArray(existing[0]) ? existing[0][0] : existing[0];
        pId = ex?.id ?? null;
      } else throw e;
    }
    results.push({ table: 'plazas', insertId: pId });
    const pRow = await conn.query('SELECT * FROM plazas WHERE cdTrabajo=? AND clavePresupuestal=? ORDER BY id DESC LIMIT 1', [pCd, pClave]);
    results.push({ table: 'plazas', row: Array.isArray(pRow[0]) ? pRow[0][0] : pRow[0] });
    await conn.query('DELETE FROM plazas WHERE cdTrabajo=? AND clavePresupuestal=?', [pCd, pClave]);

    // Autoridades
    const aCount = await conn.query('SELECT COUNT(*) AS total FROM autoridades');
    results.push({ table: 'autoridades', count: Array.isArray(aCount[0]) ? aCount[0][0].total : aCount[0].total });
    const aNombre = 'Nombre PRU';
    let aId = null;
    try {
      const aRes = await conn.query('INSERT INTO autoridades (autoridad_1, nombre_autoridad_1, puesto_1, nombre_plantel_1) VALUES (?, ?, ?, ?)', ['AUT-PRU', aNombre, 'Puesto PRU', 'Plantel PRU']);
      aId = aRes.insertId || (Array.isArray(aRes[0]) ? aRes[0].insertId : null);
    } catch (e) {
      if (e && e.code === 'ER_DUP_ENTRY') {
        const existing = await conn.query('SELECT autoridad_1 AS id FROM autoridades WHERE nombre_autoridad_1=? LIMIT 1', [aNombre]);
        const ex = Array.isArray(existing[0]) ? existing[0][0] : existing[0];
        aId = ex?.id ?? null;
      } else throw e;
    }
    results.push({ table: 'autoridades', insertId: aId });
    const aRow = await conn.query('SELECT * FROM autoridades WHERE nombre_autoridad_1=? ORDER BY autoridad_1 DESC LIMIT 1', [aNombre]);
    results.push({ table: 'autoridades', row: Array.isArray(aRow[0]) ? aRow[0][0] : aRow[0] });
    await conn.query('DELETE FROM autoridades WHERE nombre_autoridad_1=?', [aNombre]);

    // Compatibilidades (compatibilidades)
    const cCount = await conn.query('SELECT COUNT(*) AS total FROM compatibilidad');
    results.push({ table: 'compatibilidad', count: Array.isArray(cCount[0]) ? cCount[0][0].total : cCount[0].total });
    const cTipo = 'PRUEBA';
    let cId = null;
    try {
      const cRes = await conn.query('INSERT INTO compatibilidad (tipo_de_movimiento, temporalidad_inicio, temporalidad_fin, plaza_activa, Ciudad, Horario, id_trabajador) VALUES (?, ?, ?, ?, ?, ?, ?)', [cTipo, '2026-01-01', '2026-12-31', null, 'Ciudad PRU', '08:00-16:00', null]);
      cId = cRes.insertId || (Array.isArray(cRes[0]) ? cRes[0].insertId : null);
    } catch (e) {
      if (e && e.code === 'ER_DUP_ENTRY') {
        const existing = await conn.query('SELECT temporalidad_inicio AS temporalInicio FROM compatibilidad WHERE tipo_de_movimiento=? LIMIT 1', [cTipo]);
        const ex = Array.isArray(existing[0]) ? existing[0][0] : existing[0];
        cId = ex?.temporalInicio ?? null;
      } else throw e;
    }
    results.push({ table: 'compatibilidad', insertId: cId });
    const cRow = await conn.query('SELECT * FROM compatibilidad WHERE tipo_de_movimiento=? ORDER BY temporalidad_inicio DESC LIMIT 1', [cTipo]);
    results.push({ table: 'compatibilidad', row: Array.isArray(cRow[0]) ? cRow[0][0] : cRow[0] });
    await conn.query('DELETE FROM compatibilidad WHERE tipo_de_movimiento=?', [cTipo]);

    console.log('Smoke test results:', JSON.stringify(results, null, 2));
    conn.release();
    process.exit(0);
  } catch (err) {
    console.error('Error en smoke test:', err.message || err);
    try { conn.release(); } catch (e) { }
    process.exit(1);
  }
}

run();
