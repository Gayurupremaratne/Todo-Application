import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { getTodos } from "./services/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Failed to load todos",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodoCreated = () => {
    fetchTodos();
    setShowForm(false);
  };

  return (
    <div className="app">
      <header>
        <h1>TODO App</h1>
      </header>
      {!showForm ? (
        <div className="add-button-wrap">
          <button
            type="button"
            className="add-button"
            onClick={() => setShowForm(true)}
          >
            Add
          </button>
        </div>
      ) : (
        <TodoForm onCreated={handleTodoCreated} />
      )}
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="todo-list-wrap">
          <TodoList todos={todos} onUpdate={fetchTodos} />
        </div>
      )}
    </div>
  );
}

export default App;
