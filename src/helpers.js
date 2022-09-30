export function clearFormInputs() {
  newTitle.value = "";
  newDescription.value = "";
  newDueDate.value = "";
  newPriority.value = "";
  newProject.value = "";
}

export function priorityColor(item) {
  if (item.priority == 1) return "red";
  if (item.priority == 2) return "yellow";
  if (item.priority == 3) return "green";
}
