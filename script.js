const apiUrl = "https://pokeapi.co/api/v2/type/";

const containerDiv = document.querySelector(".container");
const pokemonsDiv = document.querySelector(".pokemons");
const typeSelect = document.querySelector(".type-select");

let types = new Set();
let typesArr = [];

function callApi(url)
{
    const myPromise = new Promise( (resolve,reject) => {
        fetch(url)
        .then( res => res.json())
        .then( data => {
            resolve(data)
        })
        .catch(err => {
            reject(err)
        })
    })

    return myPromise;
   
}

function getPokemon() {
    const promises = [];
    for(let i=1; i<=151; i++) {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(callApi(pokemonUrl));
    }
    return Promise.all(promises);
}

function createPokemonCard(data, index) {
    const pokemon = document.createElement("div");
    pokemon.classList.add("pokemon");

    const pokemonNum = document.createElement("p");
    pokemonNum.classList.add("number");
    pokemonNum.innerHTML = "#" + index;
    pokemon.appendChild(pokemonNum);

    const pokemonImg = document.createElement("img");
    pokemonImg.src = data.sprites.front_default;
    pokemon.appendChild(pokemonImg);

    const pokemonName = document.createElement("p");
    pokemonName.classList.add("name");
    pokemonName.innerHTML = data.name;
    pokemon.appendChild(pokemonName);

    const pokemonType = document.createElement("p");
    pokemonType.classList.add("type");
    pokemonType.innerHTML = data.types[0].type.name.toUpperCase();
    pokemon.appendChild(pokemonType);

    pokemonsDiv.appendChild(pokemon);

    types.add(data.types[0].type.name);
}

function typeOptions() {
    types.forEach((type) => {
        const typeOption = document.createElement("option");
        typeOption.textContent = type;
        typeOption.value = type;

        typeSelect.append(typeOption);
    })
    // console.log(typesArr);
}

getPokemon()
    .then(pokemonData => {
        pokemonData.forEach((data, index) => {
            createPokemonCard(data, index + 1);
        });
        typeOptions();
    })
    .catch((err) => {
        console.log(err);
    });

// createPokemonCard()

// getPokemon().then(typeOptions);
// console.log(typesArr);

// callApi("https://pokeapi.co/api/v2/pokemon/1")
// .then(data => console.log(data))
// .catch(err => console.log(err))