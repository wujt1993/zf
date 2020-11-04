<template>
  <div id="app">
    <!-- <h1>message:{{$store.state.message}}</h1>
    <h1>age: {{$store.getters.getAge}}</h1>
    <h2><button @click="$store.state.age++">change</button></h2> -->
    <!-- <h2>mapState   -> {{message}}</h2> -->
    <!-- <h1>getter     -> {{$store.getters.getMessage}}</h1> -->
    <!-- <h2>mapGetters -> {{getMessage}}</h2> -->
    <!-- <h1>{{$store.state.message}}</h1>
    <h1>{{$store.state.a.message}}</h1>
    <h1>{{$store.state.b.message}}</h1> -->
  </div>
</template>

<script>
// import {mapState, mapGetters, mapMutations, mapActions} from "vuex"
export default {
  name: 'App',
  computed: {
    // ...mapState({
    //   message: state=>state.message
    // })
    // ...mapState([
    //   "message"
    // ]),
    // ...mapGetters([
    //   'getMessage'
    // ]),
    
  },
  methods: {
    // ...mapMutations([
    //   'setMessage'
    // ]),
    // ...mapActions([
    //   'setMessageAsync',
    // ]),
  },
  mounted() {

    // setTimeout(()=>{
    //   this.$store.commit("setMessage", "hello mutations")
    // },2000)
    // setTimeout(()=>{
    //   this.setMessage("hello mapmutations")
    // },3000)
    // this.$store.dispatch("setMessageAsync", "hello action")
    // this.setMessageAsync("hello mapActions")

    // this.$store.commit("a/setMessage", "hello")
    // console.log(this.$store)
  }
}
</script>

<style>
