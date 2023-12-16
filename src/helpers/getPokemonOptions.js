import pokemonApi from "@/api/pokemonApi"

export const getPokemons = () => {
    const pokemonsArr = Array.from(Array(151))
    return pokemonsArr.map((_,index) => index + 1)
    // crea el array
}

const getPokemonOptions = async () =>{
    // mezclar el array
    const mixedPokemons = getPokemons()
                                .sort(() => Math.random() - 0.5)
    // obtener los nombres de los pokemon
    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4))
    return pokemons
}

export const getPokemonNames = async ([a,b,c,d] = []) =>{
    
    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ]

    // resuelve todas las peticiones http de una
    const [p1, p2, p3, p4] = await Promise.all(promiseArr)

    return [
        {name: p1.data.name, id: p1.data.id},
        {name: p2.data.name, id: p2.data.id},
        {name: p3.data.name, id: p3.data.id},
        {name: p4.data.name, id: p4.data.id}
    ]
}

export default getPokemonOptions