function updateOutput() {
	var form = document.getElementById("lattecalc");
	var out = form.elements["time"];
	var grams = form.elements["grams"].value / 1.0002;
	var temp = 0;
	var temps = new Array();
	temps["room"] = 26;
	temps["fridge"] = 4;
	temps["other"] = parseInt(form.elements["othertemp"].value);
	
	var selectedTemp = form.elements["temp"];
	for(var x = 0; x < selectedTemp.length; x++) {
		if(selectedTemp[x].checked) {
			temp = temps[selectedTemp[x].value];
			break;
		}	
	}	
		
	var watts = form.elements["watts"].value; // J/s
	var specificHeatofMilk = 3.77; // whole milk, J/gK
	var foamTemp = 68; // C
	
	if (grams <=0) {
		out.value = new CalcException("You can't have negative milk");	
	}
	else {
		var tempDiff = foamTemp - temp;
		var joules = tempDiff * grams * specificHeatofMilk;
		var time = joules / watts;	
		if (temp >= 65 && temp <= 68) {
			out.value = new CalcException("Your milk is pretty much ready to froth!");		
		}
		else if (isNaN(time)) {
			out.value = new CalcException("Please use actual numbers, smartass");		
		}
		else if (time <= 3) {
			out.value = new CalcException("Sorry, don't use a microwave for this one. It would take less than 3 seconds.");		
		}
		else if (temp <= -273) {
			out.value = new CalcException("It appears you've found a way to cool milk to or below absolute zero. Bravo.")		
		}
		else if (temp >= 76) {
			out.value = new CalcException("Uh oh, your milk may be too hot to froth.");		
		}
		else if (watts <= 0) {
			out.value = new CalcException("I doubt you have a negative watt microwave.");		
		}
		else if (time >= 60) {
			if (time >= 3600) {
				out.value="That's ridiculous, you would need to microwave that milk for over an hour.";			
			}
			else {
				out.value="Microwave your milk for about " + Math.floor(time/60) + " minutes and " + Math.floor(time%60) + " seconds!";		
			}		
		}
		else {
			out.value="Microwave your milk for about " + Math.floor(time) + " seconds!";
		}
	}
}

function CalcException(message) {
	this.message=message;
	this.toString = function(){return this.message;};
}