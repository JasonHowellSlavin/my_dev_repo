//we will be using exclusively ES5 to make this match game. 
//the first section of functionality will likely only
//be notes, and will not actually reflect the games mechanics.

console.log("You have the commander, bridge.");

//let prevents hoisting, cementing variables in their local scope:
let card = function (name, color, shape, position) {
	this.name = name;
	this.color = color;
	this.shape = shape;
	this.position = position;

	this.createTwo = function (name, color, shape, position) {
		for (var i = 0; i < 2; i++) {
			let position2 = position + i;
			let currentName = toString(name + i);
			console.log(currentName);
			currentName = new card(name, color, shape, position2);
			console.log(currentName);
		}
	};
}

let newCard = new card("blank", "blank", "blank", "blank");

newCard.createTwo("diamond", "blue", "diamond", 1);

// console.log(diamond0);
// console.log(diamond1);

//arrowFunction

let addOne = (value) => {
	value += 1;
	console.log(value);
	return value;
}