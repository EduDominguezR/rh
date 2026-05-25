const pool = require('../../../utils/db');

async function getConnection() {
  return await pool.getConnection();
}

export async function GET() {
  try {
    const conn = await getConnection();
    const rows = await conn.query('SELECT * FROM plazas');
    conn.release();
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const conn = await getConnection();
    const result = await conn.query(
      'INSERT INTO plazas (cdTrabajo, clavePresupuestal, categoria, descripcion, salario) VALUES (?, ?, ?, ?, ?)',
      [data.cdTrabajo, data.clavePresupuestal, data.categoria, data.descripcion, data.salario]
    );
    conn.release();
    return Response.json({ insertId: result.insertId });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const data = await req.json();
    const conn = await getConnection();
    const result = await conn.query(
      'UPDATE plazas SET cdTrabajo=?, clavePresupuestal=?, categoria=?, descripcion=?, salario=? WHERE id=?',
      [data.cdTrabajo, data.clavePresupuestal, data.categoria, data.descripcion, data.salario, data.id]
    );
    conn.release();
    return Response.json({ affectedRows: result.affectedRows });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const conn = await getConnection();
    const result = await conn.query('DELETE FROM plazas WHERE id=?', [id]);
    conn.release();
    return Response.json({ affectedRows: result.affectedRows });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}