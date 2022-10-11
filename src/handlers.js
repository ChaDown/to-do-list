import { format, parseISO, parse } from "date-fns";
import {
  createInfoMarkup,
  renderProjectSidebar,
  renderProjectsSelect,
  renderTask,
} from "./view.js";
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
  renderAllTasksOrProject,
} from "./helpers.js";
import { el } from "date-fns/locale";

const addItemModal = document.querySelector(".add-item-modal");
export const addIconBtn = document.querySelector(".add-icon");
export const allTasksBtn = document.querySelector(".all-tasks-btn");
export const homeBtn = document.querySelector(".home-btn");
export const closeIcon = document.querySelector(".close-icon");
export const addBtn = document.querySelector(".add-btn");
export const editTaskModal = document.querySelector(".edit-task-modal");
export const todayBtn = document.querySelector(".today-btn");
export const menuBtn = document.querySelector(".menu-btn");

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
    newDueDate.value,
    newPriority.value,
    newProject.value
  );

  // Add to tasksArr and update the UI and clear form
  tasksArr.push(newItem);
  renderAllTasksOrProject();
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
  deleteYes.addEventListener(
    "click",
    () => {
      // Match clicked item with object in tasksArr using data-title attribute

      const deletedItem = getClickedItem(e);

      //Find index of del item needed to use splice method below.
      const deletedItemIndex = getClickedItemIndex(e);

      //Save deleted project to rerender project page when deleted
      const deletedProject = deletedItem.project;

      //Delete from tasks array
      tasksArr.splice(deletedItemIndex, 1);

      renderAllTasksOrProject(deletedProject);

      closeCheckDelete();
    },
    { once: true }
  );

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
  saveEditBtn.addEventListener("click", saveEditHandler, { once: true });

  openModal(editTaskModal);

  // Update edit form values using the clicked object to be edited so they appear.
  editTitle.value = clickedItemObject.title;
  editDescription.value = clickedItemObject.description;
  editDueDate.value = clickedItemObject.dueDate;
  editPriority.value = clickedItemObject.priority;
  editProject.value = clickedItemObject.project;

  //Update task object values based on edited input data when save is pressed.
  function saveEditHandler(e) {
    // Stop page reloading when submit button pressed
    e.preventDefault();

    clickedItemObject.title = editTitle.value;
    clickedItemObject.description = editDescription.value;
    clickedItemObject.dueDate = editDueDate.value;
    clickedItemObject.priority = editPriority.value;
    clickedItemObject.project = editProject.value;

    // Render with updated object
    renderAllTasksOrProject(clickedItemObject.project);

    closeModal(editTaskModal);
  }
}

export function changePriority(e) {
  const clickedItemObject = getClickedItem(e);
  changePriorityLogic(clickedItemObject);
  renderAllTasksOrProject();
}

/////////////////////// PROJECTS ////////////////////////

export function addToProjectHandler(e) {
  const addYesBtn = document.querySelector(".add-yes");
  const addCancelBtn = document.querySelector(".add-cancel");

  //Open add to project modal
  const addToProjectModal = document.querySelector(".add-to-project-modal");
  openModal(addToProjectModal);

  // When add is clicked, add a property to object in tasks arr with selected project as value.
  addYesBtn.addEventListener(
    "click",
    () => {
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
    },
    { once: true }
  );

  addCancelBtn.addEventListener("click", () => closeModal(addToProjectModal));
}

export function createProjectHandler() {
  const newProject = document.getElementById("project-name");

  if (newProject.value) {
    projectsArr.push(newProject.value.trim());
    renderProjectSidebar(projectsArr);
    renderProjectsSelect(projectsArr);
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

// This function opens the project page when clicked, and also adds all the event listeners to the project section in the sidebar.
export function openProjectPage() {
  const projectsElsArr = document.querySelectorAll(".projects-dropdown");
  const projectTitle = document.querySelector(".folder-name");
  const xBtnsArr = document.querySelectorAll(".x-btn");

  function deleteProject(e) {
    //Find index of clicked project using it's text content
    const clickedProjectName = e.target.parentElement.textContent.trim();
    const projectIndex = projectsArr.indexOf(clickedProjectName);
    // Remove it from the projects array and rerender
    projectsArr.splice(projectIndex, 1);
    renderProjectSidebar(projectsArr);
    renderProjectsSelect(projectsArr);
  }

  xBtnsArr.forEach((el) => el.addEventListener("click", deleteProject));

  function projectOpenHandler(e) {
    // Create an array with tasks whose projects match the clicked project
    const projectName = e.target.textContent.trim();
    const projectItemsArr = tasksArr.filter((el) => el.project === projectName);
    renderTask(projectItemsArr);
    projectTitle.textContent = projectName;
  }

  // Add event listeners for each project
  projectsElsArr.forEach((el) => {
    el.addEventListener("click", projectOpenHandler);
    el.addEventListener("mouseenter", (e) =>
      e.target.firstElementChild.classList.remove("hidden")
    );
    el.addEventListener("mouseleave", (e) =>
      e.target.firstElementChild.classList.add("hidden")
    );
  });
}

export function allTasksHandler() {
  const projectTitle = document.querySelector(".folder-name");
  projectTitle.textContent = "All Tasks";
  renderTask(tasksArr);
}

export function todayHandler() {
  const today = new Date();
  const todayDate = format(today, "dd/MM/yy");

  const todayArr = tasksArr.filter(
    (el) => format(parseISO(el.dueDate), "dd/MM/yy") === todayDate
  );
  const projectTitle = document.querySelector(".folder-name");
  projectTitle.textContent = "Today's Tasks";
  renderTask(todayArr);
}

export function checkBoxHandler(e) {
  const clickedItem = getClickedItem(e);
  clickedItem.completed = true;
  renderAllTasksOrProject();
}

export function clearCheckboxHandler(e) {
  const clickedItem = getClickedItem(e);
  clickedItem.completed = false;
  renderAllTasksOrProject();
}

export function menuHandler() {
  const sidebar = document.querySelector(".sidebar");
  const mainContainer = document.querySelector(".main-container");

  sidebar.classList.toggle("hidden");
  mainContainer.classList.toggle("menu-hidden");
}
