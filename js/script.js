// ==========================================
// BUSCADOR Y FILTROS DE RUTINAS
// ==========================================

const buscador = document.getElementById("buscador");
const tarjetas = document.querySelectorAll(".rutina-card");
const botonesNivel = document.querySelectorAll(".filtro");
const botonesDuracion = document.querySelectorAll(".duracion");
const mensaje = document.getElementById("sin-resultados");

let nivelSeleccionado = "todos";
let duracionSeleccionada = "todos";
let grupoEdadSeleccionado = "";

function filtrarRutinas() {
    const texto = buscador.value.toLowerCase().trim();
    let resultados = 0;

    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.querySelector("h3").textContent.trim().toLowerCase();
        const nivel = tarjeta.dataset.nivel;
        const duracion = Number(tarjeta.dataset.duracion);
        const edadRutina = tarjeta.dataset.edad;

        const coincideTexto = nombre.includes(texto);

        const coincideEdad =
            edadRutina === "todos" ||
            edadRutina === grupoEdadSeleccionado;

        const coincideNivel =
            nivelSeleccionado === "todos" ||
            nivel === nivelSeleccionado;

        let coincideDuracion = false;

        if (duracionSeleccionada === "todos") {
            coincideDuracion = true;
        } else if (duracionSeleccionada === "45") {
            coincideDuracion = duracion >= 45;
        } else {
            coincideDuracion = duracion === Number(duracionSeleccionada);
        }

        if (coincideTexto && coincideNivel && coincideDuracion && coincideEdad) {
            tarjeta.style.display = "block";
            resultados++;
        } else {
            tarjeta.style.display = "none";
        }
    });

    mensaje.hidden = resultados !== 0;
}

// Evento del buscador
buscador.addEventListener("input", filtrarRutinas);

// Filtros por nivel
botonesNivel.forEach(boton => {
    boton.addEventListener("click", () => {
        botonesNivel.forEach(b => b.classList.remove("activo"));

        boton.classList.add("activo");
        nivelSeleccionado = boton.dataset.nivel;

        filtrarRutinas();
    });
});

// Filtros por duración
botonesDuracion.forEach(boton => {
    boton.addEventListener("click", () => {
        botonesDuracion.forEach(b => b.classList.remove("activo"));

        boton.classList.add("activo");
        duracionSeleccionada = boton.dataset.duracion;

        filtrarRutinas();
    });
});


// ==========================================
// PROGRAMACIÓN ORIENTADA A OBJETOS (POO)
// ==========================================

class Rutina {
    constructor(nombre, nivel, duracion, grupoEdad, ejercicios) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.duracion = duracion;
        this.grupoEdad = grupoEdad;
        this.ejercicios = ejercicios;
    }

    mostrarInformacion() {
        return this.nombre + " - " +
            this.nivel + " - " +
            this.duracion + " minutos";
    }
}


// ==========================================
// EJERCICIOS DE CADA RUTINA
// ==========================================

const rutinasEjercicios = {
    "Movilidad suave": [
        "Movilidad de brazos",
        "Marcha suave en el lugar",
        "Respiración y relajación"
    ],

    "Caminata activa": [
        "Calentamiento caminando",
        "Caminata a ritmo moderado",
        "Enfriamiento"
    ],

    "Fuerza básica": [
        "Sentadillas controladas",
        "Flexiones adaptadas",
        "Estiramiento muscular"
    ],

    "Entrenamiento intenso": [
        "Calentamiento dinámico",
        "Ejercicio cardiovascular",
        "Recuperación y estiramiento"
    ],

    "Movimiento juvenil": [
        "Movilidad general",
        "Baile y coordinación",
        "Estiramientos suaves"
    ],

    "Movilidad y equilibrio": [
        "Movilidad sentado",
        "Equilibrio con apoyo",
        "Respiración y relajación"
    ]
};


// ==========================================
// OBJETOS DE LAS RUTINAS
// ==========================================

const listaRutinas = [
    new Rutina("Movilidad suave", "Principiante", 15, "todos",
        rutinasEjercicios["Movilidad suave"]),

    new Rutina("Caminata activa", "Principiante", 30, "todos",
        rutinasEjercicios["Caminata activa"]),

    new Rutina("Fuerza básica", "Intermedio", 30, "adultos",
        rutinasEjercicios["Fuerza básica"]),

    new Rutina("Entrenamiento intenso", "Avanzado", 50, "adultos",
        rutinasEjercicios["Entrenamiento intenso"]),

    new Rutina("Movimiento juvenil", "Principiante", 15, "adolescentes",
        rutinasEjercicios["Movimiento juvenil"]),

    new Rutina("Movilidad y equilibrio", "Principiante", 15, "adultos-mayores",
        rutinasEjercicios["Movilidad y equilibrio"])
];


