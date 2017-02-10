console.log("You have the bridge commander");	

//This is the player class
function Player (name, position) {
	this.name = name;
	this.position = position;
	this.chipCount = 0;
	this.handOfCards = [];
	//below ensures correct card selection from array
	this.playerStatus = true;

	this.turnCardsIntoDealer = function () {
		//this function needs to clear hand OfCards - called on deal click
		//needs to check if hand is empty
		return true;
	};
};
//This is the dealer class
function Dealer (name, deckOfCards) {
	this.name = name;
	this.deckOfCards = deckOfCards;
	this.handOfCards = []; //could i use a prototype?

	this.shuffleDeck = function (deck){
	    let counter = deck.length;

	    // While there are elements in the array
	    while (counter > 0) {
	        // Pick a random index
	        let index = Math.floor(Math.random() * counter);
	        // Decrease counter by 1
	        counter--;
	        // And swap the last element with it
	        let temp = deck[counter];
	        deck[counter] = deck[index];
	        deck[index] = temp;
    	}
    };

    this.dealCard = function (deck, dealer, players) {
    	return true;
    };

	this.dealCardstoPlayersSelf = function (player) {
		for (var i = 1; i <= 2; i++) {
			player.handOfCards.push(Table.deckOfCards[0]);
			this.deckOfCards.shift();
			this.handOfCards.push(Table.deckOfCards[0]);
			this.deckOfCards.shift();
		}
		console.log(player.handOfCards + " this is the player hand");
		console.log(this.handOfCards + " this is the dealer hand");
	};

	this.hitPlayer = function (player) {
		console.log("This is the player SUM: " + playerHandSum);
		if (playerHandSum <= 21) {
			player.handOfCards.push(Table.deckOfCards[0]);
			Table.deckOfCards.shift();	
		} else {
			console.log("player busts");
		}
		console.log(player.handOfCards);
		return true;
	}

	this.newDealerHand = function () {
		//this needs to emoty handOfCards .... called on "Deal" click
		//check if handOfCards is empty. 
		return true;
	};
};

//Creates the table object literal. 
var Table = {
	color : "green",
	numberOfPlayers : 2,
	playerArray : [],
	deckOfCards : [],
	//this will ensure the deck button won't fire twice
	hasHandBeenDealt : false,
	//ensures that a "hit" will always reveal the next card in DOM
	playerCardCount : 3,
	dealerCardCoutn : 1,

	dealCardsToTable : function (player, dealer) {
	//should this be a method of the table? 
	if (areCardsBeingDealt === false){
		let playerCardOne = document.getElementsByClassName("hiddenCard")[5];
		let playerCardTwo = document.getElementsByClassName("hiddenCard")[6];
		let dealerCardOne = document.getElementsByClassName("hiddenCard")[0];
		let dealerCardTwo = document.getElementsByClassName("hiddenCard")[1];
		dealerCardOne.setAttribute("class", "card");
		dealerCardTwo.setAttribute("class", "card");
		playerCardOne.setAttribute("class", "card");
		playerCardTwo.setAttribute("class", "card");
		dealerCardOne.innerHTML += "<br> No Suit <br>" + dealer.handOfCards[0]; 
		dealerCardTwo.innerHTML += "<br> No Suit <br>" + dealer.handOfCards[1];
		playerCardOne.innerHTML += "<br> No Suit <br>" + player.handOfCards[0];
		playerCardTwo.innerHTML += "<br> No Suit <br>" + player.handOfCards[1];
	}
	areCardsBeingDealt = true;
	return areCardsBeingDealt;
	},

	playerHitOnTable : function (dealer, player) {
		let cardPlacement = this.playerCardCount + 1;
		let playerHitCard = document.getElementsByClassName("hiddenCard")[this.playerCardCount];
		playerHitCard.setAttribute("class", "card");
		let hitCardNum = player.handOfCards.length - 1;
		console.log(hitCardNum);
		console.log(player.handOfCards);
		playerHitCard.innerHTML += "<br> No Suit <br>" + player.handOfCards[hitCardNum];
		player.hitCardNum++;
	},

	newHandEraseNumbers : function () {
		return true;
		//remove old innerHTML
	},

	newHandEraseCards : function () {
		return true;
		//change attributes to "remove cards"
	} 
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
Table.deckOfCards = noSuitDeck;

//Instantiates new objects using object constructor methods
let Player1 = new  Player("Test Player", 1);
let beginningDealer = new Dealer("Smokey Joe", noSuitDeck);

//Instantiates global variables
let hitButton = document.getElementById("takeAnotherCard");
let dealButton = document.getElementById("dealCards");
let areCardsBeingDealt = false;
let playerHandSum = 0;

//logs out properties
console.log(Player1);
console.log(beginningDealer);
console.log(beginningDealer.deckOfCards);
console.log("You made this deck:\n" + noSuitDeck);
beginningDealer.shuffleDeck(noSuitDeck);
beginningDealer.dealCardstoPlayersSelf(Player1);

function changeItBlue () {	
	var blueChange = document.getElementsByClassName("card");
	for (var i = 0; i < 5; i++) {
		blueChange[i].className += " blueCard";	
	}
}

function hitMe () {
	beginningDealer.hitPlayer(Player1);
	Table.playerHitOnTable(Player1, beginningDealer);
}

//testerFunction needs to be replaced by function that clears DOM and arrays
// dealButton.addEventListener("click", changeItBlue); 
//event listeners go here:
dealButton.addEventListener("click", function () {Table.dealCardsToTable(Player1, beginningDealer);});
hitButton.addEventListener("click", function () {beginningDealer.hitPlayer(Player1);});
hitButton.addEventListener("click", function () {Table.playerHitOnTable(beginningDealer, Player1);});






