const pool = require('./utils/db');

async function seed() {
  const conn = await pool.getConnection();
  try {
    // trabajadores sample
    await conn.query("INSERT IGNORE INTO trabajadores (apPaterno, apMaterno, nombre, RFC) VALUES ('Perez','Lopez','Juan','RFC123')");
    await conn.query("INSERT IGNORE INTO trabajadores (apPaterno, apMaterno, nombre, RFC) VALUES ('Garcia','Martinez','Ana','RFC456')");

    // plazas sample
    await conn.query("INSERT IGNORE INTO plazas (cdTrabajo, clavePresupuestal, categoria, descripcion, salario) VALUES ('CD1','KP1','Docente','Profesor de matemáticas','12000')");

    // autoridades sample
    await conn.query("INSERT IGNORE INTO autoridades (autoridad_1, nombre_autoridad_1, puesto_1, nombre_plantel_1) VALUES ('AUT1','Rector','Rector','Plantel A')");

    // compatibilidades sample
    await conn.query("INSERT IGNORE INTO compatibilidad (tipo_de_movimiento, temporalidad_inicio, temporalidad_fin, plaza_activa, Ciudad, Horario, id_trabajador) VALUES (1,'2024-01-01','2024-12-31','PL1','Ciudad','08:00-15:00',1)");

    console.log('Seed completado');
  } catch (err) {
    console.error('Seed error:', err.message || err);
  } finally {
    conn.release();
  }
}

seed();
