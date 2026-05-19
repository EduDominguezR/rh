/**
 * © 2026 Eduardo Domínguez. Todos los derechos reservados.
 * Uso interno y restringido.
 */

export default function InstitutionSection({
  data,
  onInstitutionFieldChange,
  onRecordChange,
  onAddRecord,
}) {
  return (
    <section className="document-section">
      <div className="section-heading">
        <div>
          <h2>{data.title}</h2>
          <p>Captura editable basada en el formato institucional.</p>
        </div>

        <button type="button" className="btn light" onClick={onAddRecord}>
          Agregar registro
        </button>
      </div>

      <div className="field-grid field-grid--institution">
        <label className="field-control field-control--full">
          <span>Nombre de la institución</span>
          <input
            type="text"
            value={data.institutionName}
            onChange={(e) =>
              onInstitutionFieldChange('institutionName', e.target.value)
            }
          />
        </label>
      </div>

      <div className="records-stack">
        {data.records.map((record, index) => (
          <article className="record-card" key={`${data.title}-${index}`}>
            <div className="record-card__header">
              <strong>Registro {index + 1}</strong>
              <span>Campos del puesto o contrato</span>
            </div>

            <div className="field-grid">
              <label className="field-control">
                <span>Puesto o contrato</span>
                <input
                  type="text"
                  value={record.puestoContrato}
                  onChange={(e) =>
                    onRecordChange(index, 'puestoContrato', e.target.value)
                  }
                />
              </label>

              <label className="field-control">
                <span>Código presupuestal / grupo / grado / nivel</span>
                <input
                  type="text"
                  value={record.codigoPresupuestal}
                  onChange={(e) =>
                    onRecordChange(index, 'codigoPresupuestal', e.target.value)
                  }
                />
              </label>

              <label className="field-control">
                <span>Unidad de adscripción / centro de trabajo</span>
                <input
                  type="text"
                  value={record.unidadAdscripcion}
                  onChange={(e) =>
                    onRecordChange(index, 'unidadAdscripcion', e.target.value)
                  }
                />
              </label>

              <label className="field-control">
                <span>Fecha de alta</span>
                <input
                  type="date"
                  value={record.fechaAlta}
                  onChange={(e) =>
                    onRecordChange(index, 'fechaAlta', e.target.value)
                  }
                />
              </label>

              <label className="field-control">
                <span>Fecha de término</span>
                <input
                  type="date"
                  value={record.fechaTermino}
                  onChange={(e) =>
                    onRecordChange(index, 'fechaTermino', e.target.value)
                  }
                />
              </label>

              <label className="field-control">
                <span>Tipo de nombramiento</span>
                <input
                  type="text"
                  value={record.tipoNombramiento}
                  onChange={(e) =>
                    onRecordChange(index, 'tipoNombramiento', e.target.value)
                  }
                />
              </label>

              <label className="field-control">
                <span>{data.compensationLabel}</span>
                <input
                  type="text"
                  value={record.remuneracion}
                  onChange={(e) =>
                    onRecordChange(index, 'remuneracion', e.target.value)
                  }
                />
              </label>

              <label className="field-control">
                <span>Partida y clave presupuestal</span>
                <input
                  type="text"
                  value={record.partidaClave}
                  onChange={(e) =>
                    onRecordChange(index, 'partidaClave', e.target.value)
                  }
                />
              </label>

              <label className="field-control field-control--full">
                <span>Ubicación del centro de trabajo, horario y tiempo de traslado</span>
                <textarea
                  rows="4"
                  value={record.ubicacionHorario}
                  onChange={(e) =>
                    onRecordChange(index, 'ubicacionHorario', e.target.value)
                  }
                />
              </label>

              <label className="field-control field-control--full">
                <span>Tiempo de traslado</span>
                <input
                  type="text"
                  value={record.tiempoTraslado}
                  onChange={(e) =>
                    onRecordChange(index, 'tiempoTraslado', e.target.value)
                  }
                />
              </label>
            </div>
          </article>
        ))}
      </div>

      <p className="section-note">{data.footnote}</p>
    </section>
  );
}