let eventos = data.events;
let currentDate = data.currentDate;
let todosLosEventos;

const sitio = document.URL.split("/").pop().split(".").shift();

if (sitio === "index") {
  todosLosEventos = [].concat(eventos);
} else if (sitio === "upcoming") {
  todosLosEventos = eventos.filter((evento) => evento.date > currentDate);
} else if (sitio === "past") {
  todosLosEventos = eventos.filter((evento) => evento.date < currentDate);
}

function generarTemplate(array1) {
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
                    <a class="ver-mas" href="./details.html">See more...</a>
                </div>
            </div>
        </div>
    </div>
    `;
  }
  document.getElementById("sectionCards").innerHTML = template;
}

generarTemplate(todosLosEventos);

const categorias = eventos.map((evento) => evento.category);
const categoriasSinRepetir = Array.from(new Set(categorias));

const checkboxs = document.getElementById("checkbox-js");
const buscador = document.getElementById("buscador-js");

function generarChecks() {
  let template = "";
  for (const categoria of categoriasSinRepetir) {
    template += `
    <label class="d-flex flex-column ">
          <input class="checkboxes" id="${categoria}" type="checkbox" name="${categoria}">
          ${categoria}
      </label>
    `;
  }
  checkboxs.innerHTML = template;
}
generarChecks();

buscador.addEventListener("input", dobleFiltro);
checkboxs.addEventListener("input", dobleFiltro);

function busquedaPorTexto() {
  let eventosFiltrados = todosLosEventos.filter((evento) => {
    return evento.name.toLowerCase().includes(buscador.value.toLowerCase());
  });
  return eventosFiltrados;
}

const checkboxes = document.querySelectorAll(".checkboxes");

function filtroCheckbox(events) {
  const filtrosAplicados = [];
  for (const input of checkboxes) {
    if (input.checked) {
      filtrosAplicados.push(input.name.toLowerCase());
    }
  }
  if (filtrosAplicados.length === 0) {
    return events;
  }
  const eventosFiltrados = events.filter((evento) =>
    filtrosAplicados.includes(evento.category.toLowerCase())
  );
  return eventosFiltrados;
}

function dobleFiltro() {
  const eventosFiltradosPorBusqueda = busquedaPorTexto();
  const eventosFiltradosPorCheck = filtroCheckbox(eventosFiltradosPorBusqueda);
  if (eventosFiltradosPorCheck.length === 0) {
    generarError();
  } else {
    generarTemplate(eventosFiltradosPorCheck);
    document.getElementById("error-message").innerHTML = "";
  }
}

function generarError() {
  document.getElementById("sectionCards").innerHTML = "";
  let template = `<h2 class="text-center p-4">No matches, please change filters</h1>`;
  document.getElementById("error-message").innerHTML = template;
}
