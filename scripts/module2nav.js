var titleSection = d3.select("#titleSection");
var midSection = d3.select("#midSection");
var bottomSection = d3.select("#bottomSection");

var m2_typeScale;
$.get('html/m2_typeScale.txt', function (response){
    m2_typeScale = response;
});
var m2_typeMultipleChoice;
$.get('html/m2_typeMultipleChoice.txt', function (response){
    m2_typeMultipleChoice = response;
});
var m2_typeNarration;
$.get('html/m2_typeNarration.txt', function (response){
    m2_typeNarration = response;
    //LOAD NEW SECTION HERE
    Sect1();
});
var m2_typeVideo;
$.get('html/m2_typeVideo.txt', function (response){
    m2_typeVideo = response;
});

function SetBulletProgress(amount, sect){
	bottomSection.select(".bulletProgress").style("display", "block");
	var bar = bottomSection.select("svg");
	bar.attr('viewBox', '0 0 ' + ((amount * 15) + 5) + ' 10');
	bar.selectAll('use').remove();
	for (var i =0; i < amount; i ++){
		bar.append('use')
			.attr('href', '#circleButton')
			.attr('x', ((i * 15) + 5))
			.attr('fill', 'white')
			.attr('fill-opacity', (i == sect) ? '1' : '0');
	}
}

function Sect1(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeNarration;
	midSection.select("#narrationContainer").text("Please pay attention to how the dentist introduces the HPV vaccine and the communication techniques used to enhance health literacy.");
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').attr("onClick", "Sect2()");
}


//video
function Sect2(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeVideo;
	EnableButton(d3.select('#bottomContinueButton'), false);
	//Scenario5 https://vimeo.com/manage/videos/677321017
	midSection.select('iframe').attr('src', 'https://player.vimeo.com/video/677321017?h=882a3a78b2&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479');
	
	//wait til end of video to turn continue button on
	var player = new Vimeo.Player(document.querySelector('iframe'));
	player.on('ended',function(){EnableButton(d3.select('#bottomContinueButton'), true);});

	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-end");
	d3.select('#bottomContinueButton').attr("onClick", "Sect3()");
}

