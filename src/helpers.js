import {
  deleteHandler,
  editTaskHandler,
  addToProjectHandler,
  tasksArr,
  clickOutsideModalClose,
} from "./handlers";

// export function clearFormInputs() {
//   newTitle.value = "";
//   newDescription.value = "";
//   newDueDate.value = "";
//   newPriority.value = "";
//   newProject.value = "";
// }

export function priorityColor(item) {
  if (item.priority == 1) return "red";
  if (item.priority == 2) return "yellow";
  if (item.priority == 3) return "green";
}

export function changePriorityLogic(obj) {
  if (obj.priority == "1") obj.priority == 2;
  if (obj.priority == "2") obj.priority == 3;
  if (obj.priority == "3") obj.priority == 1;
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
  const addItemModal = document.querySelector(".add-item-modal");

  deleteBtnsArr.forEach((el) => el.addEventListener("click", deleteHandler));
  editBtnsArr.forEach((el) => el.addEventListener("click", editTaskHandler));
  addBtnsArr.forEach((el) => el.addEventListener("click", addToProjectHandler));
  priorityBtnsArr.forEach((el) =>
    el.addEventListener("click", () => console.log("hello"))
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
