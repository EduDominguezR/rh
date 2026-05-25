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
      where = ' WHERE nombre_autoridad_1 LIKE ? OR nombre_plantel_1 LIKE ? OR puesto_1 LIKE ? OR autoridad_1 LIKE ? OR autoridad_2 LIKE ?';
      const like = `%${q}%`;
      params.push(like, like, like, like, like);
    }

    const countRows = await conn.query(`SELECT COUNT(*) AS total FROM autoridades${where}`, params);
    const countReal = Array.isArray(countRows) && Array.isArray(countRows[0]) ? countRows[0] : countRows;
    const total = Array.isArray(countReal) ? (countReal[0]?.total ?? 0) : (countReal.total ?? 0);

    const dataRows = await conn.query(`SELECT * FROM autoridades ${where} ORDER BY autoridad_1 DESC LIMIT ?, ?`, [...params, offset, limit]);
    const realRows = Array.isArray(dataRows) && Array.isArray(dataRows[0]) ? dataRows[0] : dataRows;
    const normalized = realRows.map((r) => ({
      id: r.autoridad_1 ?? r.id ?? null,
      autoridad1: r.autoridad_1 ?? r.autoridad1 ?? '',
      plantel1: r.nombre_plantel_1 ?? r.plantel1 ?? '',
      puesto: r.puesto_1 ?? r.puesto ?? '',
      nombre: r.nombre_autoridad_1 ?? r.nombre ?? '',
      autoridad2: r.autoridad_2 ?? r.autoridad2 ?? '',
      plantel2: r.nombre_plantel_2 ?? r.plantel2 ?? '',
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
    if (!data.autoridad1) return Response.json({ error: 'Falta autoridad 1' }, { status: 400 });
    if (!data.nombre) return Response.json({ error: 'Falta nombre' }, { status: 400 });
    conn = await getConnection();
    const result = await conn.query(
      'INSERT INTO autoridades (autoridad_1, nombre_autoridad_1, puesto_1, nombre_plantel_1, autoridad_2, nombre_plantel_2) VALUES (?, ?, ?, ?, ?, ?)',
      [data.autoridad1 || '', data.nombre || '', data.puesto || '', data.plantel1 || '', data.autoridad2 || '', data.plantel2 || '']
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
    if (!data.nombre) return Response.json({ error: 'Falta nombre' }, { status: 400 });
    conn = await getConnection();
    const result = await conn.query(
      'UPDATE autoridades SET nombre_autoridad_1=?, nombre_plantel_1=?, puesto_1=?, autoridad_2=?, nombre_autoridad_2=?, nombre_plantel_2=? WHERE autoridad_1=?',
      [data.nombre || '', data.plantel1 || '', data.puesto || '', data.autoridad2 || '', data.nombre2 || '', data.plantel2 || '', data.id]
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
    const { id } = await req.json();
    if (!id) return Response.json({ error: 'Falta id' }, { status: 400 });
    conn = await getConnection();
    const result = await conn.query('DELETE FROM autoridades WHERE autoridad_1=?', [id]);
    return Response.json({ affectedRows: result.affectedRows });
  } catch (error) {
    const logger = require('../../../utils/logger');
    logger.error(error.message || error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (conn) try { conn.release(); } catch (e) { }
  }
}