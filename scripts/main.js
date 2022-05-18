//VARIABLES
const carrito = document.getElementById('carrito');
const contenidoCarrito = document.querySelector('#cargarCarrito tbody');
const vaciarCarrito = document.getElementById('vaciarCarrito');
const listaCurso = document.querySelector('#lista_carrito');
let articuloCarrito = [];

cargarEvent();

function cargarEvent(){

    listaCurso.addEventListener('click',agregarPedido);

    carrito.addEventListener('click',eliminarPedido);
    
    vaciarCarrito.addEventListener('click',()=>{
        articuloCarrito = [];

        limpiarHTML();
    })
};


function agregarPedido(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar_carrito')){
        const pedidoSeleccionado = e.target.parentElement
        leerPedido(pedidoSeleccionado);
    };
};

function eliminarPedido(e){
    if(e.target.classList.contains('borrar_pedido')){
        const pedidoID = e.target.getAttribute('data-id');

        articuloCarrito = articuloCarrito.filter(pedido => pedido.id !== pedidoID);

        carritoHTML();
    };
};


function leerPedido(pedido){

    const infoPedido = {
        imagen: pedido.querySelector('img').src,
        titulo: pedido.querySelector('h3').textContent,
        precio: pedido.querySelector('.precio span').textContent,
        id: pedido.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    const existe = articuloCarrito.some(pedido =>  pedido.id === infoPedido.id);

    if(existe){
        const pedidos = articuloCarrito.map(pedido =>{
            if( pedido.id === infoPedido.id){
                pedido.cantidad++;
            }else{
                return pedido
            }
        })
    }else{
        articuloCarrito = [...articuloCarrito, infoPedido]
    }

    console.log(articuloCarrito);
    carritoHTML();
};

function carritoHTML(){
    limpiarHTML();
    articuloCarrito.forEach( pedido=>{
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src ="${pedido.imagen}" width='100' class="mover_item1"></td>
        <td class="mover_item2">${pedido.titulo}</td>
        <td class="mover_item3">${pedido.precio}</td>
        <td class="mover_item4">${pedido.cantidad}</td>
        <td class="mover_item5"><a href="#" class="borrar_pedido" data-id="${pedido.id}"> X </a></td> 
        `;
        row.className = 'cambiando_caja'
        contenidoCarrito.appendChild(row);
    });
};



function limpiarHTML(){
    while(contenidoCarrito.firstChild){
        contenidoCarrito.removeChild(contenidoCarrito.firstChild);
    };
};