import addCircle from "./assets/add-circle-outline.svg";
import trash from "./assets/trash-outline.svg";
import create from "./assets/create-outline.svg";
import alert from "./assets/alert-circle-outline.svg";
import xdelete from "./assets/close-circle-outline.svg";
import emptyBox from "./assets/square-outline.svg";
import checkedBox from "./assets/checkbox-outline.svg";
import { format, parseISO } from "date-fns";
import {
  addMainContainerListeners,
  addSidebarListeners,
  priorityColor,
} from "./helpers.js";
import { tasksArr } from "./handlers";

export function renderTask(arr) {
  const itemContainer = document.querySelector(".items");
  // Clear main container
  itemContainer.innerHTML = "";

  // Create HTML markup for each element in the arr and add it to item container
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      const color = priorityColor(arr[i]);

      const markUp = ` <div class="item" >
    <div class="item-name ${arr[i].completed && "strike"}">
    ${arr[i].title}
        <div class="info-container hidden">
            <div class="info-description">Description: ${
              arr[i].description
            }</div>
            <div class="info-due">Due Date: ${format(
              parseISO(arr[i].dueDate),
              "LLL d 'at' k:m"
            )}</div>
            <div class="info-priority">Priority: ${arr[i].priority}</div>
            <div class="info-project">Project: ${arr[i].project}</div>
        </div></div>
    <div class="item-icons"  data-title="${arr[i].title}">
    <img class="icon ${
      arr[i].completed ? "check-checked" : "check-empty"
    }" src=${arr[i].completed ? checkedBox : emptyBox} alt="box" />
      <img
        class="icon-priority ${color}
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
  } else {
    const emptyMarkUp = `<div class="item-name">&nbsp&nbspNothing on the plan yet!</div>`;

    itemContainer.innerHTML = emptyMarkUp;
  }

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
    markUp += `<li class="projects-dropdown">${el}<img class="x-btn hidden" src=${xdelete} alt="deletex"/>
  </li>`;

    projectsList.innerHTML = markUp;
  });

  //Update local storage every time we render

  const projectsArrString = JSON.stringify(arr);
  localStorage.setItem("projectsArr", projectsArrString);

  // Add event listeners
  addSidebarListeners();
}

export function renderProjectsSelect(arr) {
  const selectElAdd = document.getElementById("projects-select-add");
  const selectElEdit = document.getElementById("projects-select-edit");
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
  selectElEdit.innerHTML = markUp;
}
