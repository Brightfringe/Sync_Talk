import { useState } from "react";
import { signInWithGoogle } from "@/lib/firebase";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleLogin() {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError("Failed to sign in. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 flex flex-col items-center gap-6 shadow-2xl w-full max-w-sm">

        <div className="flex items-center gap-2 mb-2">
          <span className="text-4xl font-bold text-white">Sync</span>
          <span className="text-4xl font-bold text-pink-300">Talk</span>
        </div>

        <p className="text-white/70 text-center text-sm">
          Sign in to join the conversation
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-md disabled:opacity-60"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C41 35.3 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
          </svg>
          {loading ? "Signing in..." : "Continue with Google"}
        </button>

        {error && (
          <p className="text-red-300 text-sm text-center">{error}</p>
        )}

        <p className="text-white/40 text-xs text-center mt-2">
          Everyone in the room will see your messages
        </p>
      </div>
    </div>
  );
}