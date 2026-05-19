/**
 * © 2026 Eduardo Domínguez. Todos los derechos reservados.
 * Uso interno y restringido.
 */

export default function ApprovalSection({ approval, onChange }) {
  return (
    <section className="document-section">
      <div className="section-heading">
        <div>
          <h2>Autorización de compatibilidad</h2>
          <p>Determinación institucional y vigencia del dictamen.</p>
        </div>
      </div>

      <div className="approval-grid">
        <label
          className={`approval-choice ${
            approval.status === 'autorizado' ? 'is-selected' : ''
          }`}
        >
          <input
            type="radio"
            name="approvalStatus"
            checked={approval.status === 'autorizado'}
            onChange={() => onChange('status', 'autorizado')}
          />
          <div>
            <strong>Autoriza compatibilidad</strong>
            <span>
              Procede la autorización mientras se mantengan los supuestos del
              dictamen.
            </span>
          </div>
        </label>

        <label
          className={`approval-choice ${
            approval.status === 'no-autorizado' ? 'is-selected' : ''
          }`}
        >
          <input
            type="radio"
            name="approvalStatus"
            checked={approval.status === 'no-autorizado'}
            onChange={() => onChange('status', 'no-autorizado')}
          />
          <div>
            <strong>No autoriza compatibilidad</strong>
            <span>No reúne los requisitos institucionales establecidos.</span>
          </div>
        </label>
      </div>

      <div className="field-grid field-grid--compact">
        <label className="field-control">
          <span>Vigencia desde</span>
          <input
            type="date"
            value={approval.fechaInicio}
            onChange={(e) => onChange('fechaInicio', e.target.value)}
          />
        </label>

        <label className="field-control">
          <span>Vigencia hasta</span>
          <input
            type="date"
            value={approval.fechaFin}
            onChange={(e) => onChange('fechaFin', e.target.value)}
          />
        </label>

        <label className="field-control field-control--full">
          <span>Observaciones</span>
          <textarea
            rows="3"
            value={approval.observations}
            onChange={(e) => onChange('observations', e.target.value)}
          />
        </label>
      </div>

      <p className="section-note">{approval.note}</p>
    </section>
  );
}