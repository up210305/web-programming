document.addEventListener('DOMContentLoaded', function() {
  const userSelect = document.getElementById('select-users');
  const userInfo = document.getElementById('user-info');
  const taskList = document.getElementById('task-list');

  // Cargar usuarios al cargar la página
  getAllUsers();

  // Obtener todos los usuarios
  function getAllUsers() {
    fetch('./data/usuarios.json')
      .then(resp => resp.json())
      .then(data => {
        data.forEach(usuario => {
          const option = document.createElement('option');
          option.value = usuario.id;
          option.textContent = usuario.firstname;
          userSelect.appendChild(option);
        });
    });
  }

  // Mostrar información del usuario seleccionado
  userSelect.addEventListener('change', function() {
    const selectedUserId = this.value;

    fetch('./data/usuarios.json')
      .then(resp => resp.json())
      .then(data => {
        const usuarioSeleccionado = data.find(usuario => usuario.id === selectedUserId);
        if (usuarioSeleccionado) {
          userInfo.innerHTML = `
            <li>Id: ${usuarioSeleccionado.id}</li>
            <li>Nombre Completo: ${usuarioSeleccionado.firstname} ${usuarioSeleccionado.lastname}</li>
            <li>Email: ${usuarioSeleccionado.email}</li>
          `;
        }
      });

    // Limpiar lista de tareas al cambiar de usuario
    taskList.innerHTML = "";
  });
});
