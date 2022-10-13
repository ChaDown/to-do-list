/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
import {
  editTaskHandler,
  addToProjectHandler,
  tasksArr,
  changePriority,
  checkBoxHandler,
  clearCheckboxHandler,
  todayHandler,
  DOMElements,
  deleteBtnHandler,
  deleteProject,
  projectOpenHandler,
} from './handlers';

import { renderTask } from './view';

export function priorityColor(item) {
  if (item.priority === 1) return 'red';
  if (item.priority === 2) return 'orange';
  if (item.priority === 3) return 'yellow';
}

export function changePriorityLogic(obj) {
  if (obj.priority === 1) {
    obj.priority = 2;
    return;
  }
  if (obj.priority === 2) {
    obj.priority = 3;
    return;
  }
  if (obj.priority === 3) obj.priority = 1;
}

export function toggleDarkScreen() {
  const header = document.querySelector('.header');
  const sidebar = document.querySelector('.sidebar');
  const itemContainer = document.querySelector('.item-container');
  const footer = document.querySelector('.footer');
  const displayArr = [header, sidebar, itemContainer, footer];

  displayArr.forEach((el) => el.classList.toggle('darkscale'));
}

export function addMainContainerListeners() {
  // Add new event listeners every time we render
  const itemsArr = document.querySelectorAll('.item');
  const deleteBtnsArr = document.querySelectorAll('.delete');
  const editBtnsArr = document.querySelectorAll('.edit');
  const addBtnsArr = document.querySelectorAll('.add');
  const priorityBtnsArr = document.querySelectorAll('.icon-priority');
  const emptyCheckBoxArr = document.querySelectorAll('.check-empty');
  const checkedBoxesArr = document.querySelectorAll('.check-checked');

  deleteBtnsArr.forEach((el) => el.addEventListener('click', deleteBtnHandler));
  editBtnsArr.forEach((el) => el.addEventListener('click', editTaskHandler));
  addBtnsArr.forEach((el) => el.addEventListener('click', addToProjectHandler));
  priorityBtnsArr.forEach((el) => el.addEventListener('click', changePriority));
  emptyCheckBoxArr.forEach((el) =>
    el.addEventListener('click', checkBoxHandler)
  );
  checkedBoxesArr.forEach((el) =>
    el.addEventListener('click', clearCheckboxHandler)
  );

  // Add info panel toggle when item name is clicked
  itemsArr.forEach((item) =>
    item.addEventListener('click', (e) => {
      if (!e.target.classList.contains('icon')) {
        item.firstElementChild.lastChild.classList.toggle('hidden');
      }
    })
  );
}

export function addSidebarListeners() {
  const projectsElsArr = document.querySelectorAll('.projects-dropdown');
  const xBtnsArr = document.querySelectorAll('.x-btn');

  xBtnsArr.forEach((el) =>
    el.addEventListener('click', deleteProject, { once: true })
  );

  // Add event listeners for each project and x-delete btn on hover
  projectsElsArr.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (!e.target.classList.contains('x-btn')) projectOpenHandler(e);
    });
    el.addEventListener('mouseenter', (e) =>
      e.target.lastElementChild.classList.remove('hidden')
    );
    el.addEventListener('mouseleave', (e) =>
      e.target.lastElementChild.classList.add('hidden')
    );
  });
}

export function toggleModal(modal) {
  modal.classList.toggle('hidden');
  toggleDarkScreen();
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
  const folderNameText = DOMElements.projectTitle.textContent.trim();
  // Get all tasks in given project
  const projectItemsArr = tasksArr.filter(
    (el) => el.project === folderNameText
  );
  // Identify if we're on All Tasks page or specific project page.
  if (folderNameText === 'All Tasks') {
    renderTask(tasksArr);
  } else if (folderNameText === "Today's Tasks") todayHandler();
  else {
    renderTask(projectItemsArr);
  }
}
