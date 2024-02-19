import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import { Todo } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo: Todo = { id: Date.now(), text: input, completed: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Move localStorage update here
    setInput("");
  };

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          placeholder="Nouvelle tâche"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
