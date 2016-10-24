	var randocolor1 =[Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)];
	var randocolor2 =[Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)];		
	var middlecolor = [0,0,0];

$(document).ready(function(){
	//generate rgb values	

	
	var MIN_DIFFERENCE = 20;
		
	//prevent too similar colors		
	for (x = 0; x < randocolor1.length; x++) {
		if (Math.abs(randocolor1[x] - randocolor2[x]) < MIN_DIFFERENCE)
			randocolor1[x] = Math.floor(Math.random()*256);		
	}
	
	for (x = 0; x < middlecolor.length; x++) {
		co = (randocolor1[x]-randocolor2[x])/2 + randocolor2[x];
		co = Math.abs(Math.floor(co));
		middlecolor[x] = co;	
	}
			
	var hexcolor = ["#", "#", "#"];
	//convert these rgb values to hex. [0] and [1] are the two colors and [2] is between them
	for (x = 0; x < randocolor1.length; x++) {
		var hex = [randocolor1[x].toString(16), randocolor2[x].toString(16), middlecolor[x].toString(16)];		
		
		for (y = 0; y < hex.length; y++) {
			if (hex[y].length == 1) {
				hex[y] = "0" + hex[y];	
			}
		}
		
		for (z = 0; z < hexcolor.length; z++) {
			hexcolor[z] = hexcolor[z].concat(hex[z]);		
		}
	}
		
	
	//populate the hex names and colors generated	
	$("#colorname1").text(hexcolor[0]);
	$("#colorname2").text(hexcolor[1]);	
	$("#colorbox1").css("background-color", hexcolor[0]);
	$("#colorbox2").css("background-color", hexcolor[1]);
	
	
	//set sliders to 0
	var form = document.getElementById("colorpicker");
	form.elements["red"].value = 0;
	form.elements["green"].value = 0;
	form.elements["blue"].value = 0;
})

function getHexColor(r, g, b) {
	var guesshex= "#";
	var hex = 0;
	guess = [r, g, b];
	
	for (x = 0; x< guess.length; x++) {
		hex = (+guess[x]).toString(16);
		if (hex.length == 1)
			hex = "0" + hex;
		guesshex = guesshex.concat(hex);
	}	
	
	return guesshex;
}

function getRGB() {
	var form = document.getElementById("colorpicker");
	var red = form.elements["red"];
	var green = form.elements["green"];
	var blue = form.elements["blue"];

	var rgb = [red.value, green.value, blue.value];
	
	return rgb;
}

function updateColor() {
	var form = document.getElementById("colorpicker");
	var redvalue = form.elements["redvalue"];
	var greenvalue = form.elements["greenvalue"];
	var bluevalue = form.elements["bluevalue"];
	
	var out = form.elements["middlecolorname"];
	var rgb = getRGB();
	
	redvalue.value = rgb[0];
	greenvalue.value = rgb[1];
	bluevalue.value = rgb[2];	
	hexcolor = getHexColor(rgb[0],rgb[1],rgb[2]);
	
	document.getElementById("colorboxmiddle").style.backgroundColor=hexcolor;	
	
	out.value = hexcolor;
}

function displayResults() {
	// display the actual middle color and its hex ID
	var rgb = getRGB();
	var answer = getHexColor(middlecolor[0],middlecolor[1],middlecolor[2]);
	var guess = getHexColor(rgb[0],rgb[1],rgb[2]);
	var resultText = document.getElementById("resultText");
	var resultColor = document.getElementById("resultColor");
	var scoreText = document.getElementById("scoreText");
	var score = document.getElementById("score");
	
	resultText.style.display = "block";
	resultText.innerHTML = "The correct answer was " + answer + ".";
	resultColor.style.display = "inline-block";
	resultColor.style.backgroundColor = answer;
	
	scoreText.style.display = "block";
	scoreText.innerHTML = "You guessed " + guess + ". Your score is: ";
	score.style.display = "block";	
	score.innerHTML = calcScore(middlecolor, rgb);
	
	
	// calculate and display the player's score based on their guess
}

function calcScore(actual, guess) {
	var sumSquares = 0;
	for (x = 0; x<actual.length; x++) {
		sumSquares += Math.pow(actual[x]-guess[x], 2);	
	}
	
	return Math.round(Math.sqrt(sumSquares));
}
	