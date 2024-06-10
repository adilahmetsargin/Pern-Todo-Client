import { useState } from "react";
import { Todo } from "../services/todoService";
import { deleteTodo, updateTodo } from "../services/todoService"; // updateTodo fonksiyonunu ekleyin
import styles from "../styles/Home.module.css";

interface TodoItemProps {
  todo: Todo;
  onDelete: () => void;
  onEdit: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState<string>(
    todo.description
  );
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setNewDescription(todo.description);
  };

  const handleSaveEdit = async () => {
    try {
      await updateTodo(todo.id, newDescription);
      setEditing(false);
      onEdit();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      setDeleting(true);
      await deleteTodo(todo.id);
      onDelete();
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <li className={styles.item}>
      {editing ? (
        <>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className={styles.input}
          />
          <div className={styles.buttonGroup}>
            <button
              onClick={handleSaveEdit}
              className={`${styles.button} ${styles.saveButton}`}
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className={`${styles.button} ${styles.cancelButton}`}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{todo.description}</span>
          <div>
            <button onClick={handleEdit} className={styles.editButton}>
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={styles.deleteButton}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
