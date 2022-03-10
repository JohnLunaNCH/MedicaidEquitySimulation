let translateExtent = class {
            lowX;
            lowY;
            highX;
            highY;
            constructor(){
               
            }
        }

let groceryMapExtents = new translateExtent();

var aldi, gasstation, cvs, cornerstore;
var aldiHighlight, gasstationHighlight, cvsHighlight, cornerstoreHighlight;
var aldiPath, gasstationPath, cvsPath, cornerstorePath;

var handleZoom_mtg = (e) => d3.select("#MapToGrocery").attr('transform', e.transform);

var zoom_mtg = d3.zoom()
        .scaleExtent([0.5, 5])
        .translateExtent([[0, 0], [1, 1]])
        .on('zoom', handleZoom_mtg);

var container, trans;

var aldiText;
var cornerstoreText;
var gasstationText;

$.get('html/info_aldi.txt', function (response){
    aldiText = response;
});
$.get('html/info_cornerstore.txt', function (response){
    cornerstoreText = response;
});
$.get('html/info_gasstation.txt', function (response){
    gasstationText = response;
});


d3.xml("images/mapmask.svg")
    .then(data => {
        //insert the svg code
        d3.select("#MapToGrocery")
            .node().append(data.documentElement);

        //assign the container and main transform
        container = d3.select("#MapToGrocery").select('svg');
        trans = container.select('#map');

        //fix the illustrator file
        trans.selectAll('image')
            .attr("xlink:href", function() {
                return "images/" + d3.select(this).attr("xlink:href");
            });
        
        //asign path groups to their variables
        trans.selectAll('g')
            .each(function (){
                var id = d3.select(this).attr("id");
                switch (id){
                    case 'aldi-paths':
                        aldiPath = d3.select(this);
                        break;
                    case 'cvs-paths':
                        cvsPath = d3.select(this);
                        break;
                    case 'gasstation-paths':
                        gasstationPath = d3.select(this);
                        break;
                    case 'cornerstore-paths':
                        cornerstorePath = d3.select(this);
                        break;
                    default:
                        break;
                }
            });
        //make the buttons functional
        trans.selectAll('use')
            .each(function (d, i) {
                var id = d3.select(this).attr("id");

                switch (id){
                    case 'aldi-highlight':
                        aldiHighlight = d3.select(this);
                        break;
                    case 'aldi':
                        aldi = d3.select(this);
                        mapButtons(aldi, id, aldiHighlight, aldiPath, aldiText);
                        break;
                    case 'cornerstore-highlight':
                        cornerstoreHighlight = d3.select(this);
                        break;
                    case 'cornerstore':
                        cornerstore = d3.select(this);
                        mapButtons(cornerstore, id, cornerstoreHighlight, cornerstorePath, cornerstoreText);
                        break;
                    case 'cvs-highlight':
                        cvsHighlight = d3.select(this);
                        break;
                    case 'cvs':
                        cvs = d3.select(this);
                        mapButtons(cvs, id, cvsHighlight, cvsPath, "");
                        break;
                    case 'gasstation-highlight':
                        gasstationHighlight = d3.select(this);
                        break;
                    case 'gasstation':
                        gasstation = d3.select(this);
                        mapButtons(gasstation, id, gasstationHighlight, gasstationPath, gasstationText);
                        break;
                    default:
                        console.log("Uncaught element");
                        break;
                }
            });

        const mapBackground = trans.select('#map-background');

        mapBackground
            .on("click", function(){
                disableAllPaths();
                toggleMap(false);
                d3.select("#map-description-container")
                //.text("You clicked the map.");
                .html("<div style=\"line-height: 50vh;\">Click on a destination to get more information.</div>");
            });

        //find the offset of the transform in the svg
        var matrix = mapBackground.attr("transform").split(" ");
        const width = Number(mapBackground.attr('width'));
        const height = Number(mapBackground.attr('height'));
        const posX = Number(matrix[4]);
        const posY = Number(matrix[5].substring(0, matrix[5].length - 1));
        const maxX = width + posX;
        const maxY = height + posY;

        trans.attr("transform", "translate(0, 0) scale(1)");

        //set up the map movement
        initializeMap(posX, posY, maxX, maxY);
    });

function initializeMap(lowX, lowY, highX, highY){
    handleZoom_mtg = (e) => trans.attr('transform', e.transform);
    groceryMapExtents.lowY = lowY;
    groceryMapExtents.lowX = lowX;
    groceryMapExtents.highY = highY;
    groceryMapExtents.highX = highX;

    zoom_mtg = d3.zoom()
        .scaleExtent([0.7, 2])
        .translateExtent([[lowX, lowY], [highX, highY]])
        .on('zoom', handleZoom_mtg);
    
    container.call(zoom_mtg);
    //moveMap(0.8, 0, 0);     
    toggleMap(false);
}


function moveMap(scale, x, y){
    const posX = (x < groceryMapExtents.highX) ? 
    ((x > groceryMapExtents.lowX) ? x : groceryMapExtents.lowX) : groceryMapExtents.highX;
    const posY = (y < groceryMapExtents.highY) ? 
    ((y > groceryMapExtents.lowY) ? y : groceryMapExtents.lowY) : groceryMapExtents.highY;;
    container
        .transition()
        .duration(transitionSpeed)
        .call(
            zoom_mtg.transform,
            d3.zoomIdentity
                .scale(scale)
                .translate(posX, posY)
            );
}

function mapButtons (button, id, highlight, path, html){
    button
        .on("mouseover", function(){
            highlight.style("display", "block");
            d3.select(this).style("cursor", "pointer");
        })
        .on("mouseout", function(){
            if (path.style("display") == "block"){

            } else {
                highlight.style("display", "none");
            }
            d3.select(this).style("cursor", "default");         
        })
        .on("click", function(e) {
            //populate map specific description
            d3.select("#map-description-container")
                //.text("You clicked the " + id + " button.")
                .html(html);

            //disable all paths and enable the target path
            disableAllPaths();
            path.style("display", "block");
            highlight.style("display", "block");

            //animate map movement
            toggleMap(true, path.select('path'), e);
        });
}

function disableAllPaths (){
    aldiPath.style("display", "none");
    cvsPath.style("display", "none");
    cornerstorePath.style("display", "none");
    gasstationPath.style("display", "none");
    aldiHighlight.style("display", "none");
    cvsHighlight.style("display", "none");
    cornerstoreHighlight.style("display", "none");
    gasstationHighlight.style("display", "none");
}

function toggleMap (pathOn, path, event){
    var w = (pathOn) ? "30vw" : "40vw";
    d3.select("#groceryMapContainer")
        .transition()
        .duration(transitionSpeed)
        .style("width", w);
    if (pathOn){
        const bounds = path.node().getBBox();
        moveMap(0.8,
            -(bounds.x) / 2,
            -(bounds.y - 300) / 2
            );
    } else {
        moveMap(0.8, 0, 0);
    }
}