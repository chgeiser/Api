async function getRandomUser() {
  try {
    //const res = await fetch("https://mindicador.cl/api");
    const res = await fetch ("https://findic.cl/api/");
    const data = await res.json();
    //console.log(data);

    const valorIngresado = document.querySelector("#valorIngresado");
    const tipoMonedas = document.querySelector("#tipoMonedas");
    const resultado = document.querySelector("#resultado");

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

getRandomUser();
