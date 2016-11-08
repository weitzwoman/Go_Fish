var suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

function Card(suit,rank) {
  this.suit = suit;
  this.rank = rank;
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
        var newCard = new Card(suits[i], ranks[j]);
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

  return output;
}



Game.prototype.turns = function(request) {
  if (this.currentPlayer === player1) {
    var goFish = [];
    for (var i = 0; i < player2.hand.length; i++) {
      if (player2.hand[i].rank === request) {
        player1.hand.push(player2.hand[i]);
        goFish.push(player2.hand[i]);
        player2.hand.splice(i, 1);
        checkBook(player1.hand, request, "Player 1");
        return "Hit";
      }
    }

    var draw = [];
  //  debugger;
    if (goFish.length === 0 && this.deck.length > 0) {
      draw = this.deck.pop(0);
      player1.hand.push(draw);
      checkBook(player1.hand, draw.rank, "Player 1");
      return "Go Fish";
    } else {
      this.currentPlayer = player2;
    }

    this.currentPlayer = player2;
  }

  if (this.currentPlayer === player2) {
    var computerRequest = player2.hand[Math.floor(Math.random() * player2.hand.length)];
    var goFish2 = [];

    for (var i = 0; i < player1.hand.length; i++) {
      if (player1.hand[i].rank === computerRequest.rank) {
        player2.hand.push(player1.hand[i]);
        goFish2.push(player1.hand[i]);
        player1.hand.splice(i, 1);
        checkBook(player2.hand, computerRequest, "Computer");
      }
    }

    var draw2 = [];
    if (goFish2.length === 0 && this.deck.length > 0) {
      draw2 = this.deck.pop(0);
      player2.hand.push(draw2);
      checkBook(player2.hand, draw2.rank, "Computer");
    } else {
      this.currentPlayer = player1;
    }

  }
  this.currentPlayer = player1;

}

var player1Counter = 0;
var player2Counter = 0;

function checkBook(hand, rank, player) {
  var book = [];
  for (var q = 0; q < hand.length; q++) {
    if (hand[q].rank === rank) {
      book.push(hand[q]);

    }
  }

  if (book.length === 4 && player === "Player 1") {
    alert("You created a book of " + rank + "'s!");
    player1Counter++;

    // for (var e = 0; e < hand.length; e++) {
    //   if (hand[e].rank === rank) {
    //     console.log(hand[e]);
    //     hand.splice(e, 1);
    //   }
    // }
  } else if (book.length === 4 & player === "Computer") {
    alert("Computer create a book of " + rank + "'s!")
    player2Counter++;
  }

  if (player1Counter >= 7) {
    alert("Player 1 Wins!")
  }

  if (player2Counter >= 7) {
    alert("Player 2 Wins!")
  }
}

var player1 = new Player();
var player2 = new Player();



$(document).ready(function(){
  $("#newGame").click(function(){
    var game = new Game();
    game.makeDeck();
    var hand = game.deal();
    $("#userCardHand").text(hand);
    $("#dialogueBox").append("You created a new game! You are playing Go Fish against: Homer." + "<br>" + "What is your guess?");
    //$("#dialogueBox").append("What is your guess?");



    $("form").submit(function(event){
      event.preventDefault();
      var guess = $("#userGuess").val();
      console.log(guess);
      game.turns(guess);

    });

  });
});
