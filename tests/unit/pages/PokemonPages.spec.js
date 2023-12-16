
import {shallowMount, mount} from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
//import PokemonPicture from '@/components/PokemonPicture'
//import PokemonOptions from '@/components/PokemonOptions'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage', () => { 

    let wrapper

    beforeEach(()=>{
        wrapper = shallowMount(PokemonPage)
    })

    test('debe hacer match con el snapshot', () => { 

        expect(wrapper.html()).toMatchSnapshot()

     })

    test('debe llamar a mixPokemonArray al montar', () => { 
        const mixPokemonArraySpy = jest
                                .spyOn(PokemonPage.methods, 'mixPokemonArray')

        const wrapper = shallowMount(PokemonPage)

        expect(mixPokemonArraySpy).toHaveBeenCalled()
     })

    test('debe de hacer match con el snapshot, una vez cargados los pokemon', ()=>{

        const wrapper = shallowMount(PokemonPage, {
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()

     })

    test('debe de mostrar los componentes PokemonPicture y PokemonOptions', () => { 

        const wrapper = shallowMount(PokemonPage, {
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        const picture = wrapper.findComponent({name: 'PokemonPicture'})
        const options = wrapper.findComponent({name: 'PokemonOptions'})
        
        // Otra forma, buscar el stub del componente que se crea del shallowMount
        //const picture = wrapper.find('pokemon-picture-stub')

        expect(picture.exists()).toBe(true)
        expect(options.exists()).toBe(true)

        expect(picture.vm.pokemonId).toBe(1)

        expect(options.vm.pokemons).toBeTruthy()

     })

    test('pruebas con checkAnser', async ()=>{
        const wrapper = shallowMount(PokemonPage, {
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswers(1)

        expect(wrapper.find('h2').exists()).toBe(true)
        expect(wrapper.vm.showPokemon).toBe(true)
        expect(wrapper.find('h2').text()).toBe(`Correcto! Era ${pokemons[0].name}!`)
        expect(wrapper.vm.message).toBe(`Ups! Era ${pokemons[0].name}!`)

     })

 })