import { addTodo, getListTodos, removeTodo, toggleTodo } from "@/db/todo-list";
import { NextRequest } from "next/server";

// get List of todos
export const GET = async () => {
  return Response.json(getListTodos());
};

// create a new todo
export const POST = async (request: Request) => {
  const { text } = await request.json();
  addTodo(text);
  return Response.json({})
};

// delete a todo
export const DELETE = async (request: Request) => {
  const {text} = await request.json();
  removeTodo(text)
  return Response.json({});
};

// update a todo status
export const PATCH = async (request: Request) => {
  const { text } = await request.json();
  toggleTodo(text);
  return Response.json({});
};
