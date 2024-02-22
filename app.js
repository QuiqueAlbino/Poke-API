const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
// const apiUrl = 'https://pokeapi.co/api/v2/pokemon/${param}';
const listaPokemon = [];
let pokemonList = '';

// val puede ser id o name
async function cargaPokemon(val) {
    const url = `${apiUrl}${val}`;
    try {
         await fetch(url)
        .then(res => res.json())
        .then(data => render(data))
    } catch(error) {
        console.log('entroo');
        alert('No se encontraron coincidencias', error);
        limpiaContent();
        
    }
}
function render(pokemon) {
    console.log(pokemon);
    limpiaContent();
    pokemonList = pokemon.name;
    const referencia = document.querySelector(".contenedor-pokemons");
    referencia.classList.add("hidden");
    // referencia.classList.add("card");
    const titulo = document.createElement("h3");
    titulo.innerHTML = `El pokemon es: ${pokemon.name}`;
    const idPokemon = document.createElement("h5");
    idPokemon.innerHTML = `<h5 class="card-title">El ID es: ${pokemon.id}</h5>`;
    const imagen = document.createElement('img');
    imagen.src = pokemon.sprites.front_default;
    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = 'Agregar';
    botonAgregar.className = 'btn btn-warning';
    botonAgregar.id = 'agregar-pokemon';

    const botonHabilidades = document.createElement("button");
    botonHabilidades.textContent = 'Ver mas';
    botonHabilidades.className = 'btn btn-primary';
    botonHabilidades.id = 'ver-habilidades';

    referencia.appendChild(titulo);
    referencia.appendChild(imagen);
    referencia.append(idPokemon);
    referencia.appendChild(botonAgregar);
    referencia.appendChild(botonHabilidades);
    referencia.classList.remove("hidden");

    botonAgregar.addEventListener('click', () => {
        agregaPokemon();
    })
    botonHabilidades.addEventListener('click', () => {
        renderHabilidades(pokemon);
    })
 
}
function renderHabilidades(pokemon) {
    console.log('en render habilidades', pokemon);
    const referencia = document.querySelector(".habilidades-extra");
    referencia.classList.add('style-habilidad')
    referencia.innerHTML = '';
    if (!referencia.hasChildNodes()) {
        const title = document.createElement("h3");
        title.textContent = 'Habilidades Extra';

        const pesoPokemon = document.createElement("h6");
        pesoPokemon.textContent = ` El peso de ${pokemon.name} es: ${pokemon.weight}`;

        const alturaPokemon = document.createElement("h6");
        alturaPokemon.textContent = ` La altura de ${pokemon.name} es: ${pokemon.height}`;

        referencia.appendChild(title);
        referencia.appendChild(pesoPokemon);
        referencia.appendChild(alturaPokemon);
    }

}
document.addEventListener('DOMContentLoaded', () => {
    const botonBuscar = document.getElementById('buscar-pokemon');
    botonBuscar.addEventListener('click', () => {
        const pokemonNameId = document.getElementById('busqueda-pokemon').value;
        // if ( typeof pokemonNameId === number) {

        // }
        
        cargaPokemon(pokemonNameId);
        const referencia = document.querySelector(".habilidades-extra");
        referencia.innerHTML = '';
        // console.log('soy el parametro de busqueda', pokemonNameId);
    })
} )

//  document.addEventListener('DOMContentLoaded', () => {
//     const referencia = document.querySelector(".contenedor-pokemons");
//     //  const botonBuscar = document.getElementById('agregar-pokemon');
//      referencia.addEventListener('click', () => {
//         console.log('SI DETECTO');
//         agregaPokemon();
//      })
//  } )

//  document.addEventListener('DOMContentLoaded', () => {
//     const referencia = document.querySelector(".contenedor-pokemons");
//     //  const botonBuscar = document.getElementById('agregar-pokemon');
//      referencia.addEventListener('click', () => {
//         console.log('SI DETECTO');
//         agregaPokemon();
//      })
//  } )
// funcion para agregar a la lista
function agregaPokemon() {
    console.log('soy el agregador',pokemonList);
    if ( !listaPokemon.includes(pokemonList)) {
        listaPokemon.push(pokemonList);
        const referencia = document.querySelector(".listado-agregados");
        referencia.classList.add('listado-pokedex')
        referencia.innerHTML = '';
        const ul = document.createElement("ul");
        listaPokemon.forEach(pokemon => {
            const li = document.createElement("li");
            li.textContent = pokemon;
            ul.appendChild(li)
        })
        referencia.appendChild(ul);
    } else {
        alert(`${pokemonList} ya se encuentra en tu pokedex :p`)
        // console.log('ya esta tu pokemon');
    }
    

}


// funcion para limpiar el div
function limpiaContent() {
    const referencia = document.querySelector(".contenedor-pokemons");
    referencia.innerHTML = '';
    const inputRef = document.getElementById('busqueda-pokemon');
    inputRef.value = ''; 
}
// cargaPokemon(132);