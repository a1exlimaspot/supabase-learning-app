import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/login/actions";
import { addTodo } from "./actions";
import { TodoItem } from "./todo-item";

export default async function TodosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: todos, error } = await supabase
    .from("todos")
    .select("id, title, is_complete")
    .order("inserted_at", { ascending: false });

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Minhas tarefas</h1>
        <form action={logout}>
          <button className="text-sm text-gray-500 hover:underline">
            sair ({user?.email})
          </button>
        </form>
      </div>

      <form action={addTodo} className="flex gap-2">
        <input
          name="title"
          placeholder="Nova tarefa..."
          required
          className="flex-1 rounded border px-3 py-2"
        />
        <button className="rounded bg-black px-3 py-2 text-white">
          Adicionar
        </button>
      </form>

      {error && (
        <p className="rounded bg-red-100 p-2 text-sm text-red-700">
          {error.message}
        </p>
      )}

      <ul>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      {todos?.length === 0 && (
        <p className="text-sm text-gray-400">Nenhuma tarefa ainda.</p>
      )}
    </div>
  );
}
