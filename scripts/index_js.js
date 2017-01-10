window.onload = function () {
	console.log("You have the bridge commander");	

function Player (name) {
	this.name = name;
	this.chipCount = 0;
	this.handOfCards = [];
};

function Dealer (name, deckOfCards) {
	this.name = name;
	this.deckOfCards = deckOfCards;
	this.dealerHand = [];

	function dealHandsToPlayersAndSelf () {
		//Will Need to set this variable inside of a for loop, making the variable each time, or rather
		//make another function that chooses the random card.......
		var cardToDeal = Math.floor((Math.random() * this.deckOfCards.length) + 1);
	}

};

const noSuitDeck = [];

function createDeck (array) {
	for (var i = 2; i < 12; i++) {
		for (var numTimes = 0; numTimes < 4; numTimes++){
			array.push(i);
		}
	}
	for (var i = 0; i < 12; i++) {
		array.push(10);
	}
}


createDeck(noSuitDeck);

var Player1 = new  Player("Test Player");
var beginningDealer = new Dealer("Smokey Joe", noSuitDeck);
console.log(Player1);
console.log(beginningDealer);
console.log(beginningDealer.deckOfCards);
console.log("You made this deck:\n" + noSuitDeck);



};