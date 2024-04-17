import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './MiApi.css'


const MiApi = () => {
    const [pokemones, setPokemones] = useState([]);
    const [busqueda, setBusqueda] = useState("");
  
    useEffect(() => {
      const obtenerPokemones = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const listadoPokemones = await response.json();
        const { results } = listadoPokemones;
  
        const nuevoPokemon = results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const poke = await response.json();
  
          return {
            id: poke.id,
            name: poke.name,
            img: poke.sprites.other.dream_world.front_default,
            weight: poke.weight,
          };
        });
        setPokemones(await Promise.all(nuevoPokemon));
      };
      obtenerPokemones();
    }, []);
    return (
      <>
      <div className="text-center">
        <input
        className="buscador mt-5 mb-5 rounded"
          type="text"
          placeholder="Busca tu pokemon"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
          }}
        />
        </div>
        <div className="container mt-5">
          <div className="row">
            {pokemones
              .filter((pokemon) =>
                pokemon.name.toLowerCase().includes(busqueda.toLocaleLowerCase())
              )
              .map((pokemon) => {
                return (
                  <div key={pokemon.id} className="text-center col-md-4 mb-5 ">
                    <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                      <img
                        src={pokemon.img}
                        className="card-img-top ancho-imagen"
                        alt="{pokemon.name}"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{pokemon.name}</h5>
                        <p className="card-text">{pokemon.weight} Kg</p>
                        <p className="card-text bg-danger rounded text-warning">{pokemon.id}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  };
  
  
export default MiApi;