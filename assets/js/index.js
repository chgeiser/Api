let urlBase = "https://findic.cl/"
const valorIngresado = document.querySelector("#valorIngresado");
const tipoMonedas = document.querySelector("#tipoMonedas");
const resultado = document.querySelector("#resultado");
const btnBuscar = document.querySelector('#btnBuscar');
const ctx = document.getElementById('myChart');
let dataMonedas = {};
let chart;

async function getValores() {
  try {
    //const res = await fetch("https://mindicador.cl/api");
    const res = await fetch (urlBase + 'api/');
    const data = await res.json();
    dataMonedas = data;

    for (let key in data) {
        if (data[key].codigo && data[key].nombre) {
      tipoMonedas.innerHTML += `<option value="${data[key].codigo}">${data[key].nombre}</option>`;
      console.log(tipoMonedas);
    }
}
  } catch (e) {
    console.log(e);
  }
}



async function calcularValor() {
  const monto = parseFloat(valorIngresado.value);
  const codigo = tipoMonedas.value;

  if (!monto || !codigo) {
    resultado.innerHTML = "Por favor ingrese un valor y seleccione una moneda.";
    return;
  }

  const res = await fetch(`${urlBase}api/${codigo}`);
  const data = await res.json();

  const valorActual = data.serie[0].valor;
  const conversion = monto / valorActual;

 resultado.innerHTML = `
    ${monto} pesos chilenos equivalen a ${conversion.toFixed(2)} ${data.unidad_medida}.
    <br>Valor actual del ${data.nombre}: ${valorActual} ${data.unidad_medida}.
  `;

  const ultimos = data.serie.slice(0, 10).reverse();
  const labels = ultimos.map((label) => new Date(label.fecha).toLocaleDateString());
  const valores = ultimos.map((valor) => valor.valor);

  renderChart(labels, valores, data.nombre);
}

btnBuscar.addEventListener("click", calcularValor);

function renderChart(labels, valores, nombre) {
  if (chart) {
    chart.destroy(); // elimina gráfico anterior
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `Historial últimos días (${nombre})`,
          data: valores,
          borderWidth: 2,
          borderColor: "blue",
          fill: false,
          tension: 0.2,
        },
      ],
    },
    options: {
      scales: {
        y: { beginAtZero: false },
      },
    },
  });
}


getValores();
