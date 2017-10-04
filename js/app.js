let moves = 0;
let count = 0;
let cards = $('.card');
let gameStart = false;
let stopwatch = document.getElementsByClassName('timer')[0],
    seconds = 0, minutes = 0, hours = 0, t;
const numOfStars = $('.starsNumber');
const numOfmoves = $('.moves');
const numOfmoves2 = $('.moves2');
const stars = $('.stars');
const list = []; //Create a list that holds all of your cards
const cardsOpen = [];
const index0numOfmoves = $('.stars').children('li')[0]
const index1numOfmoves = $('.stars').children('li')[1];
const index2numOfmoves = $('.stars').children('li')[2];
const numOfMovesArray = [index0numOfmoves,index1numOfmoves,index2numOfmoves];




//All functions. Total of 8.
$(function() {

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

  //Shuffles list of cards
  const containerList = function(){
    cards.each(function(){ //loop through each card and create its HTML
      list.push(this);
    });
  };containerList();

  $('.deck').append(shuffle(list)); //Shuffle list of cards.


  // Adds class of open show to cards.
  const cardCreator = function(){
    $(this).addClass('open show');
  };

  // Creating a list of cards that have the class of open.
  const listOpen = function(obj){ //The parameter accepts an object.
    cardsOpen.push((obj)); //The object is then pushed in to cardsOpen
  };

  // Card matcher
  const match = function(){
    if(cardsOpen.length > 1) {
      if(cardsOpen[0].id !== cardsOpen[1].id && cardsOpen[0].innerHTML === cardsOpen[1].innerHTML) {
        $('.show').addClass('match'); //
        cardsOpen.splice(0,2); // Waiting on feedback to make this better
      } else {
        cardsOpen.splice(0,2)
        setTimeout( function(){
          cards.removeClass('open show');
        }  , 900 )
      };
    };
  };

  // Counts moves and removes stars

  const movecounter = function(){
    if($('.show').click && $('.show').length >= 2) {
      moves++;
      numOfmoves.text(moves);
      numOfmoves2.text(moves);
    }
    else if(numOfmoves.text() >= 12 && index1numOfmoves) {
      index1numOfmoves.remove();
    }
    else if(numOfmoves.text() >= 6 && index2numOfmoves ) {
      index2numOfmoves.remove();
    };
  };


  // Timer

  function add() {
    if(gameStart) { //The logic of timer will only run if gameStart is true.
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }

    stopwatch.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
    }
  };

  function timer() {
      t = setTimeout(add, 1000);
  };

  $('.card').one("click", function() {
    if(!gameStart) { //Here we check if gameStart is false and we then say hey since this is false I'm going to make it true.
      gameStart = true;
      timer();
  }
});

  // Winning and Restarting Game.

  const winning = function(){

    if($('.match').length >= 16){
      $('.modal').show();
      $('.modal').css({'opacity': '1','pointer-events': 'all'});
      numOfStars.text(stars.children().length);
      $('.time').text(stopwatch.innerText);

      $('.modal-button').click(function(){ // Would like some feedback on the next two lines of code. Too much repetition here.
        $('.modal').hide();
        stars.append(numOfMovesArray);
        moves = 0;
        match.length = 0;
        numOfmoves.text(moves);
        gameStart = false;
        cards.removeClass('open show match');
        stopwatch.textContent = "00:00:00";
        seconds = 0; minutes = 0; hours = 0;
        $('.deck').append(shuffle(list));
      });
    };
  };

  $('.restart').click(function(){
    stars.append(numOfMovesArray);
    moves = 0;
    numOfmoves.text(moves);
    cards.removeClass('open show match');
    stopwatch.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    gameStart = false;
    $('.deck').append(shuffle(list));
  });

  const Symbol = cards.click(function(){
    cardCreator.call(this); // The class open show is added to all of the cards that are clicked on.
    listOpen(this); //The cards object is then passed on to listOpen with the class open show.
    match.call(this); //Function checks if cards match, if they don't , hide the unmatching cards.
    movecounter(); // Function adds a number by every 2 clicks the user does. Also removes stars because of moves.
    winning(); // Shows a Modal after all cards have been matched.
  });
});