// ==========================================
// REPRODUCTOR DE RUTINAS
// ==========================================

let ejercicios = rutinasEjercicios["Movilidad suave"];
let ejercicioActual = 0;
let tiempoRestante = 30;
let duracionEjercicio = 300;
let temporizadorActivo = false;
let intervalo = null;
// REGISTRO DE ACTIVIDAD FÍSICA
let segundosActividad = 0;
let actividadRegistrada = false;
let minutosAlIniciarRutina = 0;
// ==========================================
// ALMACENAMIENTO DE ACTIVIDAD DIARIA
// ==========================================

const elementoMinutosActivos =
    document.getElementById("minutos-activos");
const fechaActividadActual = new Date();
const fechaActividad = [
    fechaActividadActual.getFullYear(),
    String(fechaActividadActual.getMonth() + 1).padStart(2, "0"),
    String(fechaActividadActual.getDate()).padStart(2, "0")
].join("-");

const claveActividad = "actividadVidaActiva_" + fechaActividad;

let minutosActivos = AlmacenamientoVidaActiva.obtener(
    claveActividad,
    0
);
minutosAlIniciarRutina = minutosActivos;

function actualizarMinutosActivos() {
    elementoMinutosActivos.textContent = minutosActivos;
    actualizarAnilloActividad();

    AlmacenamientoVidaActiva.guardar(
        claveActividad,
        minutosActivos
    );

    actualizarHistorial();
}
// ==========================================
// OBJETIVO DIARIO DE ACTIVIDAD FÍSICA
// ==========================================

const META_ACTIVIDAD = 30;

function actualizarAnilloActividad() {
    const porcentaje = Math.min(
        (minutosActivos / META_ACTIVIDAD) * 100,
        100
    );

    const anillo = document.getElementById("anillo-actividad");
    const texto = document.getElementById("porcentaje-actividad");

    anillo.style.setProperty("--porcentaje", porcentaje + "%");
    texto.textContent = Math.round(porcentaje) + "%";
}
// ==========================================
// HISTORIAL DE ACTIVIDAD
// ==========================================

function actualizarHistorial() {
    const listaHistorial = document.getElementById("lista-historial");

    const historial = [];

    for (let i = 6; i >= 0; i--) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - i);

        const claveFecha = [
            fecha.getFullYear(),
            String(fecha.getMonth() + 1).padStart(2, "0"),
            String(fecha.getDate()).padStart(2, "0")
        ].join("-");

        const clave = "actividadVidaActiva_" + claveFecha;

        const minutos = AlmacenamientoVidaActiva.obtener(clave, 0);

        historial.push({
            fecha: claveFecha,
            minutos: minutos
        });
    }

    listaHistorial.innerHTML = "";

    historial.forEach(dia => {
        const tarjeta = document.createElement("article");
tarjeta.className = "tarjeta-historial";

const fecha = new Date(dia.fecha + "T12:00:00");

const nombreDia = fecha.toLocaleDateString("es-ES", {
    weekday: "long"
});

const encabezado = document.createElement("h4");
encabezado.textContent =
    nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1);

const detalle = document.createElement("p");
detalle.textContent = dia.minutos + " minutos activos";

const barra = document.createElement("div");
barra.className = "barra-historial";

const progreso = document.createElement("div");
progreso.className = "progreso-historial";

progreso.style.width =
    Math.min((dia.minutos / 60) * 100, 100) + "%";

barra.appendChild(progreso);

tarjeta.append(encabezado, detalle, barra);
listaHistorial.appendChild(tarjeta);
    });
}
actualizarMinutosActivos();
const reloj = document.getElementById("temporizador");
const nombreEjercicio = document.querySelector(".nombre-ejercicio");
const estado = document.getElementById("estado-rutina");
const barra = document.getElementById("barra-progreso");

const botonIniciar = document.getElementById("iniciar");
const botonPausar = document.getElementById("pausar");
const botonSiguiente = document.getElementById("siguiente");

function actualizarPantalla() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;

    reloj.textContent =
        String(minutos).padStart(2, "0") + ":" +
        String(segundos).padStart(2, "0");

    const tiempoTotal = ejercicios.length * duracionEjercicio;

    const tiempoTranscurrido =
        ejercicioActual * duracionEjercicio +
        (duracionEjercicio - tiempoRestante);

    const progreso = tiempoTotal > 0
        ? (tiempoTranscurrido / tiempoTotal) * 100
        : 0;

    barra.style.width = progreso + "%";
}

function mostrarEjercicio() {
    nombreEjercicio.textContent = ejercicios[ejercicioActual];
    tiempoRestante = duracionEjercicio;

    actualizarPantalla();

    estado.textContent = "¡Prepárate para comenzar!";
}

