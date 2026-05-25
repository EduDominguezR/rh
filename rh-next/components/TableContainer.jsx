export default function TableContainer({
  title,
  subtitle,
  toolbar,
  columns = [],
  children,
  loading = false,
  error = null,
  emptyMessage = 'Sin registros',
  colSpan,
}) {
  const span = colSpan || columns.length || 1;

  return (
    <section className="panel">
      {(title || subtitle) && (
        <div className="panel-head">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      )}

      {toolbar && <div className="toolbar">{toolbar}</div>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={span}>Cargando...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={span}>{error}</td>
              </tr>
            ) : children ? (
              children
            ) : (
              <tr>
                <td colSpan={span}>{emptyMessage}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}