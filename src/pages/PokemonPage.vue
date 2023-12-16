<template>
  <h1 v-if='!pokemon'>Espere por favor...</h1>
  <div v-else>
    <h1>¿Quien es este pokémon?</h1>
    <PokemonPicture
      :pokemonId="pokemon.id"
      :showPokemon="showPokemon" />
   <PokemonOptions
      :pokemons="pokemonArr" 
      @selection="checkAnswers"/>
    
    <template
      v-if="showAnswer"
      class="fade-in">
      <h2 >{{message}}</h2>
      <button @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>

import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
  components:{PokemonOptions, PokemonPicture},
  data() {
    return {
      pokemonArr:[],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods:{
    async mixPokemonArray(){
      this.pokemonArr = await getPokemonOptions()

      const rndInt = Math.floor(Math.random()*4)

      this.pokemon = this.pokemonArr[rndInt]
    },
    checkAnswers(selectedId){
        //this.showPokemon = this.pokemon.id === pokemonId

        this.showPokemon = true
        this.showAnswer = true

        if (selectedId === this.pokemon.id){
          this.message = `Correcto! Era ${this.pokemon.name}!`
        } else {
          this.message = `Ups! Era ${this.pokemon.name}!`
        }
    },
    newGame(){
      this.showPokemon = false
      this.showAnswer = false
      this.pokemonArr = []
      this.pokemon = null
      this.mixPokemonArray()
    }
  },
  mounted(){
    this.mixPokemonArray()
  }
}
</script>

<style>

</style>