function iniciarRutina() {
    if (temporizadorActivo) return;

    botonPausar.disabled = false;

    if (tiempoRestante <= 0) {
        tiempoRestante = duracionEjercicio;
        actualizarPantalla();
    }

    temporizadorActivo = true;
    estado.textContent = "¡Rutina en progreso!";

  intervalo = setInterval(() => {
    tiempoRestante--;
    segundosActividad++;

    const minutosTranscurridos = Math.floor(segundosActividad / 60);

    minutosActivos = minutosAlIniciarRutina + minutosTranscurridos;

    actualizarMinutosActivos();
    actualizarPantalla();

    if (tiempoRestante <= 0) {
        siguienteEjercicio();
    }
}, 1000);
}

function pausarRutina() {
    clearInterval(intervalo);

    temporizadorActivo = false;
    botonPausar.disabled = true;

    estado.textContent = "Rutina pausada";
}

function siguienteEjercicio() {
    clearInterval(intervalo);
    temporizadorActivo = false;
    botonPausar.disabled = true;

    if (ejercicioActual < ejercicios.length - 1) {
        ejercicioActual++;
        mostrarEjercicio();

        estado.textContent = "¡Siguiente ejercicio!";
    } else {
    tiempoRestante = 0;
    actualizarPantalla();

    barra.style.width = "100%";
    nombreEjercicio.textContent = "Rutina finalizada";

    estado.textContent = "¡Felicidades! Has completado tu rutina.";
    botonIniciar.disabled = true;


    }
}

// Eventos del reproductor
botonIniciar.addEventListener("click", iniciarRutina);
botonPausar.addEventListener("click", pausarRutina);
botonSiguiente.addEventListener("click", siguienteEjercicio);

mostrarEjercicio();


// ==========================================
// IDENTIFICACIÓN DEL USUARIO POR EDAD
// ==========================================

const campoEdad = document.getElementById("edad-usuario");
const botonEdad = document.getElementById("registrar-edad");
const mensajeEdad = document.getElementById("mensaje-edad");
const grupoEdad = document.getElementById("grupo-edad");

botonEdad.addEventListener("click", () => {
    const edad = Number(campoEdad.value);

    if (
        campoEdad.value.trim() === "" ||
        !Number.isInteger(edad) ||
        edad < 13 ||
        edad > 110
    ) {
        mensajeEdad.textContent =
            "Por favor, introduce una edad válida entre 13 y 110 años.";

        grupoEdad.textContent = "";
        return;
    }

    if (edad >= 13 && edad <= 17) {
        grupoEdadSeleccionado = "adolescentes";
    } else if (edad >= 18 && edad <= 59) {
        grupoEdadSeleccionado = "adultos";
    } else {
        grupoEdadSeleccionado = "adultos-mayores";
    }

    filtrarRutinas();

    mensajeEdad.textContent = "¡Registro realizado correctamente!";

    grupoEdad.textContent =
        "Tu grupo de edad es: " + grupoEdadSeleccionado;
});


// ==========================================
// SELECCIÓN DE RUTINAS DESDE LAS TARJETAS
// ==========================================

const botonesVerRutina = document.querySelectorAll(".rutina-card button");

botonesVerRutina.forEach(boton => {
    boton.addEventListener("click", () => {
        const tarjeta = boton.closest(".rutina-card");

        const nombreRutina = tarjeta.querySelector("h3").textContent.trim();

        const rutinaSeleccionada = listaRutinas.find(
            rutina => rutina.nombre === nombreRutina
        );

        if (!rutinaSeleccionada) {
            console.error("No se encontró la rutina seleccionada.");
            return;
        }

        ejercicios = rutinaSeleccionada.ejercicios;

        estado.textContent = rutinaSeleccionada.mostrarInformacion();

        duracionEjercicio =
            (rutinaSeleccionada.duracion * 60) / ejercicios.length;

        clearInterval(intervalo);

        temporizadorActivo = false;
        ejercicioActual = 0;
        tiempoRestante = duracionEjercicio;
        segundosActividad = 0;
        actividadRegistrada = false;
        minutosAlIniciarRutina = minutosActivos;


        botonPausar.disabled = true;
        botonIniciar.disabled = false;

        barra.style.width = "0%";

        mostrarEjercicio();

        estado.textContent =
            "Rutina seleccionada. ¡Prepárate para comenzar!";

        document.getElementById("reproductor").scrollIntoView({
            behavior: "smooth"
        });
    });
});


// ==========================================
// GRÁFICO SEMANAL CON DATOS REALES
// ==========================================

