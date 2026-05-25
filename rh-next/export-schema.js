const pool = require('./utils/db');
const fs = require('fs');

let dbName = process.env.DB_NAME || process.env.MYSQL_DATABASE || process.env.DATABASE || process.env.MYSQL_DB;

(async () => {
  try {
    // Si no hay DB en env, preguntar al servidor cuál es la actual
    const connForDb = await pool.getConnection();
    if (!dbName) {
      const res = await connForDb.query('SELECT DATABASE() AS db');
      if (Array.isArray(res) && res.length > 0) {
        // mariadb driver puede devolver [ [row], meta ] o [row]
        const first = Array.isArray(res[0]) ? res[0][0] : res[0];
        if (first && first.db) dbName = first.db;
      }
    }
    connForDb.release();

    if (!dbName) {
      console.error('No se pudo determinar el nombre de la base de datos. Define DB_NAME o conéctate a una base por defecto.');
      process.exit(1);
    }

    const conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT TABLE_NAME, COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY, COLUMN_DEFAULT, EXTRA
       FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = ?
       ORDER BY TABLE_NAME, ORDINAL_POSITION`,
      [dbName]
    );
    conn.release();
    // mariadb driver puede devolver [rows, meta] — normalizamos
    const realRows = Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : rows;

    let out = `Schema dump for database: ${dbName}\n\n`;
    let currentTable = null;
    for (const r of realRows) {
      if (r.TABLE_NAME !== currentTable) {
        currentTable = r.TABLE_NAME;
        out += `Table: ${currentTable}\n`;
        out += `Columns:\n`;
      }
      const def = r.COLUMN_DEFAULT === null ? '' : ` DEFAULT=${r.COLUMN_DEFAULT}`;
      const key = r.COLUMN_KEY ? ` KEY=${r.COLUMN_KEY}` : '';
      const extra = r.EXTRA ? ` ${r.EXTRA}` : '';
      out += `  - ${r.COLUMN_NAME}: ${r.COLUMN_TYPE} ${r.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL'}${key}${extra}${def}\n`;
    }

    fs.writeFileSync('db-schema.txt', out, 'utf8');
    console.log('Esquema exportado a db-schema.txt');
    process.exit(0);
  } catch (err) {
    console.error('Error exportando esquema:', err.message || err);
    process.exit(1);
  }
})();
