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
	
	var tempDiff = foamTemp - temp;
	var joules = tempDiff * grams * specificHeatofMilk;
	var time = joules / watts;
		
	
	out.value="Microwave your milk for about " + Math.floor(time) + " seconds.";
}