const api = "https://pokeapi.co/api/v2/pokemon/";

const card = document.getElementById('card');
const btn = document.getElementById('btn');

btn.addEventListener('click', getPokeData);
//using function() normal syntax for hoisting
function getPokeData() {
  //La Funcioón math.random genera un decimal entre 0 y 1 al multiplicarlo por 150 se vuelve, entre 0 y 149
  //No se cuenta el último número, por tanto le sumamos 1
  let id = Math.floor(Math.random() * 150) + 1;
  console.log(id);
  let pokeResult = url + id;
}
