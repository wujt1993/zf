<template>
  <div id="app">
    <h1>state      -> {{$store.state.message}}</h1>
    <h2>mapState   -> {{message}}</h2>
    <h1>getter     -> {{$store.getters.getMessage}}</h1>
    <h2>mapGetters -> {{getMessage}}</h2>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from "vuex"
export default {
  name: 'App',
  computed: {
    // ...mapState({
    //   message: state=>state.message
    // })
    ...mapState([
      "message"
    ]),
    ...mapGetters([
      'getMessage'
    ]),
    
  },
  methods: {
    ...mapMutations([
      'setMessage'
    ]),
  },
  mounted() {
    setTimeout(()=>{
      this.$store.commit("setMessage", "hello mutations")
    },2000)
    setTimeout(()=>{
      this.setMessage("hello mapmutations")
    },3000)
    
  }
}
</script>

<style>
