import { useState } from "react";
import { auth } from "@/lib/firebase";

interface Props {
  onConfirm: (name: string) => void;
}

export default function SetNamePage({ onConfirm }: Props) {
  const suggestedName = auth.currentUser?.displayName || "";
  const [name, setName] = useState(suggestedName);

  function handleConfirm() {
    const trimmed = name.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 flex flex-col items-center gap-6 shadow-2xl w-full max-w-sm">

        <div className="flex items-center gap-2 mb-2">
          <span className="text-4xl font-bold text-white">Sync</span>
          <span className="text-4xl font-bold text-pink-300">Talk</span>
        </div>

        <p className="text-white/70 text-center text-sm">
          What should we call you?
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          placeholder="Enter your name"
          className="w-full bg-white/20 text-white placeholder-white/50 border border-white/30 rounded-xl px-4 py-3 outline-none focus:border-pink-300 transition-all"
          maxLength={30}
          autoFocus
        />

        <button
          onClick={handleConfirm}
          disabled={!name.trim()}
          className="w-full bg-pink-500 hover:bg-pink-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
        >
          Enter Chat →
        </button>
      </div>
    </div>
  );
}