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
        const editbutton = document.createElement("button");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox"

        editbutton.innerText = "Edit"

        deletebutton.innerText ="Delete"

        deletebutton.addEventListener("click", () => deleteTask(task.id));
        editbutton.addEventListener("click", () => editTask(task.id));
        checkbox.addEventListener("click", () => completed(task.id));

        tableRow.append(createCell(task.id), createCell(task.title), checkbox);
        
        tableBody.appendChild(tableRow);
        tableRow.appendChild(deletebutton);
        tableRow.appendChild(editbutton);

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