d3.xml("images/pages.svg")
    .then(data => {
        d3.select("#BillsSection").selectAll("#svg-container")
            .nodes().forEach (n => {
                n.append(data.documentElement.cloneNode(true));
                selectBill("page01");
                selectBill("page02");
                selectBill("page03");
                selectBill("page04");
                selectBill("page05");
        })                
    });

function selectBill (page){
    d3.select("#bills-" + page)
        .on("mouseover", function(){
            d3.select("#bills-" + page + "-highlight").style("display", "block");        
        })
        .on("mouseout", function(){
            d3.select("#bills-" + page + "-highlight").style("display", "none");
        })
        .on("click", function() {
            d3.select("#selected")
                .attr("xlink:href", "#bills-" + page);
            d3.select("#selected-highlight")
                .attr("xlink:href", "#bills-" + page + "-highlight")
                .style("display", "block");
            d3.select("#bill-description")
                .text(billText(page));
        })
}

function billText (page){
    switch (page){
        case 'page01':
            return "Electricity: $300";
            break;
        case 'page02':
            return "Water: $78.61";
            break;
        case 'page03':
            return "Gas: $60";
            break;
        case 'page04':
            return "Cable/Internet: $49.99";
            break;
        case 'page05':
            return "Cell Phone: $79.99";
            break;
        default:
            return "No page data";
    }
}