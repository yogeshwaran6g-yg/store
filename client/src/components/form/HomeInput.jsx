export default function Input({ label, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full px-4 py-3 rounded-xl
          border border-gray-300
          focus:ring-2 focus:ring-yellow-400
          focus:outline-none
        "
        required
      />
    </div>
  );
}