function Sect3(){
	titleSection.select('h1').text("Do you agree that dentists should recommend HPV vaccination to patients as cancer prevention?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.node().innerHTML = "";
	AddButton(buttonContainer, "Strongly Agree", 'multiplechoice');
	AddButton(buttonContainer, "Agree", 'multiplechoice');
	AddButton(buttonContainer, "Somewhat Agree", 'multiplechoice');
	AddButton(buttonContainer, "Disagree", 'multiplechoice');
	AddButton(buttonContainer, "Strongly Disagree", 'multiplechoice');

	SetBulletProgress(4, 0);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').style("visibility", "visible").attr('onClick', 'Sect4()');
}

function Sect4(){
	titleSection.select('h1').text("On a scale of 1-10 where 1 is Not Important and 10 is Very Important, how convinced are you about the importance of:");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeScale;
	midSection.select("#scaleNarration").text("Routinely recommending HPV vaccine to all eligible patients ");
	midSection.selectAll(".scaleButton")
		.each(function(d, i){
			d3.select(this).attr('ison', '0');
			MakeButtonClickable(d3.select(this));
		});
	
	SetBulletProgress(4, 1);

	d3.select('#bottomContinueButton').style("visibility", "hidden");
	d3.select('.confirmChoiceButton').style("visibility", "visible").attr("onClick", "Sect5()");

}

function Sect5(){
	titleSection.select('h1').text("On a scale of 1-10 where 1 is Not Important and 10 is Very Important, how convinced are you about the importance of:");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeScale;
	midSection.select("#scaleNarration").text("Explaining dental and HPV vaccine information using plain language ");
	midSection.selectAll(".scaleButton")
		.each(function(d, i){
			d3.select(this).attr('ison', '0');
			MakeButtonClickable(d3.select(this));
		});

	SetBulletProgress(4, 2);

	d3.select('#bottomContinueButton').style("visibility", "hidden");
	d3.select('.confirmChoiceButton').attr("onClick", "Sect6()");
}

function Sect6(){
	titleSection.select('h1').text("On a scale of 1-10 where 1 is Not Important and 10 is Very Important, how convinced are you about the importance of:");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeScale;
	midSection.select("#scaleNarration").text("Using teach-back to assess and ensure understanding ");
	midSection.selectAll(".scaleButton")
		.each(function(d, i){
			d3.select(this).attr('ison', '0');
			MakeButtonClickable(d3.select(this));
		});
	SetBulletProgress(4, 3);
	d3.select('#bottomContinueButton').style("visibility", "hidden");
	d3.select('.confirmChoiceButton').attr("onClick", "Sect7()");
}

//Naration
function Sect7(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeNarration;
	midSection.select("#narrationContainer").text("Watch the following scenario, can you spot the difference between this encounter and the previous encounter?");
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').style("visibility","visible").attr("onClick", "Sect8()");
}

//Video
function Sect8(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	EnableButton(d3.select('#bottomContinueButton'), false);
	midSection.node().innerHTML = m2_typeVideo;
	midSection.select('iframe').attr('src', 'https://player.vimeo.com/video/676021184?h=bb40bb226d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479');
	bottomSection.select(".bulletProgress").style("display", "none");
	//wait til end of video to turn continue button on
	var player = new Vimeo.Player(document.querySelector('iframe'));
	player.on('ended',function(){EnableButton(d3.select('#bottomContinueButton'), true);});

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-end");
	d3.select('#bottomContinueButton').attr("onClick", "Sect9()");
}

function EnableButton(button, turnOn){
	if(turnOn)
		button.style('visibility', 'visible');
	else
		button.style('visibility', 'hidden');
}

function Sect9(){
	titleSection.select('h1').text("What did the dentist miss?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.node().innerHTML = "";
	AddButton(buttonContainer, "Did not mention HPV vaccine at all", 'multiplechoice', 0);
	AddButton(buttonContainer, "Did not explain about the HPV vaccine ", 'multiplechoice', 0);
	AddButton(buttonContainer, "Did not provide accurate information about the HPV vaccine ", 'multiplechoice', 0);
	AddButton(buttonContainer, "Did not explain using words most patients can understand ", 'multiplechoice', 0);
	AddButton(buttonContainer, "Did not employ teach-back to ensure the explanation was sufficient to achieve full understanding for the patient ", 'multiplechoice', 1);
	AddButton(buttonContainer, "Did not respect the patient’s reaction towards vaccinations ", 'multiplechoice', 0);

	buttonContainer.selectAll('.multiplechoice').each(function(){
	    MakeButtonClickable(d3.select(this), buttonContainer);
	});

	SetBulletProgress(3, 0);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Check Answer").style("visibility", "visible").attr('onClick', 'Sect9B()');
}

function Sect9B(){
	titleSection.select('h1').text("What did the dentist miss?");
	CheckAnswer("Correct Answer: The dentist did not employ teach-back.")

	SetBulletProgress(3, 0);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'Sect10()');
}

function Sect10(){
	titleSection.select('h1').text("What could be the parent or patient’s concern regarding HPV vaccines? (select all that apply)");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.node().innerHTML = "";
	AddButton(buttonContainer, "Bad side-effects", 'multiplechoice', 1);
	AddButton(buttonContainer, "HPV vaccination may promote teen sexual activity", 'multiplechoice', 1);
	AddButton(buttonContainer, "HPV vaccination is not useful for teens that are not sexually active", 'multiplechoice', 1);
	

	SetBulletProgress(3, 1);

		d3.select('#bottomContinueButton').text("Check Answer").style("visibility", "visible").attr('onClick', 'Sect10B()');
}

function Sect10B(){
	titleSection.select('h1').text("What could be the parent or patient’s concern regarding HPV vaccines?");
	CheckAnswer("A parent may respond in any of these ways.");
	

	SetBulletProgress(3, 1);

		d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'Sect11()');
}

function Sect11(){
	titleSection.select('h1').text("What could dental providers do to better advocate for HPV vaccination?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.node().innerHTML = "";
	AddButton(buttonContainer, "Check vaccination records as part of the routine check-up ", 'multiplechoice', 1);
	AddButton(buttonContainer, "Naturally introduce HPV vaccine as preventive measure for cancer (oral cancer) ", 'multiplechoice', 1);
	AddButton(buttonContainer, "Use easy-to-understand terms (plain language) to explain medical concepts ", 'multiplechoice', 1);
	AddButton(buttonContainer, "Employ teach-back to assess and ensure understanding  ", 'multiplechoice', 1);
	AddButton(buttonContainer, "Provide easy-to-read hand-out and point to or circle key information ", 'multiplechoice', 1);
	AddButton(buttonContainer, "Make it a standard part of the routine dental encounter ", 'multiplechoice', 1);

	SetBulletProgress(3, 2);

		d3.select('#bottomContinueButton').text("Check Answer").style("visibility", "visible").attr('onClick', 'Sect11B()');
}

function Sect11B(){
	titleSection.select('h1').text("What could the dentist do to better advocate for HPV vaccination?");
	CheckAnswer("All of these are good ways to help you introduce HPV vaccination.");
	SetBulletProgress(3, 2);

		d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'End()');
}

function End(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeNarration;
	midSection.select("#narrationContainer").text("That concludes the simulation. Thank you for participating!");
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').style("visibility","hidden");
}

