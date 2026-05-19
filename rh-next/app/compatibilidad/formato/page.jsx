import Topbar from '../../../components/Topbar';
import ActionButtons from '../../../components/ActionButtons';

export default function CompatibilidadFormatoPage() {
  return (
    <Topbar
      title="Formato de Compatibilidad"
      subtitle="SICOMP · Operación · Compatibilidad · Formato"
      actions={
        <ActionButtons
          buttons={[
            {
              label: 'Volver a compatibilidad',
               href: '/compatibilidad/formato',
              variant: 'light',
            },
          ]}
        />
      }
    >
      <section className="panel">
        <div className="panel-head">
          <div>
            <h3>Formato institucional</h3>
            <p>Captura visual del formato de compatibilidad de empleos</p>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <div className="document-shell">
            <div className="compatibility-header">
              <div className="compatibility-header__top">
                <div className="logo-slot">
                  <div className="logo-slot__title">Función Pública</div>
                  <div className="logo-slot__sub">Secretaría de la Función Pública</div>
                </div>

                <div className="compatibility-header__center">
                  <p className="compatibility-header__clave">TECNM_T19</p>
                  <h1>Formato de Compatibilidad de Empleos</h1>
                  <p className="compatibility-header__subtitle">
                    Secretaría de Educación Pública · Tecnológico Nacional de México
                  </p>
                </div>

                <div className="logo-slot logo-slot--wide">
                  <div className="logo-slot__title">Educación</div>
                  <div className="logo-slot__sub">Tecnológico Nacional de México</div>
                </div>
              </div>
            </div>

            <section className="document-section">
              <div className="section-heading">
                <div>
                  <h2>Datos del solicitante</h2>
                  <p>Información general para la solicitud</p>
                </div>
              </div>

              <div className="field-grid">
                <label className="field-control">
                  <span>RFC</span>
                  <input type="text" defaultValue="RORV740111AX7" />
                </label>

                <label className="field-control">
                  <span>Apellido paterno</span>
                  <input type="text" />
                </label>

                <label className="field-control">
                  <span>Apellido materno</span>
                  <input type="text" />
                </label>

                <label className="field-control field-control--full">
                  <span>Nombre(s)</span>
                  <input type="text" />
                </label>
              </div>
            </section>

            <section className="document-section">
              <div className="section-heading">
                <div>
                  <h2>Institución 1</h2>
                  <p>Institución que certifica los datos del puesto actual</p>
                </div>
              </div>

              <div className="field-grid">
                <label className="field-control">
                  <span>Puesto o contrato</span>
                  <input type="text" defaultValue="Profesor de Asignatura C (E.S.)" />
                </label>

                <label className="field-control">
                  <span>Código presupuestal</span>
                  <input type="text" defaultValue="E3525" />
                </label>

                <label className="field-control">
                  <span>Unidad de adscripción</span>
                  <input type="text" defaultValue="Instituto Tecnológico de Ensenada" />
                </label>

                <label className="field-control">
                  <span>Fecha de alta</span>
                  <input type="date" defaultValue="2009-09-01" />
                </label>

                <label className="field-control">
                  <span>Tipo de nombramiento</span>
                  <input type="text" defaultValue="(10) Definitivo" />
                </label>

                <label className="field-control">
                  <span>Remuneración</span>
                  <input type="text" defaultValue="$3,751.50" />
                </label>

                <label className="field-control field-control--full">
                  <span>Partida y clave presupuestal</span>
                  <input type="text" defaultValue="11007 / 1403E352506.0135201" />
                </label>

                <label className="field-control field-control--full">
                  <span>Ubicación, horario y tiempo de traslado</span>
                  <textarea
                    rows="4"
                    defaultValue="Blvd. Tecnológico #150, Ex Ejido Chapultepec, Ensenada, Baja California. Lunes de 07:00 a 09:00, 12:00 a 14:00 y de 18:00 a 20:00 hrs."
                  />
                </label>
              </div>
            </section>

            <section className="document-section">
              <div className="section-heading">
                <div>
                  <h2>Institución 2</h2>
                  <p>Institución que valida los datos del puesto a desempeñar</p>
                </div>
              </div>

              <div className="field-grid">
                <label className="field-control">
                  <span>Institución</span>
                  <input type="text" defaultValue="CETMAR No. 11" />
                </label>

                <label className="field-control">
                  <span>Puesto o contrato</span>
                  <input type="text" />
                </label>

                <label className="field-control">
                  <span>Código presupuestal</span>
                  <input type="text" />
                </label>

                <label className="field-control field-control--full">
                  <span>Observaciones</span>
                  <textarea rows="4" />
                </label>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Topbar>
  );
}