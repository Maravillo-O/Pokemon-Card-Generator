const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190ff",
}

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

  //Set theeme color
  //typeColor [en la posición ]
  const themecolor = typeColor[data.types[0].type.name];
  card.innerHTML = `
    
      <p class="hp">
        <span>HP</span>
        ${hp}
      </p>

      <img src="${pokeFoto}" alt="not found" width="100%">

      <h2 class="pokeName">${pokeName}</h2>

      <div class="types">
        
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
  `;
  appendTypes(data.types);
  styleCard(themecolor);
}

let appendTypes = (types) => {
  console.log(types);
  types.forEach((tipo) => {
    /*Podemos crear elementos de HTML con .createElement()
    puede ser, DIV, BUTTON, P, SPAN etc.
    */
    let span = document.createElement("SPAN");
    /*.textContet es muy similar a innerText
    en este caso lo hacemos igual al tipo(cada valor de data.types).type.name(valores del objeto de API), */
    span.textContent = tipo.type.name;
    /*Esto coloca el span dentro de ese contenedor en la página.
    appendChild: es un método que se usa para agregar un nodo, en este caso, el span
    */
    document.querySelector('.types').appendChild(span);
  })
};

let styleCard = ((color) => {
  card.style.background = `radial-gradient(circle at 50% 0, ${color} 36%, #ffffff 36%)`
})

