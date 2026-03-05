import { useState, useEffect } from 'react';
import EditTodoModal from './EditTodoModal';
import { toggleDone, deleteTodo } from '../services/api';

const FADE_OUT_MS = 350;

function TodoItem({ todo, onUpdate }) {
  const [showEdit, setShowEdit] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleToggle = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await toggleDone(todo._id);
      onUpdate();
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = () => {
    if (busy || deleting) return;
    if (!window.confirm('Delete this todo?')) return;
    setDeleting(true);
  };

  useEffect(() => {
    if (!deleting) return;
    const timer = setTimeout(async () => {
      setBusy(true);
      try {
        await deleteTodo(todo._id);
        onUpdate();
      } catch (err) {
        console.error(err);
        setDeleting(false);
      } finally {
        setBusy(false);
      }
    }, FADE_OUT_MS);
    return () => clearTimeout(timer);
  }, [deleting, todo._id, onUpdate]);

  return (
    <>
      <li className={`todo-item ${todo.done ? 'done' : ''} ${deleting ? 'todo-item--deleting' : ''}`}>
        <label className="todo-checkbox">
          <input
            type="checkbox"
            checked={!!todo.done}
            onChange={handleToggle}
            disabled={busy}
          />
        </label>
        <div className="todo-content">
          <span className="todo-title">{todo.title}</span>
          {todo.description && (
            <span className="todo-description">{todo.description}</span>
          )}
        </div>
        <div className="todo-actions">
          <button type="button" onClick={() => setShowEdit(true)} disabled={busy}>
            Edit
          </button>
          <button type="button" onClick={handleDelete} disabled={busy || deleting}>
            Delete
          </button>
        </div>
      </li>
      {showEdit && (
        <EditTodoModal
          todo={todo}
          onClose={() => setShowEdit(false)}
          onSaved={() => {
            setShowEdit(false);
            onUpdate();
          }}
        />
      )}
    </>
  );
}

export default TodoItem;
