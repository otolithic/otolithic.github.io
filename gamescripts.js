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
	
	
	
})

function updateColor() {
	var form = document.getElementById("colorpicker");
	var red = form.elements["red"];
	var green = form.elements["green"];
	var blue = form.elements["blue"];
	var redvalue = form.elements["redvalue"];
	var greenvalue = form.elements["greenvalue"];
	var bluevalue = form.elements["bluevalue"];
	var guess = [0, 0, 0];	
	
	var out = form.elements["middlecolorname"];
	
	
	redvalue.value = red.value;
	greenvalue.value = green.value;
	bluevalue.value = blue.value;	
	guess = [red.value, green.value, blue.value];
	var guesshex = "#";	
	
	for (x = 0; x< guess.length; x++) {
		var hex = (+guess[x]).toString(16);
		if (hex.length == 1)
			hex = "0" + hex;
		guesshex = guesshex.concat(hex);
	}	
	
	document.getElementById("colorboxmiddle").style.backgroundColor=guesshex;	
	
	out.value = guesshex;
}
	