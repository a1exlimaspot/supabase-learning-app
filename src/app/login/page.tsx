import { login, signup } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Entrar</h1>
      <p className="text-sm text-gray-500">
        Projeto de aprendizado com Supabase Auth.
      </p>

      {error && (
        <p className="rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>
      )}
      {message && (
        <p className="rounded bg-green-100 p-2 text-sm text-green-700">
          {message}
        </p>
      )}

      <form className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          E-mail
          <input
            name="email"
            type="email"
            required
            className="rounded border px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Senha
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="rounded border px-3 py-2"
          />
        </label>

        <div className="mt-2 flex gap-2">
          <button
            formAction={login}
            className="flex-1 rounded bg-black px-3 py-2 text-white"
          >
            Entrar
          </button>
          <button
            formAction={signup}
            className="flex-1 rounded border px-3 py-2"
          >
            Criar conta
          </button>
        </div>
      </form>
    </div>
  );
}
