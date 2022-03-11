const lightBlue = "#59A5DB";
const darkBlue = "#005A9C";
var transitionModifier = 2;
var groceryLocation = "aldi";
const nav = d3.select("#tutorialNavigation");
assignButton(nav.select("#button1"));
assignButton(nav.select("#button2"));
// assignButton(nav.select("#button3"));
// assignButton(nav.select("#button4"));
// assignButton(nav.select("#button5"));

nav.select("#button1")
	.style("fill-opacity", "1")
	.attr("ison", "true");
nav.select("#button2")
	.style("fill", lightBlue)
	.style("fill-opacity", "1");

var page1, page2, page3, page4, page5;

$.get('html/shopping-tutorial-page01.txt', function (response){
    page1 = response;
    
});
$.get('html/shopping-tutorial-page02.txt', function (response){
    page2 = response;
});
$.get('html/shopping-tutorial-page03.txt', function (response){
    page3 = response;
});
$.get('html/shopping-tutorial-page04.txt', function (response){
    page4 = response;
});
$.get('html/shopping-tutorial-page05.txt', function (response){
    page5 = response;
});

d3.selectAll(".subContainer")
	.transition()
	.duration(10)
	.style("left", "0vw");

function StartShoppingSpree(glocation) {
	const s = transitionSpeed * transitionModifier;

	groceryLocation = glocation;
	//change background based on location
	d3.select('#Ch1-Sct2')
		.style("background-image", "url(images/exterior-" + groceryLocation + ".png)");

	d3.select("#MapToGrocerySection").select(".subContainer")
		.transition()
		.duration(s)
		.style("left", "-100vw");

	PopulateTutorialPage('button1');	
}


function assignButton(button){
    button
        .on("mouseover", function(){
            if (d3.select(this).attr("ison") == "false"){
                d3.select(this)
                    .style("fill-opacity", "1")
                    .style("cursor", "pointer");
            }
        })
        .on("mouseout", function(){
            if (d3.select(this).attr("ison") == "false"){
                d3.select(this)
                    .style("fill-opacity", "0")
                    .style("cursor", "default");
            }
        })
        .on("click", function(e){
            nav.selectAll("use")
                .attr("ison", "false")
                .style("fill-opacity", "0")
                .style("fill", "white");
            d3.select(this)
                .style("fill-opacity", "1")
                .attr("ison", "true"); 
            PopulateTutorialPage(d3.select(this).attr("id"));
            if (d3.select(this).attr("id") == "button2"){
            	d3.select('shoppingspreeicons').select('ul').selectAll('li').style("background-color", "unset");
            	//activate shopping list (if inactive)
            	d3.select("#icon-list")
            		.style("display", "block")
            		.style("background-color", "green");
            	assignButton(nav.select("#button3"));
            }
            else if (d3.select(this).attr("id") == "button3"){
            	assignButton(nav.select("#button4"));
            }
            else if (d3.select(this).attr("id") == "button4"){
            	d3.select('shoppingspreeicons').select('ul').selectAll('li').style("background-color", "unset");
            	//activate time remaining icon
            	d3.select("#icon-time").style("display", "block")
            		.style("background-color", "green");
            	assignButton(nav.select("#button5"));
            }
            else if (d3.select(this).attr("id") == "button5"){
            	d3.select('shoppingspreeicons').select('ul').selectAll('li').style("background-color", "unset");
            	//activate checkout icon        
            	d3.select("#icon-checkout").style("display", "block")
            		.style("background-color", "green");
            }
        });
}

function PopulateTutorialPage (page){
	var p;
	var flavortext;
	
	if (groceryLocation == "gasstation"){
		flavortext = "There's a big pyramid of water bottles clogging the entrance. The smell of warm rotating hot dogs and gasoline permeate every corner of this store."
	} else if (groceryLocation == "cornerstore") {
		flavortext = "Seasonal items from the front aisle have spilled onto the floor. You hear a rhytmic beeping as the store's only cashier scans a steady flow of purchases."
	} else if (groceryLocation == "aldi"){
		flavortext = "Cheery, decorative homeware fills the entrance of this store. An over head speaker crackles on to announce that \"At Fresh Market every dollar adds up to real nutritional value!\""
	}
	switch (page){
        case 'button1':
        	p = page1;
            break;
        case 'button2':
        	p = page2;
            break;
        case 'button3':
        	p = page3;
            break;
        case 'button4':
        	p = page4;
            break;
        case 'button5':
        	p = page5;
            break;
        default:
        	p = "Error";
        	break;
    }
	d3.select(".shoppingspree-subcontainer")
		.html(p);
	if (page == "button1")
		d3.select("#flavortext").html(flavortext);
}

function StartSpree(){
	//slide in the newest panel, slide out the old, disable the first?
	d3.select("#MapToGrocerySection").select(".subContainer")
		.transition()
		.duration(transitionSpeed * transitionModifier)
		.style("left", "-200vw");

	//change background based on location
	d3.select('#Ch1-Sct2')
		.style(
			"background-image",
			"url(images/interior-" + groceryLocation + ".png)");
	AddTime();
	AddTime();
	AddTime();
}

function ClickedItem (element){
	var copy = document.getElementById(id).innerHTML;
}
//display "After about [10, 20, 30 minutes depending on location], you've bought what items you 
//		could find from your list. Only need something for breakfast, toothpaste,
//		the kids asked for something sweet to drink."

//display full list with last three things. Click on one and go to aisle (dock time)

//display choices. click on choice to see info (dock time). click on list (dock time). click on 'add item' (dock time)

//add item returns user to list. links back to display choices.

//on third item, user is prompted to buy item for science fair.

//display check out. items display one at a time???? god that seems annoying.
//anyway, regardless you have spent too much and have to return at least one item.