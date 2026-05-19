export default function Badge({ color = 'blue', children }) {
  return (
    <span className={`badge ${color}`}>
      {children}
    </span>
  );
}