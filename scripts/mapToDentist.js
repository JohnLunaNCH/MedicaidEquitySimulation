let MapTarget = class {
            button;
            highlight;
            path;
            html;
            constructor(){
               
            }
        }

let location1  = new MapTarget(), 
    location2 = new MapTarget(),
    location3 = new MapTarget(),
    location4 = new MapTarget();
    location5 = new MapTarget();

var 
    handleZoom_mtd = (e) => d3.select("#MapToDentist").attr('transform', e.transform);

var 
    zoom_mtd = d3.zoom()
        .scaleExtent([0.5, 5])
        .translateExtent([[0, 0], [1, 1]])
        .on('zoom', handleZoom_mtd);

var dentistContainer, dentistTransform;

var descriptionDisplay;

var videoHtml;
$.get('scripts/location1.txt', function (response){
    videoHtml = response;
    SetUpMapToDentist();
});

function SetUpMapToDentist(){
    d3.xml("images/dentist-mapmask.svg")
        .then(data => {
            //insert the svg code
            d3.select("#MapToDentist")
                .node().append(data.documentElement);

            //assign the container and main transform
            dentistContainer = d3.select("#MapToDentist").select('svg');
            dentistTransform = dentistContainer.select('#map');

            //fix the illustrator file
            dentistTransform.selectAll('image')
                .attr("xlink:href", function() {
                    return "images/" + d3.select(this).attr("xlink:href");
                });
            dentistContainer.style("height", "100%");
            dentistContainer.style("border-radius", "0 20px 20px 0");
            d3.select("#dentist-description")
                .style("display", "none");
            
            //asign path groups to their variables
            dentistTransform.selectAll('g')
                .each(function (){
                    var id = d3.select(this).attr("id");
                    switch (id){
                        case 'location1-paths':
                            location1.path = d3.select(this);
                            break;
                        case 'location2-paths':
                            location2.path = d3.select(this);
                            break;
                        case 'location3-paths':
                            location3.path = d3.select(this);
                            break;
                        case 'location4-paths':
                            location4.path = d3.select(this);
                            break;
                        case 'location5-paths':
                            location5.path = d3.select(this);
                            break;
                        default:
                            break;
                    }
                });
            //make the buttons functional
            dentistTransform.selectAll('use')
                .each(function (d, i) {
                    var id = d3.select(this).attr("id");
                   
                    switch (id){
                        case 'location1-highlight':
                            location1.highlight = d3.select(this);
                            break;
                        case 'location1':
                            location1.button = d3.select(this);
                            mapButtons_dentist(location1.button, id, location1.highlight, location1.path);
                            break;
                        case 'location2-highlight':
                            location2.highlight = d3.select(this);
                            break;
                        case 'location2':
                            location2.button = d3.select(this);
                            mapButtons_dentist(location2.button, id, location2.highlight, location2.path);
                            break;
                        case 'location3-highlight':
                            location3.highlight = d3.select(this);
                            break;
                        case 'location3':
                            location3.button = d3.select(this);
                            mapButtons_dentist(location3.button, id, location3.highlight, location3.path);
                            break;
                        case 'location4-highlight':
                            location4.highlight = d3.select(this);
                            break;
                        case 'location4':
                            location4.button = d3.select(this);
                            mapButtons_dentist(location4.button, id, location4.highlight, location4.path);
                            break;
                        case 'location5-highlight':
                            location5.highlight = d3.select(this);
                            break;
                        case 'location5':
                            location5.button = d3.select(this);
                            mapButtons_dentist(location5.button, id, location5.highlight, location5.path);
                            break;
                        default:
                            console.log("Uncaught element: " + id);
                            break;
                    }
                });

            const mapBackground = dentistTransform.select('#map-background-dentist');

            mapBackground
                .on("click", function(e){
                    ResetMap_dentist();
                });

            //find the offset of the transform in the svg
            var matrix = mapBackground.attr("transform").split(" ");
            const width = Number(mapBackground.attr('width'));
            const height = Number(mapBackground.attr('height'));
            const posX = Number(matrix[4]);
            const posY = Number(matrix[5].substring(0, matrix[5].length - 1));
            const maxX = width + posX;
            const maxY = height + posY;


            dentistTransform.attr("transform", "translate(0, 0) scale(1)");

            //set up the map movement
            initializeMap_dentist(posX, posY, maxX, maxY);
        });
}

