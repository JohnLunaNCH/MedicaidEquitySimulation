var titleSection = d3.select("#titleSection");
var midSection = d3.select("#midSection");
var bottomSection = d3.select("#bottomSection");

var m2_type1;
$.get('html/m2_type1.txt', function (response){
    m2_type1 = response;
});
var m2_type2;
$.get('html/m2_type2.txt', function (response){
    m2_type2 = response;
});
var m2_type3;
$.get('html/m2_type3.txt', function (response){
    m2_type3 = response;
    Sect1();
});

function Module2Next(){
	//select and clear the midSection
	var container = midSection;
	container
		.style("justify-content", "space-evenly")
		.classed("column", true)
		.node().innerHTML = "";

	var scaleCont = container.append('div').attr('id', 'scaleContainer').classed("alignCenter", true).style("text-align", "center");
		scaleCont.append('div').text("The thing that asks the question that the user chooses from the scale thing.").classed("alignCenter", true);
		scaleCont.append('div').text("----the scale----").classed("alignCenter", true);
	container.append('div').classed("alignCenter", true).append('div').classed("confirmChoiceButton", true).text("Continue");
}

function Sect1(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_type3;
	midSection.select("#narrationContainer").text("Please pay attention to how the dentist introduces the HPV vaccine and the communication techniques used to enhance health literacy.");
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').attr("onClick", "Sect2()");
}

function Sect2(){

}

function ClearSection(container){
	container.node().innerHTML = "";	
}

