import {
  deleteHandler,
  editTaskHandler,
  addToProjectHandler,
  tasksArr,
  changePriority,
  checkBoxHandler,
  clearCheckboxHandler,
  todayHandler,
} from "./handlers";

import { renderTask } from "./view";

export function priorityColor(item) {
  if (item.priority == 1) return "red";
  if (item.priority == 2) return "orange";
  if (item.priority == 3) return "yellow";
}

export function changePriorityLogic(obj) {
  if (obj.priority == 1) {
    obj.priority = 2;
    return;
  }
  if (obj.priority == 2) {
    obj.priority = 3;
    return;
  }
  if (obj.priority == 3) obj.priority = 1;
}

export function darkenScreen() {
  const header = document.querySelector(".header");
  const sidebar = document.querySelector(".sidebar");
  const itemContainer = document.querySelector(".item-container");
  const footer = document.querySelector(".footer");
  const displayArr = [header, sidebar, itemContainer, footer];

  displayArr.forEach((el) => el.classList.add("darkscale"));
}

export function removeDarkenScreen() {
  const header = document.querySelector(".header");
  const sidebar = document.querySelector(".sidebar");
  const itemContainer = document.querySelector(".item-container");
  const footer = document.querySelector(".footer");
  const displayArr = [header, sidebar, itemContainer, footer];

  displayArr.forEach((el) => el.classList.remove("darkscale"));
}

export function openCheckDelete() {
  const deleteModal = document.querySelector(".delete-check-modal");
  deleteModal.classList.remove("hidden");
  darkenScreen();
}

export function closeCheckDelete() {
  const deleteModal = document.querySelector(".delete-check-modal");
  deleteModal.classList.add("hidden");
  removeDarkenScreen();
}

export function openNewProject() {
  const newProjectModal = document.querySelector(".new-project-modal");
  newProjectModal.classList.remove("hidden");
  darkenScreen();
}

export function closeNewProject() {
  document.querySelector(".new-project-modal").classList.add("hidden");
  removeDarkenScreen();
}

export function addMainContainerListeners() {
  // Add new event listeners every time we render
  const itemNamesArr = document.querySelectorAll(".item-name");
  const deleteBtnsArr = document.querySelectorAll(".delete");
  const editBtnsArr = document.querySelectorAll(".edit");
  const addBtnsArr = document.querySelectorAll(".add");
  const priorityBtnsArr = document.querySelectorAll(".icon-priority");
  const emptyCheckBoxArr = document.querySelectorAll(".check-empty");
  const checkedBoxesArr = document.querySelectorAll(".check-checked");
  const addItemModal = document.querySelector(".add-item-modal");

  deleteBtnsArr.forEach((el) => el.addEventListener("click", deleteHandler));
  editBtnsArr.forEach((el) => el.addEventListener("click", editTaskHandler));
  addBtnsArr.forEach((el) => el.addEventListener("click", addToProjectHandler));
  priorityBtnsArr.forEach((el) => el.addEventListener("click", changePriority));
  emptyCheckBoxArr.forEach((el) =>
    el.addEventListener("click", checkBoxHandler)
  );
  checkedBoxesArr.forEach((el) =>
    el.addEventListener("click", clearCheckboxHandler)
  );

  // Add info panel toggle when item name is clicked
  itemNamesArr.forEach((item) =>
    item.addEventListener("click", () => {
      item.lastChild.classList.toggle("hidden");
    })
  );
}

export function closeModal(modal) {
  modal.classList.add("hidden");
  removeDarkenScreen();
}

export function openModal(modal) {
  modal.classList.remove("hidden");
  darkenScreen();
}

export function isOnMainPage() {
  const items = document.querySelector("items");

  parent.contains(child) ? true : false;
}

export function getClickedItem(event) {
  const clickedNode = event.target;
  const clickedItemName = clickedNode.parentNode.dataset.title;
  const clickedItem = tasksArr.find((el) => el.title === clickedItemName);

  return clickedItem;
}

export function getClickedItemIndex(event) {
  const clickedNode = event.target;
  const clickedItemName = clickedNode.parentNode.dataset.title;
  const clickedItemIndex = tasksArr.findIndex(
    (el) => el.title === clickedItemName
  );

  return clickedItemIndex;
}

// Function used when rendering to choose whether to render all tasks page or a specific project page, based on the current page.
export function renderAllTasksOrProject() {
  // Use current folder name to see if we are on All Tasks or a project page
  const folderName = document.querySelector(".folder-name").textContent;
  // Get all tasks in given project
  const projectItemsArr = tasksArr.filter((el) => el.project === folderName);
  // Identify if we're on All Tasks page or specific project page.
  if (folderName === "All Tasks") renderTask(tasksArr);
  if (folderName === "Today's Tasks") todayHandler();
  else {
    renderTask(projectItemsArr);
  }
}
