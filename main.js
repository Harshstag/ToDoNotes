const itemsArray = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

console.log(itemsArray);
console.log(itemsArray[1]);

window.addEventListener("load", () => {
  displayItems();

  const form = document.querySelector("#new-task-form");

  form.addEventListener("submit", (e) => {
    const task = document.querySelector("#new-task-input");
    const taskVal = task.value;
    if (taskVal === "") {
      alert("Please add some task!");
      return false;
    } else {
      createItem(task);
    }
  });

  function createItem(task) {
    itemsArray.push(task.value);
    localStorage.setItem("tasks", JSON.stringify(itemsArray));
    location.reload();
  }
  function displayItems() {
    let tasks = "";
    for (let i = 0; i < itemsArray.length; i++) {
      tasks += `<div class="task">
                  <div class="content">
                    <input type="text" class="text" value="${itemsArray[i]}" />
                  </div>
                  <div class="actions">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                  </div>
                </div>`;
    }
    document.querySelector("#tasks").innerHTML = tasks;
    activateDeleteListeners();
    activateSaveListeners();

    function activateSaveListeners() {
      const editBtn = document.querySelectorAll(".edit");
      const inputs = document.querySelectorAll(".text");
      editBtn.forEach((sB, i) => {
        sB.addEventListener("click", (e) => {
          if (e.target.innerHTML.toLowerCase() == "edit") {
            e.target.innerHTML = "Save";
            updateItem(inputs[i].value, i);
          } else {
            e.target.innerHTML = "Edit";
          }
        });
      });
    }
    function updateItem(text, i) {
      itemsArray[i] = text;
      localStorage.setItem("tasks", JSON.stringify(itemsArray));
    }
  }

  function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach((dB, i) => {
      dB.addEventListener("click", () => {
        deleteItem(i);
      });
    });
  }
  function deleteItem(i) {
    itemsArray.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(itemsArray));
    location.reload();
  }
});
