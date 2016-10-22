$(document).ready(function(){
	//generate rgb values	
	var randocolor1 =[Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)];
	var randocolor2 =[Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)];		
	var middlecolor = [0,0,0];
	
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
	
	//display the hex names and colors generated	
	$("#colorname").text(hexcolor[0] + " " + hexcolor[2] + " " + hexcolor[1]);	
	$("#colorbox1").css("background-color", hexcolor[0]);
	$("#colorboxmiddle").css("background-color", hexcolor[2]);
	$("#colorbox2").css("background-color", hexcolor[1]);
})