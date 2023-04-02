
const App=Vue.createApp({
    data(){
        return{
            card:[],
            gameCard:[],
            selectCard:[],


        };
    },
    methods:{

        rand(n){
			return Math.ceil(Math.random()*n)
		},

        //---------
        creat_card_array(){
            for(n=1;n<10;n++){
                let temp={ naem:n.toString() , pic:"./img/card-" + n.toString() + ".jpg" , bak:"./img/blue_back.jpg"}
                this.card.push(temp)
                
            }
        },
        creat_gameCard(){
            let oldA=[...this.card],newA=[];

            for(n=oldA.length;n>0;n--){
                let ra=this.rand(n)-1;
                let t=oldA[ra];
                oldA.splice(ra,1)
                newA.push(t);
            }
            return newA;
            // console.log("newA=", newA)
        },
        listenCardArray(gameCard,selectCard){
            var lotteryA = document.querySelector('#lotteryArea');
            var selectA = document.querySelector('#selectArea');
            lotteryA.addEventListener('mouseup',selCard,false)
            selectA.addEventListener('mouseup',selCard,false)
            function selCard(e){
                let index;
                if(e.target != lotteryA && e.target != selectA){
                    if(e.target.tagName=="IMG"){
                        e.target.parentElement.style.visibility = "hidden";
                        index=e.target.parentElement.dataset.index;
                    }else{
                        e.target.style.visibility = "hidden";
                        index=e.target.dataset.index;
                    }
                }
                selectCard.push(gameCard[index]);
            }
        }
        
  
    },
    beforeMount(){
        this.creat_card_array()
        console.log(this.card)
        this.gameCard=this.creat_gameCard()
        console.log(this.gameCard);
    },
    mounted(){
       this.listenCardArray(this.gameCard,this.selectCard)
    }
})

App.mount('#App')