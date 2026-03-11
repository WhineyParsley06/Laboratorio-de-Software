document.addEventListener('DOMContentLoaded', () => {

const formulario = document.querySelector('#loginForm');

formulario.addEventListener('submit', (e) => {

e.preventDefault();

const usuario = document.getElementById('usuario').value;
const password = document.getElementById('password').value;

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let usuarioValido = usuarios.find(u => u.usuario === usuario && u.password === password);

if(usuarioValido){

localStorage.setItem("sesion", JSON.stringify(usuarioValido));

alert("Bienvenido " + usuarioValido.nombres);

window.location.href = "index.html";

}else{

alert("Usuario o contraseña incorrectos");

}

});

});
