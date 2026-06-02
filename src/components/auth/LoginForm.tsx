import { Lock, User } from "lucide-react";
import { useState } from "react";

type LoginFormProps = {
  onLogin: (username: string, password: string) => boolean;
};

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = onLogin(username.trim(), password.trim());

    if (!success) {
      setError("Invalid username or password.");
      return;
    }

    setError("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg">
            <Lock size={30} />
          </div>

          <h1 className="text-3xl font-black text-slate-900">
            Quotation Generator
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to create professional A4 quotations.
          </p>
        </div>

        <label className="mb-2 block text-sm font-bold text-slate-700">
          Username
        </label>

        <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <User size={18} className="text-slate-400" />

          <input
            className="w-full bg-transparent outline-none"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <label className="mb-2 block text-sm font-bold text-slate-700">
          Password
        </label>

        <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Lock size={18} className="text-slate-400" />

          <input
            className="w-full bg-transparent outline-none"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {error}
          </div>
        )}

        <button className="w-full rounded-xl bg-sky-600 px-5 py-3 font-black text-white shadow-lg transition hover:bg-sky-700">
          Login
        </button>

        <p className="mt-5 text-center text-xs text-slate-400">
          .
        </p>
      </form>
    </main>
  );
}