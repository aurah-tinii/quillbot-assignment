import Todo from "../../../db/models/Todo";
import log from "../../../components/Todos/logs"

export default async (req, res) => {
  if (req.method === "GET") {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  }
  if (req.method === "POST") {
    const { title,dueBy } = req.body;
    const todo = await Todo.create({
      title,
      dueBy,
    });
    log("CREATE",todo,"");
    res.status(201).json(todo);
  }
};
