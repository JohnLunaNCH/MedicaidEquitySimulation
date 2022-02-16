var width = 2942;
var height = 1711;
var posX = 0;
var posY = 0;
var maxX = 0;
var maxY = 0;
var aldi, gasstation, cvs, cornerstore;
var aldiHighlight, gasstationHighlight, cvsHighlight, cornerstoreHighlight;
var aldiPath, gasstationPath, cvsPath, cornerstorePath;

d3.xml("images/mapmask.svg")
    .then(data => {
        //insert the svg code
        d3.select(".interactiveMap")
            .node().append(data.documentElement);

        //assign the container and main transform
        const container = d3.select(".interactiveMap").select('svg');
        const trans = container.select('#map');

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
                //console.log (id);
                switch (id){
                    case 'aldi-highlight':
                        aldiHighlight = d3.select(this);
                        break;
                    case 'aldi':
                        aldi = d3.select(this);
                        mapButtons(aldi, id, aldiHighlight, aldiPath);
                        break;
                    case 'cornerstore-highlight':
                        cornerstoreHighlight = d3.select(this);
                        break;
                    case 'cornerstore':
                        cornerstore = d3.select(this);
                        mapButtons(cornerstore, id, cornerstoreHighlight, cornerstorePath);
                        break;
                    case 'cvs-highlight':
                        cvsHighlight = d3.select(this);
                        break;
                    case 'cvs':
                        cvs = d3.select(this);
                        mapButtons(cvs, id, cvsHighlight, cvsPath);
                        break;
                    case 'gasstation-highlight':
                        gasstationHighlight = d3.select(this);
                        break;
                    case 'gasstation':
                        gasstation = d3.select(this);
                        mapButtons(gasstation, id, gasstationHighlight, gasstationPath);
                        break;
                    default:
                        console.log("Uncaught element");
                        break;
                }
            });

        trans.select("#map-background")
            .on("click", function(){
                disableAllPaths();
                d3.select("#map-description")
                .text("You clicked the map.");
            });

        //find the offset of the transform in the svg
        var matrix = trans.select("#map-background").attr("transform").split(" ");
        posX = Number(matrix[4]);
        posY = Number(matrix[5].substring(0, matrix[5].length - 1));
        maxX = width + posX;
        maxY = height + posY;

        trans.attr("transform", "translate(0, 0) scale(1)");

        //set up the map movement
        moveMap(container, trans);
    });

function moveMap(container, trans){
    const handleZoom = (e) => trans.attr('transform', e.transform);

    const zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .translateExtent([[posX, posY], [maxX, maxY]])
        .on('zoom', handleZoom);
    
    container.call(zoom);
    //trans.call(zoom.translateTo, 0, 0);
    //initializeMap(trans, zoom);          
}

function initializeMap(trans, zoom){
    trans
        .transition()
        .call(zoom.scaleTo, 0.75)
        .call(zoom.translateTo(trans, -592, -537));            
}

function mapButtons (button, id, highlight, path){
    button
        .on("mouseover", function(){
            highlight.style("display", "block");        
            //path.style("display", "block"); 
        })
        .on("mouseout", function(){
            highlight.style("display", "none");
            //path.style("display", "none");
        })
        .on("click", function() {
            //put animation stuff here
            d3.select("#map-description")
                .text("You clicked the " + id + " button.");
            disableAllPaths();
            path.style("display", "block");
        });
}

function disableAllPaths (){
    aldiPath.style("display", "none");
    cvsPath.style("display", "none");
    cornerstorePath.style("display", "none");
    gasstationPath.style("display", "none");
}