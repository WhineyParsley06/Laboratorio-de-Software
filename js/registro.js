// Esperar a que el HTML cargue completamente
document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.querySelector('#registroForm');

    formulario.addEventListener('submit', (e) => {

        e.preventDefault(); // Evita recargar la página

        // Capturar datos del formulario
        const dni = document.getElementById('dni').value;
        const nombres = document.getElementById('nombres').value;
        const apellidos = document.getElementById('apellidos').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const lugarNacimiento = document.getElementById('lugarNacimiento').value;
        const direccion = document.getElementById('direccion').value;
        const genero = document.getElementById('genero').value;
        const correo = document.getElementById('correo').value;
        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;
        const suscripcion = document.getElementById('suscripcion').checked;

        // Obtener temas literarios seleccionados
        let temas = [];

        document.querySelectorAll('input[type=checkbox]:checked').forEach(cb => {
            if(cb.value) temas.push(cb.value);
        });

        // Validación básica
        if(usuario === "" || password === ""){
            alert("Por favor complete los campos obligatorios");
            return;
        }

        // Obtener usuarios guardados
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar si el usuario ya existe
        let existe = usuarios.find(u => u.usuario === usuario);

        if(existe){
            alert("El nombre de usuario ya existe");
            return;
        }

        // Crear nuevo usuario
        const nuevoUsuario = {

            dni,
            nombres,
            apellidos,
            fechaNacimiento,
            lugarNacimiento,
            direccion,
            genero,
            correo,
            usuario,
            password,
            temas,
            suscripcion

        };

        // Guardar usuario
        usuarios.push(nuevoUsuario);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        console.log("Usuario guardado:", nuevoUsuario);

        alert("¡Registro exitoso!");

        // Redirigir al login
        window.location.href = "login.html";

    });

});
