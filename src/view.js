import addCircle from "./assets/add-circle-outline.svg";
import trash from "./assets/trash-outline.svg";
import create from "./assets/create-outline.svg";
import alert from "./assets/alert-circle-outline.svg";
import { format, parseISO } from "date-fns";
import {
  addMainContainerListeners,
  localSave,
  priorityColor,
} from "./helpers.js";
import { tasksArr } from "./handlers";

export function renderTask(arr) {
  const itemContainer = document.querySelector(".items");
  // Clear main container
  itemContainer.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    const color = priorityColor(arr[i]);

    const markUp = ` <div class="item" >
    <div class="item-name">${arr[i].title}
        <div class="info-container hidden">
            <div class="info-description">Description: ${arr[i].description}</div>
            <div class="info-due">Due Date: ${arr[i].dueDate}</div>
            <div class="info-priority">Priority: ${arr[i].priority}</div>
            <div class="info-project">Project: ${arr[i].project}</div>
        </div></div>
    <div class="item-icons"  data-title="${arr[i].title}">
      <img
        class="icon ${color}
        "
        src=${alert}
        alt="alert"
      />
      <img class="icon edit" src=${create} alt="edit" />
      <img class="icon add" src=${addCircle} alt="add" />
      <img class="icon delete" src=${trash} alt="delete" />
    </div>
  </div>`;

    itemContainer.insertAdjacentHTML("afterbegin", markUp);
  }

  //Add all event listeners to items/icons
  addMainContainerListeners();

  // Store tasksArr to local storage every time we update it
  const tasksArrString = JSON.stringify(tasksArr);
  localStorage.setItem("tasksArr", tasksArrString);
}

export function renderProjectSidebar(arr) {
  const projectsList = document.querySelector(".projects-list");
  // Clear project list
  projectsList.innerHTML = "";

  let markUp = "";
  // Add to the markup string for each element
  arr.forEach((el) => {
    markUp += `<li class="projects-dropdown">${el}
  </li>`;

    projectsList.innerHTML = markUp;
  });

  //Update local storage every time we render

  const projectsArrString = JSON.stringify(arr);
  localStorage.setItem("projectsArr", projectsArrString);
}

export function renderProjectsSelect(arr) {
  const selectElAdd = document.getElementById("projects-select-add");
  const selectEl = document.getElementById("projects-select");

  //Dynamically add mark up for each element in projects list arr
  let innerMarkUp = "";

  for (let i = 0; i < arr.length; i++) {
    innerMarkUp += `<option value="${arr[i]}">${arr[i]}</option>`;
  }

  const markUp = `
  <option value="All Tasks">All Tasks</option>
    ${innerMarkUp}
  `;

  // Add element to add item modal and add to project modal
  selectEl.innerHTML = markUp;
  selectElAdd.innerHTML = markUp;
}
