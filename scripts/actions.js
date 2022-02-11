	var actions;
	
	//access JSON via D3
	d3.json("json/test.json", function(data) {
		actions = data;
		//console.log(actions);
	});

	function callAction (action){
		for (var i = 0; i < actions.length; i ++){
			if (actions[i].action == action){
				adjustEnergy(actions[i].energy);
				adjustMood(actions[i].mood);
				adjustTooth(actions[i].tooth);
				adjustMoney(actions[i].money);
			}
		}
	}