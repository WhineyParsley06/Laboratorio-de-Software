// 1. Configuración de la conexión a Supabase
const SUPABASE_URL = "https://ruyoguzvuoerkdwpgwfs.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eW9ndXp2dW9lcmtkd3Bnd2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNjY2MzUsImV4cCI6MjA4ODc0MjYzNX0.WQtGk8KoaDDp_b8W_IpcKVqBKHel6N7GZNdhJ5AOMKI";

// Creamos el cliente de conexión (Usamos 'client' para no confundir con la librería)
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Función para registrar el usuario en la nube (TABLA USUARIOS)
async function simularRegistro(event) {
    event.preventDefault(); // Evita que la página se recargue sola

    // Capturamos los datos del formulario usando los IDs de tu HTML
    // Asegúrate de que en registro.html los inputs tengan estos IDs exactos
    const datosUsuario = {
        id_dni: document.getElementById('dni').value,
        nombre_completo: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
        direccion: document.getElementById('direccion').value,
        username: document.getElementById('usuario').value,
        password: document.getElementById('password').value,
        rol: 'cliente'
    };

    console.log("Intentando registrar a:", datosUsuario.nombre_completo);

    // Enviamos los datos a la tabla 'usuarios' de Supabase
    const { data, error } = await client
        .from('usuarios')
        .insert([datosUsuario]);

    if (error) {
        console.error("Error de Supabase:", error.message);
        alert("Error al registrar: " + error.message);
    } else {
        alert("¡Registro exitoso! Tus datos ya están en la nube de la Librería.");
        window.location.href = "login.html"; // Nos vamos al Login
    }
}

// 3. Función para iniciar sesión (LOGIN)
async function simularLogin(event) {
    event.preventDefault();
    
    const user = document.getElementById('userLogin').value;
    const pass = document.getElementById('passLogin').value;

    const { data, error } = await client
        .from('usuarios')
        .select('*')
        .eq('username', user)
        .single();

    if (error || !data) {
        alert("El usuario no existe en la base de datos.");
    } else if (data.password === pass) {
        alert("¡Bienvenido, " + data.nombre_completo + "!");
        localStorage.setItem('usuarioLogueado', data.nombre_completo);
        window.location.href = "index.html";
    } else {
        alert("Contraseña incorrecta.");
    }
}