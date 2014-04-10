var timer;
var section;
var height = 0;

/*Load images*/
var pause = 3000;
var n = 0;
var pictures = new Array("images/banner_kirijka.png", "images/banner_zvanika.png", "images/banner_taiiss.png");
var preload = new Array();
for(var i=0; i<pictures.length; i++)
{
	preload[i] = new Image();
	preload[i].src = pictures[i];
}

/*Show all banners*/
function showPictures()
{
	document.images.projectImage.src = pictures[n];
	(n == (pictures.length - 1)) ? n = 0 : n++;
	setTimeout("showPictures()", pause);
}
	
/*Open all websites defined in the banners*/
function openWebsite(src)
{
	var imageName = src.substring(src.lastIndexOf("/"));
	
	switch(imageName)
	{
		case "/banner_kirijka.png"		: open("http://www.stabil-solutions.com/web_projects.html"); break;
		case "/banner_zvanika.png"		: open("http://www.orkestarzvanika.com/"); break;
		case "/banner_taiiss.png"		: open("http://www.studiotaiiss.com/"); break;
		default 						: open("http://www.stabil-solutions.com/web_projects.html"); break;
	}
}

function displaySection(id)
{
	timer = null;
	height = 0;
	
	var element = document.getElementById(id);
	
	var contentText = document.getElementById("contentText");
	var divElements = contentText.getElementsByTagName("div");
	
	var sections = new Array();
	 
	for(var i=0; i<divElements.length; i++) 
	{
		if(divElements[i].className == "serviceDescription")
			sections.push(divElements[i]);
	}
	
	for(var i=0; i<sections.length; i++) 
	{
		if(sections[i] == element)
		{
			sections[i].style.display = "block";
			height = sections[i].offsetHeight;
			sections[i].style.height = "1px";
			section = sections[i];
			timer=setInterval("slideDownSection()", 1);
		}	
		else
			sections[i].style.display = "none";	
	}	
}

function slideDownSection()
{
	var sectionHeight = section.offsetHeight;
	
	if (sectionHeight <= height)
	{
		sectionHeight = sectionHeight + 10;
		section.style.height = sectionHeight + "px";
	}
	else
	{
		section.style.height = height + "px";
		timer=window.clearInterval(timer);
	}
}

function displayMessageBox(id)
{
	var messageBox = document.getElementById(id);
	messageBox.style.display = "block";
	var height = messageBox.offsetHeight;
	var width = messageBox.offsetWidth;
	messageBox.style.top = (document.documentElement.clientHeight - height) / 2 + "px";
	messageBox.style.left = (document.documentElement.clientWidth - width) / 2 + "px";

	displayShadow(id);
}

function hideMessageBox(id)
{
	var messageBox = document.getElementById(id);
	messageBox.style.display = "none";
	
	hideShadow();
}

function displayShadow(id)
{
	var shadow = document.getElementById("shadow");
	shadow.style.display = "block";
	var container = document.getElementById("container");
	shadow.style.height = container.offsetHeight + "px";
	
	shadow.onclick = function()
	{
		hideMessageBox(id);
	};
}

function hideShadow()
{
	var shadow = document.getElementById("shadow");
	shadow.style.display = "none";	
}

/*Check whether the entered email is valid and if so - send an email */
function subscribe()
{
	var emailInput = document.getElementById("emailInput");
	email = trim(emailInput.value);
	
	if(email == "" || email.length == 0)
	{
		emailInput.value = "";
		document.getElementById("subscription").style.height = "70px";
		document.getElementById("warningEmptyEmail").style.display = "block";
		return;
	}
	
	if(validateEmail(email))
	{
		document.myform.submit();	
	}
	else
	{	
		emailInput.value = "";
		document.getElementById("subscription").style.height = "70px";
		document.getElementById("invalidEmptyEmail").style.display = "block";
	}	
}

function hideErrorMessages()
{
	if(document.getElementById("warningEmptyEmail").style.display == "block")
		document.getElementById("warningEmptyEmail").style.display = "none";

	if(document.getElementById("invalidEmptyEmail").style.display == "block")
		document.getElementById("invalidEmptyEmail").style.display = "none";
	
	document.getElementById("subscription").style.height = "60px";
}

function trim(str)
{
	return str.replace(/^\s+|\s+$/g,"");
}

function validateEmail(email) 
{ 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 