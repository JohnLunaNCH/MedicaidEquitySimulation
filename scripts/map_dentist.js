var isOn = false;
var text = d3.select("#MapSection").select(".clickedText");
var innerText = d3.select("#MapSection").select(".innerText");
var box = d3.select("#MapSection").select(".map-dentist");
var description = d3.select("#MapSection").select(".description");


box.transition().duration(1000).style("width", "500px");


text.style("width", "0%");
description.style("width", "500px");
box.style("width", "500px");
innerText.html("No button clicked");

var toggleClicked = false;

d3.select("#MapSection").selectAll("#svg-location")
    .on("mouseover", function(){
        
    })
    .on("mouseout", function(){
        
    })
    .on("click", function(){

        if (!isOn){
            description
                .transition()
                .duration(1000)
                .style("width", "0px");
            box
                .transition()
                .duration(1000)
                .style("width", "300px");
            text
                .transition()
                .duration(1000)
                .style("width", "700px");        
            //if (d3.select(this).classed("test1"))
            //    innerText.html("Clicked Test 1");
            //if (d3.select(this).classed("test2"))
            //    innerText.html("Clicked Test 2");
            isOn = true;
            toggleClicked = true;
        }
        
    });

box.on("click", function(){
    
    if (isOn && !toggleClicked){
        description
            .transition()
            .duration(1000)
            .style("width", "500px");
        box
            .transition()
            .duration(1000)
            .style("width", "500px");
        text
            .transition()
            .duration(1000)
            .style("width", "0px");
        isOn = false;
    }
    toggleClicked = false;
});

//load the map icons
d3.xml("images/mapIcon_star.svg")
    .then(data => {
        d3.selectAll("#svg-location")
            .nodes().forEach (n => {
                n.append(data.documentElement.cloneNode(true));
            })
        d3.selectAll("#svg-location")

    });