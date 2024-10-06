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
  //Combinamos la API con el id del pokemon
  let apiResult = api + id;
  //Le pasamos el pokeresult atraves de fetch para obtener inf de la api
  fetch(apiResult)
    //Al resultado de fetch, le damos el formato de json
    .then((response) => response.json())
    //Luego usaremos esa inf en formato json para generar la carta
    .then((data) => {
      generateCard(data);
    });
};

//Generate Card

function generateCard(data) {
  //Usar 'data' para asignarla a las variables
  //consologeamos 'data', data es la inf que bajamos de la API
  console.log(data)
  //En pokédex (relacionado a la API que usamos), nos da 6 stats, hp, attack, defense, special attack, special defense, speed
  //Primero asignaremos hp a una variable para que sea más fácil de accesar
  //Le decimos que el array[0], por que es el elemento relacionado con los hp del pokemon
  const hp = data.stats[0].base_stat;
  // hp = a base_stat que está en la posición data.stats[0] 
  //Hacemos lo mismo con attack, defense y speed
  const attack = data.stats[1].base_stat;
  const defense = data.stats[2].base_stat;
  const speed = data.stats[5].base_stat;
  //también necesitamos la img del pokémon
  const pokeFoto = data.sprites.other.dream_world.front_default;
  const pokeName = data.name;
  const type1 = data.types[0].type.name;


  const type2 = data.types[1].type.name;

  if (!type2) {
    type2 = "Unitype";
  }
  card.innerHTML = `
    
      <p class="hp">
        <span>HP</span>
        ${hp}
      </p>

      <img src="${pokeFoto}" alt="not found" width="100%">

      <h2 class="pokeName">${pokeName}</h2>

      <div class="types">
        <span> ${type1} </span>
        <span> ${type2}</span>
      </div> <!--END-Div: types-->

      <div class="stats">
        <div>
          <h3> ${attack} </h3>
          <p> Attack </p>
        </div>
        <div>
          <h3> ${defense} </h3>
          <p> Defense </p>
        </div>
        <div>
          <h3> ${speed} </h3>
          <p> Speed </p>
        </div>

      </div> 
  `
}


