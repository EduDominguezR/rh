export default function SearchBar({ placeholder = 'Buscar...' }) {
  return (
    <div className="search">
      <input type="text" placeholder={placeholder} />
    </div>
  );
}