window.deckOfCards = function() 
{
  var pub = {};
  var suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  var cards = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
  var jokers = 
  [
    {
      card : 'Joker',
      suit : 'Black'
    },
    {
      card : 'Joker',
      suit : 'Red'
    }
  ];
  pub.config = 
  {
     useJokers : false,
     numberOfShuffles : 2,
     win: 21
  };
  pub.init = function init() 
  {
    deckOfCards.deck = shuffle(build_deck());
  }
  
  //this function will take our suits and our cards and generate an ordered deck of cards
  function build_deck() 
  {
    //initialize an empty array to store our generated deck
    var deck = [];
    //loop through our suits
    for(var i = 0; i < suits.length; i++) 
    {
      //this suit loop will run four times
      //loop through our cards
      for(var j = 0; j < cards.length; j++) 
      {
        //this card loop will run 13 times
        //that means will be doing it 13 times for each suit which will give us our 52 cards
        //generate an object for this card that contains it's value and it's suit
        var card = 
        {
          card : cards[j],
          suit : suits[i]
        };
        //push our card object into our deck array
        deck.push(card);
      }
    }
    if(deckOfCards.config.useJokers) 
    {
      for(var i = 0; i < jokers.length; i++) 
      {
        deck.push(jokers[i]);
      }
    }
   if(deckOfCards.config.useJokers) 
   {
      for(var i = 0; i < jokers.length; i++) 
      {
        deck.push(jokers[i]);
      }
    } 
    return deck;
  }

  //take the deck and shuffle it some number of times
  //we'll shuffle once by default, but can send any integer to this function as the times argument
  function shuffle(deck, times) 
  {
    if(typeof times === 'undefined') 
    {
      times = deckOfCards.config.numberOfShuffles;
    }
    var time = 0;
    while(time < times) 
    {
      deck = shuffleDeck(deck);
      time++;
    }
    return deck;
  }

  function shuffleDeck(deck) 
  {
    var deckShuffled = [];
    for(var i = 0, total = deck.length; i < total; i++) 
    {
      var rng = Math.floor((Math.random() * deck.length) + 0);
      deckShuffled.push(deck[rng]);
      deck.splice(rng, 1);
    }
    return deckShuffled;
  }
  return pub;
}();
//end of first window

