/**
 * © 2026 Eduardo Domínguez. Todos los derechos reservados.
 * Uso interno y restringido.
 */

export default function SignatureSection({
  signatures,
  onMetaChange,
  onBlockChange,
}) {
  return (
    <section className="document-section">
      <div className="section-heading">
        <div>
          <h2>Firmas y validaciones</h2>
          <p>Bloque institucional de certificación, validación y autorización.</p>
        </div>
      </div>

      <div className="field-grid field-grid--compact">
        <label className="field-control">
          <span>Lugar</span>
          <input
            type="text"
            value={signatures.place}
            onChange={(e) => onMetaChange('place', e.target.value)}
          />
        </label>

        <label className="field-control">
          <span>Fecha</span>
          <input
            type="date"
            value={signatures.date}
            onChange={(e) => onMetaChange('date', e.target.value)}
          />
        </label>
      </div>

      <div className="signature-grid">
        {signatures.blocks.map((block, index) => (
          <article className="signature-card" key={`${block.role}-${index}`}>
            <h3>{block.role}</h3>

            <label className="field-control">
              <span>Denominación de institución</span>
              <input
                type="text"
                value={block.institution}
                onChange={(e) =>
                  onBlockChange(index, 'institution', e.target.value)
                }
              />
            </label>

            <label className="field-control">
              <span>Puesto del servidor público</span>
              <input
                type="text"
                value={block.position}
                onChange={(e) =>
                  onBlockChange(index, 'position', e.target.value)
                }
              />
            </label>

            <label className="field-control">
              <span>Nombre y firma</span>
              <input
                type="text"
                value={block.name}
                onChange={(e) => onBlockChange(index, 'name', e.target.value)}
              />
            </label>
          </article>
        ))}
      </div>

      <p className="section-note">{signatures.note}</p>
    </section>
  );
}
