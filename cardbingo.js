function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


function makeACol(){
const  colArray=[]
const sortedArray=[]
 while(colArray.length < 4){
    const intToTry= getRandomInt(13)
    if(!(colArray.includes(intToTry))){
        colArray.push(intToTry)
        sortedArray.push(intToTry)
    }
 }
 sortedArray.sort(function(a,b) {return a-b})
 const key = `${sortedArray[0]}${sortedArray[1]}${sortedArray[2]}${sortedArray[3]}`
 
 return {array: colArray, key:key}

}

function makeACard(){
const cardArr = []
let cardID=""
 while(cardArr.length<4){
  cardInfo = makeACol()
  cardArr.push(cardInfo.array)
 cardID= cardID.concat(cardInfo.key)

 }
 const card = {arr:cardArr,id:cardID}
 return card
}


function makeAGame(numCards){
let gameCards = {}
let totCards = 0
while(totCards<numCards){
let card = makeACard()
let cardkey = card.id
if(!(gameCards[cardkey])){gameCards[cardkey] = card.arr; totCards ++;}
}
return(gameCards)
}
