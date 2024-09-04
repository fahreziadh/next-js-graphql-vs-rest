let todoList = new Map<string,boolean>(); // todo and completed

export const getListTodos = () => {
  return Array.from(todoList.entries()).map(([text, completed]) => ({
    text,
    completed,
  }));
};

export const addTodo = (text: string) => {
  todoList.set(text, false);
};

export const removeTodo = (text: string) => {
  todoList.delete(text);
};

export const toggleTodo = (text: string) => {
  todoList.set(text, !todoList.get(text));
};
