var items;
var isGroceryStore = false;
var totalCost = 0;
var totalEnergy = 0;
var totalHealth = 0;
var totalMood = 0;

var targetBudget = 10;
var timeElapsed = 0;
const maxTime = 10;

function AddTime(){
	timeElapsed ++;
	const minutesPassed = timeElapsed * 5;
	const hours = Math.floor(minutesPassed / 60);
	const minutes = minutesPassed - (hours * 60); 
	d3.select("#timeremaing").text(hours + "hr and " + minutes + "min have passed");
	if (timeElapsed > maxTime){
		OutOfTime();
	}
}

//assign JSON data to global variable
(async function() {
	  try {
	    const jsonresponse = await d3.json("json/items.json");
	    items = jsonresponse;
	  } catch(error) {
	    console.log(error);
	  }
	})();

function DisplayShoppingList()
{
	d3.select('#shoppinglist').style('display', 'flex');
	//check if each category has an "isPurchased" item, if so, enable strike through
}

function AddPurchase (item){
	for (var i = 0; i < items.length; i ++){
		if (items[i].Name == item){
			items[i].isPurchased = 1;
			totalCost += (isGroceryStore) ? items[i].GrocerySTorePrice : items[i].GasStationPrice;
			totalEnergy += items[i].energy;
			totalHealth += items[i].tooth;
			totalMood += items[i].mood;
			d3.select("#itemDescription").text(items[i].Description);
		}
	}	
	//displayTotals();
}

function RemovePurchase (item){
	for (var i = 0; i < items.length; i ++){
		if (items[i].Name == item){
			items[i].isPurchased = 0;
			totalCost -= (isGroceryStore) ? items[i].GrocerySTorePrice : items[i].GasStationPrice;
			totalEnergy -= items[i].energy;
			totalHealth -= items[i].tooth;
			totalMood -= items[i].mood;
		}
	}
	displayTotals();
}

function SwapButton(element){
	var item = element.attr("item");
	if (element.node().innerHTML == "Add Item"){
		element			
			.attr("onClick", "RemovePurchase(\"" + item + "\"); SwapButton(d3.select(this));")
			.classed("selectedButton", true)
			.node().innerHTML = "Remove";
	} else {
		element
			.attr("onClick", "AddPurchase(\""+ item +"\"); SwapButton(d3.select(this));")
			.classed("selectedButton", false)
			.node().innerHTML = "Add Item";
	}
	AddTime();
}

function PopulateAisle (aisletype){
	var itemID = 1;
	var aisle = d3.select("#aisle");
	var isAldi = (groceryLocation =="aldi");
	console.log("Grocery Location = " + groceryLocation);
	aisle.selectAll(".aisleItem").selectAll("div").remove();
	d3.select("#shoppingexplanation").selectAll('*').remove();
	d3.select("#shoppingexplanation").node().innerHTML = "<h1>" + aisletype + "</h1>"
	AddTime();

	//add the items
	for (var i = 0; i < items.length; i ++){
		if (items[i].Category == aisletype){
			var addItem = false;

			//check if the item has a price depending on the current store
			if (isAldi)
				addItem = (items[i].GroceryStorePrice > 0);
			else
				addItem = (items[i].GasStationPrice > 0);

			//if the item does have a price, add it to the list and increment #
			if (addItem){				
				const iconLocation = "images/icon-" + items[i].Icon + ".png";
				var element = aisle.select("#aisleButton0" + itemID);
				element
					.style("display", "block")
					.html(
						"<div>"
						+ ((items[i].isPurchased > 0)
							? "<button class='selectedButton' item='" + items[i].Name + "' onClick='RemovePurchase(\"" + items[i].Name +"\"); SwapButton(d3.select(this));' style='float: right;margin: 0 0 0 2em;'>Remove</button>"
							: "<button item='" + items[i].Name + "' onClick='AddPurchase(\"" + items[i].Name +"\"); SwapButton(d3.select(this));' style='float: right;margin: 0 0 0 2em;'>Add Item</button>" )
						+"<div style='float: right; height: 3em;'><img style='height: 100%;' src='" + iconLocation + "'></div>"
						+ "<h1>" + items[i].Name +"</h1>"
						+ "<p>"
						+ formatter.format((isAldi) ? items[i].GroceryStorePrice : items[i].GasStationPrice)
						+ "</p></div>");
				itemID++;
 		}
		}
	}

	for (itemID; itemID < 9; itemID++){
		aisle.select("#aisleButton0" + itemID)
					.style("display", "none");
	}
	displayTotals();
}

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});

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

