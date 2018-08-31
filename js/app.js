/*
 * Create a list that holds all of your cards
 */
let card=document.getElementsByClassName('card');
let cards=[...card];
let targetCard;

//set the deck
let deck = document.querySelector('.deck');

//Game timer variables
let second = 0, minute = 0, hour = 0;
let timer = document.querySelector(".timer");
let interval;
let finalTime;

//variable for stars
let stars = document.querySelector('.stars');
let starslist;
let starslistArr;
let star;
let li1;
let i1;
let lis;
//stars = document.querySelector('.stars');
lis = stars.getElementsByTagName("li");
///alert(lis.length);


//other Variables
let moves;
let match;
let matchCards;
let counter;
/*************************/
//Variables for modal
// Get the modal
let modal = document.getElementById('myModal');
//change the modal message
let winMsg = document.getElementById("winMsg");
// button to play the game again
let btn = document.getElementById("playAgainBtn");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
/*************************/

startGame();
displayCards();

function initGame() {
  moves=0;
  match=0;
  matchCards=[];
  counter=0;

    /** init the stars to 3 stars **/
    stars = document.querySelector('.stars');
    lis = stars.getElementsByTagName("li")
    while(lis.length > 0) {
	     stars.removeChild(lis[0]);
       lis = stars.getElementsByTagName("li")
    }
    for(let i=0;i<3;++i) {
      li1=document.createElement("li");
      i1=document.createElement("i");
      i1.setAttribute("class","fa fa-star");
      li1.appendChild(i1);
      stars.appendChild(li1);
    }
    /********************************/
    /**** reset timer ****/
      second = 0;
      minute = 0;
      hour = 0;
      timer.innerHTML = "0 mins 0 secs";
      clearInterval(interval);
    /*******************************/
    //set id for cards
    for(let i = 0; i <cards.length; i++) {
         cards[i].classList.remove('open','show','match');
         cards[i].setAttribute("id", ("card"+i));
         deck.appendChild(cards[i]);
    }
}

function respondToClick(event) {
  ++counter;
  if(counter === 1) {
    firstCardClick();
  }

  targetCard=event.target;
  matchCards.push(targetCard);
  openCard(targetCard);
  //event.target.classList.add('open','show');

  if(matchCards.length === 2) {
    //alert(matchCards[0].getAttribute("id"));
    if(!(matchCards[0].getAttribute("id") === matchCards[1].getAttribute("id"))) {
      if(matchCards[0].innerHTML === matchCards[1].innerHTML) {
        setTimeout(cardMatch,100);
      }else{
        setTimeout(cardNotMatch,100);
      }
    }else {
      matchCards.forEach(closeCard);
      matchCards=[];
    }
  }
}

function firstCardClick() {
  //start timer on first click
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
}

function cardMatch() {
  ++match;

  matchCards.forEach(function(matchCard) {
    matchCard.classList.add('match');
    matchCard.classList.remove('open','show');
  });

  matchCards.forEach(function(matchCard) {
    matchCard.removeEventListener('click',respondToClick);
  });

  matchCards=[];
  checkMoves();

  if(match === 8) {
    endGame();
    showModal();
  }
}

function cardNotMatch() {
  matchCards.forEach(closeCard);
  //matchCards[0].classList.remove('open','show');
  //matchCards[1].classList.remove('open','show');
  checkMoves();
  matchCards=[];
}


function checkMoves() {
  ++moves;
  document.querySelector(".moves").innerHTML=moves;

    if(moves === 10) {
      star=document.querySelector(".stars li")
      stars.removeChild(star);
    }
    if(moves === 16) {
      star=document.querySelector(".stars li")
      stars.removeChild(star);
    }
}

function openCard(targetCard) {
  targetCard.classList.add('open','show');
}

function closeCard(targetCard) {
  targetCard.classList.remove('open','show');
}


//set the deck and start the game
function startGame() {
  initGame();
  cards=shuffle(cards);
  document.querySelector(".moves").innerHTML=moves;

}

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

function displayCards() {
  for(let i=0;i<cards.length;++i) {
      cards[i].addEventListener('click',respondToClick);
  }
}

function endGame() {
  for(let i=0;i<cards.length;++i) {
    cards[i].removeEventListener('click',respondToClick);
  }
  clearInterval(interval);
  finalTime=timer.innerHTML;
}

function restartGame() {
  startGame();
  displayCards();
}

/************************************/
function showModal() {
    //set win message for the modal
    //const starRating = document.querySelector(".stars").innerHTML;
    //alert(starRating);
    lis = stars.getElementsByTagName("li");
    let msg = `You won in  ${moves} moves and ${finalTime}
                and ${lis.length} star`;
    winMsg.textContent = msg;

    /*lis = stars.getElementsByTagName("li");
    let starRating=document.getElementById("starRating");
    let fragment=document.createDocumentFragment();
    let newElement=document.createElement();
    lis.forEach(function() {

    });
    */
    // button to play the game again
    btn = document.getElementById("playAgainBtn");
    modal.style.display = "block";

    btn.onclick = function() {
      modal.style.display = "none";
      restartGame();
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
}
/*************************************/

//Game timer function
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second === 60){
            minute++;
            second=0;
        }
        if(minute === 60){
            hour++;
            minute = 0;
        }
        if(hour > 0) {
            timer.innerHTML = hour + "hour " + minute+"mins "+second+"secs";
        }

    },1000);
}
