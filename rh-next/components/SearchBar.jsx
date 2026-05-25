export default function SearchBar({ placeholder = 'Buscar...', value = '', onChange = () => {} }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border p-2 w-full"
      />
    </div>
  );
}