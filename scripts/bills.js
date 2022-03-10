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
        })
}

function AddBill (page){
    billstotal += currentBill;
    d3.select('#billTotal')
        .text(billstotal.toFixed(2));
    BillText(page);
}

function RemoveBill (page){
    if ((billstotal - currentBill) > -1)
        billstotal -= currentBill;
    d3.select('#billTotal')
        .text(billstotal.toFixed(2));
    BillText(page);
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
                    .on("click", function(){
                        billsJson[index].willPay = 1;
                        AddBill(page);
                    });
            } else {
                d3.select('#AddRemoveBillButton')
                    .text("Remove Bill")
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