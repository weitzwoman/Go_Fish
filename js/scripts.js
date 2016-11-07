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
    this.deck[l] = temp
  }
  return this.deck;
}

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
}



Game.prototype.turns = function(request) {
  if (this.currentPlayer === player1) {
    var goFish = [];
    for (var i = 0; i < player2.hand.length; i++) {
      if (player2.hand[i].rank === request) {
        player1.hand.push(player2.hand[i]);
        goFish.push(player2.hand[i]);
        player2.hand.splice(i, 1);
      }
    }

    if (goFish.length === 0) {
      var draw = this.deck.pop(0);
      player1.hand.push(draw);
    }

    this.currentPlayer = player2;
    console.log("switched players!")
  }

  if (this.currentPlayer === player2) {
    var computerRequest = player2.hand[Math.floor(Math.random() * player2.hand.length)];
    var goFish2 = [];

    for (var i = 0; i < player1.hand.length; i++) {
      if (player1.hand[i].rank === computerRequest.rank) {
        player2.hand.push(player1.hand[i]);
        goFish2.push(player1.hand[i]);
        player1.hand.splice(i, 1);
      }
    }

    if (goFish2.length === 0) {
      var draw = this.deck.pop(0);
      player2.hand.push(draw);
    }

  }
  this.currentPlayer = player1;
  console.log("switched players!");

}

function book() {
  
}

var player1 = new Player();
var player2 = new Player();

function Player() {
  this.hand = [];
}

$(document).ready(function(){
  $("#test").click(function(){
    var game = new Game();
    game.makeDeck();
    game.deal();
    // input
    game.turns("2");
    // input
    game.turns("3");
    // input
    game.turns("4");
    console.log(player1);
    console.log(player2);
  });
});
