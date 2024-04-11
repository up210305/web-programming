import { getAllUsers, getUserTasks } from './petitions.js';

const userSelect = document.getElementById('users');
const taskTableBody = document.getElementById('userTasksTableBody');
const updateForm = document.getElementById('form-task');

// Función para mostrar las tareas del usuario seleccionado
async function showUserTasks(idUser) {
    taskTableBody.innerHTML = ''; // Limpiar las filas de la tabla

    // Obtener las tareas del usuario seleccionado
    const tasks = await getUserTasks(idUser);

    // Construir las filas de la tabla con las tareas
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


// Función para eliminar una tarea
async function deleteTask(id) {
    // Lógica para eliminar una tarea
}

// Función que se ejecuta cuando se selecciona un usuario
userSelect.addEventListener('change', async () => {
    const idUser = userSelect.value;
    await showUserTasks(idUser);
});

// Al cargar la página, obtener todos los usuarios y mostrar sus tareas
document.addEventListener('DOMContentLoaded', async () => {
    const users = await getAllUsers();
    let userOptions = '<option selected disabled>Select a User</option>';
    users.forEach(user => {
        userOptions += `<option value="${user.idUser}">${user.fullname}</option>`;
    });
    userSelect.innerHTML = userOptions;
});

// AGREGAR TASK O UPDATE TASK
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm);
    const completedValue = formData.get('completed') === 'on' ? 1 : 0;
    formData.set('completed', completedValue);

    //PARA INSERCION-----------------------------------------------------------------------------------------------------------------
    try {
        const response = await createTask(formData);
        if (response.success) {
            console.log("TAREA INSERTADA");
            const taskInfo = await getTask(response.taskId);

            // Update the DOM with the new task
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

            // Reset form after adding task
            updateForm.reset();
        } else {
            console.error('Failed to create task');
        }
    } catch (error) {
        console.error('Error in INSERTING:', error);
    };
    //FIN INSERCION-
});

// Resto del código de app.js...

