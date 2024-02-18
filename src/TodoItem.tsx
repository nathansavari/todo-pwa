import React from "react";
import { Todo } from "./types";

interface Props {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li>
      <p style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        {todo.text}
      </p>

      <div>
        {todo.completed ? (
          <button onClick={() => deleteTodo(todo.id)}>Supprimer</button>
        ) : null}

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
      </div>
    </li>
  );
};

export default TodoItem;
