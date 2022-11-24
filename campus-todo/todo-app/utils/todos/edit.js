const editTodo = async (id, dueby,title) => {
    const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            isedit:true,
            dueby: dueby,
            title : title,
        }),
    });
    const json = await response.json();
    return json;
};

export default editTodo;
