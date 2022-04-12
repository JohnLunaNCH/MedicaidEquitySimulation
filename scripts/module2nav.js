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

function Module2Next(){
	//select and clear the midSection
	var container = midSection;
	container
		.style("justify-content", "space-evenly")
		.classed("column", true)
		.node().innerHTML = "";

	var scaleCont = container.append('div').attr('id', 'scaleContainer').classed("alignCenter", true).style("text-align", "center");
		scaleCont.append('div').text("The thing that asks the question that the user chooses from the scale thing.").classed("alignCenter", true);
		scaleCont.append('div').text("----the scale----").classed("alignCenter", true);
	container.append('div').classed("alignCenter", true).append('div').classed("confirmChoiceButton", true).text("Continue");
}

function Sect1(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeNarration;
	midSection.select("#narrationContainer").text("Please pay attention to how the dentist introduces the HPV vaccine and the communication techniques used to enhance health literacy.");
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').attr("onClick", "Sect2()");
}

function Sect2(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeVideo;
	midSection.select('iframe').attr('src', 'https://player.vimeo.com/video/674956122?h=752c9b4a1a&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479');
	bottomSection.select(".bulletProgress").style("display", "none");
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
	AddButton(buttonContainer, "Confirm Choice", 'confirmChoiceButton');
	buttonContainer.select('.confirmChoiceButton')
		.style('width', '100px')
		.attr('onClick', 'Sect4()');
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').style("display", "none");
}

function Sect4(){
	titleSection.select('h1').text("On a scale of 1-10, how convinced are you about the importance of:");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeScale;
	midSection.select("#scaleNarration").text("Routinely recommending HPV vaccine to all eligible patients ");
	midSection.selectAll(".scaleButton")
		.each(function(d, i){
			d3.select(this).attr('ison', '0');
			MakeButtonClickable(d3.select(this));
		});
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('.confirmChoiceButton').style("display", "block").attr("onClick", "Sect5()");
}

function Sect5(){
	titleSection.select('h1').text("On a scale of 1-10, how convinced are you about the importance of:");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeScale;
	midSection.select("#scaleNarration").text("Explaining dental and HPV vaccine information using plain language ");
	midSection.selectAll(".scaleButton")
		.each(function(d, i){
			d3.select(this).attr('ison', '0');
			MakeButtonClickable(d3.select(this));
		});
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('.confirmChoiceButton').attr("onClick", "Sect6()");
}

function Sect6(){
	titleSection.select('h1').text("On a scale of 1-10, how convinced are you about the importance of:");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeScale;
	midSection.select("#scaleNarration").text("Using teach-back to assess and ensure understanding ");
	midSection.selectAll(".scaleButton")
		.each(function(d, i){
			d3.select(this).attr('ison', '0');
			MakeButtonClickable(d3.select(this));
		});
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('.confirmChoiceButton').attr("onClick", "Sect7()");
}

function Sect7(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeNarration;
	midSection.select("#narrationContainer").text("Watch the following scenario, can you spot the difference between this encounter and the previous encounter?");
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').style("display","block").attr("onClick", "Sect8()");
}

function Sect8(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeVideo;
	midSection.select('iframe').attr('src', 'https://player.vimeo.com/video/674956122?h=752c9b4a1a&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479');
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').attr("onClick", "Sect9()");
}

function Sect9(){
	titleSection.select('h1').text("What did the dentist miss?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.node().innerHTML = "";
	AddButton(buttonContainer, "Did not mention HPV vaccine at all", 'multiplechoice');
	AddButton(buttonContainer, "Did not explain about the HPV vaccine ", 'multiplechoice');
	AddButton(buttonContainer, "Did not provide accurate information about the HPV vaccine ", 'multiplechoice');
	AddButton(buttonContainer, "Did not explain using words most patients can understand ", 'multiplechoice');
	AddButton(buttonContainer, "Did not employ teach-back to ensure the explanation was sufficient to achieve full understanding for the patient ", 'multiplechoice');
	AddButton(buttonContainer, "Did not respect the patient’s reaction towards vaccinations ", 'multiplechoice');
	AddButton(buttonContainer, "Confirm Choice", 'confirmChoiceButton');
	buttonContainer.select('.confirmChoiceButton')
		.style('width', '100px')
		.attr('onClick', 'Sect10()');
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').style("display", "none");
}

function Sect10(){
	titleSection.select('h1').text("What could be the parent or patient’s concern regarding HPV vaccines?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.node().innerHTML = "";
	AddButton(buttonContainer, "Bad side-effects", 'multiplechoice');
	AddButton(buttonContainer, "HPV vaccination may promote teen sexual activity", 'multiplechoice');
	AddButton(buttonContainer, "HPV vaccination is not useful for teens that are not sexually active", 'multiplechoice');
	
	AddButton(buttonContainer, "Confirm Choice", 'confirmChoiceButton');
	buttonContainer.select('.confirmChoiceButton')
		.style('width', '100px')
		.attr('onClick', 'Sect11()');
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').style("display", "none");
}

function Sect11(){
	titleSection.select('h1').text("What could the dentist do to better advocate for HPV vaccination?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.node().innerHTML = "";
	AddButton(buttonContainer, "Check vaccination records as part of the routine check-up ", 'multiplechoice');
	AddButton(buttonContainer, "Naturally introduce HPV vaccine as preventive measure for cancer (oral cancer) ", 'multiplechoice');
	AddButton(buttonContainer, "Use easy-to-understand terms (plain language) to explain medical concepts ", 'multiplechoice');
	AddButton(buttonContainer, "Employ teach-back to assess and ensure understanding  ", 'multiplechoice');
	AddButton(buttonContainer, "Provide easy-to-read hand-out and point to or circle key information ", 'multiplechoice');
	AddButton(buttonContainer, "Make it a standard part of the routine dental encounter ", 'multiplechoice');

	
	AddButton(buttonContainer, "Confirm Choice", 'confirmChoiceButton');
	buttonContainer.select('.confirmChoiceButton')
		.style('width', '100px')
		.attr('onClick', 'Sect12()');
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').style("display", "none");
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

	
	AddButton(buttonContainer, "Confirm Choice", 'confirmChoiceButton');
	buttonContainer.select('.confirmChoiceButton')
		.style('width', '100px')
		.attr('onClick', 'Sect13()');
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').style("display", "none");
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

	
	AddButton(buttonContainer, "Confirm Choice", 'confirmChoiceButton');
	buttonContainer.select('.confirmChoiceButton')
		.style('width', '100px')
		.attr('onClick', 'Sect14()');
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').style("display", "none");
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
	        		console.log("this is a scale button");
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

