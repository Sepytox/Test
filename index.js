function createCell(text) {

    const cell = document.createElement('td')

    cell.innerText = text;

    return cell;

}




function renderTasks(tasks) {

    const tableBody = document.querySelector('tbody');

    tasks.forEach((task) => {

        const tableRow = document.createElement('tr');
        const deletebutton = document.createElement("button");
        deletebutton.classList.add("btn", "btn-danger");
        const editbutton = document.createElement("button");
        editbutton.classList.add("btn", "btn-outline-primary");

        editbutton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/></svg>'

        deletebutton.innerText ="Delete"

        deletebutton.addEventListener("click", () => deleteTask(task.id));
        editbutton.addEventListener("click", () => editTask(task.id));

        tableRow.append(createCell(task.id), createCell(task.title), createCell(task.completed));
        
        tableBody.appendChild(tableRow);
        tableRow.appendChild(editbutton);
        tableRow.appendChild(deletebutton);
    });

}

function completed(id) {
    fetch(`http://127.0.0.1:3000/auth/cookie/tasks`, {
        method: 'PUT',

        credentials: 'include',

        headers: {
            'Content-Type':'application/json'
        },

        body: JSON.stringify({id: id, completed: true})
    });
}

function editTask(id) {
    const newTitle = prompt("Edit Task");
    
    fetch(`http://127.0.0.1:3000/auth/cookie/tasks`, {

        method: 'PUT',

        credentials: 'include',

        headers: {
            'Content-Type':'application/json'
        },

        body: JSON.stringify({id: id, title: newTitle})
    });

    location.reload();
};


function indexTask() {

    fetch("http://127.0.0.1:3000/auth/cookie/tasks", {
        
        credentials: 'include'
    })

    .then((response) => response.json())

    .then((data) => renderTasks(data))

}

function deleteTask(id){
    fetch(`http://127.0.0.1:3000/auth/cookie/task/${id}`, {
        
        method: 'DELETE',

        credentials: 'include'
    });

    location.reload()
};


function createTask() {
    const UserInput = document.getElementById("UserInput")
    const task = {title: UserInput.value}

    fetch("http://127.0.0.1:3000/auth/cookie/tasks", {

        method: 'POST',

        credentials: 'include',

        headers: {

        'Content-Type':'application/json'

    },

    body: JSON.stringify(task)

    }).then((response) => response.json())
    .then((task) => {
    console.log("Success", task);
    })
    .catch((error) => {
    console.error("Error:", error);
    })
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("submit");

    indexTask();

    form.addEventListener("submit", createTask);
});