window.site = function() 
{
  var config;
  var pub = {};
  var deck = {};
  var defaultConfig =
  {
  useJokers: false,
  win : 21
  }
  var players = 
  [
    {
      name: 'Player One',
      cards: [],
      score : 0,
      bust: false,
      win: false,
    },

    {
      name: 'Dealer',
      cards: [],
      score : 0,
      bust: false,
      win: false
    }
  ];
  
  function dealHand(){
   for (var i=0; i < players.length; i++)  
   {
      //for loop that iterates twice to add two cards to each players cards array
      for(var j = 0; j < 2; j++) 
      {
        players[i].cards.push(deck[0]);
        //push into the players cards array
        deck.splice(0,1);
        //take out from shuffled deck
      }  
    } 
     return pub;
  }

  pub.init = function init(cfg) 
  {
    config = $.extend({}, defaultConfig, cfg);
    deckOfCards.init();
    deck = deckOfCards.deck;
    if($('#cards').length) 
    {
      $('#cards').html('');
    } 
    else 
    {
      $('body').append('<ul id="cards"></ul>');
    }
	  dealHand();	
    totalHands();
    checkForWin();
    startUp();
	};

  function startUp() 
  {
    $('#deltcards-p').append('<li class="' + players[0].cards[0].suit+' '+ players[0].cards[0].card+ '">'+'</li>'); 
    //print players first card
    $('#counterdiv').append('<span id="playerScore">'+players[0].score+'</span>'+'</b>');
    //print players score
    $('#deltcards-p').append('<li class="' + players[0].cards[1].suit+' '+ players[0].cards[1].card+ '">' +'</li>');
    //print players second card
    $('#deltcards-d').append('<li class="' + players[1].cards[1].card+' '+ players[1].cards[1].suit+'">'+'</li>');
    //print dealers first card
    $('#deltcards-d').append('<li class="filler">' +'</li>');
    //print a dummy for the dealers hidden card
    $('#cards').append('<button type="button" id="hitButton">' + 'HIT' + '</button>');
    //print hit button
    $('#cards').append('<button type="button" id="stayButton">' + 'STAY' + '</button>');
    //print stay button
    $('#hitButton').on('click', function() 
    {
      hit();
    });
    //on click of hit button do hit function
    $('#stayButton').on('click', function() 
    {
      win();
    });
    //on click of stay button do win function
  }

 function totalHands() 
 {
    for(var i = 0, totalPlayers = players.length; i < totalPlayers; i++) 
    {
      var handTotal = 0;
      for(var j = 0, cards = players[i].cards.length; j < cards; j++) 
      {
        var card = players[i].cards[j].card;
        handTotal += getCardValue(card, handTotal); 
      }
      players[i].score = handTotal;
      if(handTotal > config.win) 
      {
        players[i].bust = true;
      } 
      else if(handTotal === config.win) 
      {
        players[i].win = true;
      }
    }
  }  

  function hit ()
  {
    players[0].cards.push(deck[0]);
    //push into the players cards array
    deck.splice(0,1);
    //take out from shuffled deck
    $('#hitcards-p').append('<li class="' + players[0].cards[players[0].cards.length-1].card + ' ' + players[0].cards[players[0].cards.length-1].suit +'">'+ '</li>');
    //print card for players hit 
    getCardValue();
    totalHands();
    checkForWin();
    document.getElementById('playerScore').innerHTML= players[0].score;
    //print updated player score
    hitDealer();
    getCardValue();
    totalHands();
    if (players[0].score > config.win) //if players score exceeds the winning number you bust
    {
      players[0].bust = true;
      //you bust
      document.getElementById('bustdiv').style.display = "block";
      //display bust div
      document.getElementById('overlay').style.display = "block";
      //display overlay div
      $('#counterdivd').append('<span id="playerScore">'+players[1].score+'</span>'+'</b>');
      //display dealers counter
      $('.filler').replaceWith('<li class="' + players[1].cards[0].card+' '+ players[1].cards[0].suit+'">'+'</li>');
      //reveal dealers hidden card
    }
    if (players[1].score > 21 && players[0].bust == false ) 
    {
      players[1].bust = true;
      //dealer busted
      players[0].win = true;
      //player wins
      document.getElementById('windiv').style.display = "block";
      //display win div
      document.getElementById('overlay').style.display = "block";
      //display overlay div
      $('#counterdivd').append('<span id="playerScore">'+players[1].score+'</span>'+'</b>');
      //display dealers counter
      $('.filler').replaceWith('<li class="' + players[1].cards[0].card+' '+ players[1].cards[0].suit+'">'+'</li>');
      //reveal dealers hidden card
    }
  }

  function hitDealer()
  {
    if(players[1].score == config.win)
    {
      console.log('you win dealer 21');
      //dealer wins if he has 21
    }
    else if(players[1].score>= 18)
    {
      console.log('dealer stay');
      //dealer stays if his score is over 18
    }
    else
    {
      players[1].cards.push(deck[0]);
      //push into the players cards array
      deck.splice(0,1);
      //take out from shuffled deck
      $('#hitcards-d').append('<li class="' + players[1].cards[players[1].cards.length-1].card + ' ' + players[1].cards[players[1].cards.length-1].suit +'">'+ '</li>');
      //print dealers hit card
      console.log('dealer hit');
      //dealer hits console log
    } 
  }

  function win ()
  {  
    if (players[0].score > players[1].score ) 
    {  
      players[0].win = true;
      //if players socre is higher than dealers score player wins
      console.log('Player 1 wins');
      //console log player wins
      document.getElementById('windiv').style.display = "block";
      //display win div
      document.getElementById('overlay').style.display = "block";
      //display overlay div
      $('#counterdivd').append('<span id="playerScore">'+players[1].score+'</span>'+'</b>');
      //print dealers score
      $('.filler').replaceWith('<li class="' + players[1].cards[0].card+' '+ players[1].cards[0].suit+'">'+'</li>');
      //reveal dealers hidden card
    }
    else 
    {
      console.log('Dealer Wins');
      //if player doesn't win dealer wins
      document.getElementById('losediv').style.display = "block";
      //display lose div
      document.getElementById('overlay').style.display = "block";
      //display overlay
      $('#counterdivd').append('<span id="playerScore">'+players[1].score+'</span>'+'</b>');
      //display dealers score
      $('.filler').replaceWith('<li class="' + players[1].cards[0].card+' '+ players[1].cards[0].suit+'">'+'</li>');
      //reveal dealers hidden card         
    } 
  }

  function checkForWin ()
  {
     if (players[0].score == config.win)
     {
        players[0].win =true;
        //if players score is 21 he wins (unless dealer has 21)
     }
  }

  function getCardValue(card, aceCheck) 
  {
    switch(card) 
    {
      case 'king':
      case 'queen':
      case 'jack':
      return 10;
      break;
      //face cards are 10
      case 'ace':
      if(aceCheck >= 11)
      {
        return 1;
      } 
      else 
      {
        return 11;
      }
      //makes ace a 1 or 11
      break;
      case 'two': return 2;
      break;
      case 'three': return 3;
      break;
      case 'four': return 4;
      break;
      case 'five': return 5;
      break;
      case 'six': return 6;
      break;
      case 'seven': return 7;
      break;
      case 'eight': return 8;
      break;
      case 'nine': return 9;
      break;
      case 'ten': return 10;
      break;
      //values to the card names (cards needed names for css classes)
      default:
      return card;
    }
  }   
  return pub;
}();
//end of second window 
$(function() 
{ 
  site.init();
}) 