document.addEventListener('DOMContentLoaded', loadTask);

function loadTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
    let textInput = document.getElementById('taskInput');
    let taskText = textInput.value.trim();
    
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }
    
    addTaskToDOM(taskText);
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    textInput.value = "";
}

function addTaskToDOM(taskText) {
    let ul = document.getElementById('taskList');
    let li = document.createElement('li');
    
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <span>
            <span class="edit" onclick="editTask(this)">✏️</span>
            <span class="delete" onclick="deleteTask(this)">🗑️</span>
        </span>
    `;
    
    ul.appendChild(li);
}

function deleteTask(element) {
    let li = element.parentElement.parentElement;
    let taskText = li.querySelector(".task-text").innerText;
    
    li.remove();
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editTask(element) {
    let li = element.parentElement.parentElement;
    let taskTextElement = li.querySelector(".task-text");
    let oldText = taskTextElement.innerText;
    
    let newText = prompt("Edit your task:", oldText);
    if (newText === null || newText.trim() === "") {
        return;
    }
    
    taskTextElement.innerText = newText;
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let index = tasks.indexOf(oldText);
    if (index !== -1) {
        tasks[index] = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
