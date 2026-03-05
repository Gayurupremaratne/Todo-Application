import TodoItem from './TodoItem';

function TodoList({ todos, onUpdate }) {
  if (!todos.length) {
    return <p className="empty">No todos yet. Add one above.</p>;
  }
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}

export default TodoList;
