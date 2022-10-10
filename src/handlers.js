import { format, parseISO, parse } from "date-fns";
import { createInfoMarkup, renderProjectSidebar, renderTask } from "./view.js";
import { ToDoItem } from "./index.js";
import {
  closeCheckDelete,
  openCheckDelete,
  darkenScreen,
  removeDarkenScreen,
  closeModal,
  openModal,
  openNewProject,
  closeNewProject,
  isAChildNode,
  getClickedItem,
  getClickedItemIndex,
  changePriorityLogic,
} from "./helpers.js";

const addItemModal = document.querySelector(".add-item-modal");
export const addIconBtn = document.querySelector(".add-icon");
export const allTasksBtn = document.querySelector(".all-tasks-btn");
export const homeBtn = document.querySelector(".home-btn");
export const closeIcon = document.querySelector(".close-icon");
export const addBtn = document.querySelector(".add-btn");
export const editTaskModal = document.querySelector(".edit-task-modal");

// DOM elements add task
const newTitle = document.getElementById("title-add");
const newDescription = document.getElementById("description-add");
const newDueDate = document.getElementById("due-add");
const newPriority = document.getElementById("priority-add");
const newProject = document.getElementById("projects-select-add");
// DOM elements edit task
const editTitle = document.getElementById("title-edit");
const editDescription = document.getElementById("description-edit");
const editDueDate = document.getElementById("due-edit");
const editPriority = document.getElementById("priority-edit");
const editProject = document.getElementById("projects-select-edit");
export const allTaskBtns = [homeBtn, allTasksBtn];

// Sets the default tasksArr/projectsArr from local storage or and empty array if there is nothing stored!
export const tasksArr = JSON.parse(localStorage.getItem("tasksArr")) ?? [];
export const projectsArr =
  JSON.parse(localStorage.getItem("projectsArr")) ?? [];

// Handler to add new task to tasks Array from modal data
export function addTaskHandler() {
  // Create new to-do item
  const newItem = new ToDoItem(
    newTitle.value,
    newDescription.value,
    format(parseISO(newDueDate.value), "LLL d 'at' k:m"),
    newPriority.value,
    newProject.value
  );

  // Add to tasksArr and update the UI and clear form
  tasksArr.push(newItem);
  renderTask(tasksArr);
  closeModal(addItemModal);
  document.querySelector(".form-container").reset();
}

export function showModalHandler(e) {
  addItemModal.classList.remove("hidden");
  darkenScreen();
  closeIcon.addEventListener("click", () => closeModal(addItemModal));
}

////////////////// ICON HANDLERS /////////////
export function setIconHandlers(arr) {}

export function deleteHandler(e) {
  const deleteYes = document.querySelector(".delete-yes");
  const deleteCancel = document.querySelector(".delete-cancel");

  openCheckDelete();

  // Find the selected item in tasksArr and remove it and re-render
  deleteYes.addEventListener("click", () => {
    // Match clicked item with object in tasksArr using data-title attribute

    const deletedItem = getClickedItem(e);

    //Find index of del item needed to use splice method below.
    const deletedItemIndex = getClickedItemIndex(e);

    //Save deleted project to rerender project page when deleted
    const deletedProject = deletedItem.project;

    //Delete from tasks array
    tasksArr.splice(deletedItemIndex, 1);

    // Render either tasks array or project page, depending on if delete was clicked on All tasks page or a project page.
    // Make array of objects with matching project of deleted object.
    const projectItemsArr = tasksArr.filter(
      (el) => el.project === deletedProject
    );

    const folderName = document.querySelector(".folder-name");

    // Identify if we're on All Tasks page or specific project page. Render the result, so that the rendering is seamless and we're still on the same page, without the deleted item.
    console.log(folderName.textContent);
    if (folderName.textContent === "All Tasks") renderTask(tasksArr);
    else {
      renderTask(projectItemsArr);
    }

    closeCheckDelete();
  });

  // Close the modal
  deleteCancel.addEventListener("click", () => {
    closeCheckDelete();
  });
}

