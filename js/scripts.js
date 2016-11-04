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
      //console.log(newCard);
    }
  }

  return deck;
}
