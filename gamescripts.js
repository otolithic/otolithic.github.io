
	
	$(document).ready(function(){
		  var randocolor = [Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)];
		var hexcolor = "#";
		for (x = 0; x < randocolor.length; x++) {
		var hex = randocolor[x].toString(16);
		if (hex.length == 1) {
			hex = "0" + hex;	
		}
		hexcolor = hexcolor.concat(hex);
	}
	$("#colorname").text(hexcolor);	
	$("#colorbox").css("background-color", hexcolor);
	})