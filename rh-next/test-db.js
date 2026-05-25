const pool = require('./utils/db');

(async () => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT 1 AS ok');
    console.log('Conexión OK:', rows);
    conn.release();
    process.exit(0);
  } catch (err) {
    console.error('ERROR de conexión:', err.message);
    process.exit(1);
  }
})();
