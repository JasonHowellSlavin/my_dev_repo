$(document).ready( function () {

	console.log("We are ready to roll");

	tempsForDOM = {
	110 : 0, 105 : 1, 100 : 2, 95 : 3, 90 : 4, 85 : 5, 80 : 6, 75 : 7, 70 : 8, 65 : 9, 60 : 10, 55 : 11, 50 : 12, 45 : 13, 40 : 14, 35 : 15, 30 : 16
	};


	let myXMLReq = function () {
		var xhr = new XMLHttpRequest(),
			method = "GET",
			url = "http://api.wunderground.com/api/fd5d9b5d60eaf70c/conditions/q/CA/San_Francisco.json",
			isReady = XMLHttpRequest.DONE;

		xhr.open(method, url, true);
		xhr.send();
		console.log(xhr.status);
		console.log(xhr.readyState);
		xhr.onreadystatechange = function () {
			if(xhr.readyState === isReady && xhr.status === 200){
				let wResponse = JSON.parse(xhr.responseText);
				let	currObs = wResponse.current_observation,
					location = currObs.display_location.full,
					tempF = currObs.temp_f,
					sky = currObs.weather;
				$("#space").html("<p>" + location + "<br />" + tempF + "<br />" + sky + "</p>");
				$(".redGreen").attr("id", "greenRed");
				lTO(tempsForDOM, tempF);
			}

		}	
	};

	$("#grabInfo").on("click", function (){myXMLReq();});

	//we have 0 - 17 divs in the thermometer, with 17 being the base.....
	//11 is where 60 degrees is, 12 is 55, and 10 is 65....
	//make an object literal, dick......

	tempsForDOM = {
		110 : 0, 105 : 1, 100 : 2, 95 : 3, 90 : 4, 85 : 5, 80 : 6, 75 : 7, 70 : 8, 65 : 9, 60 : 10, 55 : 11, 50 : 12, 45 : 13, 40 : 14, 35 : 15, 30 : 16
	}

	let lTO = function (obj, num) {
		for (key in obj){
			console.log(key);
			console.log(obj[key]);
			console.log(obj);
			let keyNum = key;
			let myObjKey = obj[key];
			console.log(myObjKey + "result from myObjKey");
			if (keyNum < num) {
				console.log("This key is greater than num " + key)
				console.log("Here is the val " + obj[key])
				$(".temperature")[myObjKey].className += " redClass";
			}
		}
};

// lTO(tempsForDOM, 2);









});



