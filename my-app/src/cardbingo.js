 export default function makeAGame(numCards, gameType){

function makeACard(gameType){
let numRows
let numCols

if(gameType === 1){
numRows = 4
numCols = 4 
}
else if (gameType === 2){
   numRows=5
   numCols =5
}

   function getRandomInt(max) {
      return Math.floor(Math.random() * max)+1;
    }
  
  
  function makeACol(){
  const  colArray=[]
  const sortedArray=[]
   while(colArray.length < numRows){

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


const cardobj = {}
let cardID=""
for(let i = 0; i<4; i++){
 let cardInfo = makeACol()

 //! change to a switch
 if(i=== 0){
    cardobj["H"]= cardInfo
 }
 if(i=== 1){
    cardobj["C"]= cardInfo
 }
 if(i=== 2){
    cardobj["D"]= cardInfo
 }
 if(i=== 3){
    cardobj["S"]= cardInfo
 }
 
 cardID= cardID.concat(cardInfo.key)
}
 
 const card = {cards:cardobj, id:cardID}
 return card
}



let gameCards = {}
const groupsOf4 = []
let cardArr=[]
let totCards = 0
let cardsOnThisPage = 0


while(totCards<numCards){
let card = makeACard()
let cardkey = card.id

if(!(gameCards[cardkey])){
   gameCards[cardkey] = true;
    cardArr.push(card.cards); 
    totCards ++;
    cardsOnThisPage ++
if (cardsOnThisPage==4 || totCards == numCards){
groupsOf4.push(cardArr); 
cardArr=[]
cardsOnThisPage = 0
}}
}

return(groupsOf4)
}



// const cards = cardFlub
// let numPages = Mth.floor(Object.keys(cards).length /4) + 1
// let leftoverCards = Object.keys(cards).length % 4
// var doc = new jsPDF();

// let cardsOnPage = 0
// let pageText = "" 
// let currPages = 1
// console.log(leftoverCards)
// for(card in cards){

// if (currPages == numPages){
//     if(cardsOnPage < leftoverCards){ 
//         pageText= pageText.concat(cards[card])
//         cardsOnPage ++
//          }
//     if (cardsOnPage == leftoverCards){
//             doc.addPage();
//             doc.text(20, 100, pageText);
//          }

// }

// else if(cardsOnPage < 4){
// pageText= pageText.concat(cards[card])
// cardsOnPage ++
//  }
//  else if (cardsOnPage == 4){
//     doc.addPage();
//     doc.text(20, 100, pageText);
    
//     pageText=cards[card]
//     cardsOnPage=1
//     currPages ++
//  }

//  }
