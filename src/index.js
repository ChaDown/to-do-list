import "./style.css";
import { format, parseISO } from "date-fns";
import {
  renderProjectSidebar,
  renderProjectsSelect,
  renderTask,
} from "./view.js";
import {
  addTaskHandler,
  tasksArr,
  closeModalHandler,
  showModalHandler,
  addIconBtn,
  newProjectHandler,
  createProjectHandler,
  projectsArr,
  projectsSidebarClickHandler,
  openProjectPage,
  allTaskBtns,
  allTasksHandler,
  clickOutsideModalClose,
  closeIcon,
  addBtn,
  todayBtn,
  todayHandler,
  menuBtn,
  menuHandler,
} from "./handlers";
import { closeModal, closeNewProject, openNewProject } from "./helpers";

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

(function init() {
  if (tasksArr) renderTask(tasksArr);
  if (projectsArr) renderProjectSidebar(projectsArr);
  renderProjectsSelect(projectsArr);
  // Add event listeners
  addBtn.addEventListener("click", addTaskHandler);
  addIconBtn.addEventListener("click", showModalHandler);
  todayBtn.addEventListener("click", todayHandler);
  menuBtn.addEventListener("click", menuHandler);
  //document.addEventListener("click", closeModalHandler);

  allTaskBtns.forEach((el) => el.addEventListener("click", allTasksHandler));
  /////
})();

// const overlay = document.querySelector(".overlay");
// overlay.classList.add("darkscale");

/// PROJECTS ///

(function projectFunctionality() {
  const createProjectBtn = document.querySelector(".new-project-add");
  const newProjectBtn = document.querySelector(".new-project-btn");
  const cancelProjectBtn = document.querySelector(".new-project-cancel");
  const projectsSidebar = document.querySelector(".projects");

  //Expand sidebar when clicked
  projectsSidebar.addEventListener("click", projectsSidebarClickHandler);
  // Open modal when plus symbol clicked
  newProjectBtn.addEventListener("click", openNewProject);
  // Create project, add  to list and render project list
  createProjectBtn.addEventListener("click", createProjectHandler);
  // Close new project modal
  cancelProjectBtn.addEventListener("click", closeNewProject);
})();
