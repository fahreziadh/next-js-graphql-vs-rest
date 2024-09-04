"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import * as graphql from "@/services/use-list-todos-graphql";
import * as rest from "@/services/use-list-todos";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export function TodoList() {
  const [type, setType] = useState<string>("rest");

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-row items-start justify-between">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <a
          href="https://github.com/fahreziadh/next-js-graphql-vs-rest"
          className="text-sm text-blue-500 underline"
        >
          Repository
        </a>
      </div>
      <Tabs value={type} onValueChange={setType} className="mb-4">
          <TabsList>
            <TabsTrigger value="rest">REST</TabsTrigger>
            <TabsTrigger value="graphql">GraphQL</TabsTrigger>
          </TabsList>
        </Tabs>
      {type === "rest" ? <Rest /> : <GraphQl />}
    </div>
  );
}

const GraphQl = () => {
  const [newTodo, setNewTodo] = useState("");

  const { mutateAddTodo, mutateRemoveTodo, mutateToggleTodo, useGetListTodos } =
    graphql;

  const {
    data: dataTodos,
    loading: loadingTodos,
    mutate: mutateTodos,
    latency: latencyTodos,
  } = useGetListTodos({ delay: 0 });

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
    <>
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
        {loadingTodos && !dataTodos.length ? "Loading..." : ""}
        {!loadingTodos && !dataTodos.length ? "No todos yet" : ""}
      </div>
      <div className="text-xs opacity-50">response-time: {latencyTodos}ms</div>
    </>
  );
};


const Rest = () => {
  const [newTodo, setNewTodo] = useState("");

  const { mutateAddTodo, mutateRemoveTodo, mutateToggleTodo, useGetListTodos } =
    rest;

  const {
    data: dataTodos,
    loading: loadingTodos,
    mutate: mutateTodos,
    latency: latencyTodos,
  } = useGetListTodos({ delay: 0 });

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
    <>
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
        {loadingTodos && !dataTodos.length ? "Loading..." : ""}
        {!loadingTodos && !dataTodos.length ? "No todos yet" : ""}
      </div>
      <div className="text-xs opacity-50">response-time: {latencyTodos}ms</div>
    </>
  );
};
