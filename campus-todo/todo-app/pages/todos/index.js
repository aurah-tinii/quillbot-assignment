import React from "react";
import CreateTodo from "../../components/Todos/CreateTodo";
import getTodos from "../../utils/todos/getTodos";
import deleteTodo from "../../utils/todos/deleteTodo";
import completeTodo from "../../utils/todos/completeTodo";
import favorite from "../../utils/todos/fav";
import editTodo from "../../utils/todos/edit";


export default function Todos() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    getTodos().then((todos) => setTodos(todos));
  }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleStar = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    console.log(todo.starred)
    const res = await favorite(id, todo.starred);
    console.log(JSON.stringify(res));
    setTodos(todos.map((todo) => (todo.id === id ? res : todo)));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const dueBy = e.target.datetime.value
    const title = e.target.title.value;
    const id = e.target.id.value
    const todo = todos.find((todo) => todo.id === id);
    const res = await editTodo(id, dueBy, title);
    console.log(res)
    setTodos(todos.map((todo) => res));
  };

  const handleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const response = await completeTodo(id, todo.completed);
    console.log(JSON.stringify(response))
    // const updatedTodo = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? response : todo)));
  };

  return (
    <div>
      <h1>Todos</h1>

      {/* Search bar */}
      <div>
        <input type="text" placeholder="Search" />
      </div>

      {/* Sorting dropdown */}
      <div>
        <select>
          <option value="title">Title</option>
          <option value="createdAt">Created At (Asc)</option>
          <option value="-createdAt">Created At (Desc)</option>
        </select>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.starred ? "yellow" : "white",
              backgroundColor: Date.parse(todo.dueBy) < Date.now() ? "red" : "none",
            }}
          >
            {/* {todo.title}
            {todo.dueBy} */}
            <form onSubmit={handleEdit}>
              <input type="text" name="id" defaultValue={todo.id} style = {{display: "none"}}/>
              {/* <input
                type="text"
                name="title"
                defaultValue={todo.title}
              /> */}
              <p>{todo.title}</p>
              <input
                type="datetime-local"
                name="datetime"
                defaultValue={todo.dueBy.split("T").join(" ").split(".")[0]}
              />
              <button type="submit">Edit</button>
            </form>
            <button onClick={() => handleComplete(todo.id)}>Complete</button>
            <button onClick={() => handleStar(todo.id)}>Favorite</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            {/* <button onClick={() => handleEdit(todo.id)}>Edit</button> */}
          </li>
        ))}
      </ul>
      <CreateTodo />
    </div>
  );
}
