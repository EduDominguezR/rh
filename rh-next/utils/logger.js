const fs = require('fs');
const path = require('path');

const logDir = path.resolve(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
const errorFile = path.join(logDir, 'error.log');

function _write(level, msg) {
  const line = `[${new Date().toISOString()}] ${level.toUpperCase()}: ${msg}\n`;
  try { fs.appendFileSync(errorFile, line); } catch (e) { /* ignore */ }
  console[level === 'error' ? 'error' : 'log'](line.trim());
}

module.exports = {
  error: (msg) => _write('error', typeof msg === 'string' ? msg : JSON.stringify(msg)),
  info: (msg) => _write('info', typeof msg === 'string' ? msg : JSON.stringify(msg)),
};
