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
	d3.select('#bottomContinueButton').attr("onClick", "Sect2a()");
}


//video
function Sect2a(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeVideo;
	EnableButton(d3.select('#bottomContinueButton'), true);
	//Scenario5 https://vimeo.com/manage/videos/677321017
	midSection.select('iframe').attr('src', 'https://player.vimeo.com/video/716780801?h=78076ab601&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479');
	
	//wait til end of video to turn continue button on
	var player = new Vimeo.Player(document.querySelector('iframe'));
	//player.on('ended',function(){EnableButton(d3.select('#bottomContinueButton'), true);});

	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-end");
	d3.select('#bottomContinueButton').attr("onClick", "Sect2b()");
}

function Sect2b(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeVideo;
	EnableButton(d3.select('#bottomContinueButton'), true);
	//Scenario5 https://vimeo.com/manage/videos/677321017
	midSection.select('iframe').attr('src', 'https://player.vimeo.com/video/716778233?h=7cd69bafa4&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479');

	//wait til end of video to turn continue button on
	var player = new Vimeo.Player(document.querySelector('iframe'));
	//player.on('ended',function(){EnableButton(d3.select('#bottomContinueButton'), true);});

	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-end");
	d3.select('#bottomContinueButton').attr("onClick", "Sect2c()");
}

function Sect2c(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeVideo;
	EnableButton(d3.select('#bottomContinueButton'), true);
	//Scenario5 https://vimeo.com/manage/videos/677321017
	midSection.select('iframe').attr('src', 'https://player.vimeo.com/video/716781038?h=8ae793245c&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479');
	
	//wait til end of video to turn continue button on
	var player = new Vimeo.Player(document.querySelector('iframe'));
	//player.on('ended',function(){EnableButton(d3.select('#bottomContinueButton'), true);});

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
	midSection.select("#narrationContainer").text("The following videos are optional.");
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').style("visibility","visible").attr("onClick", "Sect8a()");
}

//Video
function Sect8a(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	EnableButton(d3.select('#bottomContinueButton'), true);
	midSection.node().innerHTML = m2_typeVideo;
	midSection.select('iframe').attr('src', 'https://player.vimeo.com/video/716778538?h=b084bfe60f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479');

	bottomSection.select(".bulletProgress").style("display", "none");
	//wait til end of video to turn continue button on
	var player = new Vimeo.Player(document.querySelector('iframe'));
	player.on('ended',function(){EnableButton(d3.select('#bottomContinueButton'), true);});

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-end");
	d3.select('#bottomContinueButton').attr("onClick", "Sect8b()");
}

function Sect8b(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	EnableButton(d3.select('#bottomContinueButton'), true);
	midSection.node().innerHTML = m2_typeVideo;
	midSection.select('iframe').attr('src', 'https://player.vimeo.com/video/716782970?h=1fa186261e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479');
	
	bottomSection.select(".bulletProgress").style("display", "none");
	//wait til end of video to turn continue button on
	var player = new Vimeo.Player(document.querySelector('iframe'));
	player.on('ended',function(){EnableButton(d3.select('#bottomContinueButton'), true);});

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-end");
	d3.select('#bottomContinueButton').attr("onClick", "Sect00NewEnding01()");
}

function EnableButton(button, turnOn){
	if(turnOn)
		button.style('visibility', 'visible');
	else
		button.style('visibility', 'hidden');
}

function Sect00NewEnding01(){
	titleSection.select('h1').text("Why should dentists recommend HPV vaccine?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.style("overflow-y", "auto");
	buttonContainer.node().innerHTML = "";
	var list = buttonContainer.append("ul");
	list.append("li").text("The ADA adopted a policy in 2018 that urges dentists to support the use and administration of the HPV vaccine, recognizing it as a way to help prevent infection of the types of HPV associated with oropharyngeal cancer.");
	list.append("li").text("An HPV workgroup led by ADA volunteers developed an evidence-based background report to help write the policy.");
	list.append("li").text("By boosting HPV vaccination rates among your patients, you will be preventing cancer.");
	list.append("li").text("Clinician recommendation is the number one reason parents decide to vaccinate.");

	SetBulletProgress(10, 0);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'Sect00NewEnding02()');
}

