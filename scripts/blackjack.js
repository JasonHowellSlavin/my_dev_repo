console.log("You have the bridge commander");	

//This is the player class
function Player (name, position) {
	this.name = name;
	this.position = position;
	this.chipCount = 100;
	this.handOfCards = [];
	this.ableToHit = false;
	this.bustStatus = false;
	this.stayStatus = false;
	this.winStatus = false;
	this.sumOfHand = 0;
	this.betAmount = 0;
	this.betSet = false;

	this.stayKeepCards = function () {
		console.log("I am deciding to stay");
		if (this.stayStatus === false && haveCardsBeenDealtByDealer === true) {
			console.log("returning a true stay status");
			return this.stayStatus = true;
		}
	};

	this.raiseBet = function (table) {
		if (this.betSet === false){
			if(this.betAmount <= this.chipCount) {
				this.betAmount += 5;
				table.displayPlayerBet(this);
			}
		}	
	};

	this.lowerBet = function (table) {
		if (this.betSet === false) {
			if(this.betAmount >= 0) {
				this.betAmount -= 5;
				table.displayPlayerBet(this);
			}
		}
	};

	this.setBetAmount = function (table) {
		if (this.betSet === false) {
			if(this.betAmount > 0) {
				table.playerBetAmount = this.betAmount;
				this.chipCount = this.chipCount - this.betAmount
				table.displayPlayerBet(this);
				table.playerChipCount(this);
				this.betSet = true;
			}
		}
	};
};

//This is the dealer class
function Dealer (name, deckOfCards) {
	this.name = name;
	this.deckOfCards = deckOfCards;
	this.handOfCards = []; //could i use a prototype?
	this.stayStatus = false;
	this.bustStatus = false;
	this.winStatus = false;
	this.sumOfHand = 0;

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
		player.ableToHit = true;
		return haveCardsBeenDealtByDealer = true;
	};

	this.hitPlayer = function (player) {
		if (player.bustStatus === false && haveCardsBeenDealtByDealer === true){
			if (player.ableToHit === true){
				player.handOfCards.push(Table.deckOfCards[0]);
				Table.deckOfCards.shift();	
			}
		}	
	};

	this.hitSelf = function (player) {
		console.log("hitting self");
		if (player.stayStatus === true){
			let dealerCardSum = this.handOfCards.reduce(function (a, b){ return a + b;}, 0);
			if (dealerCardSum < 16) {
				this.handOfCards.push(Table.deckOfCards[0]);
				Table.deckOfCards.shift();
			} else {
				this.stayStatus = true;
				return this.stayStatus;
			}
		}
	};

	this.checkIfCardTakerBust = function (object) {
		let playerCardSum = object.handOfCards.reduce(function (a, b) {return a + b;}, 0);
		if (playerCardSum > 21) {
			object.bustStatus = true;
			object.stayStatus = true;
			Table.cardTakerHasBusted(object);
			this.playerHasStayed(Player1, Table)
			return object.bustStatus;
		}
	};

	this.playerHasStayed = function (player, table) {
		if (player.stayStatus === true) {
			while (this.stayStatus === false){
				console.log("Player has stayed - Dealer Function holder");
				this.hitSelf(player);
				table.dealerHitOnTable(this, player);
				this.checkIfCardTakerBust(this);
				this.checkWhoWon(player, table);
				table.someoneHasWon(player);
				table.someoneHasWon(this);
				player.ableToHit = false;
				window.setTimeout(table.newHandEraseCards, 3000);
				window.setTimeout(table.newHandEraseNumbers, 3500);
				player.betSet = false;
				this.giveOrTakeChips(player, table);
			}
		}
	};

	this.checkWhoWon = function (player, table) {
		this.sumOfHand = this.handOfCards.reduce(function (a, b){ return a + b;}, 0);
		player.sumOfHand = player.handOfCards.reduce(function (a, b){ return a + b;}, 0);
		if(player.bustStatus === false && this.bustStatus === true){
			player.winStatus = true;
		} else if (player.bustStatus === true && this.bustStatus === false) {
			this.winStatus = true;
		} else if (this.sumOfHand > player.sumOfHand && this.bustStatus !== true) {
			this.winStatus = true;
		} else if (this.sumOfHand < player.sumOfHand && player.bustStatus !== true) {
			player.winStatus = true;
		} else if (this.sumOfHand === player.sumOfHand){
			player.winStatus === false;
			this.winStatus === false;
			table.playersPush();
		}
	};
	
	this.askForNewGame = function (player, table) {
		if (player.winStatus === true || this.winStatus === true) {
			window.setTimeout(function(){return true}, 5000);

			return true;
		}
		return true;
	};

	this.newHand = function (object) {
		console.log("This is the Object:", object);
		if (object.handOfCards.length !== undefined) {
			let arrayLength = object.handOfCards.length;
			for (var i = 0; i < arrayLength; i++) {
				object.handOfCards.pop();	
			}
		console.log("Array is Empty");	
		}
	};

	this.giveOrTakeChips = function (player, table) {
		if (player.winStatus === true && this.winStatus === false) {
			player.chipCount += player.betAmount;
			table.playerChipCount(player);
		}
	};
};

