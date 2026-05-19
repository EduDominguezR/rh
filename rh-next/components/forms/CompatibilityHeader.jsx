/**
 * © 2026 Eduardo Domínguez. Todos los derechos reservados.
 * Uso interno y restringido.
 */

export default function CompatibilityHeader({ meta }) {
  return (
    <section className="compatibility-header">
      <div className="compatibility-header__top">
        <div className="logo-slot">
          <span className="logo-slot__title">Función Pública</span>
          <span className="logo-slot__sub">Espacio para logotipo</span>
        </div>

        <div className="compatibility-header__center">
          <p className="compatibility-header__clave">{meta.clave}</p>
          <h1>{meta.title}</h1>
          <p className="compatibility-header__subtitle">
            Tecnológico Nacional de México
          </p>
        </div>

        <div className="logo-slot logo-slot--wide">
          <span className="logo-slot__title">Educación / TecNM</span>
          <span className="logo-slot__sub">Espacio para encabezado institucional</span>
        </div>
      </div>
    </section>
  );
}