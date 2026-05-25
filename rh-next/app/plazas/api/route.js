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
      where = ' WHERE cdTrabajo LIKE ? OR clavePresupuestal LIKE ? OR descripcion LIKE ? OR categoria LIKE ?';
      const like = `%${q}%`;
      params.push(like, like, like, like);
    }

    const countRows = await conn.query(`SELECT COUNT(*) AS total FROM plazas${where}`, params);
    const countReal = Array.isArray(countRows) && Array.isArray(countRows[0]) ? countRows[0] : countRows;
    const total = Array.isArray(countReal) ? (countReal[0]?.total ?? 0) : (countReal.total ?? 0);

    const dataRows = await conn.query(`SELECT * FROM plazas ${where} ORDER BY id DESC LIMIT ?, ?`, [...params, offset, limit]);
    const realRows = Array.isArray(dataRows) && Array.isArray(dataRows[0]) ? dataRows[0] : dataRows;
    const normalized = realRows.map((r) => ({
      id: r.id ?? r.ID ?? null,
      cdTrabajo: r.cdTrabajo ?? r.cd_trabajo ?? r.CDTrabajo ?? '',
      clavePresupuestal: r.clavePresupuestal ?? r.clave_presupuestal ?? '',
      categoria: r.categoria ?? '',
      descripcion: r.descripcion ?? '',
      salario: r.salario ?? '',
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
    if (!data.cdTrabajo) return Response.json({ error: 'Falta CD Trabajo' }, { status: 400 });
    if (!data.clavePresupuestal) return Response.json({ error: 'Falta clave presupuestal' }, { status: 400 });
    conn = await getConnection();
    const result = await conn.query(
      'INSERT INTO plazas (cdTrabajo, clavePresupuestal, categoria, descripcion, salario) VALUES (?, ?, ?, ?, ?)',
      [data.cdTrabajo, data.clavePresupuestal, data.categoria, data.descripcion, data.salario]
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
    if (!data.cdTrabajo) return Response.json({ error: 'Falta CD Trabajo' }, { status: 400 });
    if (!data.clavePresupuestal) return Response.json({ error: 'Falta clave presupuestal' }, { status: 400 });
    conn = await getConnection();
    const result = await conn.query(
      'UPDATE plazas SET cdTrabajo=?, clavePresupuestal=?, categoria=?, descripcion=?, salario=? WHERE id=?',
      [data.cdTrabajo, data.clavePresupuestal, data.categoria, data.descripcion, data.salario, data.id]
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
    const result = await conn.query('DELETE FROM plazas WHERE id=?', [id]);
    return Response.json({ affectedRows: result.affectedRows });
  } catch (error) {
    const logger = require('../../../utils/logger');
    logger.error(error.message || error);
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    if (conn) try { conn.release(); } catch (e) { }
  }
}