function Sect12(){
	titleSection.select('h1').text("Thinking about your encounters with patients and/or families about how often do you recommend HPV vaccination to patients?  ");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.node().innerHTML = "";
	AddButton(buttonContainer, "I have been doing this for 6 months or more. ", 'multiplechoice');
	AddButton(buttonContainer, "I have been doing this for less than 6 months. ", 'multiplechoice');
	AddButton(buttonContainer, "I do not do it now, but plan to do this in the next month. ", 'multiplechoice');
	AddButton(buttonContainer, "I do not do it now, but plan to do this in the next 2 to 6 months. ", 'multiplechoice');
	AddButton(buttonContainer, "I do not do it now and do not plan to do this. ", 'multiplechoice');

	SetBulletProgress(5, 3);

		d3.select('#bottomContinueButton').style("visibility", "visible").attr('onClick', 'Sect13()');
}

function Sect13(){
	titleSection.select('h1').text("What barriers exist that could keep you from routinely recommending HPV vaccine to your patients? ");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.node().innerHTML = "";
	AddButton(buttonContainer, "Knowledge regarding HPV vaccine ", 'multiplechoice');
	AddButton(buttonContainer, "No vaccines administered in our office ", 'multiplechoice');
	AddButton(buttonContainer, "Too much other stuff we have to do ", 'multiplechoice');
	AddButton(buttonContainer, "Time", 'multiplechoice');
	AddButton(buttonContainer, "Fear of upsetting patient ", 'multiplechoice');
	AddButton(buttonContainer, "Association w/ encouraging sexual activity ", 'multiplechoice');
	AddButton(buttonContainer, "Other ", 'multiplechoice');

	SetBulletProgress(5, 4);

		d3.select('#bottomContinueButton').style("visibility", "visible").attr('onClick', 'Sect14()');
}

function ClearSection(container){
	container.node().innerHTML = "";	
}

function AddButton(section, text, classType){
	var button = section.append('button');
	button.classed(classType, true).text(text).attr('ison', '0');
	if (classType == "multiplechoice"){
        MakeButtonClickable(button);
    }
}

function AddButton(section, text, classType, isright){
	var button = section.append('button');
	button.classed(classType, true).text(text).attr('ison', '0').attr('isright', isright);
	if (classType == "multiplechoice"){
        MakeButtonClickable(button);
    }
}

function CheckAnswer(answerText){
	midSection.selectAll('.multiplechoice').each(
		function(){
			var b = d3.select(this);
			if (b.attr('ison') == '1'){
				if(b.attr('isright') == '1')
				{
					b.style('background-color', 'green');
				} else {
					b.style('background-color', 'red');
				}
			} else {
				if(b.attr('isright') == '1'){
					b.style('background-color', 'rbga(0,0,0,0.75)');
				}
			}
		});
	midSection.select('#answerContainer').style('background-color', 'rgba(0,0,0,0.75)');
	midSection.select('#answer').text(answerText);
}

function MakeButtonClickable(button){
	button
	        .on("mouseover", function(){
	            d3.select(this).style("cursor", "pointer");
	        })
	        .on("mouseout", function(){
	            d3.select(this).style("cursor", "default");         
	        })
	        .on("click", function(e) {
	        	if (d3.select(this).attr('ison') == '0'){
	        		d3.select(this)
	        			.style("background-color", "#005A9C")
	        			.attr('ison', '1');
	        	}
	        	else{
	        		d3.select(this)
	        			.style("background-color", "transparent")
	        			.attr('ison', '0');
	        	}
	        	if (d3.select(this).classed('scaleButton')){	        		
	        		DisableAllOther(d3.select(this).node().innerHTML);
	        	}
	        });
}

function DisableAllOther(button){
	d3.selectAll('.scaleButton')
		.each(function () {
			if (d3.select(this).node().innerHTML != button){
				d3.select(this)
	        			.style("background-color", "transparent")
	        			.attr('ison', '0');
			}
		});
}

function DisableAllOther(button, container){
	container.selectAll('.multiplechoice')
		.each(function () {
			if (d3.select(this).node().innerHTML != button){
				d3.select(this)
	        			.style("background-color", "transparent")
	        			.attr('ison', '0');
			}
		});
}

function MakeButtonClickable(button, container){
	button
	        .on("mouseover", function(){
	            d3.select(this).style("cursor", "pointer");
	        })
	        .on("mouseout", function(){
	            d3.select(this).style("cursor", "default");         
	        })
	        .on("click", function(e) {
	        	if (d3.select(this).attr('ison') == '0'){
	        		d3.select(this)
	        			.style("background-color", "#005A9C")
	        			.attr('ison', '1');
	        	}
	        	else{
	        		d3.select(this)
	        			.style("background-color", "transparent")
	        			.attr('ison', '0');
	        	}	        		
	        	DisableAllOther(d3.select(this).node().innerHTML, container);
	        });
}

