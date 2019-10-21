document.addEventListener('DOMContentLoaded', ()=>{
    console.log('hi')
    let startBtn = document.querySelector('#startBtn')
    startBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        getDeck();
     
    })
})

const getDeck = async () => {
let cardsAPI = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  let response =  await axios.get(cardsAPI)
  let data = response.data
  cardID = data.deck_id
    getCards(cardID, 2);
    removeStartBtn();
}

const removeStartBtn = () =>{
    let startDiv = document.querySelector('#start')
    let startBtn = document.querySelector('#startBtn')

    startDiv.removeChild(startBtn)
    // startDiv.appendChild(cardDiv)
    // // startDiv.replaceChild(startBtn, cardDiv)
    // cardDiv.innerText ='hi'

}
const getCards = async (cardID, cardAmount) => {
    console.log(data)
    // cardID = data.deck_id
    let getActualCards = `https://deckofcardsapi.com/api/deck/${cardID}/draw/?count=${cardAmount}`

    let cardResponse = await axios.get(getActualCards)
    console.log(cardResponse)
   displayCards(cardResponse);
}

const displayCards = (cardResponse) => {
    let cardArr = cardResponse.data.cards
    let cardDiv = document.querySelector('#card-display');
    cardArr.forEach(element => {
        console.log(element)
        let cardImg = document.createElement('img')
        cardImg.src = element.image
        cardDiv.appendChild(cardImg)
        
    })
    

}

const showButtons = () => {

} 