function OutOfTime(){
	DisplayShoppingList();
	d3.select("#shoppinglist").attr("onClick", "");
	const listDiv = d3.select("#shoppinglist").select('div');
	listDiv.node().innerHTML = "";
	listDiv
		.style("background-color", "black")
		.style("height", "70vh")
		.style("border-radius", "20px")
		.style("border", "solid gray")
		.style("padding", "1em");
	const container = listDiv.append('div');
	container
		.style("height", "100%")
		.style("display", "flex")
		.style("flex-flow", "column")
		.style("justify-content", "space-between");
	container.append('div').style("padding", "1em 0 0 0").text("You're running out of time. You have to head to the cashier now.");
	container.append('button').text("Continue").attr("onClick", "PreCheckOut();");	
}

function PreCheckOut(){
	DisplayShoppingList();
	d3.select("#shoppinglist").attr("onClick", "");
	const listDiv = d3.select("#shoppinglist").select('div');
	listDiv.node().innerHTML = "";
	listDiv
		.style("background-color", "black")
		.style("height", "70vh")
		.style("border-radius", "20px")
		.style("border", "solid gray")
		.style("padding", "1em");
	const container = listDiv.append('div');
	container
		.style("height", "100%")
		.style("display", "flex")
		.style("flex-flow", "column")
		.style("justify-content", "space-between");
	container.append('div').style("padding", "1em 0 0 0").text("Don't forget Mia's science fair project. You need to pick up some tin foil.");
	container.append('div').text("Name Brand Foil, 25sqft - $1.98")
		.append('button')
			.attr("onClick", "AddPurchase(\"Name Brand Foil\"); OverBudget();")
			.classed("checkoutbutton", true)
			.text("Add");
	container.append('div').text("Name Brand Heavy Duty Foil, 50sqft - $4.68")
		.append('button')
			.attr("onClick", "AddPurchase(\"Name Brand Heavy Duty Foil\"); OverBudget();")
			.classed("checkoutbutton", true)
			.text("Add");
	container.append('div').text("Generic Tin Foil, 25sqft - $1.28")
		.append('button')
			.attr("onClick", "AddPurchase(\"Generic Tin Foil\"); OverBudget();")
			.classed("checkoutbutton", true)
			.text("Add");
	//container.append('button').text("Continue").attr("onClick", "OverBudget();");	
}

function OverBudget(){
	const listDiv = d3.select("#shoppinglist").select('div');
	listDiv.node().innerHTML = "";
	listDiv
		.style("background-color", "black")
		.style("height", "70vh")
		.style("border-radius", "20px")
		.style("border", "solid gray")
		.style("padding", "1em");
	const container = listDiv.append('div');
	container
		.style("height", "100%")
		.style("display", "flex")
		.style("flex-flow", "column")
		.style("justify-content", "space-between");
	
	// add up purchases
	var isAldi = (groceryLocation =="aldi");
	var totalPrice = 0;
	for (var i = 0; i < items.length; i ++){
		if (items[i].isPurchased > 0){
				totalPrice += Number((isAldi) ? items[i].GroceryStorePrice : items[i].GasStationPrice);
		}
	}
	//calculate targetBudget (the "- 5" is what will need to modify based on the lowest possible budget)
	targetBudget = Math.floor((totalPrice - 5)/5) * 5;
	targetBudget += Math.random();

	container.append('div').style("padding", "1em 0 0 0").text("You pick up your last item and arrive at the checkout lane. The cashier rings up your items and the total displays:");
	container.append('div').text(formatter.format(totalPrice));
	container.append('div').text("You fish out your debit card and swipe it at the machine. The machine says PROCESSING for what feels like an eternity before finally reporting");
	container.append('div').text("DECLINED");
	container.append('div').text("You can feel the blood rush to your face as you pull out what cash you have in your pockets, " + formatter.format(targetBudget) + ".");
	container.append('div').text("You'll have to ask the cashier to remove some items from your purchase.");
	container.append('button').text("Continue").attr("onClick", "CheckOut(); d3.select('#shoppinglist').style('display','none');");		
}

