//variables
const resultado = document.querySelector("#resultado");
const year = document.querySelector("#year");
const marca = document.querySelector("#marca");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const datosBusqueda = {
  marca: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
  year: "",
};

const max = new Date().getFullYear();
const min = max - 12;

//eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos);
  llenarSelect();
});

// eventlistener para los select de busqueda
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;

  filtrarAutos();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;
  mostrarAutos();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
  mostrarAutos();
});
puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  mostrarAutos();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  mostrarAutos();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  mostrarAutos();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = parseInt(e.target.value);
  filtrarAutos();
});

//funciones

function mostrarAutos(autos) {
  limpiarHTML(); // Elimina el HTML previo
  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHTML = document.createElement("p");

    autoHTML.textContent = `${marca} ${modelo} - ${year} - ${puertas} puertas - transmision: ${transmision} 
    precio: ${precio} - color: ${color}
    
    `;

    resultado.appendChild(autoHTML);
  });
}

//limpiar HTML

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// llena el select de years
function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); // agrega los años al select
  }
}

//funcion que filtra en base a la busqueda
function filtrarAutos() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent =
    "No hay resultado, intente con otros terminos de busqueda";
  resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}
