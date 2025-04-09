const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const imageContainer = document.getElementById("img-container");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSAttack = document.getElementById("special-attack");
const pokemonSDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");

const cleanInput = () => {
  const str = userInput.value;
  const mRegex = /♂|male$/i;
  const fRegex = /♀|female$/i;
  const specRegex = /[&\/\\#,+()$~%.'":*?<>{}]/;
  const spaceRegex = /\s/;
  let formattedStr = "";
  
  if (fRegex.test(str)) {
    formattedStr = str.replace(fRegex, "f").replace(specRegex, "").replace(spaceRegex, "-");
  }else if (mRegex.test(str)) {
    formattedStr = str.replace(mRegex, "m").replace(specRegex, "").replace(spaceRegex, "-");
  }else if (specRegex.test(str)) {
    formattedStr = str.replace(specRegex, "").replace(spaceRegex, "-");
  }else {
    formattedStr = str;
  }
  
  return formattedStr.toLowerCase();
};

const getPokemon = async () => {
  try {
    const allPokemon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
    const selectedPokemon = cleanInput();
    
    const response = await fetch(`${allPokemon}/${selectedPokemon}`);
    const data = await response.json();
    
    // Set pokemon info
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonId.textContent = `#${data.id}`;
    pokemonWeight.textContent = `Weight: ${data.weight}`;
    pokemonHeight.textContent = `Height: ${data.height}`;
    imageContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name}" />`;
    pokemonTypes.innerHTML = data.types.map(obj => 
      `<span class="${obj.type.name}">${obj.type.name}</span>`
    ).join("");
    
    // Set pokemon stats
    pokemonHp.innerText = data.stats[0].base_stat;
    pokemonAttack.innerText = data.stats[1].base_stat;
    pokemonDefense.innerText = data.stats[2].base_stat;
    pokemonSAttack.innerText = data.stats[3].base_stat;
    pokemonSDefense.innerText = data.stats[4].base_stat;
    pokemonSpeed.innerText = data.stats[5].base_stat;
  } catch (err) {
    resetUi();
    alert("Pokémon not found");
    console.log(`Pokémon not found: ${err}`);
  }
};

const resetUi = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) {
    sprite.remove();
  }
  
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  pokemonWeight.textContent = "";
  pokemonHeight.textContent = "";
  pokemonTypes.innerHTML = "";
  pokemonHp.textContent = "";
  pokemonAttack.textContent = "";
  pokemonDefense.textContent = "";
  pokemonSAttack.textContent = "";
  pokemonSDefense.textContent = "";
  pokemonSpeed.textContent = "";
};

searchBtn.addEventListener("click", () => {
  getPokemon();
});

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getPokemon();
  }
});
