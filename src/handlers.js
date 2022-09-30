import { format, parseISO } from "date-fns";
import { renderTask } from "./view.js";
import { ToDoItem } from "./index.js";

const newTitle = document.getElementById("title");
const newDescription = document.getElementById("description");
const newDueDate = document.getElementById("due");
const newPriority = document.getElementById("priority");
const newProject = document.getElementById("project");
const addItemModal = document.querySelector(".add-item-modal");
export const addIconBtn = document.querySelector(".add-icon");

// Sets the default tasksArr from local storage or and empty array if there is nothing stored!
export const tasksArr = JSON.parse(localStorage.getItem("tasksArr")) ?? [];

// Handler to add new task to tasks Array from modal data
export function addTaskHandler() {
  const newItem = new ToDoItem(
    newTitle.value,
    newDescription.value,
    format(parseISO(newDueDate.value), "LLL d 'at' k:m"),
    newPriority.value,
    newProject.value
  );

  // Add to tasksArr and update the UI
  tasksArr.push(newItem);
  renderTask(tasksArr);
  addItemModal.style.display = "none";
  document.querySelector(".form-container").reset();

  // Store tasksArr to local storage
  const tasksArrString = JSON.stringify(tasksArr);
  localStorage.setItem("tasksArr", tasksArrString);
}

// Function to close modal when outer screen is clicked
export function closeModalHandler(e) {
  if (e.target !== addIconBtn) {
    const clickInside = addItemModal.contains(e.target);

    if (!clickInside) addItemModal.style.display = "none";
  }
}

export function showModalHandler() {
  addItemModal.style.display = "block";
}