// 	this.shuffleNewDeck = function (table) {
// 		let cardsLeft = this.deckOfCards.length;
// 		if (cardsLeft < MIN_CARDS_TO_SHUFFLE) {
// 			while (cardsLeft > 0) {
// 				this.deckOfCards.pop()	
// 			}
// 		}
// 		createDeck(noSuitDeck);
// 		Table.
// 	}
// };

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
	playerBetAmount : 0,

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
		dealerCardOne.innerHTML = "<br> No Suit <br>" + dealer.handOfCards[0]; 
		dealerCardTwo.innerHTML = "<br> No Suit <br>" + dealer.handOfCards[1];
		playerCardOne.innerHTML = "<br> No Suit <br>" + player.handOfCards[0];
		playerCardTwo.innerHTML = "<br> No Suit <br>" + player.handOfCards[1];
	}
	areCardsBeingDealtToTable = true;
	return areCardsBeingDealtToTable;
	},

	playerHitOnTable : function (dealer, player) {
		if (player.bustStatus === false && haveCardsBeenDealtByDealer === true) {
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
		for (var i = 0; i <= 9; i++){
			var cardsToPickup = document.getElementsByClassName("card");
			cardsToPickup[i].innerHTML = "";
		}
		//remove old innerHTML
	},

	newHandEraseCards : function () {
		for (var i = 0; i <= 9; i++){
			var cardsToPickup = document.getElementsByClassName("card");
			cardsToPickup[i].setAttribute("class", "card hiddenCard");
		}
	}, 

	cardTakerHasBusted : function (object) {
		if (object.bustStatus === true) {
			let bustBanner = document.getElementsByClassName("spacer")[0];
			bustBanner.innerHTML = object.name + " has Busted";
			window.setTimeout(function(){bustBanner.innerHTML = "";}, 3000);
		}
	},

	playersPush : function () {
		let winBanner = document.getElementsByClassName("spacer")[0];
		winBanner.innerHTML = "Players Push!";
		window.setTimeout(function(){winBanner.innerHTML = "";}, 4000);
	},

	someoneHasWon : function (object) {
		if (object.winStatus === true) {
			let winBanner = document.getElementsByClassName("spacer")[0];
			winBanner.innerHTML = object.name + " has Won!";
			window.setTimeout(function(){winBanner.innerHTML = "";}, 4000);
		}
		let dealButtonName = document.getElementById("dealCards");
		dealButtonName.innerHTML = "Deal Again?";
	},

	resetPlayerStatus : function (object) {
		areCardsBeingDealtToTable = false;
		haveCardsBeenDealtByDealer = false;
		object.bustStatus = false;
		object.stayStatus = false;
		object.winStatus = false;
		object.sumOfHand = 0;
	},

	newGameDealing : function (player, dealer) {
		this.resetPlayerStatus(player);
		this.resetPlayerStatus(dealer);
	},
	//my chips visual functions will go below
	playerChipCount : function (player) {
		let playerChips = document.getElementById("chipCount");
		playerChips.innerHTML = player.chipCount;
	},

	displayPlayerBet : function (player) {
		let playerBet = document.getElementById("betAmount");
		playerBet.innerHTML = player.betAmount;
	}

};


//Array for the first Deck
//Should the deck belong to the Table? 
const noSuitDeck = [];
//Creates the first Deck
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

Table.playerChipCount(Player1);
//Instantiates global variables
let hitButton = document.getElementById("takeAnotherCard");
let dealButton = document.getElementById("dealCards");
let stayButton = document.getElementById("stayPat");
let raiseBetButton = document.getElementById("betAmountUp");
let lowerBetButton = document.getElementById("betAmountDown");
let betSetterButton = document.getElementById("setBet");
const MIN_CARDS_TO_SHUFFLE = 12;
let areCardsBeingDealtToTable = false;
let haveCardsBeenDealtByDealer = false;
let playerHandSum = 0;

//logs out properties
function turnBlue (card) {
	var bluecard = document.getElementsByClassName("card");
	bluecard[card].setAttribute("class", "blueCard");
}


//event listeners go here:
dealButton.addEventListener("click", function () {Table.newGameDealing(Player1, beginningDealer);});
dealButton.addEventListener("click", function () {beginningDealer.newHand(Player1);});
dealButton.addEventListener("click", function () {beginningDealer.newHand(beginningDealer);});
dealButton.addEventListener("click", function () {beginningDealer.shuffleDeck(noSuitDeck);});
dealButton.addEventListener("click", function () {beginningDealer.dealCardstoPlayersSelf(Player1);});
dealButton.addEventListener("click", function () {Table.dealCardsToTable(Player1, beginningDealer);});
hitButton.addEventListener("click", function () {beginningDealer.hitPlayer(Player1);});
hitButton.addEventListener("click", function () {Table.playerHitOnTable(beginningDealer, Player1);});
hitButton.addEventListener("click", function () {beginningDealer.checkIfCardTakerBust(Player1);});
stayButton.addEventListener("click", function () {Player1.stayKeepCards();});
stayButton.addEventListener("click", function () {beginningDealer.playerHasStayed(Player1, Table);});
raiseBetButton.addEventListener("click" , function () {Player1.raiseBet(Table);});
lowerBetButton.addEventListener("click" , function () {Player1.lowerBet(Table);});
dealButton.addEventListener("click", function () {Player1.setBetAmount(Table);});

