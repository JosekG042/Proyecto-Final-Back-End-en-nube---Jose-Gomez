
import { datosDesnormalizados, comprencionTotal } from "../Desnormalizacion/index.js"

const socket = io.connect();

// formularios
const productosForm = document.getElementById('formularioProds')
const mensajesForm = document.getElementById('formularioMjs')

// contenedores
const contenedorProds = document.getElementById('contenedorProductos')
const contenedorChat = document.getElementById('contenedorMensajes')
const contenedorXcentaje = document.getElementById('contenedorCompresion')

// document.getElementById("myText").defaultValue = "Goofy";

// RENDERS

// render productos
const limpiarProds = () => {
    contenedorProds.innerHTML = ""
}
const ProductosRenderizados = async (productos) => {
    let respuesta = await fetch('/public/Assets/Vistas/Templates/productoTemplate.hbs');
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({ productos })
    contenedorProds.innerHTML = html
}

// render mensajeria
const limpiarChat = () => {
    contenedorChat.innerHTML = ""
}

const mensajesRenderizados = async (mensajes) => {
    let respuesta = await fetch('/public/Assets/Vistas/Templates/mensajeriaTemplate.hbs');
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({ mensajes })
    contenedorChat.innerHTML = html
}

const renderMensajesDesnormalizados = async (datosDesnormalizados) => {
    let respuesta = await fetch('/public/Assets/Vistas/Templates/mensajeriaTemplate.hbs');
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({ datosDesnormalizados })
    contenedorChat.innerHTML = html
}

const renderXcentajeComprension = async (comprencionTotal) => {
    let respuesta = await fetch('/public/Assets/Vistas/Templates/mensajeriaTemplate.hbs');
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({ comprencionTotal })
    contenedorXcentaje.innerHTML = html
}



// LISTENERS

// Listeners Productos
productosForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(productosForm)
    const valoresFormulario = Object.fromEntries(datosFormulario)
    productosForm.reset();
    socket.emit('nuevo producto', valoresFormulario);
})


// Listeners Mensajeria
mensajesForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(mensajesForm)
    const valoresformulario = Object.fromEntries(datosFormulario)
    console.log(valoresformulario);
    mensajesForm.reset();
    socket.emit('nuevo mensaje', valoresformulario);
})


// EVENTOS

// Eventos Productos
socket.on('todos los productos', todosProds => {
    productos = todosProds
    limpiarProds()
    ProductosRenderizados(todosProds)
})


// Eventos mensajeria
socket.on('todos los mensajes', todosMsgs => {
    mensajes = todosMsgs
    limpiarChat()
    mensajesRenderizados(todosMsgs)
    // renderMensajesDesnormalizados(todosMsgs)
})

// Eventos porcentajecompresion
socket.on('porcentaje compresion', xcentaje => {
    comprencionTotal = xcentaje
    limpiarChat()
    renderXcentajeComprension(xcentaje)
})


// // Listeners obtener Productos x categoria
// productosForm.addEventListener('submit', (evento) => {
//     let respuesta = await fetch('/public/Assets/Vistas/Templates/mensajeriaTemplate.hbs');

// })




// sweetalert2