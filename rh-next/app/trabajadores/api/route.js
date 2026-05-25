const pool = require('../../../utils/db');

async function getConnection() {
  return await pool.getConnection();
}

export async function GET() {
  try {
    const conn = await getConnection();
    const rows = await conn.query('SELECT * FROM trabajadores');
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
      'INSERT INTO trabajadores (nombre, apellidoPaterno, apellidoMaterno, rfc, estatus, estatusColor) VALUES (?, ?, ?, ?, ?, ?)',
      [data.nombre, data.apellidoPaterno, data.apellidoMaterno, data.rfc, data.estatus, data.estatusColor]
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
      'UPDATE trabajadores SET nombre=?, apellidoPaterno=?, apellidoMaterno=?, rfc=?, estatus=?, estatusColor=? WHERE id=?',
      [data.nombre, data.apellidoPaterno, data.apellidoMaterno, data.rfc, data.estatus, data.estatusColor, data.id]
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
    const result = await conn.query('DELETE FROM trabajadores WHERE id=?', [id]);
    conn.release();
    return Response.json({ affectedRows: result.affectedRows });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}