const apiUrl = "https://pokeapi.co/api/v2/type/";

const containerDiv = document.querySelector(".container");
const pokemonsDiv = document.querySelector(".pokemons");
const typeSelect = document.querySelector(".type-select");
const filterBtn = document.querySelector(".filter-btn");
const pokemonInput = document.querySelector(".search-pokemon");
const resetBtn = document.querySelector(".reset-btn");

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
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon-div");
    pokemonDiv.classList.add("flip-card-inner"); // Add flip-card-inner class to the pokemon-div
    pokemonDiv.style.background = `rgba(${chooseColor(data.types[0].type.name, "bg")}, 0.6)`;

    // Remove the separate inner div and append elements directly to pokemonDiv
    const pokemon = document.createElement("div");
    pokemon.classList.add("pokemon");

    const pokemonNum = document.createElement("p");
    pokemonNum.classList.add("number");
    pokemonNum.style.background = chooseColor(data.types[0].type.name);
    pokemonNum.innerHTML = "#" + index;
    pokemon.appendChild(pokemonNum);

    const pokemonImg = document.createElement("img");
    pokemonImg.src = data.sprites.front_default;
    pokemon.appendChild(pokemonImg);

    const pokemonName = document.createElement("p");
    pokemonName.classList.add("name");
    pokemonName.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pokemon.appendChild(pokemonName);

    const pokemonType = document.createElement("p");
    pokemonType.classList.add("type");
    pokemonType.innerHTML = data.types[0].type.name.toUpperCase();
    pokemonType.style.background = chooseColor(data.types[0].type.name);
    pokemon.appendChild(pokemonType);

    const filpCardBack = document.createElement("div");
    filpCardBack.classList.add("flip-card-back");
    // Append content directly to pokemonDiv
    // filpCardBack.innerHTML = "<p>This is the back side</p>";
    // filpCardBack.appendChild(pokemonImg);

    const backCardNum = document.createElement("p");
    backCardNum.classList.add("number");
    backCardNum.style.background = chooseColor(data.types[0].type.name);
    backCardNum.innerHTML = "#" + index;
    filpCardBack.appendChild(backCardNum);

    const backCardImg = document.createElement("img");
    backCardImg.src = data.sprites.front_default;
    filpCardBack.appendChild(backCardImg);

    const backCardName = document.createElement("p");
    backCardName.classList.add("name");
    backCardName.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    filpCardBack.appendChild(backCardName);

    const backCardAbilities = document.createElement("p");
    let abilityOutput = "Abilities: ";
    // console.log(data.abilities);
    data.abilities.forEach((ability, index) => {
        // console.log(ability.ability.name);
        if(index < (data.abilities.length - 1)) {
            abilityOutput += ability.ability.name + ", ";
        }
        else {
            abilityOutput += ability.ability.name;
        }
    })
    // data.abilities.forEach((index, ability) => {
    //     // console.log(ability.ability.name);
    //     if(index == (data.abilities.length - 1)) {
    //         abilityOutput += ability + ", ";
    //     }
    //     else {
    //         abilityOutput += ability;
    //     }
    // })
    backCardAbilities.innerHTML = abilityOutput;
    filpCardBack.appendChild(backCardAbilities);

    pokemonDiv.appendChild(pokemon);
    pokemonDiv.appendChild(filpCardBack); // Append the flip card back directly to pokemonDiv
    pokemonsDiv.appendChild(pokemonDiv);

    types.add(data.types[0].type.name);
}


function chooseColor(type, category = "") {
    if(type === "grass") {
        if(category === "bg") {
            return "65, 176, 110";
        }
        else {
            return "#1A4D2E";
        }
    }
    else if(type === "fire") {
        if(category === "bg") {
            return "221, 87, 70";
        }
        else {
            return "#820300";
        }
    }
    else if(type === "water") {
        if(category === "bg") {
            return "160, 222, 255";
        }
        else {
            return "#153448"
        }
    }
    else if(type === "bug") {
        if(category === "bg") {
            return "135, 169, 34";
        }
        else {
            return "#114232";
        }
    }
    else if(type === "normal") {
        if(category === "bg") {
            return "255, 255, 255";
        }
        else {
            return "#E72929";
        }
    }
    else if(type === "poison") {
        if(category === "bg") {
            return "67, 104, 80";
        }
        else {
            return "#12372A";
        }
    }
    else if(type === "electric") {
        if(category === "bg") {
            return "255, 193, 0";
        }
        else {
            return "#FF6500";
        }
    }
    else if(type === "ground") {
        if(category === "bg") {
            return "236, 177, 89";
        }
        else {
            return "#803D3B";
        }
    }
    else if(type === "fairy") {
        if(category === "bg") {
            return "255, 243, 199"
        }
        else {
            return "#F4538A";
        }
    }
    else if(type === "fighting") {
        if(category === "bg") {
            return "63, 109, 156";
        }
        else {
            return "#E14D2A";
        }
    }
    else if(type === "psychic") {
        if(category === "bg") {
            return "112, 66, 100";
        }
        else {
            return "#32012F";
        }
    }
    else if(type === "rock") {
        if(category === "bg") {
            return "116, 114, 100";
        }
        else {
            return "#3C3633";
        }
    }
    else if(type === "ghost") {
        if(category === "bg") {
            return "92, 131, 116";
        }
        else {
            return "#0C0C0C";
        }
    }
    else if(type === "ice") {
        if(category === "bg") {
            return "238, 247, 255";
        }
        else {
            return "#5AB2FF";
        }
    }
    else if(type === "dragon") {
        if(category === "bg") {
            return "155, 57, 34";
        }
        else {
            return "#481E14";
        }
    }
}

function typeOptions() {
    types.forEach((type) => {
        const typeOption = document.createElement("option");
        typeOption.textContent = type;
        typeOption.value = type;

        typeSelect.append(typeOption);
    })
}

function filterByType() {
    const selectedType = typeSelect.value.toLowerCase();
    const pokemonCards = document.querySelectorAll('.pokemon-div');

    pokemonCards.forEach((card) => {
        const cardType = card.querySelector('.type').textContent.toLowerCase();
        if (selectedType === 'all' || cardType === selectedType) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterByName() {
    const searchText = pokemonInput.value.trim().toLowerCase();
    const pokemonCards = document.querySelectorAll('.pokemon-div');

    pokemonCards.forEach((card) => {
        const cardName = card.querySelector('.name').textContent.toLowerCase();
        if (cardName.includes(searchText)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function pageReload() {
    location.reload();
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

filterBtn.addEventListener("click", () => {
    filterByType();
});

pokemonInput.addEventListener("input", () => {
    filterByName();
});

resetBtn.addEventListener("click", () => {
    pageReload();
})

const logResponse = callApi("https://pokeapi.co/api/v2/pokemon/1");

// logResponse.then((data) => {
//     data.abilities.forEach((ability, index) => {
//         console.log(index, ability.ability.name);
//     })
// })

// createPokemonCard()

// getPokemon().then(typeOptions);
// console.log(typesArr);

// callApi("https://pokeapi.co/api/v2/pokemon/1")
// .then(data => console.log(data))
// .catch(err => console.log(err))