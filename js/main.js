//alert(localStorage[0]);
// VFW
// Term 1305
// Banchop Ben Kangdouangnhot
// Project 3

// Wait until DOM is ready
window.addEventListener( "DOMContentLoaded", function() {

	// getElementById function
	function main ( clear ) {
	var teams = document.getElementById( clear );
	return teams;
}

	// Create drop down elements from js
	function dropDownList ( ) {
		var formTag = document.getElementsByTagName("form");  //form tags are an array
		selector = main('mStuff');
		makeSelection = document.createElement('select');
		makeSelection.setAttribute("id", "groups");   // used for idGetter function
	 for ( var i = 0, j= addStuff.length; i<j; i++) {
	 		var makeOpt = document.createElement('option');
	 		var opt = addStuff[i];
	 		makeOpt.setAttribute("value", opt);
	 		makeOpt.innerHTML = opt;
	 		makeSelection.appendChild(makeOpt);
	    }
	    selector.appendChild(makeSelection);
	}

	// Find values of selected radio buttons
	function getRadios() {
		var setRadios = document.forms[0].any;
		for ( var i=0; i<setRadios.length; i++) {
			if(setRadios[i].checked) {
			seasonValue = setRadios[i].value;
		   }
	 }
} 
 
    function toggle( t ) {
	 	switch(t) {
	 		case "on" :
	 			main("saveValues").style.display = "none";
	 			main("forms").style.display = "none";
	 			main('Info').style.display ="none";
	 			main('clearData').style.display ="none";
	 			main('back').style.display = "inline";	
	 			main('h2').style.display = "none";
	 			main('h1').style.display = "none";
	 			break;

	 		case "off" :
	 			main("forms").style.display = "block";
	 			main('Info').style.display ="none";
	 			main('clearData').style.display ="none";
	 			main('saveValues').style.display = "inline";
	 			main('items').style.display="none";
	 			break;
	 		default:
	 			return false;
	 	}

	 }


	// get random number
	function storeLocalData() {
		var getId = Math.floor(Math.random()*100000001);
		// Get all form fields values and store into object.
		// Object properties contains array with the form label and input value.

		 getRadios();


		var it 			= {};

			it.sport	= ["Sports ", main("sport").value];
			it.tname	= ["Team Name ", main("tname").value];
			it.name		= ["Name", main("name").value];
			it.group 	= ["More Stuff ", main('groups').value ];  // value is important
			it.aDate	= ["Date ", main("aDate").value];
			it.range	= ["Tickets Desired ", main("range").value];
			it.season	= ["Season ", seasonValue];  // Threw me for a curve!!!
			it.payments	= ["Payments ", main("payments").value];	
			it.concerns = ["Concerns", main("concerns").value];

			// save data to local storage! use Stringify to convert our object to a string
			localStorage.setItem( getId, JSON.stringify(it) );
			alert("Data has been saved!");
	}

	// write data from local storage to browser
	function getData () {
		toggle("on");
		

	if( localStorage.length === 0 ) {
		alert("Nothing to show")
		
		}else{  
		
		var make = document.createElement("div");
		make.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		make.appendChild(makeList);		
		document.body.appendChild(make);
		main('items').style.display="block";	

		// looking in local storage
		for(var i=0, j=localStorage.length; i<j; i++) {
			var makeli = document.createElement("li");
			
			var linksLi = document.createElement("ul");  //creating another list item for week 3
			
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var object = JSON.parse(value); // convert local storage string back to object
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			for ( var m in object ) {
			

				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSub = object[m][0]+" : "+object[m][1];

				makeSubLi.innerHTML = optSub;
		
				makeSubList.appendChild(linksLi); //append dynamically week 3

			}

				makeItemLinks(localStorage.key[i], linksLi); // Create our edit and delete button/link for each item in local storage week3
		}
	}
}	


// make item links functions for local data
// Create the edit and delete links for each stored data item when display.
function makeItemLinks( key, linksLi ){
//add edit single item link
var editLink = document.createElement("a");
editLink.href = "#";
editLink.key = key;   // this is the same thing, in editItem function
var editText = "Edit";
editLink.addEventListener("click", editItem);
editLink.innerHTML = editText;
linksLi.appendChild(editLink);



// add line break via JS
var breakTag = document.createElement("br");
linksLi.appendChild(breakTag);

var deleteLink = document.createElement("a");
deleteLink.href = "#";
deleteLink.key = key;
var deleteText = "Delete Info";
//deleteLink.addEventListener("click", deleteItem);
deleteLink.innerHTML = deleteText;
linksLi.appendChild(deleteLink);

}


function editItem() {
	// get item from local storage.
	var value = localStorage.getItem(this.key);
	var object = JSON.parse(value);
	
	// show form
	toggle("off");
	
	//populate the form fields with current local storage values;
	main("sport").value = it.sport[1];
	main("tname").value = it.tname[1];
	main("name").value = it.name[1];
	main("group").value = it.group[1];
	main("aDate").value = it.aDate[1];
	main("range").value = it.range[1];
	var rad = document.form[0].seasonValue;
	for(var i = 0; i < rad.lenght; i++) {
		if(rad[i].value == "season" && it.sex[i] == "single") {
			rad[i].setAttribute("checked", "checked");
		}else if(rad[i].value == "single" && it.seasonValue[i] == "season"){
			
		}
	
	}
	main("payments").value = it.payments[1];
	main("concerns").value = it.concerns[1];
	
	// Remove the initial listener from the input save button.
	save.removeEventListener("click", storeLocalData);
	//change submit button value to edit button
	main("saveValues").value = "Edit contact";
	// key value used in this function as a property of the editSubmit even
	var editSubmit = main("saveValues");
	editSubmit.key = this.key;
}

function clearLocalData () {
	var youSure = confirm("You sure you want to delete?");
		if(youSure) {  
		  if( localStorage.length === 0){
				alert("Local storage is empty")
			}else{   
			
				localStorage.clear();
				alert("All data has been deleted!");
				window.location.reload();
				return false;
			}
	} 

}


	function validate( eventData ) { // validate then store if needed
		// Define the elements we want to check
		
			var getSport 	   = main("sport");
			var getTname  	   = main("tname");	
			var getName	  	   = main("name");
			
		/*	var getGroup	   = main("group");
			var getAdate	   = main("aDate");
			var getRange	   = main("range");
			var getSeason      = main("season");
			var getPayments	   = main("payments");	
			var getConcerns    = main("concerns");    */
		
		// Get error message
		var messageArray = [];
		// validation
		if (getSport.value === ""){
			var sportError = "Please choose a sport.";
			getSport.style.border = "1px solid red";
			messageArray.push(sportError);
		}
		
		if (getTname.value === "") {
			var tNameError = "Please enter a team name.";
			getTname.style.border = "1px solid red";
			messageArray.push(tNameError);
		}
		
		if (getName.value === "") {
			var nameError = "Please enter your name.";
			getName.style.border = "1px solid red";
			messageArray.push(nameError);
		}
		
		//Email Validation
	/*	var re = /^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3}}+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageArray.push(emailError);      */		
   
	if(messageArray.length >= 1){
		for(var i=0, j=messageArray.length; i<j; i++){
			var text = document.createElement("li");
			text.innerHTML = messageArray[i];
			errMsg.appendChild(text);
		}
	
 	 }
     eventData.preventDefault();
     return false;
  
}  

// range slider
 var sliderRange = document.getElementById("range");
 var sliderDisplay = document.getElementById("tickets");

	sliderRange.onchange = function(){
    sliderDisplay.value = sliderRange.value;
} 
	



	// Variable defaults drop down menu
	var addStuff = [ "tickets", "souvenirs", "apparels" ],
		seasonValue,
		errMsg = main("errors");

	dropDownList();

 	// Set Links and Submit Click Events	
	var displayData = main("Info");
	displayData.addEventListener("click", getData );

	var saveButton = main("saveValues");
	saveButton.addEventListener("click", validate);

	var clearLink = main("clearData");
	clearLink.addEventListener("click", clearLocalData);

});