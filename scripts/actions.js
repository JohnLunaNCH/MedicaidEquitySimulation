var actions;

(async function() {
  try {
    const jsonresponse = await d3.json("/../json/actions.json");
    actions = jsonresponse;
    console.log(actions);
  } catch(error) {
    console.log(error);
  }
})();


function callAction (action){
	console.log(actions);
	for (var i = 0; i < actions.length; i ++){
		if (actions[i].action == action){
			adjustEnergy(actions[i].energy);
			adjustMood(actions[i].mood);
			adjustTooth(actions[i].tooth);
			adjustMoney(actions[i].money);
		}
	}
}