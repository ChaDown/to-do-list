import addCircle from "./assets/add-circle-outline.svg";
import trash from "./assets/trash-outline.svg";
import create from "./assets/create-outline.svg";
import alert from "./assets/alert-circle-outline.svg";
import { format, parseISO } from "date-fns";
import { priorityColor } from "./helpers.js";

export function renderTask(tasksArr) {
  const itemContainer = document.querySelector(".items");
  itemContainer.innerHTML = "";

  tasksArr.forEach((el) => {
    const color = priorityColor(el);

    const markUp = ` <div class="item">
    <div class="item-name">${el.title}</div>
    <div class="item-icons">
      <img
        class="icon ${color}
        "
        src=${alert}
        alt="alert"
      />
      <img class="icon" src=${create} alt="edit" />
      <img class="icon" src=${addCircle} alt="add" />
      <img class="icon" src=${trash} alt="delete" />
    </div>
  </div>`;

    itemContainer.insertAdjacentHTML("afterbegin", markUp);
  });
}
