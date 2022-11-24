const favorite = async (id, favstatus) => {
    const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            started: !favstatus,
        }),
    });
    const json = await response.json();
    return json;
};

export default favorite;
