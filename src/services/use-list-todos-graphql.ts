import { Todo } from "@/app/types/todo";
import { useEffect, useState } from "react";

export function useGetListTodos({ delay = 0 }: { delay?: number }) {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const mutate = () => {
    setLoading(true);
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: `query { todoList { text completed } }` }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        await new Promise((resolve) => setTimeout(resolve, delay)).then(() =>
          setData(data.data.todoList)
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    mutate();
  }, []);

  return { data, loading, mutate };
}

export function mutateAddTodo(text: string) {
  return fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: `mutation { addTodo(text: "${text}") }` }),
  });
}

export function mutateRemoveTodo(text: string) {
  return fetch(`/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: `mutation { removeTodo(text: "${text}") }` }),
  });
}

export function mutateToggleTodo(text: string) {
  return fetch(`/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: `mutation { toggleTodo(text: "${text}") }` }),
  });
}
