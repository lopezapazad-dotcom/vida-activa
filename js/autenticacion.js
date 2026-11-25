// ==========================================
// ELEMENTOS DE LA PANTALLA
// ==========================================

const pantallaAcceso = document.getElementById("pantalla-acceso");
const aplicacion = document.getElementById("aplicacion");

const pestanaLogin = document.getElementById("pestana-login");
const pestanaRegistro = document.getElementById("pestana-registro");

const formularioLogin = document.getElementById("form-login");
const formularioRegistro = document.getElementById("form-registro");

const mensajeLogin = document.getElementById("mensaje-login");
const mensajeRegistro = document.getElementById("mensaje-registro");


// ==========================================
// CAMBIAR ENTRE FORMULARIOS
// ==========================================

pestanaLogin.addEventListener("click", () => {
    formularioLogin.hidden = false;
    formularioRegistro.hidden = true;

    pestanaLogin.classList.add("activa");
    pestanaRegistro.classList.remove("activa");

    mensajeLogin.textContent = "";
    mensajeRegistro.textContent = "";
});

pestanaRegistro.addEventListener("click", () => {
    formularioLogin.hidden = true;
    formularioRegistro.hidden = false;

    pestanaRegistro.classList.add("activa");
    pestanaLogin.classList.remove("activa");

    mensajeLogin.textContent = "";
    mensajeRegistro.textContent = "";
});


// ==========================================
// REGISTRO DE USUARIO
// ==========================================

formularioRegistro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById("registro-nombre").value.trim();
    const correo = document.getElementById("registro-correo").value.trim().toLowerCase();
    const clave = document.getElementById("registro-clave").value;

    const usuarios = JSON.parse(
        localStorage.getItem("usuariosVidaActiva") || "[]"
    );

    const usuarioExiste = usuarios.some(
        usuario => usuario.correo === correo
    );

    if (usuarioExiste) {
        mensajeRegistro.textContent = "Este correo ya está registrado.";
        return;
    }

    const nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        clave: clave
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem(
        "usuariosVidaActiva",
        JSON.stringify(usuarios)
    );

    mensajeRegistro.textContent =
        "¡Registro exitoso! Ya puedes iniciar sesión.";

    formularioRegistro.reset();

    formularioLogin.hidden = false;
    formularioRegistro.hidden = true;

    pestanaLogin.classList.add("activa");
    pestanaRegistro.classList.remove("activa");
});


// ==========================================
// INICIO DE SESIÓN
// ==========================================

formularioLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const correo = document.getElementById("login-correo").value.trim().toLowerCase();
    const clave = document.getElementById("login-clave").value;

    const usuarios = JSON.parse(
        localStorage.getItem("usuariosVidaActiva") || "[]"
    );

    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.correo === correo && usuario.clave === clave
    );

    if (!usuarioEncontrado) {
        mensajeLogin.textContent = "Correo o contraseña incorrectos.";
        return;
    }

    const sesion = {
        nombre: usuarioEncontrado.nombre,
        correo: usuarioEncontrado.correo
    };

    localStorage.setItem(
        "sesionVidaActiva",
        JSON.stringify(sesion)
    );

    formularioLogin.reset();
    mensajeLogin.textContent = "";

    mostrarAplicacion();
});


// ==========================================
// MOSTRAR LA PLATAFORMA
// ==========================================

function mostrarAplicacion() {
    const sesionGuardada = localStorage.getItem("sesionVidaActiva");

    if (!sesionGuardada) {
        pantallaAcceso.hidden = false;
        aplicacion.hidden = true;
        return;
    }

    try {
        const sesion = JSON.parse(sesionGuardada);

        if (!sesion || !sesion.nombre || !sesion.correo) {
            throw new Error("Sesión no válida");
        }

        pantallaAcceso.hidden = true;
        aplicacion.hidden = false;

        document.getElementById("nombre-usuario").textContent =
            "Hola, " + sesion.nombre;

    } catch (error) {
        localStorage.removeItem("sesionVidaActiva");

        pantallaAcceso.hidden = false;
        aplicacion.hidden = true;

        console.error("Error al recuperar la sesión:", error);
    }
}


// ==========================================
// CERRAR SESIÓN
// ==========================================

function cerrarSesion() {
    localStorage.removeItem("sesionVidaActiva");

    mostrarAplicacion();

    formularioLogin.reset();
    formularioRegistro.reset();

    mensajeLogin.textContent = "";
    mensajeRegistro.textContent = "";

    formularioLogin.hidden = false;
    formularioRegistro.hidden = true;

    pestanaLogin.classList.add("activa");
    pestanaRegistro.classList.remove("activa");
}


// ==========================================
// EVENTO DEL BOTÓN CERRAR SESIÓN
// ==========================================

document.getElementById("boton-cerrar-sesion")
    .addEventListener("click", cerrarSesion);


// ==========================================
// COMPROBAR SESIÓN AL ABRIR LA PÁGINA
// ==========================================

mostrarAplicacion();