function moveMap_dentist(scale, x, y){
    dentistContainer
        .transition()
        .duration(transitionSpeed)
        .call(
            zoom_mtd.transform,
            d3.zoomIdentity
                .scale(scale)
                .translate(x, y)
            );
}

function initializeMap_dentist(lowX, lowY, highX, highY){
    handleZoom_mtd = (e) => dentistTransform.attr('transform', e.transform);

    zoom_mtd = d3.zoom()
        .scaleExtent([0.8, 5])
        .translateExtent([[lowX, lowY], [highX, highY]])
        .on('zoom', handleZoom_mtd);
    
    dentistContainer.call(zoom_mtd);
    moveMap_dentist(1, 0, 0);     
}

var isClicked_dentist = false;

function mapButtons_dentist (button, id, highlight, path){
    button
        .on("mouseover", function(){
            if(!isClicked_dentist){
                highlight.style("display", "block")        
                path.style("display", "block"); 
                d3.select(this)
                .style("cursor", "pointer");
            }
        })
        .on("mouseout", function(){
            if(!isClicked_dentist){
                path.style("display", "none");
                highlight.style("display", "none");
                d3.select(this)
                .style("cursor", "default");
            }
        })
        .on("click", function(e) {
            clickedButton(e, path, highlight, id);
        });
    d3.select("#" + id)
        .on("mouseover", function(){
            if(!isClicked_dentist){
                highlight.style("display", "block");        
                path.style("display", "block"); 
            }
            d3.select(this)
                .style("cursor", "pointer");
        })
        .on("mouseout", function(){
            if(!isClicked_dentist){
                path.style("display", "none");
                highlight.style("display", "none");   
            }
            d3.select(this)
                .style("cursor", "default");
        })
        .on("click", function(e){
            clickedButton(e, path, highlight, id);            
        });
}

function mapButtons_dentist_disable (id){
    var mapthing;
    switch(id){
        case "location1":
            mapthing = location1;
            break;
        case "location2":
            mapthing = location2;
            break;
        case "location3":
            mapthing = location3;
            break;
        case "location4":
            mapthing = location4;
            break;
        case "location5":
            mapthing = location5;
            break;
    }
    mapthing.button
        .on("mouseover", function(){
            if(!isClicked_dentist){
                //highlight.style("display", "block")        
                //path.style("display", "block"); 
                //d3.select(this)
                //.style("cursor", "pointer");
            }
        })
        .on("mouseout", function(){
            if(!isClicked_dentist){
                mapthing.path.style("display", "none");
                mpathing.highlight.style("display", "none");
                d3.select(this)
                .style("cursor", "default");
            }
        })
        .on("click", function(e) {
            console.log("button disabled");
        });
    d3.select("#" + id)
        .on("mouseover", function(){
            if(!isClicked_dentist){
                //highlight.style("display", "block");        
                //path.style("display", "block"); 
            }
            //d3.select(this)
              //  .style("cursor", "pointer");
        })
        .on("mouseout", function(){
            if(!isClicked_dentist){
                mapthing.path.style("display", "none");
                mapthing.highlight.style("display", "none");   
            }
            d3.select(this)
                .style("cursor", "default");
        })
        .on("click", function(e){
            console.log("button disabled");            
        });
}

function clickedButton(e, path, highlight, id){
            isClicked_dentist = true;
            var copy = document.getElementById(id).innerHTML;

            d3.select("#dentist-description")
                .style("display", "flex")
                .html("<div class=\"dentist-list-item\">" + copy + "</div>" 
                    + videoHtml
                    );
            d3.select("#dentist-list-container")
                .style("display", "none");
            
            d3.select("#button-calldentist").attr("onClick", "CallDentist(\"" + String(id) + "\")");

            //disable all paths and enable the target path
            disableAllPaths_dentist();
            path.style("display", "block");
            highlight.style("display", "block");

            //animate map movement
            toggleMap_dentist(true, path.select('path'), e);
}

