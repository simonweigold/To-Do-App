const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Retrieve tasks from local storage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks on page load
function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task}
      <button class="deleteBtn" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
    taskInput.value = '';
  }
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('deleteBtn')) {
    const index = event.target.getAttribute('data-index');
    deleteTask(index);
  }
});

// Display tasks on initial page load
displayTasks();
