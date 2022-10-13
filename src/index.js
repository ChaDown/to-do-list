/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
import './style.css';
import { renderProjectSidebar, renderProjectsSelect, renderTask } from './view';
import * as handlers from './handlers';
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
    (this.project = project),
    (this.completed = completed);
}

(function init() {
  if (handlers.tasksArr) renderTask(handlers.tasksArr);
  if (handlers.projectsArr) renderProjectSidebar(handlers.projectsArr);
  renderProjectsSelect(handlers.projectsArr);

  // Add event listeners for home page
  handlers.DOMElements.addIconBtn.addEventListener('click', () =>
    toggleModal(handlers.DOMElements.addItemModal)
  );
  handlers.DOMElements.todayBtn.addEventListener(
    'click',
    handlers.todayHandler
  );
  handlers.DOMElements.menuBtn.addEventListener('click', handlers.menuHandler);
  handlers.addModalListeners();
  handlers.allTaskBtns.forEach((el) =>
    el.addEventListener('click', handlers.allTasksHandler)
  );
  /// //
})();

/// PROJECTS ///

(function projectFunctionality() {
  const createProjectBtn = document.querySelector('.new-project-add');
  const newProjectBtn = document.querySelector('.new-project-btn');
  const cancelProjectBtn = document.querySelector('.new-project-cancel');
  const projectsSidebar = document.querySelector('.projects');

  // Expand sidebar when clicked
  projectsSidebar.addEventListener(
    'click',
    handlers.projectsSidebarClickHandler
  );
  // Open modal when plus symbol clicked
  newProjectBtn.addEventListener('click', () =>
    toggleModal(handlers.DOMElements.newProjectModal)
  );
  // Create project, add  to list and render project list
  createProjectBtn.addEventListener('click', handlers.createProjectHandler);
  // Close new project modal
  cancelProjectBtn.addEventListener('click', () =>
    toggleModal(handlers.DOMElements.newProjectModal)
  );
})();