var numberofcalls = 0;
var foundDentist = false;

function CallDentist(location){
    //disable and mark dentist button
    var dentistNameNode = d3.select("#dentist-list-container").select("#"+location);
    var title = dentistNameNode.select(".dentistName").node().innerHTML;
    dentistNameNode.select(".dentistName").text("(called) " + title);
    dentistNameNode.style('background-color', 'rgba(150, 150, 150, 0.75)');
    mapButtons_dentist_disable(location);

    d3.select('#button-calldentist')
    .classed('selectedButton', true)
    .attr('onClick', ' ');

    d3.select('#button-dentistGoBack')
    .classed('selectedButton', true)
    .attr('onClick', ' ');
    
    numberofcalls ++;
    var answer = "-noanswer.mp4";
    if (numberofcalls > 3){
        //call dentist who will talk
        answer = "-answer.mp4";   
        if (location != 'location2'){
            foundDentist = true;
        }
    }
    const vidElement = d3.select('#callVid');
    if (foundDentist)
    {
        document.getElementById('callVid').addEventListener('ended',ConcludeSegment,false);
    } else {
        document.getElementById('callVid').addEventListener('ended', ReactivateGoBackButton,false);
    }
    vidElement.select('source').attr("src", "videos/" + location + answer);
    vidElement.node().load();
    vidElement.node().play();
}

function ReactivateGoBackButton(e){
    d3.select('#button-dentistGoBack')
        .classed('selectedButton', false)
        .attr('onClick', 'ResetMap_dentist()');
}

function ConcludeSegment(e){
    //display dentist call conclusion
    var section = d3.select("#MapToDentistSection");
    section.node().innerHTML = "";
    section.style('display', 'flex').style('justify-content', 'center').style('flex-flow', 'column');
    section.append('div')
        .style('display', 'flex')
        .style('justify-content', 'center')
        .append('button')
            .attr("onClick", "addHeight(this); changeStatsDentist();")
            .text("Continue");
}

function disableAllPaths_dentist (){
    location1.path.style("display", "none");
    location2.path.style("display", "none");
    location3.path.style("display", "none");
    location4.path.style("display", "none");
    location5.path.style("display", "none");
    location1.highlight.style("display", "none");
    location2.highlight.style("display", "none");
    location3.highlight.style("display", "none");
    location4.highlight.style("display", "none");
    location5.highlight.style("display", "none");
}

function toggleMap_dentist (pathOn, path, event){
    var w = (pathOn) ? "30vw" : "60vw";

    if (pathOn){
        const bounds = path.node().getBBox();
        
        var i;
        if (bounds.width > bounds.height){
            
            i = interpolator(1.2, 1.5, ((bounds.width - 424)/ -127));
        }
        else{
            
            i = interpolator(0.9, 1.4, ((bounds.height - 762)/ -571));
        }
         
        moveMap_dentist(
                i, // 1.5,
                -(bounds.x - (100/i)) / 2,
                -(bounds.y - (100/i)) / 2
            );
    } else {
        moveMap_dentist(1, 0, 0);
    }
}

function interpolator(a, b, t) {
  return a * (1 - t) + b * t;
}

function ResetMap_dentist(){
    if (!d3.select('#callVid').empty()){
        d3.select('#callVid').node().pause();
        d3.select('#callVid').node().currentTime = 0;
    }
    disableAllPaths_dentist();
    toggleMap_dentist(false);
    d3.select("#dentist-list-container")
        .style("display", "block");
    d3.select("#dentist-description")
        .style("display", "none");

    isClicked_dentist = false;
}


function playPause(v){
    if(v.paused){
        v.play();
    } else{
        v.pause();
    }
}

function playPause(v, delay){
    setTimeout(function(){
        if(v.paused){
            v.play();
        } else{
            v.pause();
        }
    }, delay);
}
