document.addEventListener('DOMContentLoaded', () => {
  // your solution here
  // grab DOM elements
  const appRoot = document.getElementById('main-content')
  const listDiv = document.getElementById("app-content");
  const newListInput = document.getElementById("new-list-title")
  let listSelector = document.getElementById("parent-list")


  appRoot.addEventListener("click", function(event){
    switch (event.target.dataset.action) {
      case "create-list":
          generateListHTML(event)
        break;
      case "create-task":
          generateTasksHTML(event)
        break;
      case "delete-list":
        deleteList(event)
        break;
      case "delete-task":
        deleteTask(event)
    }
  });

  let allListArray = []
  class list {
    constructor(name){
      this.name = name
      allListArray.push(this)
    }
  };

  let allTaskArray = []
  class task {
    constructor(description, priority, listName){
      this.description = description;
      this.priority = priority;
      this.listName = listName;
      allTaskArray.push(this)
    }
  }

  function  deleteTask(event){
    event.preventDefault()
    allTaskArray = allTaskArray.filter(taskObj => taskObj.description !== event.target.dataset.taskName)
    render()
  }

  function deleteList(event){
    event.preventDefault()
    allListArray = allListArray.filter(listObj => listObj.name !== event.target.dataset.title)
    render()
  }

  function generateTasksHTML(event){
    event.preventDefault();
    const newTaskDescription = document.getElementById("new-task-description")
    const newTaskPriority =
    document.getElementById("new-task-priority")
    listSelector = document.getElementById("parent-list")
    const newTask = new task(newTaskDescription.value, newTaskPriority.value, listSelector.value)
    listSelector = document.getElementById("parent-list")
    renderWithListName(newTask.listName)
  };

  function generateListHTML(event){
    event.preventDefault();
    const newList = new list(newListInput.value)
    render()
  };

  function generateListSelectOptions(){
    return allListArray.map(listObj =>
        `
            <option value="${listObj.name}" selected="">
              ${listObj.name}
            </option>
    `
  ).join("")
  };

  function generateAllLists() {
    return allListArray.map(listObj =>
          `
            <div>
              <h2>${listObj.name}
                &nbsp<button data-action="delete-list" data-title="${listObj.name}" class="delete-list">
                  💀
                </button>
              </h2>
              <ul>
                ${generateTasks(listObj)}
              </ul>
            </div>
          `
    ).join("")
  };

  function matchTasksToList(listObj){
    const matchingTasks = allTaskArray.filter(task => task.listName === listObj.name)
    return matchingTasks;
  }

  function generateTasks(listObj) {
      const tasksForList = matchTasksToList(listObj)
    return tasksForList.map(taskObj=>
      `
      <li>
        Task: ${taskObj.description}
        &nbsp<button data-list-title="${taskObj.listName}"
        data-action="delete-task" data-task-name="${taskObj.description}" class="delete-task">
          💀
        </button>
        <br>
        Priority: ${taskObj.priority}
      </li>
      `
    )
  }

  function render(){
    let selectOptions = generateListSelectOptions()
    let allListHTML = generateAllLists()
    listDiv.innerHTML =
      `

      <form id="create-task-form">
        <label for="parent-list">Select List:</label>
        <select id="parent-list">

      ${selectOptions}

        </select>

        <label for="new-task-description">Task description:</label>
        <input required="" type="text" id="new-task-description" placeholder="description">

        <label for="new-task-priority">Priority level:</label>
        <input type="text" id="new-task-priority" placeholder="priority">
        <input data-action="create-task" type="submit" value="Create New Task">
      </form>

      <div id="lists">

        ${allListHTML}

      </div>
    `
  }

  function renderWithListName(listName){
      let selectOptions = generateListSelectOptions()
      let allListHTML = generateAllLists()
      listDiv.innerHTML =
        `

        <form id="create-task-form">
          <label for="parent-list">Select List:</label>
          <select id="parent-list">

        ${selectOptions}

          </select>

          <label for="new-task-description">Task description:</label>
          <input required="" type="text" id="new-task-description" placeholder="description">

          <label for="new-task-priority">Priority level:</label>
          <input type="text" id="new-task-priority" placeholder="priority">
          <input data-action="create-task" type="submit" value="Create New Task">
        </form>

        <div id="lists">

          ${allListHTML}

        </div>
      `
      listSelector = document.getElementById("parent-list")
      setSelectedList(listName, listSelector)
    }



  function setSelectedList(listName, selector){
    for(var i = 0; i < selector.options.length; i++){
      if (selector.options[i].value === listName){
        selector.options[i].selected = true
      }
    }
  }

});
