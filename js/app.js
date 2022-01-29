//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    //agrega curso al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso)

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        console.log('vaciando carrito');
        articulosCarrito = [];

        limpairHTML();//eliminamos todo el html
    })
}



//funciones
function agregarCurso(e){
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
}
//eliminar curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //eliminar del arreglo
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        carritoHTML();//iteramos nuevamente sobre el carrito html
        console.log(articulosCarrito);
    }
}


//lee el contenido donde dimos click
function leerDatosCurso(curso){
    // console.log(curso);

    //creo  un objeto con el contenido del cursor
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    console.log(existe);

    //agrega elementos objetos al carrito
    if(existe){
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso;
            }else{
                return curso;
            }
        } );
        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

//muestra el carrito de compras en el html
function carritoHTML(){
    //limpoiar HTML
    limpairHTML();
    //recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> 
                <img src = "${imagen}" width="100"/>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class = "borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        //agrega el HTML al carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos de Tbody
function limpairHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

