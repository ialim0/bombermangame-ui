export function renderMain(data){
    let render = `<main class="main" style="display: block;">
    <div class="toggle-all-container">
        <input class="toggle-all" type="checkbox">
        <label class="toggle-all-label" for="toggle-all">Mark all as complete</label>
    </div>
    <ul class="todo-list">${renderListTask(data)}</ul>
</main>`
return render
  }

  export function renderListTask(data){
    let render = ""
    data.forEach(task=>{
      let completed = ""
      let checked = ""
      if (task.isDone === true) {
        completed = "completed"
        checked = "checked"
      }
      render += `<li data-id="${task.id}" class= "${completed}" >
      <div class="view">
          <input class="toggle" type="checkbox" ${checked}>
          <label>${task.name}</label>
          <button class="destroy"></button>
      </div>
    </li>` 
    })
    return render
}

export function renderHeader(data){
    let render = `<header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus="">
</header>`
return render
}

export function renderfooter(data){
  let completedTask = data.filter(task => task.isDone === true)
  let display = "block"
  let displayCompleted = ""
  // if (data.length > 0) display = "block"
  if (completedTask.length > 0 ) displayCompleted = `<button class="clear-completed">Clear completed</button>`
  let render = `<footer class="footer" style="display: ${display};">
  <span class="todo-count"><strong>${data.length - completedTask.length}</strong> items left</span>
  <ul class="filters">
    <li>
      <a href="#/" class="selected">All</a>
    </li>
    <li><a href="#/active">Active</a>
    </li>
    <li><a href="#/completed">Completed</a>
    </li>
  </ul>
  ${displayCompleted}
</footer>`
return render
}
