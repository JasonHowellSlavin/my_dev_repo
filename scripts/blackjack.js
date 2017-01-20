console.log("You have the bridge commander");	

//This is the player class
function Player (name, position) {
	this.name = name;
	this.position = position;
	this.chipCount = 0;
	this.handOfCards = [];
	this.bustStatus = false;
	this.stayStatus = false;

	this.turnCardsIntoDealer = function () {
		//this function needs to clear hand OfCards - called on deal click
		//needs to check if hand is empty
		return true;
	};

	this.stayKeepCards = function () {
		console.log("I am deciding to stay");
		if (this.stayStatus === false) {
			console.log("returning a true stay status");
			return this.stayStatus = true;
		}
	}
};

//This is the dealer class
function Dealer (name, deckOfCards) {
	this.name = name;
	this.deckOfCards = deckOfCards;
	this.handOfCards = []; //could i use a prototype?
	this.stayStatus = false;

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
		if (haveCardsBeenDealtByDealer === false) {
			for (var i = 1; i <= 2; i++) {
				player.handOfCards.push(Table.deckOfCards[0]);
				this.deckOfCards.shift();
				this.handOfCards.push(Table.deckOfCards[0]);
				this.deckOfCards.shift();
			}
			console.log(player.handOfCards + " this is the player hand");
			console.log(this.handOfCards + " this is the dealer hand");	
		}
		return haveCardsBeenDealtByDealer = true;
	};

	this.hitPlayer = function (player) {
		if (player.bustStatus === false){
		player.handOfCards.push(Table.deckOfCards[0]);
		Table.deckOfCards.shift();	
		}	
	};

	this.hitSelf = function (player) {
		console.log("hitting self");
		if (player.stayStatus === true){
			let dealerCardSum = this.handOfCards.reduce(function (a, b){ return a + b;}, 0);
			if (dealerCardSum < 17) {
				this.handOfCards.push(Table.deckOfCards[0]);
				Table.deckOfCards.shift();
			} else {
				this.stayStatus = true;
				return this.stayStatus;
			};
		};
	}

	this.checkIfPlayerBust = function (player) {
		let playerCardSum = player.handOfCards.reduce(function (a, b) {
			return a + b;
		}, 0);
		if (playerCardSum > 21) {
			player.bustStatus = true;
			Table.playerHasBusted(player);
			return player.bustStatus;
		}
	};

	this.playerHasStayed = function (player, table) {
		if (player.stayStatus === true) {
			while (this.stayStatus === false){
				console.log("Player has stayed - Dealer Function holder");
				this.hitSelf(player);
				table.dealerHitOnTable(this, player);
			}
		}
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
	dealerCardCount : 1,

	dealCardsToTable : function (player, dealer) {
	//it might be better to have both hiddenCard and card as classes so div object numbers stay the same....
	if (areCardsBeingDealtToTable === false){
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
	areCardsBeingDealtToTable = true;
	return areCardsBeingDealtToTable;
	},

	playerHitOnTable : function (dealer, player) {
		if (player.bustStatus === false) {
		let cardPlacement = this.playerCardCount + 1;
		//would need to fix the below if more than one player
		let playerHitCard = document.getElementsByClassName("hiddenCard")[this.playerCardCount];
		playerHitCard.setAttribute("class", "card");
		let hitCardNum = player.handOfCards.length - 1;
		console.log(hitCardNum);
		console.log(player.handOfCards);
		playerHitCard.innerHTML += "<br> No Suit <br>" + player.handOfCards[hitCardNum];
		player.hitCardNum++;	
		}
	},

	//not DRY. Function above could do....fix later
	dealerHitOnTable : function (dealer, player) {
		if (player.stayStatus === true) {
			if (dealer.stayStatus === false) {
				let cardPlacement = this.dealerCardCount + 1;
				let dealerHitCard = document.getElementsByClassName("hiddenCard")[this.dealerCardCount];
				dealerHitCard.setAttribute("class", "card");
				let hitCardNum = dealer.handOfCards.length - 1;
				dealerHitCard.innerHTML += "<br> No Suit <br>" + dealer.handOfCards[hitCardNum];
				dealer.hitCardNum++;
			}
		}
	},

	newHandEraseNumbers : function () {
		return true;
		//remove old innerHTML
	},

	newHandEraseCards : function () {
		return true;
		//change attributes to "remove cards"
	}, 

	playerHasBusted : function (player) {
		if (player.bustStatus === true) {
			let bustBanner = document.getElementsByClassName("spacer")[0];
			bustBanner.innerHTML = "You have Busted";
			window.setTimeout(function(){bustBanner.innerHTML = "";}, 3000);
		}
	},
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
let stayButton = document.getElementById("stayPat");
let areCardsBeingDealtToTable = false;
let haveCardsBeenDealtByDealer = false;
let playerHandSum = 0;

//logs out properties

//event listeners go here:
dealButton.addEventListener("click", function () {beginningDealer.shuffleDeck(noSuitDeck);});
dealButton.addEventListener("click", function () {beginningDealer.dealCardstoPlayersSelf(Player1);});
dealButton.addEventListener("click", function () {Table.dealCardsToTable(Player1, beginningDealer);});
hitButton.addEventListener("click", function () {beginningDealer.hitPlayer(Player1);});
hitButton.addEventListener("click", function () {Table.playerHitOnTable(beginningDealer, Player1);});
hitButton.addEventListener("click", function () {beginningDealer.checkIfPlayerBust(Player1);});
stayButton.addEventListener("click", function () {Player1.stayKeepCards();});
stayButton.addEventListener("click", function () {beginningDealer.playerHasStayed(Player1, Table);});