function Sect00NewEnding02(){
	titleSection.select('h1').text("How do I fit this into a busy practice?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.style("overflow-y", "auto");
	buttonContainer.node().innerHTML = "";
	var list = buttonContainer.append("ul");
	list.append("li").text("Starting with your front office, ensure each team member is aware of HPV vaccine’s importance and is educated on proper vaccination practices and recommendations, ready to answer parents’ questions, and/or regularly remind parents.  ");
	list.append("li").text("Staff could regularly check immunization records, and let you know if parents have questions. ");
	list.append("li").text("Use the resources of the local health department. ");
	list.append("li").text("Be prepared to answer parents’ questions succinctly, accurately, and empathetically by using terms that they understand. A parent will often accept your explanations if presented with their children’s best interests in mind. ");
	list.append("li").text("Clinician recommendation is the number one reason parents decide to vaccinate. ");

	SetBulletProgress(10, 1);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'Sect00NewEnding03a()');
}

//TODO: Insert section here
function Sect00NewEnding03a(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeNarration;
	midSection.select("#narrationContainer").text("The following pages will provide guidance on how to answer parents’ question");
	bottomSection.select(".bulletProgress").style("display", "none");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr("onClick", "Sect00NewEnding03b()");
}

function Sect00NewEnding03b(){
	titleSection.select('h1').text("Why does my child need HPV vaccination?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.style("overflow-y", "auto");
	buttonContainer.node().innerHTML = "";
	var list = buttonContainer.append("ul");
	list.append("li").text("HPV vaccination is important because it prevents infections that can cause cancer. ");
	var subList = list.append("li").text("Other info if you want to include it:").append("ul");
	subList.append("li").text("Human papillomavirus (HPV) vaccine protects against cancers caused by HPV infection. HPV is a common virus that infects teens and adults. About 1 million people, including teens, become infected with HPV each year. HPV infection can cause cervical, vaginal, and vulvar cancers in women and penile cancer in men. HPV can also cause anal cancer, cancer of the back of the throat (oropharynx), and genital warts in both men and women. ");
	subList.append("li").text("Every year, about 36,000 men and women develop a cancer caused by HPV. HPV vaccination could prevent more than 90% of these cancers from ever developing. ");

	SetBulletProgress(10, 2);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'Sect00NewEnding04()');
}

function Sect00NewEnding04(){
	titleSection.select('h1').text("What diseases are caused by HPV?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.style("overflow-y", "auto");
	buttonContainer.node().innerHTML = "";
	var list = buttonContainer.append("ul");
	list.append("li").text("Some HPV infections can cause cancer—like cancer of the cervix, anus, penis, or in the back of the throat—but we can protect your child from getting these cancers in the future with HPV vaccination. ");

	SetBulletProgress(10, 3);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'Sect00NewEnding05()');
}

function Sect00NewEnding05(){
	titleSection.select('h1').text("How do you know HPV vaccination works? ");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.style("overflow-y", "auto");
	buttonContainer.node().innerHTML = "";
	var list = buttonContainer.append("ul");
	list.append("li").text("Studies continue to prove HPV vaccination works extremely well, decreasing the number of infections and HPV precancers in people who have been vaccinated. ");

	SetBulletProgress(10, 4);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'Sect00NewEnding06()');
}

function Sect00NewEnding06(){
	titleSection.select('h1').text("Is my child really at risk for HPV infection?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.style("overflow-y", "auto");
	buttonContainer.node().innerHTML = "";
	var list = buttonContainer.append("ul");
	list.append("li").text("HPV is a very common infection in teens and adults, including women and men. Nearly everyone will get HPV at some point in their lives. Getting the vaccine will help protect your child from the cancers and diseases caused by HPV later in their lives.");

	SetBulletProgress(10, 5);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'Sect00NewEnding07()');
}

