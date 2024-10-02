document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    
    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = taskText;

            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Eliminar";
            deleteBtn.classList.add("delete-btn");

            
            const doneBtn = document.createElement("button");
            doneBtn.textContent = "Hecho";
            doneBtn.classList.add("done-btn");

            
            deleteBtn.addEventListener("click", function() {
                taskList.removeChild(listItem);
            });

            
            doneBtn.addEventListener("click", function() {
                taskList.removeChild(listItem);
            });

            listItem.appendChild(doneBtn);
            listItem.appendChild(deleteBtn);
            taskList.appendChild(listItem);

    
            taskInput.value = "";
        }
    });

    
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTaskBtn.click();
        }
    });
});





let tasks = [];


function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        
        if (task.important) {
            li.classList.add('important');
        }

        
        const importantBtn = document.createElement('button');
        importantBtn.textContent = task.important ? '✔️ Importante' : '❌ Importante';
        importantBtn.onclick = () => {
            task.important = !task.important; 
            saveTasks(); 
            renderTasks(); 
        };
        li.appendChild(importantBtn);

    
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.onclick = () => {
            tasks.splice(index, 1); 
            saveTasks(); 
            renderTasks(); 
        };
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}


document.getElementById('addTaskBtn').onclick = () => {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value) {
        tasks.push({ text: taskInput.value, important: false }); 
        taskInput.value = ''; 
        saveTasks(); 
        renderTasks(); 
    }
};

loadTasks();



