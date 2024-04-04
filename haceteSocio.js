let sociosRegistrados = []; 

function cargarDatosSocios() {
    fetch('socios.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudieron cargar los datos de socios.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de socios cargados:', data);
            sociosRegistrados = data;
            mostrarInicio();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function mostrarInicio() {
    const contenidoDiv = document.getElementById('contenido');
    contenidoDiv.innerHTML = `
        <h1>Bienvenido a San Lorenzo, tu Club</h1>
        <button onclick="ingresarComoSocio()">Ingresar como socio</button>
        <button onclick="hacerseSocio()">Hacerse socio</button>
    `;
}

function ingresarComoSocio() {
    const contenidoDiv = document.getElementById('contenido');
    contenidoDiv.innerHTML = `
        <h2>Ingresar como socio</h2>
        <input type="number" id="numeroSocio" placeholder="Número de socio">
        <button onclick="verificarSocio()">Ingresar</button>
    `;
}

function verificarSocio() {
    const numeroSocioInput = document.getElementById('numeroSocio');
    const numeroSocio = parseInt(numeroSocioInput.value);
    const socioEncontrado = sociosRegistrados.find(socio => socio.numero === numeroSocio);
    if (socioEncontrado) {
        mostrarPerfilSocio(socioEncontrado);
    } else {
        const contenidoDiv = document.getElementById('contenido');
        contenidoDiv.innerHTML = `<p>Número de socio incorrecto</p>`;
    }
}
function mostrarPerfilSocio(socio) {
    const contenidoDiv = document.getElementById('contenido');
    contenidoDiv.innerHTML = `
        <h2>Bienvenido ${socio.nombre}</h2>
        <p>Documento: ${socio.documento}</p>
        <p>Número de socio: ${socio.numero}</p>
        <button onclick="editarPerfilSocio(${socio.numero})">Editar perfil</button>
        <button onclick="eliminarCuentaSocio(${socio.numero})">Eliminar cuenta</button>
        <button onclick="mostrarInicio()">Cerrar sesión</button>
    `;
}
function editarPerfilSocio(numeroSocio) {
    const socioEncontrado = sociosRegistrados.find(socio => socio.numero === numeroSocio);
    if (socioEncontrado) {
        const contenidoDiv = document.getElementById('contenido');
        contenidoDiv.innerHTML = `
            <h2>Editar perfil</h2>
            <input type="text" id="nombreSocio" placeholder="Nombre y Apellido" value="${socioEncontrado.nombre}">
            <input type="number" id="documentoSocio" placeholder="Documento" value="${socioEncontrado.documento}">
            <button onclick="guardarCambios(${numeroSocio})">Guardar cambios</button>
            <button onclick="mostrarPerfilSocio(${numeroSocio})">Cancelar</button>
        `;
    }
}

function guardarCambios(numeroSocio) {
    const nombreSocioInput = document.getElementById('nombreSocio');
    const documentoSocioInput = document.getElementById('documentoSocio');
    const nombre = nombreSocioInput.value;
    const documento = parseInt(documentoSocioInput.value);
    const socioIndex = sociosRegistrados.findIndex(socio => socio.numero === numeroSocio);
    if (socioIndex !== -1) {
        sociosRegistrados[socioIndex].nombre = nombre;
        sociosRegistrados[socioIndex].documento = documento;
        const contenidoDiv = document.getElementById('contenido');
        contenidoDiv.innerHTML = `<p>Perfil actualizado con éxito</p>`;
    } else {
        const contenidoDiv = document.getElementById('contenido');
        contenidoDiv.innerHTML = `<p>Socio no encontrado</p>`;
    }
}
function eliminarCuentaSocio(numeroSocio) {
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar tu cuenta?");
    if (confirmacion) {
        const socioIndex = sociosRegistrados.findIndex(socio => socio.numero === numeroSocio);
        if (socioIndex !== -1) {
            sociosRegistrados.splice(socioIndex, 1);
            const contenidoDiv = document.getElementById('contenido');
            contenidoDiv.innerHTML = `<p>Cuenta eliminada con éxito</p>`;
        } else {
            const contenidoDiv = document.getElementById('contenido');
            contenidoDiv.innerHTML = `<p>Socio no encontrado</p>`;
        }
    }
}
function hacerseSocio() {
    const contenidoDiv = document.getElementById('contenido');
    contenidoDiv.innerHTML = `
        <h2>Hacerse socio</h2>
        <input type="text" id="nombreSocio" placeholder="Nombre y Apellido">
        <input type="number" id="documentoSocio" placeholder="Documento">
        <button onclick="registrarSocio()">Registrarse</button>
        <button onclick="mostrarInicio()">Cancelar</button>
    `;
}
function registrarSocio() {
    const nombreSocioInput = document.getElementById('nombreSocio');
    const documentoSocioInput = document.getElementById('documentoSocio');
    const nombre = nombreSocioInput.value;
    const documento = parseInt(documentoSocioInput.value);
    const nuevo_socio = {
        nombre: nombre,
        documento: documento,
        numero: Math.floor(Math.random() * (8000 - 1 + 1)) + 1
    };
    sociosRegistrados.push(nuevo_socio);
    const contenidoDiv = document.getElementById('contenido');
    contenidoDiv.innerHTML = `<p>Registrado con éxito, tu número de socio es ${nuevo_socio.numero}</p>`;
}

cargarDatosSocios();