function Sect00NewEnding07(){
	titleSection.select('h1').text("Why do they need HPV vaccination at such a young age?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.style("overflow-y", "auto");
	buttonContainer.node().innerHTML = "";
	var list = buttonContainer.append("ul");
	list.append("li").text("Vaccines protect your child before they are exposed to an infection. That’s why we give HPV vaccination earlier rather than later, to protect them long before they are ever exposed.");
	list.append("li").text("Also, if your child gets the shot before they turn 15, they will only need two doses. If you wait until your child is older, they will end up needing three shots.");

	SetBulletProgress(10, 6);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'Sect00NewEnding08a()');
}

function Sect00NewEnding08a(){
	titleSection.select('h1').text("");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.style("overflow-y", "auto");
	buttonContainer.node().innerHTML = "";
	buttonContainer.append("div").text("The following pages will provide guidance on how to answer parents' questions.");

	SetBulletProgress(10, 7);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'Sect00NewEnding08()');
}

function Sect00NewEnding08(){
	titleSection.select('h1').text("I’m worried my child will think that getting this vaccine makes it OK to have sex.");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.style("overflow-y", "auto");
	buttonContainer.node().innerHTML = "";
	var list = buttonContainer.append("ul");
	list.append("li").text("Studies tell us that getting vaccinated doesn’t make kids more likely to start having sex. I made sure my child (or grandchild, etc.) got HPV vaccine.");

	SetBulletProgress(10, 7);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'Sect00NewEnding09()');
}

function Sect00NewEnding09(){
	titleSection.select('h1').text("Is HPV vaccination safe?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.style("overflow-y", "auto");
	buttonContainer.node().innerHTML = "";
	var list = buttonContainer.append("ul");
	list.append("li").text("Yes, HPV vaccination is very safe. Like any medicine, vaccines can cause side effects, including pain, swelling, or redness where the shot was given. That’s normal for HPV vaccine too and should go away in a day or two. Sometimes kids faint after they get shots and they could be injured if they fall from fainting.");
	list.append("li").text("To prevent fainting and injuries from fainting, anyone receiving HPV vaccine should be seated or lying down during vaccination and for 15 minutes after getting the shot.");
	list.append("li").text("Other info if you want to use it: With more than 135 million doses distributed in the United States, HPV vaccine has a reassuring safety record that is backed by over 15 years of monitoring and research.");

	SetBulletProgress(10, 8);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'Sect00NewEnding10()');
}

function Sect00NewEnding10(){
	titleSection.select('h1').text("How can I get help paying for these vaccines?");
	ClearSection(midSection);
	midSection.node().innerHTML = m2_typeMultipleChoice;
	var buttonContainer = midSection.select('#buttonContainer');
	buttonContainer.style("overflow-y", "auto");
	buttonContainer.node().innerHTML = "";
	var list = buttonContainer.append("ul");
	list.append("li").text("The Vaccines for Children (VFC) program provides vaccines for children ages 18 years and younger who are uninsured, Medicaid-eligible, American Indian or Alaska Native. Learn more at www.cdc.gov/vaccines/programs/vfc/parents/qa-detailed.html");
	list.append("li").text("You can also check with your local health department and with your health insurance.");

	SetBulletProgress(10, 0);

	d3.select('#bottomContinueButtonContainer').style("justify-content", "flex-start");
	d3.select('#bottomContinueButton').text("Continue").style("visibility", "visible").attr('onClick', 'End()');
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
	var centerSection = midSection.select("#narrationContainer");
	centerSection
		.style("width", "100%")
		.style("line-height", "2.5em")
		.style("font-size", "larger");
	centerSection.append("div").text("That concludes the simulation. Thank you for participating!");
	centerSection.append("div").text("Please click on the following link to complete a post-simulation survey:");
	centerSection.append("div").append("a")
		.attr("href", "https://osu.az1.qualtrics.com/jfe/form/SV_6zAAKgSaQyfIpPo?ParticipantID="+ (new URL(window.location)).searchParams.get('ParticipantID'))
		.html("Take post-simulation survey")// https://osu.az1.qualtrics.com/jfe/form/SV_6zAAKgSaQyfIpPo?ParticipantID=" + 
				//(new URL(window.location))
				//	.searchParams
				//		.get('ParticipantID')
			//) // {e://Field/ParticipantID} ")
		.style("color", "white")
		.style("font-weight", "bold");
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

