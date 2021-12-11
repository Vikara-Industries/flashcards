const app = Vue.createApp({
      data(){
        return{
          deck:[
            {prompt:"ahám", answer:"I", right:0, wrong:0},
            {prompt:"tvám", answer:"you (singular)", right:0, wrong:0},
            {prompt:"sá", answer:"he", right:0, wrong:0},
            {prompt:"vayám", answer:"we", right:0, wrong:0},
            {prompt:"yūyám", answer:"you (plural)", right:0, wrong:0},
            {prompt:"té", answer:"they", right:0, wrong:0},
            {prompt:"idám", answer:"this", right:0, wrong:0},
            {prompt:"tát", answer:"that", right:0, wrong:0}, ]
        }
      },
      components:['CardHolder','FlashCard']
    });



      app.component('card-holder',{
        data(){
          return{
            deckIndex:0,

          }
        },
        template:`
        <div>
          <flash-card
                    
                    class="card-holder"
                    :prompt="activeCard.prompt" 
                    :answer="activeCard.answer"></flash-card>
                    
          <button class="rightbtn" @click="right">Right ({{activeCard.right}})</button>
          <button class="wrongbtn" @click="wrong">Wrong ({{activeCard.wrong}})</button>
          </div>`,
        components:['flash-card'],
        props:{
          deck: Array
        },
        computed:{
          activeCard:{
            get(){
              return this.deck[this.deckIndex]
            }
          }
        },
        methods:{
          randomCard(){
            this.deckIndex = Math.floor(Math.random()*this.deck.length)
          },
          right(){
            this.activeCard.right++
            this.randomCard()
          },
          wrong(){
            this.activeCard.wrong++
            this.randomCard()
          }
        }

      })



      app.component('flash-card',{
        data(){
          return{
            revealed:false,
            
          }
        },
        template:
          `<button class="card" @click='flip'>
            {{FUp}}
          </button>
          `,
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
      })

    app.mount('#app')