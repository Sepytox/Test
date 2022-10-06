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

        deletebutton.innerText ="Delete"

        deletebutton.addEventListener("click", () => deleteTask(task.id));

        tableRow.append(createCell(task.id), createCell(task.title), createCell(task.completed));

        tableBody.appendChild(tableRow);
        tableRow.appendChild(deletebutton)

    });

}



function indexTask() {

    fetch("http://localhost:3000/tasks")

    .then((response) => response.json())

    .then((data) => renderTasks(data))

}

function deleteTask(id){
    fetch(`http://localhost:3000/task/${id}`, {
        method: 'DELETE'
    });

    location.reload()
};


function createTask() {
    const UserInput = document.getElementById("UserInput")
    const task = {title: UserInput.value}

    fetch("http://localhost:3000/tasks", {

    method: 'POST',

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