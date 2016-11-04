var suits = ["Hearts", "Diamonds", "Spades", "Clubs"]
var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]
var deck = [];

function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
}

function makeDeck() {
  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < ranks.length; j++) {
      var newCard = new Card(ranks[j], suits[i]);
      deck.push(newCard);
    }
  }
  return deck;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

makeDeck();
shuffle(deck);

var player1Hand = [];
var player2Hand = [];

function deal() {
  for (var index = 0; index < 7; index++) {
    player1Hand = deck.pop(index);
  }
  return player1Hand;
}

deal();
