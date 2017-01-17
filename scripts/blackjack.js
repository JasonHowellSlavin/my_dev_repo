window.onload = function () {
	console.log("You have the bridge commander");	

//This is the player class
function Player (name, position) {
	this.name = name;
	this.position = position;
	this.chipCount = 0;
	this.handOfCards = [];
	this.playerStatus = true;
};
//This is the dealer class
function Dealer (name, deckOfCards) {
	this.name = name;
	this.deckOfCards = deckOfCards;
	this.dealerHand = [];

	function shuffleDeck (deck){
	    let counter = array.length;

	    // While there are elements in the array
	    while (counter > 0) {
	        // Pick a random index
	        let index = Math.floor(Math.random() * counter);
	        // Decrease counter by 1
	        counter--;
	        // And swap the last element with it
	        let temp = array[counter];
	        array[counter] = array[index];
	        array[index] = temp;
    	}

    return array;
	}

	function dealCardstoPlayersSelf () {
		let numOfPlayersSitting = 0;
		for (var i = 0; i <= 4; i++) {
			if ("Player" + i[playerStatus] === true) {
				return function () {numOfPlayersSitting++;}
			}
		}
		console.log(numOfPlayersSitting + "This is how many players");
	}


};

//Creates the table object literal. 
var Table = {
	color : "green",
	numberOfPlayers : 2
};


//Array for the first Deck
const noSuitDeck = [];
//Creates the first Decl
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
//Calls the first Deck creation method
createDeck(noSuitDeck);
//Instantiates new objects using object constructor methods
var Player1 = new  Player("Test Player", 1);
var beginningDealer = new Dealer("Smokey Joe", noSuitDeck);
//logs out properties
console.log(Player1);
console.log(beginningDealer);
console.log(beginningDealer.deckOfCards);
console.log("You made this deck:\n" + noSuitDeck);



};