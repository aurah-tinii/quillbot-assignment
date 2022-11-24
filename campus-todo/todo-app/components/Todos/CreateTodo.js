import React from "react";
const getTime = () =>{
  let t = new Date
  t = t.toJSON()
  return t.split("T").join(" ").split(".")[0]
}


const CreateTodo = () => {
  // const [title, setTitle,dt] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dueBy = e.target.datetime.value.split("T").join(" ");
    const title = e.target.title.value;
    console.log(title, dueBy);
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        dueBy,
      }),
    });
    const todo = await response.json();
  };

  return (
    <div>
      <h1>Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
        />
        <input
          name="datetime"
          type="datetime-local"
          min = {getTime()}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTodo;
