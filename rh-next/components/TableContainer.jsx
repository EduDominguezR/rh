export default function TableContainer({
  title,
  subtitle,
  toolbar,
  columns = [],
  children,
}) {
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

      {toolbar && (
        <div className="toolbar">
          {toolbar}
        </div>
      )}

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
            {children}
          </tbody>
        </table>
      </div>
    </section>
  );
}