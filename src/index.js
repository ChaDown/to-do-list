import './style.css';
import {
  renderProjectSidebar,
  renderProjectsSelect,
  renderTask,
} from './view.js';
import {
  tasksArr,
  createProjectHandler,
  projectsArr,
  projectsSidebarClickHandler,
  allTaskBtns,
  allTasksHandler,
  todayHandler,
  menuHandler,
  addModalListeners,
  DOMElements,
} from './handlers';
import { toggleModal } from './helpers';

// Factory function to create to-do item
export default function ToDoItem(
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

  // Add event listeners for home page
  DOMElements.addIconBtn.addEventListener('click', () =>
    toggleModal(DOMElements.addItemModal)
  );
  DOMElements.todayBtn.addEventListener('click', todayHandler);
  DOMElements.menuBtn.addEventListener('click', menuHandler);
  addModalListeners();
  allTaskBtns.forEach((el) => el.addEventListener('click', allTasksHandler));
  /// //
})();

/// PROJECTS ///

(function projectFunctionality() {
  const createProjectBtn = document.querySelector('.new-project-add');
  const newProjectBtn = document.querySelector('.new-project-btn');
  const cancelProjectBtn = document.querySelector('.new-project-cancel');
  const projectsSidebar = document.querySelector('.projects');

  // Expand sidebar when clicked
  projectsSidebar.addEventListener('click', projectsSidebarClickHandler);
  // Open modal when plus symbol clicked
  newProjectBtn.addEventListener('click', () =>
    toggleModal(DOMElements.newProjectModal)
  );
  // Create project, add  to list and render project list
  createProjectBtn.addEventListener('click', createProjectHandler);
  // Close new project modal
  cancelProjectBtn.addEventListener('click', () =>
    toggleModal(DOMElements.newProjectModal)
  );
})();
