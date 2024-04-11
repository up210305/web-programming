export async function getAllUsers() {
    const response = await fetch("/crud/api/getUsers.php");
    const data = await response.json();
    return data;
}

export async function getUserTasks(idUser) {
    const response = await fetch(`/crud/api/getTasks.php?idUser=${idUser}`);
    const data = await response.json();
    return data;
}

export async function createTask(formData) {
    const res = await fetch(`/crud/api/createTask.php`, {
        method: "POST",
        body: formData
    });
    const json = await res.json();
    return json;
};

