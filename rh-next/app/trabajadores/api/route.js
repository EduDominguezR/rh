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
      where = ' WHERE nombre LIKE ? OR apPaterno LIKE ? OR apMaterno LIKE ? OR RFC LIKE ?';
      const like = `%${q}%`;
      params.push(like, like, like, like);
    }

    const countRows = await conn.query(`SELECT COUNT(*) AS total FROM trabajadores${where}`, params);
    const countReal = Array.isArray(countRows) && Array.isArray(countRows[0]) ? countRows[0] : countRows;
    const total = Array.isArray(countReal) ? (countReal[0]?.total ?? 0) : (countReal.total ?? 0);

    const dataRows = await conn.query(`SELECT * FROM trabajadores ${where} ORDER BY ID_Trabajador DESC LIMIT ?, ?`, [...params, offset, limit]);
    const realRows = Array.isArray(dataRows) && Array.isArray(dataRows[0]) ? dataRows[0] : dataRows;
    const normalized = realRows.map((r) => ({
      id: r.ID_Trabajador ?? r.id ?? r.ID ?? r.Id,
      nombre: r.nombre ?? r.Nombre ?? '',
      apellidoPaterno: r.apPaterno ?? r.apellidoPaterno ?? '',
      apellidoMaterno: r.apMaterno ?? r.apellidoMaterno ?? '',
      rfc: r.RFC ?? r.rfc ?? '',
      estatus: r.estatus ?? '',
      estatusColor: r.estatusColor ?? '',
    }));
    return Response.json({ data: normalized, meta: { page, limit, total } });
  } catch (error) {
    const logger = require('../../../utils/logger');
    logger.error(error.message || error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (conn) try { conn.release(); } catch (e) { /* ignore */ }
  }
}

export async function POST(req) {
  let conn;
  try {
    const data = await req.json();
    if (!data.nombre) return Response.json({ error: 'Falta nombre' }, { status: 400 });
    if (!data.apellidoPaterno) return Response.json({ error: 'Falta apellido paterno' }, { status: 400 });
    conn = await getConnection();
    const result = await conn.query(
      'INSERT INTO trabajadores (apPaterno, apMaterno, nombre, RFC) VALUES (?, ?, ?, ?)',
      [data.apellidoPaterno || '', data.apellidoMaterno || '', data.nombre || '', data.rfc || '']
    );
    return Response.json({ insertId: result.insertId });
  } catch (error) {
    const logger = require('../../../utils/logger');
    logger.error(error.message || error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (conn) try { conn.release(); } catch (e) { /* ignore */ }
  }
}

export async function PUT(req) {
  let conn;
  try {
    const data = await req.json();
    if (!data.id) return Response.json({ error: 'Falta id' }, { status: 400 });
    if (!data.nombre) return Response.json({ error: 'Falta nombre' }, { status: 400 });
    if (!data.apellidoPaterno) return Response.json({ error: 'Falta apellido paterno' }, { status: 400 });
    conn = await getConnection();
    const result = await conn.query(
      'UPDATE trabajadores SET apPaterno=?, apMaterno=?, nombre=?, RFC=? WHERE ID_Trabajador=?',
      [data.apellidoPaterno || '', data.apellidoMaterno || '', data.nombre || '', data.rfc || '', data.id]
    );
    return Response.json({ affectedRows: result.affectedRows });
  } catch (error) {
    const logger = require('../../../utils/logger');
    logger.error(error.message || error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (conn) try { conn.release(); } catch (e) { /* ignore */ }
  }
}

export async function DELETE(req) {
  let conn;
  try {
    const { id } = await req.json();
    if (!id) return Response.json({ error: 'Falta id' }, { status: 400 });
    conn = await getConnection();
    const result = await conn.query('DELETE FROM trabajadores WHERE ID_Trabajador=?', [id]);
    return Response.json({ affectedRows: result.affectedRows });
  } catch (error) {
    const logger = require('../../../utils/logger');
    logger.error(error.message || error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (conn) try { conn.release(); } catch (e) { /* ignore */ }
  }
}