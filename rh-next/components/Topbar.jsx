import Sidebar from './Sidebar';

export default function Topbar({ title, subtitle, actions, children }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main">
        <header className="topbar">
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          {actions ? actions : null}
        </header>

        {children}
      </main>
    </div>
  );
}