/*
 * Create a list that holds all of your cards
 */
const cardsArray = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bomb", "fa fa-bomb", "fa fa-bicycle", "fa fa-bicycle"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//mix the cards
let mixedCards = shuffle(cardsArray);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//create the timer
let timeContainer = document.querySelector(".timer");
//set to zero the default value of the timer
timeContainer.innerHTML = `00:00`;
let liveTimer;
let timeCounter = 0;

//create a variable to determine wheather it's the first click.
let firstClick = true;

//start the timer
function startTimer() {
    liveTimer = setInterval(countTime, 1000);
}

function countTime() {
      timeCounter += 1;
      let min = Math.trunc(timeCounter/60);
      let sec = (timeCounter-(min*60));
      min < 10 ? min = `0${min}m` : min = `${min}m`;
      sec < 10 ? sec = `0${sec}s` : sec = `${sec}s`;
    timeContainer.innerHTML = `${min}:${sec}`;
  }

//end the timer
 function endTimer() {
   clearInterval(liveTimer);
 }


//create the container so I can append the children to the parent
const deck = document.querySelector(".deck");

//empty array for open cards
let openCards = [];
let allMatched = [];


//start the game for the first time
function startGame() {
//create the cards
for(let i = 0; i < mixedCards.length; i++) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = `<i class="${mixedCards[i]}"></i>`; //to add icon from cardsArray in each card
  deck.appendChild(card);

  click(card);
}
}

//click event
function click(card) {

  //create addEventListener for the cards
    card.addEventListener("click", function(){
        //if isFirstClick is true the timer will start, if isFirstClick is false nothing will happen.
        if(firstClick) {
          startTimer();
          firstClick=false;
        }

        const cardOne = this;
        const cardTwo = openCards[0];

        //if there is existing open card
        if(openCards.length === 1) {

          card.classList.add("open", "show", "disable");
          openCards.push(this);

          //we compare the 2 open cards
          comparing(cardOne, cardTwo);

        } else {
        //if there is no existing open card
        card.classList.add("open", "show", "disable");
        openCards.push(this);
        }});
        }

let modalPopup = document.querySelector(".modal");
let closeBtn = document.getElementsByClassName("closeBtn")[0];
let modalContainer =document.querySelector(".modal-content");


//if all the cards are matched, the number of matched cards should be the same of the original icons
function gameOver() {
  if(allMatched.length === cardsArray.length) {
    endTimer();
    openModal();
  }  }

//show the popup modal
function openModal() {
  modalPopup.style.display = "block";
  modalContainer.innerHTML = `<h3>Congratulations! You won!</h3>
  <p>With ${moves} moves in ${timeContainer.innerHTML} and ${stars.innerHTML} Stars. You rock!</p>
  <span class="closeBtn" onclick="closeModal();">&times;</span>`;
}


function closeModal(){
  modalPopup.style.display = "none";
}




//start the game for the first time
startGame();

      //comparing function
      function comparing(cardOne, cardTwo) {
        if(cardOne.innerHTML === cardTwo.innerHTML){
          cardOne.classList.add("match");
          cardTwo.classList.add("match");

          allMatched.push(this, openCards[0]);

          openCards.length = 0;  //reset the array and convert to zero the cards

          //if the game is gameOver
          gameOver();

        } else {
          //to execute the function with delay in order to see the wrong matched card
          setTimeout(function() {
            cardOne.classList.remove("open", "show", "disable");
            cardTwo.classList.remove("open", "show", "disable");
          }, 600);


          openCards.length = 0;
        }
        addNewMove();
      }


//restart button
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {
    //reset all variables
    resetAll();

    //start the game
})

function resetAll() {
  deck.innerHTML = "";
  allMatched = [];
  startGame();
  moves = 0;
  movesContainer.innerHTML = 0;
  stars.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`;
  //shuffle(cardsArray);
  endTimer();
  timeContainer.innerHTML = `00:00`;
  timeCounter= 0;
  shuffle(cardsArray);
  firstClick= true; //the timer will start again with the first click
}

//add new moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addNewMove() {
  moves++;
  movesContainer.innerHTML = moves;
  rating();
}

//Rating
const stars = document.querySelector(".stars");
function rating() {
  if(moves > 6) {
    stars.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  }if(moves >= 12){
    stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  }
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
