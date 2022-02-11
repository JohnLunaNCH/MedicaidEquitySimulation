var items;
var isGroceryStore = false;
var totalCost = 0;
var totalEnergy = 0;
var totalHealth = 0;
var totalMood = 0;

//assign JSON data to global variable
d3.json("json/items.json", function(data) {
	items = data;
	//console.log(items);
});

function toggleLocation (){
	isGroceryStore = !isGroceryStore;
	displayTotals();
}

function addPurchase (item){
	for (var i = 0; i < items.length; i ++){
		if (items[i].item == item){
			totalCost += (isGroceryStore) ? items[i].GrocerySTorePrice : items[i].GasStationPrice;
			totalEnergy += items[i].energy;
			totalHealth += items[i].tooth;
			totalMood += items[i].mood;
			d3.select("#itemDescription").text(items[i].Description);
		}
	}	
	displayTotals();
}

function removePurchase (item){
	for (var i = 0; i < items.length; i ++){
		if (items[i].item == item){
			totalCost -= (isGroceryStore) ? items[i].GrocerySTorePrice : items[i].GasStationPrice;
			totalEnergy -= items[i].energy;
			totalHealth -= items[i].tooth;
			totalMood -= items[i].mood;
		}
	}
	displayTotals();
}

function populateAisle (aisle){
	var aisleId = "#" + aisle + "Aisle";
	d3.select(aisleId).selectAll("div").remove();
	for (var i = 0; i < items.length; i ++){
		if (items[i].aisle == aisle){
			var element = d3.select(aisleId).insert("div");
			element.attr("class","aisleItem");
			element.attr("id",items[i].item);
			element.html("Purchase: <button onClick=\"addPurchase(\'"+ items[i].item +"\')\">" + items[i].item + "</button></br>Description: "+items[i].Description);
		}
	}
	displayTotals();
}

function displayTotals(){
	var element = d3.select("#purchasingTotals");
	element.text(
		"Location = " + ((isGroceryStore) ? "Grocery Store" : "Gas Station") +
		", Price = " + totalCost + 
		", Energy = " + totalEnergy + 
		", Tooth Health = " + totalHealth + 
		", Mood = " + totalMood
		);
}

