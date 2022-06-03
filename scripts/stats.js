var statsVid;
var previousStart;

//This initializes the stats, displays, and checks for cookies
function setVariables(){
	statsVid = d3.select('#statsVid');
}

function changeStats(start){
	var end = start + 2;
	statsVid.attr('src', 'videos/stats.mp4#t=' + start + ',' + end);
	statsVid.node().play();
	previousStart = start;
}

function changeStatsBills(){
	changeStats(previousStart + 9);
}

function changeStatsDentist(){
	changeStats(previousStart + 6);
}