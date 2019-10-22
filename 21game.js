document.addEventListener('DOMContentLoaded', ()=>{
    let startBtn = document.querySelector('#startBtn')
    startBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        getDeck();
     
    })
})

//global variables
userDiv = document.querySelector('#card-display');
compDiv = document.querySelector('#computer-card-display');
let userHand = [];
let compHand = [];
let userScore = 0;
let compScore = 0; 

// get information of the deck
const getDeck = async () => {
let cardsAPI = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  let response =  await axios.get(cardsAPI)
  cardID = response.data.deck_id
    getCards(cardID, 2, userDiv);
    removeStartBtn();
    showButtons();
}

// removes the start button after its clicked
const removeStartBtn = () =>{
    let startDiv = document.querySelector('#start')
    let startBtn = document.querySelector('#startBtn')
    startDiv.removeChild(startBtn)
}

//fetches deck information
const getCards = async (deck_id, cardAmount, divName) => {
    let getActualCards = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${cardAmount}`

    let cardResponse = await axios.get(getActualCards)
    let cards = cardResponse.data.cards 
  //  console.log(cards)
    if(divName === userDiv){
        displayCards(cards);
       userHand = userHand.concat(cards) // adding the cards arr to the empty userHand arr
    //    console.log(userHand)
        calculateHandValue(userHand, userDiv)
    } else if(divName === compDiv){
        displayCards(cards);
        compHand = compHand.concat(cards)
        // console.log(compHand)
        calculateHandValue(compHand,compDiv)
    }
}

//displays card images on the DOM
const displayCards = (cards) => {
    console.log(cards)
    cards.forEach(element => {
        userDiv = document.querySelector('#card-display');
        let cardImg = document.createElement('img')
        cardImg.src = element.image
        userDiv.appendChild(cardImg)
        let cardValue = element.value
        console.log(cardValue)
    })
    

}

// displays the hit/stay buttons
const showButtons = () => {
    let footer = document.querySelector('#footer')
    let hit = document.createElement('button')
    hit.innerText = 'HIT'
    hit.id = 'HIT'
    hit.addEventListener('click', () =>{
        getCards(cardID, 1, userDiv)
    })
    let stay = document.createElement('button')
    stay.id = 'STAY'
    stay.innerText = 'STAY'
    stay.addEventListener('click', ()=>{
        getCards(cardID, 3, compDiv)
    })
    footer.append(hit, stay)
} 
const calculateHandValue = (arr, divName) => {
    let total = 0
    arr.forEach(element =>{
        let cardValue = element.value

        if(cardValue === 'KING' || cardValue === 'QUEEN'|| cardValue === 'JACK'){
            cardValue = 10
        } else if(cardValue === 'ACE'){
            cardValue = 1
        } 
     total += Number(cardValue) 
    })
        
    console.log('total', total)
}

const check21 = () => {
    if(total > 21){
        start.innerText = '';
        let busted = document.createElement('h1');
        busted.innerText = 'Busted!!'
    }
}

const displayTotal = (total, div) =>{
        let displayTotal = document.createElement('h1');
        displayTotal.innerText = total += Number(cardValue) 
        divName.appendChild(displayTotal)
}
