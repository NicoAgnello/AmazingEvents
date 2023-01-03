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
                    <a class="ver-mas" href="./details.html">Ver mas...</a>
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

const categorias = eventos.map((evento) => evento.category);
const categoriasSinRepetir = Array.from(new Set(categorias));

function generarFiltro() {
  let template = "";
  for (const categoria of categoriasSinRepetir) {
    template += `
    <label class="d-flex flex-column ">
          <input id="${categoria}" type="checkbox" name="${categoria}">
          ${categoria}
      </label>
    `;
  }
  checkboxs.innerHTML = template;
}
generarFiltro();

const addListener = () => {
  categoriasSinRepetir.forEach((categoria) => {
    document
      .getElementById(categoria)
      .addEventListener("input", filtroCheckbox());
  });
};

buscador.addEventListener("input", busquedaPorTexto);
checkboxs.addEventListener("input", filtroCheckbox);

function busquedaPorTexto(event) {
  let eventosFiltrados = eventos.filter((evento) => {
    return evento.name.toLowerCase().includes(event.target.value.toLowerCase());
  });
  generarTemplate(eventosFiltrados); // Array con objetos
}

function filtroCheckbox() {
  const checkedInputs = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );
  console.log(checkedInputs);
  if (checkedInputs.length === 0) {
    return generarTemplate(todosLosEventos);
  }
  let eventosFiltrados = [];
  checkedInputs.forEach(
    (categoria) =>
      (eventosFiltrados = eventosFiltrados.concat(
        Array.from(eventos).filter(
          (evento) => evento.category === categoria.name
        )
      ))
  );
  generarTemplate(eventosFiltrados);
}
