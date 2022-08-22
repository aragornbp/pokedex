const tagUl = document.querySelector(".pokedex");

async function fetchPokemons() {
  for (let i = 1; i <= 150; i++) {
    let apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let data = await apiResponse.json();

    let template = createCard(data);
    tagUl.appendChild(template);
  }
}

fetchPokemons();

function createCard(data) {
  const tagLi = document.createElement("li");
  tagLi.classList.add("card");

  const tagImg = document.createElement("img");
  tagImg.classList.add("card-image");
  tagImg.src = `${data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]}`;

  const tagH2 = document.createElement("h2");
  tagH2.classList.add("card-title");
  tagH2.innerText = `${data.name}`;

  const tagP = document.createElement("p");
  tagP.classList.add("card-subtitle");
  tagP.innerText = `${data.types
    .map((tipoInfo) => tipoInfo.type.name)
    .join(",")}`;

  tagLi.append(tagImg, tagH2, tagP);

  return tagLi;
}
