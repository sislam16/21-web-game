let compDiv;
let userDiv;
let startDiv;

document.addEventListener('DOMContentLoaded', () => {
    let startBtn = document.querySelector('#startBtn')
    userDiv = document.querySelector('#card-display');
    compDiv = document.querySelector('#computer-card-display')
     startDiv = document.querySelector('#start')
    startBtn.addEventListener('click', (event) =>{
        getDeck();
    })
})

//global variables
let userHand = [];
let compHand = [];
userScore = 0;
compScore = 0; 

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
    // let startDiv = document.querySelector('#start')
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
        displayCards(cards, userDiv);
        
        console.log("userDiv", userDiv)
        userHand = userHand.concat(cards) // adding the cards arr to the empty userHand arr
    //    console.log(userHand)
        calculateHandValue(userHand, userDiv)
    } else if(divName === compDiv){
        displayCards(cards, compDiv);
        compHand = compHand.concat(cards)
        // console.log(compHand)
        console.log("compDiv", compDiv)
        calculateHandValue(compHand,compDiv)
    }
}

//displays card images on the DOM
const displayCards = (cards, divname) => {
    console.log(cards)
    cards.forEach(element => {
        if (divname === userDiv) {
            userDiv = document.querySelector('#card-display');
            // compDiv = document.querySelector('#computer-card,display')
            let cardImg = document.createElement('img')
            cardImg.src = element.image
            userDiv.appendChild(cardImg)
            // compDiv.appendChild(cardImg)
            let cardValue = element.value
            console.log(cardValue)
        } else if (divname === compDiv) {
            compDiv = document.querySelector('#computer-card-display')
            let cardImg = document.createElement('img')
            cardImg.src = element.image
             compDiv.appendChild(cardImg)
            let cardValue = element.value
            console.log(cardValue)
        }

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
        removeButtons();
    })
    footer.append(hit, stay)
} 

//looping through array of cards to find the total value
const calculateHandValue = (arr, divName) => {
    let total = 0;
    arr.forEach(element =>{
        let cardValue = element.value
        if(cardValue === 'KING' || cardValue === 'QUEEN'|| cardValue === 'JACK'){
            cardValue = 10
        } else if(cardValue === 'ACE'){
            cardValue = 1
        } 
        total += Number(cardValue) 
    })
    displayTotal(total, divName)
    console.log('total', total)
    
    if (divName === userDiv) {
        userScore = total
        checkUserScore(userScore)
    } else if (divName === compDiv) {
        compScore = total 
         checkCompScore(compScore);
    }
}

const checkUserScore = (total) => {
    let headerDiv = document.querySelector("#header")
    if (total === 21) {
        let headerDiv = document.querySelector("#header")
        let winMessage = document.createElement('h1');
        winMessage.innerText = 'You won!!'
        headerDiv.appendChild(winMessage)
    } else if (total > 21) {
        busted()
    } 
}

//checking if the total for either side is over 21
const checkCompScore= (total) => {
    let headerDiv = document.querySelector("#header")
    if (total === 21){
        let computerWins = document.createElement('h1');
        computerWins.innerText = 'Computer wins!'
        headerDiv.appendChild(computerWins)
    } else if(total > 21){
        let winMessage = document.createElement('h1');
        winMessage.innerText = 'You won!!'
        headerDiv.appendChild(winMessage)
      } else if (total < 21){
        checkWinner(userScore, compScore);
    } 
}

// the message BUSTED will show when the usersHand is over 21
const busted = () =>{
    // let start = document.querySelector('#start')
        let busted = document.createElement('h1');
        busted.innerText = 'Busted!'
        startDiv.replaceChild(busted, userDiv);
    
}

// will compare the total value of userDeck and compDeck
const checkWinner = (userScore, compScore) =>{
    let headerDiv = document.querySelector("#header")
    if(userScore > compScore){
        let winMessage = document.createElement('h1');
        winMessage.innerText = 'You won!!'
        headerDiv.appendChild(winMessage)
    }else if(compScore > userScore){
        let computerWins = document.createElement('h1');
        computerWins.innerText = 'Computer wins!'
        headerDiv.appendChild(computerWins)
     } 
}

//displays the total of cards
const displayTotal = (total, div) =>{
    let h2 = document.querySelector(`#${div.id}h2`)
    if(!h2){
        let scoreDisplay = document.createElement('h2');
        scoreDisplay.id = div.id + 'h2'//'h2'
        scoreDisplay.innerText = total
        div.appendChild(scoreDisplay);
    }else{
        h2.innerText = total
    }  
    // checkWinner(); 
}

//function that removes the buttons 
const removeButtons = () =>{
    let footer = document.querySelector('#footer')
    let hitBtn = document.querySelector('#HIT')
    let stayBtn = document.querySelector('#STAY')
    footer.removeChild(hitBtn);
    footer.removeChild(stayBtn)

}
