var billstotal = 0;
var currentBill = 0;
var billsJson;

//assign JSON data to global variable
(async function() {
      try {
        const jsonresponse = await d3.json("json/bills.json");
        billsJson = jsonresponse;
        console.log(billsJson);
        LoadXML();
        d3.select('#AddRemoveBillButton').style('display', 'none');
      } catch(error) {
        console.log(error);
      }
    })();

function LoadXML(){
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
}

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
            BillText(page);
            d3.select("#PayBillsButton").style('visibility', 'visible');            
        })
}

function AddBill (page){
    billstotal += currentBill;
    DisplayTotal();
    BillText(page);
}

function RemoveBill (page){
    if ((billstotal - currentBill) > -1)
        billstotal -= currentBill;
    DisplayTotal();
    BillText(page);
}

function DisplayTotal(){
    if (billstotal > 400)
        d3.select('#billTotal').style('color', 'red');
    else
        d3.select('#billTotal').style('color', 'white');
    d3.select('#billTotal')
        .text("$" + billstotal.toFixed(2));
}

function BillText (page){
    var foundPage = false;
    for (var i = 0; i < billsJson.length; i ++){
        if (billsJson[i].page == page){
            const index = i;
            foundPage = true;
            currentBill = billsJson[i].Price;
            d3.select("#bill-description")
                .text(billsJson[i].Name + ": $" + currentBill);

            d3.select('#AddRemoveBillButton').style('display', 'block');
            if (billsJson[i].willPay < 1){
                d3.select('#AddRemoveBillButton')
                    .text("Add Bill")
                    .classed("selectedButton", false)
                    .on("click", function(){
                        billsJson[index].willPay = 1;
                        AddBill(page);
                    });
            } else {
                d3.select('#AddRemoveBillButton')
                    .text("Remove Bill")
                    .classed("selectedButton", true)
                    .on("click", function(){
                        billsJson[index].willPay = 0;
                        RemoveBill(page);
                    });
            }
        }
    }
    if (!foundPage){
        return "Page Not Found.";
    }
}

function BillTutorial(){
    d3.select('#BillsSection').append('div')
        .classed('shoppinglistContainer', true)
        .classed('flexContainer', true)
        .classed('row', true)
        .attr('id', 'billtutorial');
    d3.select("#billtutorial").attr("onClick", "");

    const listDiv = d3.select("#billtutorial").append('div');
    listDiv
        .style("background-color", "black")
        .style("height", "70vh")
        .style("border-radius", "20px")
        .style("border", "solid gray")
        .style("padding", "1em")
        .style("align-self", "center");
    const container = listDiv.append('div');

    container
        .style("height", "100%")
        .style("display", "flex")
        .style("flex-flow", "column")
        .style("justify-content", "space-between");
    container.append('div')
        .style("padding", "1em 0 0 0")
        .text("Click on a bill to see its cost. Click on the Add button to add this bill to your total. Don't go over $400.");
    container.append('button')
        .attr("onClick", "d3.select('#billtutorial').style('display','none');")
        .text("Continue");  
}

function BillConclusion(){
    var section = d3.select("#BillsSection");
    section.node().innerHTML = "";
    section.style('display', 'flex').style('justify-content', 'center').style('flex-flow', 'column');
    section.append('div')
        .style("padding", "2em")
        .style("text-align", "center")
        .text("You pay what you can and make plans to rough it until you can secure enough money to cover the bills and their late fees.");
    section.append('div')
        .style('display', 'flex')
        .style('justify-content', 'center')
        .append('button')
            .attr("onClick", "addHeight(this)")
            .text("Continue");
    changeStatsBills();
}