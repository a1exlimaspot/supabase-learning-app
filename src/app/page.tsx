import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold">Supabase + Next.js</h1>
      <p className="max-w-sm text-gray-500">
        Projeto de aprendizado: autenticação com Supabase Auth e uma tabela
        com Row Level Security.
      </p>

      {user ? (
        <Link
          href="/todos"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Ir para minhas tarefas ({user.email})
        </Link>
      ) : (
        <Link href="/login" className="rounded bg-black px-4 py-2 text-white">
          Entrar / Criar conta
        </Link>
      )}
    </div>
  );
}
