import "./style.css";
import home from "./assets/home-outline.svg";

function ToDoItem(title, description, dueDate, priority) {
  (this.title = title),
    (this.description = description),
    (this.dueDate = dueDate),
    (this.priority = priority);
}

const toDo1 = new ToDoItem("a", "b", "c", "d");

console.log(toDo1);