export function editTaskHandler(e) {
  const closeEditBtn = document.querySelector(".close-edit");
  const saveEditBtn = document.querySelector(".edit-btn");
  const clickedItemObject = getClickedItem(e);

  closeEditBtn.addEventListener("click", () => closeModal(editTaskModal));
  saveEditBtn.addEventListener("click", saveEditHandler);

  openModal(editTaskModal);

  // Update edit form values using the clicked object to be edited so they appear.
  editTitle.value = clickedItemObject.title;
  editDescription.value = clickedItemObject.description;
  editDueDate.value = "";
  editPriority.value = clickedItemObject.priority;
  editProject.value = clickedItemObject.project;

  //Update task object values based on edited input data when save is pressed.
  function saveEditHandler(e) {
    // Stop page reloading when submit button pressed
    e.preventDefault();

    clickedItemObject.title = editTitle.value;
    clickedItemObject.description = editDescription.value;
    clickedItemObject.dueDate = format(
      parseISO(editDueDate.value),
      "LLL d 'at' k:m"
    );
    clickedItemObject.priority = editPriority.value;
    clickedItemObject.project = editProject.value;

    // Render with updated object
    renderTask(tasksArr);
    closeModal(editTaskModal);
  }
}

export function changePriority(e) {
  console.log("hello");
  const clickedItemObject = getClickedItem(e);
  console.log(clickedItemObject);

  changePriorityLogic(clickedItemObject);

  renderTask(tasksArr);
}

/////////////////////// PROJECTS ////////////////////////

export function addToProjectHandler(e) {
  const addYesBtn = document.querySelector(".add-yes");
  const addCancelBtn = document.querySelector(".add-cancel");

  //Open add to project modal
  const addToProjectModal = document.querySelector(".add-to-project-modal");
  openModal(addToProjectModal);

  // When add is clicked, add a property to object in tasks arr with selected project as value.
  addYesBtn.addEventListener("click", () => {
    const dropdown = document.getElementById("projects-select");
    //Find selected item in tasks Array from data-title attribute
    const tasksArrItemName = e.target.parentNode.dataset.title;
    //filter tasksArr with the name to get the toDo object
    const selectedItemObject = tasksArr.find(
      (el) => el.title === tasksArrItemName
    );
    //Assign selected project value to selected toDo object property
    selectedItemObject.project = dropdown.value;
    closeModal(addToProjectModal);
    //Save tasks array
    const tasksArrString = JSON.stringify(tasksArr);
    localStorage.setItem("tasksArr", tasksArrString);
  });

  addCancelBtn.addEventListener("click", () => closeModal(addToProjectModal));
}

export function createProjectHandler() {
  const newProject = document.getElementById("project-name");

  if (newProject.value) {
    projectsArr.push(newProject.value);
    renderProjectSidebar(projectsArr);
    closeNewProject();
  }
}

export function projectsSidebarClickHandler() {
  const projects = document.querySelectorAll(".project");
  const chevronDownIcon = document.querySelector(".chevron-down");
  const chevronUpIcon = document.querySelector(".chevron-up");

  projects.forEach((el) => el.classList.toggle("hidden"));
  chevronDownIcon.classList.toggle("hidden");
  chevronUpIcon.classList.toggle("hidden");
}

export function openProjectPage() {
  const projectsElsArr = document.querySelectorAll(".projects-dropdown");
  const projectTitle = document.querySelector(".folder-name");

  function projectOpenHandler(e) {
    // Create an array with tasks whose projects match the clicked project
    const projectName = e.target.textContent.trim();
    const projectItemsArr = tasksArr.filter((el) => el.project === projectName);
    renderTask(projectItemsArr);
    projectTitle.textContent = projectName;
  }

  // Add event listeners for each project
  projectsElsArr.forEach((el) =>
    el.addEventListener("click", projectOpenHandler)
  );
}

export function allTasksHandler() {
  const projectTitle = document.querySelector(".folder-name");
  projectTitle.textContent = "All Tasks";
  renderTask(tasksArr);
}
