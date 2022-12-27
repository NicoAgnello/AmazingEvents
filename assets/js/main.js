

let eventos = data.events
let currentDate = data.currentDate

let todosLosEventos = ''
let pastEvents = ''
let upcomingEvents = ''

function verificarEvento() {
    for (const evento of eventos) {
        todosLosEventos += `<div class="col p-4">
    <div class="card carta">
        <img src="${evento.image}" class="card-img-top" alt="fiesta-comida">
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title text-center">${evento.name}</h5>
            <p class="card-text text-center">${evento.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <h6 class="card-text">Price: ${evento.price}</h6>
                <a class="ver-mas" href="./details.html">Ver mas...</a>
            </div>
        </div>
    </div>
</div>`
        if (evento.date < currentDate) {
            pastEvents += `<div class="col p-4">
            <div class="card carta">
                <img src="${evento.image}" class="card-img-top" alt="fiesta-comida">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title text-center">${evento.name}</h5>
                    <p class="card-text text-center">${evento.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="card-text">Price: ${evento.price}</h6>
                        <a class="ver-mas" href="./details.html">Ver mas...</a>
                    </div>
                </div>
            </div>
        </div>`
        } else {
            upcomingEvents += `<div class="col p-4">
            <div class="card carta">
                <img src="${evento.image}" class="card-img-top" alt="fiesta-comida">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title text-center">${evento.name}</h5>
                    <p class="card-text text-center">${evento.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="card-text">Price: ${evento.price}</h6>
                        <a class="ver-mas" href="./details.html">Ver mas...</a>
                    </div>
                </div>
            </div>
        </div>`
        }
    }
}

verificarEvento()

console.log(todosLosEventos)
console.log(pastEvents)
console.log(upcomingEvents)