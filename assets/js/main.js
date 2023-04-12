let nombreUsuario;
let opcionesMenu = [{
        nombre: "Menú Común",
        precio: 900
    },
    {
        nombre: "Menú Saludable",
        precio: 850
    },
    {
        nombre: "Menú Vegano",
        precio: 900
    },
];
let tipoDeMenu;
let cantidadPorciones = [0, 0, 0];
let precioTotal = 0;
let envioDomicilio = false;
let direccionEnvio;
let telefonoEnvio;

// Función para pedir al usuario que ingrese su nombre
function pedirNombre() {
    nombreUsuario = prompt("¡Bienvenido! Por favor, ingrese su nombre:");
    if (!nombreUsuario) {
        pedirNombre();
    }
}

// Función para pedir al usuario que elija el tipo de menú
function pedirTipoDeMenu() {
    let mensajeOpciones = "Por favor, elija una de las siguientes opciones de menú:\n\n";
    opcionesMenu.forEach((opcion, index) => {
        mensajeOpciones += `${index + 1}. ${opcion.nombre} ($${opcion.precio} ARS)\n`;
    });
    tipoDeMenu = parseInt(prompt(mensajeOpciones));
    if (isNaN(tipoDeMenu) || tipoDeMenu < 1 || tipoDeMenu > opcionesMenu.length) {
        alert("Lo siento, opción de menú inválida. Por favor, vuelva a intentarlo.");
        pedirTipoDeMenu();
    }
}

// Función para pedir al usuario que elija la cantidad de porciones para cada opción de menú
function pedirCantidadPorciones() {
    opcionesMenu.forEach((opcion, index) => {
        let cantidad = prompt(`¿Cuántas porciones de ${opcion.nombre} desea?`);
        cantidad = parseInt(cantidad);
        if (isNaN(cantidad) || cantidad < 0) {
            alert("Lo siento, cantidad inválida. Por favor, vuelva a intentarlo.");
            pedirCantidadPorciones();
        } else {
            cantidadPorciones[index] = cantidad;
        }
    });
}

// Función para pedir al usuario si desea envío a domicilio
function pedirEnvioDomicilio() {
    let respuesta = prompt("¿Desea envío a domicilio? (S/N)").toUpperCase();
    if (respuesta === "S") {
        envioDomicilio = true;
        direccionEnvio = prompt("Por favor, ingrese su dirección de envío:");
        telefonoEnvio = prompt("Por favor, ingrese su número de teléfono:");
    } else if (respuesta === "N") {
        envioDomicilio = false;
    } else {
        alert("Respuesta inválida. Por favor, vuelva a intentarlo.");
        pedirEnvioDomicilio();
    }
}

// Función para calcular el precio total de las porciones elegidas
function calcularPrecioTotal() {
    precioTotal = 0;
    opcionesMenu.forEach((opcion, index) => {
        precioTotal += opcion.precio * cantidadPorciones[index];
    });
    if (envioDomicilio) {
        precioTotal += 200; // costo adicional por envío a domicilio
    }
}

let seguirPedido = true;

while (seguirPedido) {
    pedirNombre();
    pedirTipoDeMenu();
    pedirCantidadPorciones();
    pedirEnvioDomicilio();
    calcularPrecioTotal();

    alert(
        `¡Gracias por su compra, ${nombreUsuario}! El costo total de su pedido es $${precioTotal} ARS. Su pedido sera enviado a ${envioDomicilio ? direccionEnvio + "," + telefonoEnvio : "la sucursal mas cercana"}. ¡Que tenga un buen dia!`
    );

    seguirPedido = confirm("¿Desea realizar otro pedido?");
}