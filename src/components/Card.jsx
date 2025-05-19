export default function Card({ className = "", children }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 transition-colors ${className}`}
    >
      {children}
    </div>
  );
}