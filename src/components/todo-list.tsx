"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import {
  mutateAddTodo,
  mutateRemoveTodo,
  mutateToggleTodo,
  useGetListTodos,
} from "@/services/use-get-list-todos";
import { cn } from "@/lib/utils";

export function TodoList() {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: dataTodos,
    loading: loadingTodos,
    mutate: mutateTodos,
  } = useGetListTodos({delay:0});

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      mutateAddTodo(newTodo).then(() => mutateTodos());
      setNewTodo("");
    }
  };

  const toggleTodo = (text: string) => {
    mutateToggleTodo(text).then(() => mutateTodos());
  };

  const removeTodo = (text: string) => {
    mutateRemoveTodo(text).then(() => mutateTodos());
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <form onSubmit={addTodo} className="flex mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow mr-2"
        />
        <Button type="submit">Add</Button>
      </form>
      <ul className={cn("space-y-2", loadingTodos && "animate-pulse")}>
        {dataTodos.map((todo) => (
          <li
            key={todo.text}
            className="flex items-center justify-between p-2 bg-gray-100 rounded"
          >
            <div className="flex items-center">
              <Checkbox
                id={`todo-${todo.text}`}
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.text)}
                className="mr-2"
              />
              <label
                htmlFor={`todo-${todo.text}`}
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeTodo(todo.text)}
              aria-label="Remove todo"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center p-4 text-gray-500">
        {loadingTodos && !dataTodos.length ? "Loading..." :  ""}
        {!loadingTodos && !dataTodos.length ? "No todos yet" : ""}
      </div>
    </div>
  );
}
