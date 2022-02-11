//Global Variables and their default values
var energy = 1;
var mood = 1;
var tooth = 1;
var money = 1;

// Global stat displays so we can set and forget
var energy_display;
var mood_display;
var tooth_display;
var money_display;

//This initializes the stats, displays, and checks for cookies
function setVariables(){
	//find the elements used to display the stats
	energy_display = document.getElementById("energy");
	mood_display = document.getElementById("mood");
	tooth_display = document.getElementById("tooth");
	money_display = document.getElementById("money");
	
	//assign cookies to temporary variables
	let cEnergy = Number(getCookie("energy"));
	let cMood = Number(getCookie("mood"));
	let cTooth = Number(getCookie("tooth"));
	let cMoney = Number(getCookie("money"));
	
	//check if cookies have values and assign them to the global variables
	if (cEnergy != "")
		energy = cEnergy;
	if (cMood !="")
		mood = cMood;
	if (cTooth != "")
		tooth = cTooth;
	if (cMoney != "")
		money = cMoney;
	
	updateStatDisplay();
}

//functions to adjust stats BY an amount (uses operators, as in "-2" or "+5")
function adjustEnergy (amount){
	energy += amount;
	setCookie("energy",energy,1);
	updateStatDisplay();
}
function adjustMood (amount){
	mood += amount;
	setCookie("mood",mood,1);
	updateStatDisplay();
}
function adjustTooth (amount){
	tooth += amount;
	setCookie("tooth",tooth,1);
	updateStatDisplay();
}
function adjustMoney (amount){
	money += amount;
	setCookie("money",money,1);
	updateStatDisplay();
}

//functions to set stats TO an amount (does not use operators)
function setEnergy (amount){
	energy = amount;
	setCookie("energy",energy,1);
	updateStatDisplay();
}
function setMood (amount){
	mood = amount;
	setCookie("mood",mood,1);
	updateStatDisplay();
}
function setTooth (amount){
	tooth = amount;
	setCookie("tooth",tooth,1);
	updateStatDisplay();
}
function setMoney (amount){
	money = amount;
	setCookie("money",money,1);
	updateStatDisplay();
}

function updateStatDisplay(){
	//this is where the complicated stuff will get triggered to change the display of the stats
	
	//energy
	energy_display.textContent = "" + energy;
	//mood
	mood_display.textContent = "" + mood;
	//tooth
	tooth_display.textContent = "" + tooth;
	//money
	money_display.textContent = "" + money;
}