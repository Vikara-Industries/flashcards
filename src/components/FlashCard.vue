<template>
    <button class="card" @click='flip'>
            {{FUp}}
          </button>
</template>
<script>


export default {
    data(){
          return{
            revealed:false,
          }
        },
        props:{
          prompt:String,
          answer:String
        },
        computed:{
          FUp(){if(this.revealed){
              return this.answer}else{return this.prompt}}
        },
        methods:{
          flip(){
            this.revealed = !this.revealed
            this.$emit('flipped',this.revealed)
          }
        },
        watch:{
          prompt(){this.revealed=false}
        }
}
</script>
