import { format, parseISO } from "date-fns";
import {
  renderProjectSidebar,
  renderProjectsSelect,
  renderTask,
} from "./view.js";
import { ToDoItem } from "./index.js";
import {
  getClickedItem,
  getClickedItemIndex,
  changePriorityLogic,
  renderAllTasksOrProject,
  toggleModal,
} from "./helpers.js";

export const DOMElements = {
  addItemModal: document.querySelector(".add-item-modal"),
  addIconBtn: document.querySelector(".add-icon"),
  allTasksBtn: document.querySelector(".all-tasks-btn"),
  homeBtn: document.querySelector(".home-btn"),
  closeIcon: document.querySelector(".close-icon"),
  addBtn: document.querySelector(".add-btn"),
  editTaskModal: document.querySelector(".edit-task-modal"),
  todayBtn: document.querySelector(".today-btn"),
  menuBtn: document.querySelector(".menu-btn"),
  projectTitle: document.querySelector(".folder-name"),
  deleteModal: document.querySelector(".delete-check-modal"),
  newProjectModal: document.querySelector(".new-project-modal"),

  // DOM elements add task
  newTitle: document.getElementById("title-add"),
  newDescription: document.getElementById("description-add"),
  newDueDate: document.getElementById("due-add"),
  newPriority: document.getElementById("priority-add"),
  newProject: document.getElementById("projects-select-add"),
  // DOM elements edit task
  editTitle: document.getElementById("title-edit"),
  editDescription: document.getElementById("description-edit"),
  editDueDate: document.getElementById("due-edit"),
  editPriority: document.getElementById("priority-edit"),
  editProject: document.getElementById("projects-select-edit"),
  editCloseBtn: document.querySelector(".close-edit"),
};

// Sets the default tasksArr/projectsArr from local storage or and empty array if there is nothing stored!
export const allTaskBtns = [DOMElements.homeBtn, DOMElements.allTasksBtn];
export const tasksArr = JSON.parse(localStorage.getItem("tasksArr")) ?? [];
export const projectsArr =
  JSON.parse(localStorage.getItem("projectsArr")) ?? [];

// Handler to add new task to tasks Array from modal data
export function addTaskHandler() {
  if (
    DOMElements.newTitle.value &&
    DOMElements.newDueDate.value &&
    DOMElements.newPriority.value &&
    DOMElements.newProject.value
  ) {
    // Create new to-do item
    const newItem = new ToDoItem(
      DOMElements.newTitle.value,
      DOMElements.newDescription.value,
      DOMElements.newDueDate.value,
      DOMElements.newPriority.value,
      DOMElements.newProject.value
    );

    // Add to tasksArr and update the UI
    tasksArr.push(newItem);
    renderAllTasksOrProject();
    toggleModal(DOMElements.addItemModal);
    document.querySelector(".form-container").reset();
  }
}

export function addModalListeners() {
  // Add item modal
  const closeIcon = document.querySelector(".close-icon");

  DOMElements.addBtn.addEventListener("click", addTaskHandler);
  closeIcon.addEventListener("click", () =>
    toggleModal(DOMElements.addItemModal)
  );
}

////////////////// ICON HANDLERS /////////////
// These are in the main container and will be re added with every render

export function deleteBtnHandler(e) {
  const deleteYes = document.querySelector(".delete-yes");
  const deleteCancel = document.querySelector(".delete-cancel");
  toggleModal(DOMElements.deleteModal);

  deleteYes.addEventListener("click", deleteHandler, { once: true });
  deleteCancel.addEventListener(
    "click",
    () => toggleModal(DOMElements.deleteModal),
    { once: true }
  );

  function deleteHandler() {
    // const deletedItem = getClickedItem(e);
    //Find index of del item needed to use splice method below.
    const deletedItemIndex = getClickedItemIndex(e);
    //Save deleted project to rerender project page when deleted
    // const deletedProject = deletedItem.project;

    //Delete from tasks array
    tasksArr.splice(deletedItemIndex, 1);

    renderAllTasksOrProject();

    //closeCheckDelete();
    toggleModal(DOMElements.deleteModal);
  }
}

