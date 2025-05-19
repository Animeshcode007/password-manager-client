import { useState } from "react";

export default function PasswordGenerator({ onGenerate }) {
  const [length, setLength] = useState(16);

  const generate = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&!*?";
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    onGenerate(pass);
  };

  return (
    <div className="my-4 p-4 bg-gray-100 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <label className="font-semibold">Password Length</label>
        <input
          type="number"
          min={6}
          max={32}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-16 border rounded px-2 py-1"
        />
      </div>
      <button
        onClick={generate}
        className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
      >
        Generate Password
      </button>
    </div>
  );
}
