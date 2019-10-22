document.addEventListener('DOMContentLoaded', ()=>{
    let startBtn = document.querySelector('#startBtn')
    startBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        getDeck();
     
    })
})

//global variables
cardDiv = document.querySelector('#card-display');
compDiv = document.querySelector('#computer-card-display');

// get information of the deck
const getDeck = async () => {
let cardsAPI = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  let response =  await axios.get(cardsAPI)
  cardID = response.data.deck_id
    getCards(cardID, 2, cardDiv);
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
    let data = cardResponse.data.cards 
  //  console.log(data)
    if(divName === cardDiv){
        displayCards(data);
    } else if(divName === compDiv){
        displayCards(data);
    }
}

//displays card images on the DOM
const displayCards = (data) => {
    console.log(data)
    data.forEach(element => {
        console.log(element)
        cardDiv = document.querySelector('#card-display');
        let cardImg = document.createElement('img')
        cardImg.src = element.image
        cardDiv.appendChild(cardImg)
    })
    

}

// displays the hit/stay buttons
const showButtons = () => {
    let footer = document.querySelector('#footer')
    let hit = document.createElement('button')
    hit.innerText = 'HIT'
    hit.id = 'HIT'
    hit.addEventListener('click', (event) =>{
        getCards(cardID, 1, cardDiv)
    })
    let stay = document.createElement('button')
    stay.id = 'STAY'
    stay.innerText = 'STAY'
    stay.addEventListener('click', (event)=>{
        getCards(cardID, 3, compDiv)
    })
    footer.append(hit, stay)
} 


