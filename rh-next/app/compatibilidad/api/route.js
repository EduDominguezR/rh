const pool = require('../../../utils/db');

async function getConnection() {
  return await pool.getConnection();
}

export async function GET(req) {
  let conn;
  try {
    conn = await getConnection();
    const url = new URL(req.url);
    const q = url.searchParams.get('q') || '';
    const page = Math.max(1, Number(url.searchParams.get('page') || 1));
    const limit = Math.max(1, Number(url.searchParams.get('limit') || 20));
    const offset = (page - 1) * limit;

    let where = '';
    const params = [];
    if (q) {
      where = ' WHERE Ciudad LIKE ? OR Horario LIKE ? OR plaza_activa LIKE ?';
      const like = `%${q}%`;
      params.push(like, like, like);
    }

    const countRows = await conn.query(`SELECT COUNT(*) AS total FROM compatibilidad${where}`, params);
    const countReal = Array.isArray(countRows) && Array.isArray(countRows[0]) ? countRows[0] : countRows;
    const total = Array.isArray(countReal) ? (countReal[0]?.total ?? 0) : (countReal.total ?? 0);

    const dataRows = await conn.query(`SELECT * FROM compatibilidad ${where} ORDER BY temporalidad_inicio DESC LIMIT ?, ?`, [...params, offset, limit]);
    const realRows = Array.isArray(dataRows) && Array.isArray(dataRows[0]) ? dataRows[0] : dataRows;
    const normalized = realRows.map((r) => ({
      id: r.id || r.ID || null,
      tipo: r.tipo_de_movimiento ?? r.tipo ?? '',
      tipoColor: r.tipoColor ?? '',
      tempIni: r.temporalidad_inicio ?? r.tempIni ?? '',
      tempFin: r.temporalidad_fin ?? r.tempFin ?? '',
      plazaActiva: r.plaza_activa ?? r.plazaActiva ?? '',
      ciudad: r.Ciudad ?? r.ciudad ?? '',
      horario: r.Horario ?? r.horario ?? '',
      trabajador: r.id_trabajador ?? r.trabajador ?? null,
    }));
    return Response.json({ data: normalized, meta: { page, limit, total } });
  } catch (error) {
    const logger = require('../../../utils/logger');
    logger.error(error.message || error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (conn) try { conn.release(); } catch (e) { }
  }
}

export async function POST(req) {
  let conn;
  try {
    const data = await req.json();
    // basic server-side validation
    if (!data.trabajador) return Response.json({ error: 'Falta id de trabajador' }, { status: 400 });
    if (!data.tipo) return Response.json({ error: 'Falta tipo de movimiento' }, { status: 400 });
    conn = await getConnection();
    const result = await conn.query(
      'INSERT INTO compatibilidad (tipo_de_movimiento, temporalidad_inicio, temporalidad_fin, plaza_activa, Ciudad, Horario, id_trabajador) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [data.tipo || null, data.tempIni || null, data.tempFin || null, data.plazaActiva || null, data.ciudad || null, data.horario || null, data.trabajador || null]
    );
    return Response.json({ insertId: result.insertId });
  } catch (error) {
    const logger = require('../../../utils/logger');
    logger.error(error.message || error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (conn) try { conn.release(); } catch (e) { }
  }
}

export async function PUT(req) {
  let conn;
  try {
    const data = await req.json();
    if (!data.id) return Response.json({ error: 'Falta id' }, { status: 400 });
    if (!data.trabajador) return Response.json({ error: 'Falta id de trabajador' }, { status: 400 });
    // Require original keys to identify the row
    const origTipo = data.origTipo ?? data.tipo;
    const origTemp = data.origTempIni ?? data.tempIni;
    if (!origTipo || !origTemp) return Response.json({ error: 'Falta identificador original (origTipo/origTempIni)' }, { status: 400 });
    conn = await getConnection();
    const result = await conn.query(
      'UPDATE compatibilidad SET tipo_de_movimiento=?, temporalidad_inicio=?, temporalidad_fin=?, plaza_activa=?, Ciudad=?, Horario=?, id_trabajador=? WHERE tipo_de_movimiento=? AND temporalidad_inicio=?',
      [data.tipo || null, data.tempIni || null, data.tempFin || null, data.plazaActiva || null, data.ciudad || null, data.horario || null, data.trabajador || null, origTipo, origTemp]
    );
    return Response.json({ affectedRows: result.affectedRows });
  } catch (error) {
    const logger = require('../../../utils/logger');
    logger.error(error.message || error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (conn) try { conn.release(); } catch (e) { }
  }
}

export async function DELETE(req) {
  let conn;
  try {
    const { tipo, tempIni } = await req.json();
    if (!tipo || !tempIni) return Response.json({ error: 'Falta tipo o tempIni' }, { status: 400 });
    conn = await getConnection();
    const result = await conn.query('DELETE FROM compatibilidad WHERE tipo_de_movimiento=? AND temporalidad_inicio=?', [tipo, tempIni]);
    return Response.json({ affectedRows: result.affectedRows });
  } catch (error) {
    const logger = require('../../../utils/logger');
    logger.error(error.message || error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (conn) try { conn.release(); } catch (e) { }
  }
}