const barrasGrafico = document.querySelectorAll(".barra");
const detalleGrafico = document.getElementById("detalle-grafico");

function actualizarGraficoSemanal() {
    const hoyGrafico = new Date();

    // Obtener el lunes de la semana actual
    const diaSemana = hoyGrafico.getDay();
    const diferenciaLunes = diaSemana === 0 ? -6 : 1 - diaSemana;

    const lunes = new Date(hoyGrafico);
    lunes.setDate(hoyGrafico.getDate() + diferenciaLunes);

    const nombresDias = [
        "Lunes", "Martes", "Miércoles",
        "Jueves", "Viernes", "Sábado", "Domingo"
    ];

    const minutosSemana = [];

    barrasGrafico.forEach((barra, indice) => {
        const fecha = new Date(lunes);
        fecha.setDate(lunes.getDate() + indice);

        const claveFecha = [
            fecha.getFullYear(),
            String(fecha.getMonth() + 1).padStart(2, "0"),
            String(fecha.getDate()).padStart(2, "0")
        ].join("-");

        const clave = "actividadVidaActiva_" + claveFecha;
        const minutos = Number(
            AlmacenamientoVidaActiva.obtener(clave, 0)
        ) || 0;

        minutosSemana.push(minutos);

        barra.dataset.dia = nombresDias[indice];
        barra.dataset.minutos = minutos;

        const altura = Math.min((minutos / 60) * 100, 100);

        barra.querySelector("span").style.height = altura + "%";
    });

    barrasGrafico.forEach(barra => {
        barra.addEventListener("click", () => {
            detalleGrafico.textContent =
                barra.dataset.dia + ": " +
                barra.dataset.minutos + " minutos de actividad.";
        });
    });
}

actualizarGraficoSemanal();
// ==========================================
// HIDRATACIÓN DIARIA - VIDA ACTIVA
// ==========================================

const contadorAgua = document.getElementById("contador-agua");
const progresoAgua = document.getElementById("progreso-agua");
const botonAgregarAgua = document.getElementById("agregar-agua");
const botonRestarAgua = document.getElementById("restar-agua");
const mensajeAgua = document.getElementById("mensaje-agua");
const resumenAgua = document.getElementById("resumen-agua");
const porcentajeAgua = document.getElementById("porcentaje-agua");

const META_AGUA = 8;

// Crear una clave diferente para cada día
const hoy = new Date();

const fechaHoy = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0")
].join("-");

const claveAgua = "vasosAguaVidaActiva_" + fechaHoy;

let vasosAgua = AlmacenamientoVidaActiva.obtener(claveAgua, 0);

function actualizarHidratacion() {

    contadorAgua.textContent = vasosAgua;

    const porcentaje = (vasosAgua / META_AGUA) * 100;
    document.getElementById("anillo-hidratacion")
    .style.setProperty("--porcentaje", porcentaje + "%");

    progresoAgua.style.width = porcentaje + "%";
    resumenAgua.textContent = vasosAgua;
porcentajeAgua.textContent = Math.round(porcentaje) + "%";

    if (vasosAgua >= META_AGUA) {
        mensajeAgua.textContent =
            "¡Has alcanzado tu objetivo de demostración!";
    } else {
        mensajeAgua.textContent =
            `Has registrado ${vasosAgua} de ${META_AGUA} vasos.`;
    }

    AlmacenamientoVidaActiva.guardar(claveAgua, vasosAgua);
}

// Añadir un vaso
botonAgregarAgua.addEventListener("click", () => {

    if (vasosAgua < META_AGUA) {
        vasosAgua++;
    }

    actualizarHidratacion();
});

// Quitar un vaso
botonRestarAgua.addEventListener("click", () => {

    if (vasosAgua > 0) {
        vasosAgua--;
    }

    actualizarHidratacion();
});

// Mostrar los datos guardados
actualizarHidratacion();
// ==========================================
// MODO FÁCIL - VIDA ACTIVA
// ==========================================

const botonModoFacil = document.getElementById("boton-modo-facil");

function aplicarModoFacil(activar) {
    document.body.classList.toggle("modo-facil", activar);

    botonModoFacil.textContent = activar
        ? "Modo fácil: activado"
        : "Modo fácil: desactivado";

    botonModoFacil.setAttribute("aria-pressed", String(activar));

    localStorage.setItem("modoFacilVidaActiva", String(activar));
}

// Recuperar la preferencia guardada
const modoFacilGuardado =
    localStorage.getItem("modoFacilVidaActiva") === "true";

aplicarModoFacil(modoFacilGuardado);

// Activar o desactivar al pulsar
botonModoFacil.addEventListener("click", () => {
    const activar = !document.body.classList.contains("modo-facil");
    aplicarModoFacil(activar);
});