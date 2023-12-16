import getPokemonOptions, {getPokemons, getPokemonNames} from "@/helpers/getPokemonOptions";
import {pokemons} from '../mocks/pokemons.mock'

describe('getPokemonOptions', () => { 

    test('debe de regresar un arreglo de numeros', ()=>{
        const pokemons = getPokemons()

        expect(pokemons.length).toBe(151)
        expect(pokemons[0]).toBe(1)
        expect(pokemons[30]).toBe(31)
        expect(pokemons[150]).toBe(151)
    })

    test('debe de retornar un arreglo de 4 elementos con nombres de pokemons', async () => { 
        const pokemons = await getPokemonNames([1,2,3,4])
        console.log(pokemons)
        expect(pokemons).toStrictEqual(pokemons)
     })

    test('debe de retornar un arreglo mezclado', async () => {
       const pokemons = await getPokemonOptions()

       expect(pokemons.length).toBe(4)
       expect(pokemons).toEqual([
            {   
                name: expect.any(String),
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number)
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            }
      ])
      })


 })