function CheckOut(){
	var isAldi = (groceryLocation =="aldi");
	d3.select("#aisle").style("display", "none");
	d3.select("#shoppingexplanation").node().innerHTML = "<h1>" + "Shopping Cart" + "</h1>";
	

	if (d3.select("#CheckoutList").size() > 0){
		d3.select("#CheckoutList").node().innerHTML = "";
	} else	{
		d3.select("#storeContainer")
			.style("padding", "0");
			.style("display", "flex")
			.style("flex-flow", "column")
			.append("div").attr("id", "CheckoutList").attr("class", "checkoutlistcontainer");
	}
	var checkoutlist = d3.select("#CheckoutList");
	checkoutlist.style("overflow-y", "auto").style("height", "47vh");
	var totalPrice = 0;
	var colorvalue = 0;
	var color = "";
	for (var i = 0; i < items.length; i ++){
		if (items[i].isPurchased > 0){
			color = "rgba(" + colorvalue.toString() + ", " + colorvalue.toString() + ", " + colorvalue.toString() + ", 0.5)";
			var p = checkoutlist.append("div")
					.classed("flexContainer", true)
					.classed("row", true)
					.style("align-items", "center")
					.style("background-color", color)
					.style("padding", "0.5em 2em");
			p.append("div").text(" " + items[i].Name + "");
			p.append("div")
				.classed("checkoutprice", true)
				.text(formatter.format((isAldi) ? items[i].GroceryStorePrice : items[i].GasStationPrice));
			p.append("button")
				.attr("class", "selectedButton")
				.attr("onClick", "RemovePurchase(\"" + items[i].Name +"\"); CheckOut();")
				.classed("checkoutbutton", true)
				.text("Remove");
				totalPrice += Number((isAldi) ? items[i].GroceryStorePrice : items[i].GasStationPrice);

			if (colorvalue > 0){
				colorvalue = 0;
			}
			else{
				colorvalue = 20;
			}
		}
	}
	var totalContainer;
	if (d3.select("#totalContainer").size() > 0){
		totalContainer = d3.select("#totalContainer");
		totalContainer.node().innerHTML = "";
	} else	{
		totalContainer = d3.select("#storeContainer").append("div")
													.attr("id","totalContainer")
													.classed("checkoutlistcontainer", true)
													.style("align-self", "center");
	}
	var tcRow = totalContainer.append("div");
	tcRow.classed("flexContainer", true).classed("row", true);
	tcRow.append("strong").text("Total").style("color", (totalPrice < targetBudget) ? "white" : "red");
	tcRow.append("strong")
		.style("flex", "1 0 auto")
		.style("text-align", "right")
		.style("color", (totalPrice < targetBudget || totalPrice == targetBudget) ? "white" : "red")
		.text(formatter.format(totalPrice));
	if (totalPrice < targetBudget || totalPrice == targetBudget){
		d3.selectAll(".checkoutbutton")
			.style("style", "none");
		totalContainer.append("button")
			.text("Pay")
			.attr("onClick", "ShoppingReview()")
			.style("float", "right")
			.style("margin", "0 0 1em 0");
	}
}

function ShoppingReview(){
	d3.select('shoppingspreeicons').style('display', 'none');
	var c = d3.select("#storeContainer");
	c.node().innerHTML = "";
	c.append('div')
		.style("flex", "1 1 auto")
		.style("align-self", "center")
		.style("display", "flex")
		.append('div')
			.style('align-self', 'center')
			.text("You bought some things, left some things behind (including a few shreds of your dignity), and made your way back home.");
	c.append('div')
		.style('display', 'flex')
		.style('justify-content', 'end')
		.style('height', '4em')
		.append('button')
			.text("Continue")
			.attr("onClick", "addHeight(this)");
}