
const App=Vue.createApp({
    data(){
        return{
            card:[],
            gameCard:[],
            selectCard:[],
            mode:"home",
            modes:["home","lottery","select","look"]

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
            var lotteryA = document.querySelector('#lotteryArea .cardList');
            var selectA = document.querySelector('#selectArea .cardList');
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
        },
        modeSet(mName){
            if(this.modes.indexOf(mName)!=-1){
                this.mode=mName;
                console.log(this.mode)
            }
        },
        addClass(element, classToAdd){
            let currentClassValue = element.className;
            if (currentClassValue.indexOf(classToAdd) == -1){
                if((currentClassValue == null) || (currentClassValue === "")){
                    element.className = classToAdd;
                } 
                else 
                {
                    element.className += " " + classToAdd;
        }}},
        removeClass(element, classToRemove) {
            let currentClassValue = element.className;
            if(currentClassValue == classToRemove){
                element.className = "";
            return;}
            let classValues = currentClassValue.split(" ");
            let filteredList = [];
            for (var i = 0 ; i < classValues.length ; i++){
                if(classToRemove != classValues[i]){
                    filteredList.push(classValues[i]);
                }}
            element.className = filteredList.join(" ");
        },
        try(){
            console.log("try")
        }
    },
    watch:{
        mode:function chgMode(mode){
            if(mode=="look"){
                let dSeled=document.querySelector('#selected');
                dSeled.classList.replace('minh60','vh100')
            }
        },
    },
    //     mode:function chgMode(mode){
    //         let dHome=document.querySelector('#home');
    //         let dLot=document.querySelector('#lotteryArea');
    //         let dSel=document.querySelector('#selectArea');
    //         let dSeled=document.querySelector('#selected');
    //         switch(mode){
    //             case "home" :
    //               removeClass(dLot,"d-flex")
    //               removeClass(dSel,"d-flex")
    //               removeClass(dSeled,"d-flex")
    //               removeClass(dSeled,"d-none")
    //               addClass(dHome,"d-flex")
    //               break;
    //             case "lottery" :
    //                 removeClass(Home,"d-flex")
    //                 removeClass(dSel,"d-flex")
    //                 addClass(dHome,"d-flex")
                    
    //               break;
    //             default:
                  
    //               break;
    //             }
    //     }
    // },
    beforeMount(){
        this.creat_card_array()
        this.gameCard=this.creat_gameCard()
    },
    mounted(){
       this.listenCardArray(this.gameCard,this.selectCard)
    }
})

App.mount('#App')