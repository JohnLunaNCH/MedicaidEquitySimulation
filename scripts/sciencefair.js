function ScienceFairSkip(){
	d3.select('#sciencefairchoiceDisplay').html(
		"You shake your head and before you can even start to apologize, Mia sighs and walks away. You go to work, the shift is slow. When you get home that evening, you find out that Mia won second place at the fair. She got a ride home from her friend's parents.");
	//reverse from 18 to 21 (12/5/2022)
	changeStats(21);
	AddContinueButton('#sciencefairchoice');
}

function ScienceFairAttend(){
	d3.select('#sciencefairchoiceDisplay').html(
		"You call in to work. Your manager asks you if you really want to work. She says there's a lot of people out there looking for work and if you don't want to work she could easily find someone to replace you. The phone call ends and you question your choices. You attend the science fair that afternoon. Mia impresses you with her display and her experiment. She wins a second place ribbon. You take her to get ice cream afterwards.");
	//reverse from 21 to 18 (12/5/2022)
	changeStats(18);
	AddContinueButton('#sciencefairchoice');
}

function AddContinueButton(containerId){
	d3.select(containerId)
		.append('div')
			.classed('flexContainer', true)
			.classed('row', true)
			.style('justify-content', 'end')
			.append('button')
				.text('Continue')
				.attr('onClick', 'addHeight(this);');
}