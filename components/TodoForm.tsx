import { useState, FormEvent, ChangeEvent } from "react";
import { addTodo, Todo } from "../services/todoService";
import styles from "../styles/Home.module.css"; // Stilleri ekleyin

interface TodoFormProps {
  onTodoAdded: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onTodoAdded }) => {
  const [description, setDescription] = useState<string>("");

  const handleAddTodo = async (event: FormEvent) => {
    event.preventDefault();
    if (description.trim() === "") {
      return;
    }
    try {
      const newTodo = await addTodo(description);
      onTodoAdded(newTodo);
      setDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Add a new todo"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;
