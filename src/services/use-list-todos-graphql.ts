import { Todo } from "@/app/types/todo";
import { useEffect, useState } from "react";

export function useGetListTodos({ delay = 0 }: { delay?: number }) {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [latency, setLatency] = useState(0);

  const mutate = () => {
    setLoading(true);
    const start = Date.now();
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: `query { todoList { text completed } }` }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
        setData(data.data.todoList)
      })
      .finally(() => {
        setLoading(false);
        setLatency(Date.now() - start);
      });
  };

  useEffect(() => {
    mutate();
  }, []);

  return { data, loading, mutate, latency };
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
