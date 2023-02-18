import React, { useEffect, useState } from 'react'
import './index.css';
import Axios from "axios"
import Pokemon from './components/Pokemon';

function App() {
  const [pokemons, setPokemons] = useState([])
  const [load, setLoad] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")

  const getPokemons = async () => {
    const res = await fetch(load)
    const data = await res.json()
    console.log("allPokemons", data)
    setLoad(data.next)

    //getting stats:
    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        setPokemons(currentList => [...currentList, data])
      })
    }
    createPokemonObject(data.results)
    console.log("Pokemons", pokemons)

  }

  useEffect(() => { getPokemons() }, [])


  // const [prevUrl, setPrevUrl] = useState("")
  // const [loading, setLoading] = useState(true)
  // const initialUrl = "https://pokeapi.co/api/v2/pokemon"




  const [myPokemonName, setMyPokemonName] = useState("")
  const [pStatus, setPStatus] = useState(false)

  const [pokemonSpecs, setPokemonSpecs] = useState({
    name: "",
    pic: "",
    species: "",
    hp: "",
    attack: "",
    defense: "",
    type: ""
  })

  const serchMyPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${myPokemonName}`)
      .then((res) => {

        setPokemonSpecs({
          name: myPokemonName,
          pic: res.data.sprites.front_default,
          species: res.data.species.name,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          type: res.data.types[0].type.name
        })

        setPStatus(true)
      })
  }
  return (
    <div className="app-container">
      <div className='title-container'>
        <h1>My Pokemon</h1>
      </div>
      <div className='buttons-container'>
        <input type="text" onChange={(e) => setMyPokemonName(e.target.value)} />
        <button onClick={serchMyPokemon}>search</button>
      </div>
      <div className="pokemon">
        {!pStatus && <div>{
          pokemons.map((pokemon, i) => <Pokemon key={i} name={pokemon.name} pic={pokemon.sprites.other.dream_world.front_default} type={pokemon.types[0].type.name} />)

        }  < button onClick={() => getPokemons()}> More Pokemons</button>
        </div>}
        {pStatus && <div>
          <img src={pokemonSpecs.pic} alt="pokemonImg" />
          <p>{pokemonSpecs.name}</p>
          <p>species: {pokemonSpecs.species}</p>
          <p>hp: {pokemonSpecs.hp}</p>
          <p>attack: {pokemonSpecs.attack}</p>
          <p>defense: {pokemonSpecs.defense}</p>
          <p>type: {pokemonSpecs.type}</p>
          <button onClick={() => setPStatus(false)}>back to all Pokemons</button>
        </div>}
      </div>
    </div >
  );
}

export default App;
