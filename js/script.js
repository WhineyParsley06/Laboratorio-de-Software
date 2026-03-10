// Esperar a que el HTML cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('form');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Capturar los datos (Ejemplo: el nombre)
        const nombre = document.getElementById('nombre').value;
        
        if(nombre === "") {
            alert("Por favor, ingresa tu nombre completo.");
        } else {
            console.log("Datos capturados:", nombre);
            alert("¡Registro exitoso! Bienvenido a la Librería.");
            // Aquí es donde luego conectarás con la base de datos
        }
    });
});