export function editTaskHandler(e) {
  const closeEditBtn = document.querySelector(".close-edit");
  const saveEditBtn = document.querySelector(".edit-btn");
  const clickedItemObject = getClickedItem(e);

  closeEditBtn.addEventListener(
    "click",
    () => toggleModal(DOMElements.editTaskModal),
    { once: true }
  );

  saveEditBtn.addEventListener("click", saveEditHandler, { once: true });

  toggleModal(DOMElements.editTaskModal);

  // Update edit form values using the clicked object to be edited so they appear.
  DOMElements.editTitle.value = clickedItemObject.title;
  DOMElements.editDescription.value = clickedItemObject.description;
  DOMElements.editDueDate.value = clickedItemObject.dueDate;
  DOMElements.editPriority.value = clickedItemObject.priority;
  DOMElements.editProject.value = clickedItemObject.project;

  //Update task object values based on edited input data when save is pressed.
  function saveEditHandler(e) {
    // Stop page reloading when submit button pressed
    e.preventDefault();

    clickedItemObject.title = DOMElements.editTitle.value;
    clickedItemObject.description = DOMElements.editDescription.value;
    clickedItemObject.dueDate = DOMElements.editDueDate.value;
    clickedItemObject.priority = DOMElements.editPriority.value;
    clickedItemObject.project = DOMElements.editProject.value;

    // Render with updated object
    renderAllTasksOrProject();

    toggleModal(DOMElements.editTaskModal);
  }
}

export function changePriority(e) {
  const clickedItemObject = getClickedItem(e);
  changePriorityLogic(clickedItemObject);
  renderAllTasksOrProject();
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

export function addToProjectHandler(e) {
  const addYesBtn = document.querySelector(".add-yes");
  const addCancelBtn = document.querySelector(".add-cancel");

  //Open add to project modal
  const addToProjectModal = document.querySelector(".add-to-project-modal");
  toggleModal(addToProjectModal);

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
      toggleModal(addToProjectModal);
      //Save tasks array
      const tasksArrString = JSON.stringify(tasksArr);
      localStorage.setItem("tasksArr", tasksArrString);
    },
    { once: true }
  );

  addCancelBtn.addEventListener("click", () => toggleModal(addToProjectModal), {
    once: true,
  });
}

/////////////////////// PROJECTS ////////////////////////

export function createProjectHandler() {
  const newProject = document.getElementById("project-name");

  if (newProject.value) {
    projectsArr.push(newProject.value.trim());
    renderProjectSidebar(projectsArr);
    renderProjectsSelect(projectsArr);
    toggleModal(DOMElements.newProjectModal);
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

export function deleteProject(e) {
  //Find index of clicked project using it's text content.
  const clickedProjectName = e.target.parentElement.textContent.trim();
  const projectIndex = projectsArr.indexOf(clickedProjectName);
  // Remove it from the projects array and rerender.
  projectsArr.splice(projectIndex, 1);
  renderProjectSidebar(projectsArr);
  renderProjectsSelect(projectsArr);
  DOMElements.projectTitle.textContent = "All Tasks";
  renderTask(tasksArr);
}

export function projectOpenHandler(e) {
  // Create an array with tasks whose projects match the clicked project
  const projectName = e.target.textContent.trim();
  const projectItemsArr = tasksArr.filter((el) => el.project === projectName);
  renderTask(projectItemsArr);
  DOMElements.projectTitle.textContent = projectName;
}

//////////////// HEADER & SIDEBAR ///////////////

export function allTasksHandler() {
  //const projectTitle = document.querySelector(".folder-name");

  DOMElements.projectTitle.textContent = "All Tasks";
  renderAllTasksOrProject();
}

export function todayHandler() {
  const today = new Date();
  const todayDate = format(today, "dd/MM/yy");

  const todayArr = tasksArr.filter(
    (el) => format(parseISO(el.dueDate), "dd/MM/yy") === todayDate
  );
  //const projectTitle = document.querySelector(".folder-name");
  DOMElements.projectTitle.textContent = "Today's Tasks";
  renderTask(todayArr);
}

export function menuHandler() {
  const sidebar = document.querySelector(".sidebar");
  const mainContainer = document.querySelector(".main-container");

  sidebar.classList.toggle("hidden");
  mainContainer.classList.toggle("menu-hidden");
}
