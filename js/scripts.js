var suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
var homerState = "";


function Card(suit,rank, image) {
  this.suit = suit;
  this.rank = rank;
  this.image = image;
}

function Game() {
  this.currentPlayer = player1;
  this.deck = [];
}

function Player() {
  this.hand = [];
}

Game.prototype.makeDeck = function() {
  for (var i = 0; i < suits.length; i++) {
   for (var j = 0; j < ranks.length; j++) {
        var image = "img/"+ranks[j]+suits[i]+".png";
        var newCard = new Card(suits[i], ranks[j], image);
        this.deck.push(newCard);
      }
    }


  var k = 0;
  var l = 0;
  var temp = null;

  for (k = this.deck.length - 1; k > 0; k -= 1) {
    l = Math.floor(Math.random() * (k + 1))
    temp = this.deck[k]
    this.deck[k] = this.deck[l]
    this.deck[l] = temp;
  }
  return this.deck;
}

var output = "";
Game.prototype.deal = function() {
  for (var index = 0; index < 5; index++) {
    var deal = this.deck.pop(index);
    this.currentPlayer.hand.push(deal);
  }
  this.currentPlayer = player2;

  /// DON'T REPEAT YOURSELF
  for (var index = 0; index < 5; index++) {
    var deal = this.deck.pop(index);
    this.currentPlayer.hand.push(deal);
  }
  this.currentPlayer = player1;

  for (var i=0; i<player1.hand.length; i++) {
    var card1 = player1.hand[i].rank + " of " + player1.hand[i].suit;
    output += card1 + " ";
  }
}

var player1TurnResult = "";
var player2TurnResult = "";

Game.prototype.turns = function(request) {
  if (this.currentPlayer === player1) {
    var goFish = [];
    for (var i = 0; i < player2.hand.length; i++) {
      if (player2.hand[i].rank === request) {
        player1.hand.push(player2.hand[i]);
        goFish.push(player2.hand[i]);
        player1TurnResult = "Hit! You got a " + player2.hand[i].rank + " from Homer!";
        player2.hand.splice(i, 1);
        checkBook(player1.hand, request, "Player 1");

      }
    }



    var draw = [];
  //  debugger;
    if (goFish.length === 0 && this.deck.length > 0) {
      draw = this.deck.pop(0);
      player1.hand.push(draw);
      player1TurnResult = "GO FISH! You drew a " + draw.rank + " of " + draw.suit + " from the deck!";
      checkBook(player1.hand, draw.rank, "Player 1");
    } else if (goFish.length === 0 && this.deck.length === 0) {
      this.currentPlayer = player2;
      player1TurnResult = "Homer didn't have any " + request + "s and the deck is empty. It's Homer's turn.";
    }
  }
  output = "";
  for (var i=0; i<player1.hand.length; i++) {
    var card1 = player1.hand[i].rank + " of " + player1.hand[i].suit;
    output += card1 + " ";
  }
    this.currentPlayer = player2;


  if (this.currentPlayer === player2) {
    var computerRequest = player2.hand[Math.floor(Math.random() * player2.hand.length)];
    var goFish2 = [];

    for (var i = 0; i < player1.hand.length; i++) {
      if (player1.hand[i].rank === computerRequest.rank) {
        player2.hand.push(player1.hand[i]);
        goFish2.push(player1.hand[i]);
        player2TurnResult = "Hit! Homer got a " + player1.hand[i].rank + " from your hand.";
        player1.hand.splice(i, 1);
        checkBook(player2.hand, computerRequest, "Computer");
        homerState = "<img src='img/homerwin.png' alt='picture of Homer celebrating' class='donut'>";
      }
    }

    var draw2 = [];
    if (goFish2.length === 0 && this.deck.length > 0) {
      draw2 = this.deck.pop(0);
      player2.hand.push(draw2);
      player2TurnResult = "Homer had to go fish and drew from the deck!";
      checkBook(player2.hand, draw2.rank, "Computer");
      homerState = "<img src='img/doh.png' alt='picture of Homer saying Doh' class='donut'>";
    } else if (goFish2.length === 0 && this.deck.length === 0) {
      this.currentPlayer = player1;
      player2TurnResult = "You didn't have any " + computerRequest.rank + "s for Homer and the deck is empty. It's your turn.";
    }
  }
  this.currentPlayer = player1;
}

var player1Counter = 0;
var player2Counter = 0;
var bookCreated1 = "";
var bookCreated2 = "";

function checkBook(hand, rank, player) {
  var book = [];
  for (var q = 0; q < hand.length; q++) {
    if (hand[q].rank === rank) {
      book.push(hand[q]);

    }
  }

  if (book.length === 4 && player === "Player 1") {
    bookCreated1 = "You created a book of " + rank + "'s!";
    player1Counter++;
  } else if (book.length === 4 & player === "Computer") {
    bookCreated2 = "Homer created a book of " + rank + "'s!";
    player2Counter++;
  }

  if (player1Counter >= 1) {
    player1Wins = true;
  }

  if (player2Counter >= 7) {
    player2Wins = true;
  }
}

var player1 = new Player();
var player2 = new Player();
var player1Wins;
var player2Wins;

// UI
$(document).ready(function(){
  $("#newGame").click(function(){
    var game = new Game();
    game.makeDeck();
    game.deal();

    var showCards = "";
    for (var a = 0; a < player1.hand.length; a++) {
      var cardImage = "<input type='radio' name='cards' value='" + player1.hand[a].rank + "'><img src='img/" + player1.hand[a].rank + player1.hand[a].suit + ".png' id='resize'>";
        showCards += cardImage;
    }
    $("#deckCount").text(game.deck.length);
    $("#homerCards").text(player2.hand.length);
    $("#userCardHand").html(showCards);
    $("#dialogueBox").text("You created a new game! You are playing Go Fish against: Homer.");
    $("#newGame").hide();
    $(".playerWell").show();
    $("#homerPic").html("<img src='img/homer.png' alt='picture of Homer with donut' class='donut'>");


    $("form").submit(function(event){
      event.preventDefault();
      var guess = $("input:radio[name=cards]:checked").val();
      var turn = game.turns(guess);
      $("#player1Turn").text(player1TurnResult);
      $("#player2Turn").text(player2TurnResult);
      $("#dialogueBox").hide();
      $("#userScore").text(player1Counter);
      $("#computerScore").text(player2Counter);
      $("#bookCreated1").text(bookCreated1);
      $("#deckCount").text(game.deck.length);
      $("#homerCards").text(player2.hand.length);
      $("#bookCreated2").text(bookCreated2);
      $("#homerPic").html(homerState);
      var showCards = "";
      for (var a = 0; a < player1.hand.length; a++) {
        var cardImage = "<input type='radio' name='cards' value='" + player1.hand[a].rank + "'><img src='img/" + player1.hand[a].rank + player1.hand[a].suit + ".png' id='resize'>";
          showCards += cardImage;
      }
      $("#userCardHand").html(showCards);

      if (player1Wins === true) {
        $("#player1Winner").show();
        $(".playerWell").hide();
        $(".turn").hide();
      } else if (player2Wins === true) {
        $("#player2Winner").show();
        $(".playerWell").hide();
        $(".turn").hide();
      }

      $(".newGameButton").click(function(){
        document.location.reload(true);
      });
    });

  });
});
