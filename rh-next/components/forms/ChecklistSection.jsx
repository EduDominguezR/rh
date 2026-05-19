/**
 * © 2026 Eduardo Domínguez. Todos los derechos reservados.
 * Uso interno y restringido.
 */

function groupBySection(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});
}

export default function ChecklistSection({
  checklist,
  onMetaChange,
  onItemChange,
}) {
  const grouped = groupBySection(checklist.items);

  return (
    <section className="document-section">
      <div className="section-heading">
        <div>
          <h2>Lista checable</h2>
          <p>Validación analítica por institución, basada en el formato oficial.</p>
        </div>
      </div>

      <div className="checklist-top">
        <div className="checklist-intro">
          <p>
            Responde cada criterio con una opción para Institución 1 y otra para
            Institución 2.
          </p>
        </div>

        <div className="director-box">
          <label className="field-control">
            <span>Nombre y firma del director del plantel</span>
            <input
              type="text"
              value={checklist.directorName}
              onChange={(e) => onMetaChange('directorName', e.target.value)}
            />
          </label>

          <label className="field-control">
            <span>Firma del director</span>
            <input
              type="text"
              value={checklist.directorSignature}
              onChange={(e) =>
                onMetaChange('directorSignature', e.target.value)
              }
            />
          </label>
        </div>
      </div>

      {Object.entries(grouped).map(([section, items]) => (
        <div className="checklist-group" key={section}>
          <h3>{section}</h3>

          <div className="checklist-table">
            <div className="checklist-row checklist-row--head">
              <div className="checklist-cell checklist-cell--label">Criterio</div>
              <div className="checklist-cell">Inst. 1 Sí</div>
              <div className="checklist-cell">Inst. 1 No</div>
              <div className="checklist-cell">Inst. 2 Sí</div>
              <div className="checklist-cell">Inst. 2 No</div>
            </div>

            {items.map((item) => (
              <div className="checklist-row" key={item.id}>
                <div className="checklist-cell checklist-cell--label">
                  {item.label}
                </div>

                <label className="check-option">
                  <input
                    type="radio"
                    name={`${item.id}-institution1`}
                    checked={item.institution1 === 'si'}
                    onChange={() => onItemChange(item.id, 'institution1', 'si')}
                  />
                  <span>Sí</span>
                </label>

                <label className="check-option">
                  <input
                    type="radio"
                    name={`${item.id}-institution1`}
                    checked={item.institution1 === 'no'}
                    onChange={() => onItemChange(item.id, 'institution1', 'no')}
                  />
                  <span>No</span>
                </label>

                <label className="check-option">
                  <input
                    type="radio"
                    name={`${item.id}-institution2`}
                    checked={item.institution2 === 'si'}
                    onChange={() => onItemChange(item.id, 'institution2', 'si')}
                  />
                  <span>Sí</span>
                </label>

                <label className="check-option">
                  <input
                    type="radio"
                    name={`${item.id}-institution2`}
                    checked={item.institution2 === 'no'}
                    onChange={() => onItemChange(item.id, 'institution2', 'no')}
                  />
                  <span>No</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="field-grid field-grid--compact">
        <label className="field-control">
          <span>Fecha</span>
          <input
            type="date"
            value={checklist.date}
            onChange={(e) => onMetaChange('date', e.target.value)}
          />
        </label>

        <label className="field-control">
          <span>Nombre del analista</span>
          <input
            type="text"
            value={checklist.analystName}
            onChange={(e) => onMetaChange('analystName', e.target.value)}
          />
        </label>

        <label className="field-control">
          <span>Puesto del analista</span>
          <input
            type="text"
            value={checklist.analystPosition}
            onChange={(e) => onMetaChange('analystPosition', e.target.value)}
          />
        </label>

        <label className="field-control field-control--full">
          <span>Firma del analista</span>
          <input
            type="text"
            value={checklist.analystSignature}
            onChange={(e) => onMetaChange('analystSignature', e.target.value)}
          />
        </label>
      </div>
    </section>
  );
}