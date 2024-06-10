import { Todo } from "../services/todoService";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onDelete: () => void;
  onEdit: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onEdit }) => {
  const handleTodoDeleted = () => {
    onDelete();
  };
  const handleTodoEdited = () => {
    onEdit();
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleTodoDeleted}
          onEdit={handleTodoEdited}
        />
      ))}
    </ul>
  );
};

export default TodoList;
