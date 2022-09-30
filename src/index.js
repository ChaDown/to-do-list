import "./style.css";
import { format, parseISO } from "date-fns";
import { renderTask } from "./view.js";
import {
  addTaskHandler,
  tasksArr,
  addItemModal,
  closeModalHandler,
  showModalHandler,
  addIconBtn,
} from "./handlers";

const addBtn = document.querySelector(".add-btn");

// Factory function to create to-do item
export function ToDoItem(
  title,
  description,
  dueDate,
  priority,
  project,
  completed = false
) {
  (this.title = title),
    (this.description = description),
    (this.dueDate = dueDate),
    (this.priority = priority),
    (this.project = project);
  this.completed = completed;
}

// Add event listeners
addBtn.addEventListener("click", addTaskHandler);
addIconBtn.addEventListener("click", showModalHandler);
document.addEventListener("click", closeModalHandler);

(function init() {
  if (tasksArr) renderTask(tasksArr);
  console.log(JSON.parse(localStorage.getItem("tasksArr")));
})();
