
const App=Vue.createApp({
    data(){
        return{
            card:[],
            gameCard:[],
            selectCard:[],
            seledSet:new Set,
            mode:"home",
            modes:["home","lottery","select","look"],
            Range:3,


        };
    },
    methods:{

        rand(n){
			return Math.ceil(Math.random()*n)
		},

        //---------
        creat_card_array(){
            for(n=1;n<10;n++){
                let temp={ name:n.toString() , pic:"./img/card-" + n.toString() + ".jpg" , bak:"./img/blue_back.jpg"}
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
        listenCardArray(gameCard,selectCard,seledSet){
            let lotteryA = document.querySelector('#lotteryArea .cardList');
            let selectA = document.querySelector('#selectArea .cardList');
            if(lotteryA){lotteryA.addEventListener('mouseup',selCard,false)};
            if(selectA){selectA.addEventListener('mouseup',selCard,false)};
            function selCard(e){
                let index;
                if(e.target != lotteryA && e.target != selectA){
                    if(e.target.tagName=="IMG"){
                        e.target.parentElement.style.visibility = "hidden";
                        index=e.target.parentElement.dataset.index;
                    }else{
                        index=e.target.dataset.index;
                        e.target.style.visibility = "hidden";
                    }
                }
                seledSet.add(gameCard[index].name);
                selectCard.push(gameCard[index]);
            }
        },
        listenRange(gCard,sCard,seledSet){
            console.log("onlistenRange")
            let index;
            let range = document.querySelector('#'+this.mode+'Range');
            console.log("range is",range);
            // let Ranged = document.querySelector('#lottery .range')
            // let Ranged2 = document.querySelector('#select .range')
            if(range){
                console.log("before mouseup");
                range.addEventListener('mouseup',RdCard,false);
                // Ranged.addEventListener('mouseup',selRCard,false);
                // Ranged2.addEventListener('mouseup',selRCard,false);
                function RdCard(e){
                    console.log("on mouseup");
                    console.log("selectCard[] is",sCard)
                    let target = document.querySelector('.ranged');
                    index=target.dataset.index;
                    console.log("seledSet is",seledSet)
                    console.log("gCard[index] is",gCard[index].name)
                    console.log("selhas",seledSet.has(gCard[index].name))
                    if(!seledSet.has(gCard[index].name)){
                        seledSet.add(gCard[index].name)
                        target.style.visibility = "hidden";
                        sCard.push(gCard[index]);
                    }
                }

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
        },
        rePage(){
            location.reload();
        },
    },
    watch:{
        mode:function chgMode(mode){
            switch(mode){
                case "look":{
                    let dSeled=document.querySelector('#selected');
                    dSeled.classList.replace('minh60','vh100');
                    dSeled.classList.add('bigcard')
                }
                    break;
                case "lottery":
                case "select":
                    this.listenRange(this.gameCard,this.selectCard,this.seledSet);
                    break;
                default:
                    break
            }

        },
        Range:function RangeChg(Rg){
            console.log(Rg)
            if(this.mode=="lottery" || this.mode=="select"){
                unActionCard=document.querySelector('.ranged');
                if(unActionCard){
                    unActionCard.classList.remove('ranged');
                };
                if(Rg!=0){
                    actionCard=document.querySelector('#'+this.mode+'Card-'+Rg);
                    actionCard.classList.add('ranged');
                }
            }
        },

    },

    beforeMount(){
        this.creat_card_array()
        this.gameCard=this.creat_gameCard()
    },
    mounted(){
       this.listenCardArray(this.gameCard,this.selectCard,this.seledSet)
       
    }
})

App.mount('#App')