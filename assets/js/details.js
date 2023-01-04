let eventos = data.events;
let todosLosEventos = [].concat(eventos);

const stringUrlConID = location.search;

const generarUrl = new URLSearchParams(stringUrlConID);

const id = generarUrl.get("id");

const contenedorDetails = document.getElementById("contenedor-details");

const eventoEncontrado = todosLosEventos.find((evento) => evento._id === id);

function generarCardDetails(evento) {
  contenedorDetails.innerHTML = "";
  let template;
  template = `<div class="row d-flex flex-row justify-content-evenly gap-2 ">
    <img class=" col-12 col-xl-5 d-flex justify-content-center "
        src="${evento.image}" alt="imagen-details">
    <div class="card col-12 col-xl-6 box-detalles">
        <div class="card-body cuerpo-details ">
            <h5 class=" text-center ">${evento.name}</h5>
            <p class="card-text text-center ">${evento.description}</p>
            <ul class="d-flex flex-column gap-3 text-center p-0 lista-details">
                <li class="list-group-item">Category:${evento.category}</li>
                <li class="list-group-item">Place: ${evento.place}</li>
                <li class="list-group-item">Capacity: ${evento.capacity} </li>
                <li class="list-group-item">Assistance: ${evento.assistance}</li>
            </ul>
            <div class=" price-date-details p-2">
                <h6 class="card-title text-center">${evento.date}</h6>
                <h6 class="card-title text-center">Price: $${evento.price}</h6>
            </div>
        </div>
    </div>
</div>`;
  contenedorDetails.innerHTML = template;
}

generarCardDetails(eventoEncontrado);
