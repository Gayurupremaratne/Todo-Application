import { useState } from 'react';
import { createTodo } from '../services/api';

function TodoForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
      await createTodo({ title: trimmed, description: description.trim() });
      setTitle('');
      setDescription('');
      onCreated();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create todo');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Title (required)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
          aria-label="Todo title"
        />
        <button type="submit" disabled={submitting}>
          Add
        </button>
      </div>
      {error && <p className="form-error">{error}</p>}
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={submitting}
        className="form-description"
        aria-label="Todo description"
      />
    </form>
  );
}

export default TodoForm;
