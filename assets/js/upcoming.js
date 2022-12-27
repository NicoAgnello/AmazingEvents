
let eventos = data.events
let currentDate = data.currentDate

let upcomingEvents = filtroEventosFuturos(data.currentDate, eventos);

function filtroEventosFuturos(fechaActual, eventos) {
    let aux = [];
    for (const evento of eventos) {
        if (fechaActual > evento.date) {
            aux.push(evento)
        }
    }
    return aux;
}


let template = generarTemplate(upcomingEvents);

function generarTemplate(array1) {
    let template = ``
    for (const event of array1) {
        template += `
    <div class="col p-4">
        <div class="card carta">
            <img src="${event.image}" class="card-img-top" alt="fiesta-comida">
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title text-center">${event.name}</h5>
                <p class="card-text text-center">${event.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="card-text">Price: ${event.price}</h6>
                    <a class="ver-mas" href="./details.html">Ver mas...</a>
                </div>
             </div>
         </div>
     </div>
     `
    } return template;
}