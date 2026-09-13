"use client";

import { deleteTodo, toggleTodo } from "./actions";

type Todo = {
  id: string;
  title: string;
  is_complete: boolean;
};

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <li className="flex items-center gap-3 border-b py-2">
      <input
        type="checkbox"
        defaultChecked={todo.is_complete}
        onChange={(e) => toggleTodo(todo.id, e.target.checked)}
      />
      <span className={todo.is_complete ? "flex-1 line-through text-gray-400" : "flex-1"}>
        {todo.title}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-sm text-red-600 hover:underline"
      >
        excluir
      </button>
    </li>
  );
}
