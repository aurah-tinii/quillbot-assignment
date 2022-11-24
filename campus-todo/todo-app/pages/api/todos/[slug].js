import Todo from "../../../db/models/Todo";
import log from "../../../components/Todos/logs"

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { slug } = req.query;
    const todo = await Todo.findByPk(slug);
    log("DELETE","",todo)
    await todo.destroy();
    res.status(204).end();
  }
  if (req.method === "PATCH") {
    const { slug } = req.query;
    const { completed,started,dueby,title } = req.body;
    const kys = Object.keys(req.body);
    const todo = await Todo.findByPk(slug);
    const todo1 = await Todo.findByPk(slug);
    if(kys[0] == 'started'){
      todo.starred = started;
    }
    else if(kys[0] == 'isedit'){
      todo.dueBy = dueby;
      todo.title = title;
    }
    else
    todo.completed = completed;
    log("EDIT",todo,todo1);
    await todo.save();
    res.status(200).json(todo);
  }
}
