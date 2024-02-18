import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import { Todo } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }

    const handleOnline = () => {
      setIsOnline(true);
      // Attempt to synchronize local todos with server when coming back online
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo: Todo = { id: Date.now(), text: input, completed: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInput("");
  };

  return (
    <div className="App">
      <div className="offline">{isOnline ? null : "Problème de réseau :/"}</div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          placeholder="Nouvelle tâche"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Ajouter une tâche</button>
      </form>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
