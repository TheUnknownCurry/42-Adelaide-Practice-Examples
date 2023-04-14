// Retrieve saved tasks from cookies
function getTasksFromCookies() {
    let tasks = [];
    if (document.cookie) {
        let cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].startsWith("task=")) {
                let task = cookies[i].substring("task=".length);
                tasks.push(task);
            }
        }
    }
    return tasks;
}

// Save task to cookie
function saveTaskToCookie(task) {
    let d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year expiration
    let expires = "expires="+ d.toUTCString();
    document.cookie = "task=" + task + ";" + expires + ";path=/";
}

// Remove task from cookie
function removeTaskFromCookie(task) {
    document.cookie = "task=" + task + ";expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

// Add new task to the list
function addTask() {
    let task = prompt("Enter new task:");
    if (task.trim() !== "") {
        let taskList = document.getElementById("ft_list");
        let newTask = document.createElement("div");
        newTask.innerHTML = task;
        newTask.addEventListener("click", function() {
            if (confirm("Are you sure you want to remove this task?")) {
                removeTaskFromCookie(task);
                taskList.removeChild(newTask);
            }
        });
        taskList.insertBefore(newTask, taskList.firstChild);
        saveTaskToCookie(task);
    }
}

// Load saved tasks from cookies
function loadTasks() {
    let tasks = getTasksFromCookies();
    let taskList = document.getElementById("ft_list");
    for (let i = tasks.length - 1; i >= 0; i--) {
        let task = tasks[i];
        let newTask = document.createElement("div");
        newTask.innerHTML = task;
        newTask.addEventListener("click", function() {
            if (confirm("Are you sure you want to remove this task?")) {
                removeTaskFromCookie(task);
                taskList.removeChild(newTask);
            }
        });
        taskList.appendChild(newTask);
    }
}

// Add event listener for new task button
let newTaskBtn = document.getElementById("new-task-btn");
newTaskBtn.addEventListener("click", addTask);

// Load saved tasks on page load
window.addEventListener("load", loadTasks);

