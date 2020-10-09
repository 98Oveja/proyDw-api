
const formulario = document.querySelector('#formulario');
const boton = document.querySelector('#boton');
const productos = document.querySelector('#productos');

const filtrar = ()=>{

        const texto = formulario.value.toLowerCase();
        fetch(`https://losbuenosprecios.herokuapp.com/webservice/productos/?search=${texto}`)
        .then(res => res.json())
        .then(data =>{
        console.log(data);

        productos.innerHTML = '';

        data.forEach(element =>{
            let nombre = element.nombre.toLowerCase();
            let preciosHtml = "";
            element.precios.forEach(precio =>{
                preciosHtml += `<p><strong>${precio.descripcion}:</strong> ${precio.precio}</p>`;
            })
            if(nombre.indexOf(texto) !== -1){

                productos.innerHTML += `
                <div class="mt-3 media bg-light p-4">
                    <img src="${element.imagen}" alt="img producto" width="100px" class="img-fluid img-thumbnail">
                    <div class='media-body'>
                    <p><strong>Nombre:</strong> ${element.nombre}</p>
                    <p><strong>Descripción:</strong> ${element.descripcion}</p>
                    ${preciosHtml}
                    <p><strong>Existencias:</strong> ${element.existencias}</p>
                    <p class="bg-dark text-light col col-6">${element.categoria.descripcion}</p>
                    </div>
                </div>
                `
            }
        })
        if (productos.innerHTML === '') {
            productos.innerHTML += `<p>Producto no encontrado :(</p>`
        }
    })
}
boton.addEventListener('click', filtrar);
formulario.addEventListener('keyup',filtrar);
filtrar();


