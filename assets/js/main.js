let eventos = data.events;
let currentDate = data.currentDate;

let todosLosEventos = [].concat(eventos);

function generarTemplate(eventos) {
  let template = "";
  for (const event of eventos) {
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

const checkboxs = document.getElementById("checkbox-js");
const buscador = document.getElementById("buscador-js");

buscador.addEventListener("input", dobleFiltro);
checkboxs.addEventListener("input", dobleFiltro);

const categorias = eventos.map((evento) => evento.category);
const categoriasSinRepetir = Array.from(new Set(categorias));

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

function busquedaPorTexto() {
  let eventosFiltrados = eventos.filter((evento) => {
    return evento.name.toLowerCase().includes(buscador.value.toLowerCase());
  });
  return eventosFiltrados;
}

const checkboxes = document.querySelectorAll(".checkboxes");

function filtroCheckbox(datos) {
  let eventosFiltrados = [];
  for (const input of checkboxes) {
    if (input.checked) {
      eventosFiltrados = eventosFiltrados.concat(
        eventos
          .filter((evento) => {
            return evento.category.toLowerCase() === input.name.toLowerCase();
          })
          .map((evento) => evento.category.toLowerCase())
      );
    }
  }
  let filtro = datos.filter((eventos) =>
    eventosFiltrados.includes(eventos.category.toLowerCase())
  );
  if (eventosFiltrados.length === 0) {
    return todosLosEventos;
  } else {
    return filtro;
  }
}

function dobleFiltro() {
  let filtroBusqueda = busquedaPorTexto();
  let filterCheckbox = filtroCheckbox(filtroBusqueda);
  if (filterCheckbox.length === 0) {
    generarError();
  } else {
    generarTemplate(filterCheckbox);
  }
}

function generarError() {
  let template = `<h2 class="text-center p-4">No matches, please change filters</h1>`;
  document.getElementById("main").innerHTML = template;
}
