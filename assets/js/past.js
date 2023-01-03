
let eventos = data.events
let currentDate = data.currentDate

let pastEvents = filtroEventosPasados(currentDate, eventos);

function filtroEventosPasados(fechaActual, eventos) {
    let aux = [];
    for (const evento of eventos) {
        if (evento.date < fechaActual) {
            aux.push(evento)
        }
    }
    return aux;
}

let template = generarTemplate(pastEvents);


function generarTemplate(array1) {
    let container = document.getElementById("sectionCards");
    for (const event of array1) {
        container.innerHTML += `
    <div class="col p-4">
        <div class="card carta">
            <img src="${event.image}" class="card-img-top" alt="fiesta-comida">
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title text-center">${event.name}</h5>
                <p class="card-text text-center">${event.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="card-text">Price: ${event.price}</h6>
                    <a class="ver-mas" href="./details.html">See more...</a>
                </div>
             </div>
         </div>
     </div>
     `
    } return container;
}