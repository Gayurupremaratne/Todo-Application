import { useState, useEffect } from 'react';
import { updateTodo } from '../services/api';

function EditTodoModal({ todo, onClose, onSaved }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description || '');
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Title is required');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await updateTodo(todo._id, { title: trimmed, description: description.trim() });
      onSaved();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to update todo');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Todo</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title (required)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
            autoFocus
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={submitting}
            className="form-description"
          />
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={submitting}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTodoModal;
