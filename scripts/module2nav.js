//this
function Module2Next(){
	var container = d3.select("#midSection");
	container
		.style("justify-content", "space-evenly")
		.classed("column", true)
		.node().innerHTML = "";
	var scaleCont = container.append('div').attr('id', 'scaleContainer').classed("alignCenter", true).style("text-align", "center");
		scaleCont.append('div').text("The thing that asks the question that the user chooses from the scale thing.").classed("alignCenter", true);
		scaleCont.append('div').text("----the scale----").classed("alignCenter", true);
	container.append('div').classed("alignCenter", true).append('div').classed("confirmChoiceButton", true).text("Continue");
}