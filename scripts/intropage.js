var introText;

$.get('scripts/introduction.txt', function (response){
    introText = response;
});

function DisplayIntroPage(){
    d3.select('#splashSection').append('div')
        .classed('shoppinglistContainer', true)
        .classed('flexContainer', true)
        .classed('row', true)
        .attr('id', 'introduction')
        .attr("onClick", "");

    const listDiv = d3.select("#introduction").append('div');
    listDiv
        .style("background-color", "black")
        .style("height", "70vh")
        .style("border-radius", "20px")
        .style("border", "solid gray")
        .style("padding", "2em")
        .style("margin", "0 20vw")
        .style("align-self", "center");
    const container = listDiv.append('div');

    container
        .style("height", "100%")
        .style("display", "flex")
        .style("flex-flow", "column")
        .style("justify-content", "space-between");
    container.append('div').node().innerHTML = introText;
    container.append('button')
        .attr("onClick",
        	"playPause(d3.select('#prologueVid').node(), 2000);d3.select('#introduction').style('display','none');")
        .text("Continue");  
}