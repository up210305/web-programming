import { getAllUsers, getUserTasks } from './petitions.js';

const userSelect = document.getElementById('users');
const taskTableBody = document.getElementById('userTasksTableBody');
const updateForm = document.getElementById('form-task');

async function showUserTasks(idUser) {
    taskTableBody.innerHTML = ''; 

    const tasks = await getUserTasks(idUser);

    tasks.forEach(task => {
        const row = `
            <tr>
                <td>${task.id}</td>
                <td>${task.idUser}</td>
                <td>${task.title}</td>
                <td>${task.completed ? 'Sí' : 'No'}</td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="updateTask(${task.id}, '${task.title}', ${task.completed})">
                        <span>Update</span> <i class="nf nf-md-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">
                        <span>Delete</span> <i class="nf nf-cod-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        taskTableBody.innerHTML += row;
    });
}


async function deleteTask(id) {
    // Lógica para eliminar una tarea
}

userSelect.addEventListener('change', async () => {
    const idUser = userSelect.value;
    await showUserTasks(idUser);
});

document.addEventListener('DOMContentLoaded', async () => {
    const users = await getAllUsers();
    let userOptions = '<option selected disabled>Select a User</option>';
    users.forEach(user => {
        userOptions += `<option value="${user.idUser}">${user.fullname}</option>`;
    });
    userSelect.innerHTML = userOptions;
});

updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm);
    const completedValue = formData.get('completed') === 'on' ? 1 : 0;
    formData.set('completed', completedValue);

    try {
        const response = await createTask(formData);
        if (response.success) {
            console.log("TAREA INSERTADA");
            const taskInfo = await getTask(response.taskId);

            const newRow = document.createElement('tr');
            newRow.setAttribute("id", `tablerow${taskInfo.id}`);
            const taskCompleted = taskInfo.completed ? "Completada" : "No completada";
            newRow.innerHTML = `
                <td>${taskInfo.id}</td>
                <td>${taskInfo.idUser}</td>
                <td>${taskInfo.title}</td>
                <td>${taskCompleted}</td>
                <td>
                    <button class="btn btn-info btn-sm updateBtn" id="updateBtn${taskInfo.id}">
                        <span>Update</span> <i class="nf nf-md-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${taskInfo.id}">
                        <span>Delete</span> <i class="nf nf-cod-trash"></i>
                    </button>
                </td>
            `;
            taskTableBody.appendChild(newRow);

            updateForm.reset();
        } else {
            console.error('Failed to create task');
        }
    } catch (error) {
        console.error('Error in INSERTING:', error);
    };
});


