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
	 			main('saveValues').style.display = "none";
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
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var object = JSON.parse(value); // convert local storage string back to object
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for ( var m in object ) {

				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSub = object[m][0]+" : "+object[m][1];
				makeSubLi.innerHTML = optSub;

			}

		}
	}
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

// range slider
 var sliderRange = document.getElementById("range");
var sliderDisplay = document.getElementById("tickets");

sliderRange.onchange = function(){
    sliderDisplay.value = sliderRange.value;
} 
	



	// Variable defaults drop down menu
	var addStuff = [ "tickets", "souvenirs", "apparels" ],
		seasonValue;

	dropDownList();

 	// Set Links and Submit Click Events	
	var displayData = main("Info");
	displayData.addEventListener("click", getData );

	var saveButton = main("saveValues");
	saveButton.addEventListener("click", storeLocalData);

	var clearLink = main("clearData");
	clearLink.addEventListener("click", clearLocalData);

});
