const pool = require('../../../utils/db');

async function getConnection() {
  return await pool.getConnection();
}

export async function GET() {
  try {
    const conn = await getConnection();
    const rows = await conn.query('SELECT * FROM autoridades');
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
      'INSERT INTO autoridades (autoridad1, plantel1, puesto, nombre, autoridad2, plantel2) VALUES (?, ?, ?, ?, ?, ?)',
      [data.autoridad1, data.plantel1, data.puesto, data.nombre, data.autoridad2, data.plantel2]
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
      'UPDATE autoridades SET autoridad1=?, plantel1=?, puesto=?, nombre=?, autoridad2=?, plantel2=? WHERE id=?',
      [data.autoridad1, data.plantel1, data.puesto, data.nombre, data.autoridad2, data.plantel2, data.id]
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
    const result = await conn.query('DELETE FROM autoridades WHERE id=?', [id]);
    conn.release();
    return Response.json({ affectedRows: result.affectedRows });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}