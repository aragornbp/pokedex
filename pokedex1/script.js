const pokemonImg = document.querySelector(".pokemon_img");
const pokemonId = document.querySelector(".pokemon_id");
const pokemonName = document.querySelector(".pokemon_name");
const formulario = document.querySelector(".form");
const input = document.querySelector(".input_search");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let searchPokemon = 1;

async function fetchPokemons(pokemon) {
  try {
    pokemonName.innerText = "Loading...";
    pokemonId.innerText = "";

    const ApiResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    const data = await ApiResponse.json();
    renderPokemon(data);
    
  } catch {
    pokemonImg.style.display = "none";
    pokemonId.innerText = "";
    pokemonName.innerText = "Pokemon not found.";
  }
}

function renderPokemon(data) {
  pokemonImg.src =
    data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
      "front_default"
    ];
  pokemonId.innerText = data["id"];
  pokemonName.innerText = data["name"];
  searchPokemon = data["id"];
}

fetchPokemons(searchPokemon);

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  fetchPokemons(input.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    fetchPokemons(searchPokemon);
  }
});

btnNext.addEventListener("click", () => {
  searchPokemon += 1;
  fetchPokemons(searchPokemon);
});
