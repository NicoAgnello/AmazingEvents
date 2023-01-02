let eventos = data.events;
let currentDate = data.currentDate;

let todosLosEventos = [].concat(eventos);

let container = document.getElementById("sectionCards");

function generarTemplate(array1, container) {
  let template = "";
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
    `;
  }
  container.innerHTML = template;
}

generarTemplate(todosLosEventos, container);

const checkboxs = document.getElementById("checkbox-js");

checkboxs.addEventListener("change", filtroCheckbox);

const categorias = eventos.map((evento) => evento.category);
const categoriasSinRepetir = Array.from(new Set(categorias));

console.log(categoriasSinRepetir);

// function filtroCheckbox(event) {
//   let checkboxFiltrado = eventos.filter((evento) => {
//     return evento.category.includes(event.target.value);
//   });
//   generarTemplate(checkboxFiltrado, container);
// }

const buscador = document.getElementById("buscador-js");

buscador.addEventListener("input", busquedaPorTexto);

function busquedaPorTexto(event) {
  let eventosFiltrados = eventos.filter((evento) => {
    return evento.name.toLowerCase().includes(event.target.value.toLowerCase());
  });
  generarTemplate(eventosFiltrados, container); // Array con objetos
}
