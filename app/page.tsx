"use client";

import { useState, useEffect } from "react";
import { getTodos, Todo } from "../services/todoService";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleTodoAdded = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleTodoDeleted = () => {
    getTodos()
      .then(setTodos)
      .catch((error) => console.error("Error fetching todos:", error));
  };
  const handleTodoEdited = () => {
    getTodos()
      .then(setTodos)
      .catch((error) => console.error("Error fetching todos:", error));
  };

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <TodoForm onTodoAdded={handleTodoAdded} />
      <TodoList
        todos={todos}
        onDelete={handleTodoDeleted}
        onEdit={handleTodoEdited}
      />
    </div>
  );
};

export default Home;
