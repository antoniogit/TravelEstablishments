	var estb;
	var filteredObject = [];
	var sortedObject = [];

	function loadFile() {
		var input, file, fr;

		if (typeof window.FileReader !== 'function') {
			alert("The file API isn't supported on this browser yet.");
			return;
		}

		input = document.getElementById('fileinput');
		if (!input) {
			alert("Um, couldn't find the fileinput element.");
		}
		else if (!input.files) {
			alert("This browser doesn't seem to support the `files` property of file inputs.");
		}
		else if (!input.files[0]) {
			alert("Please select a file before clicking 'Load'");
		}
		else {
			file = input.files[0];
			fr = new FileReader();
			fr.onload = receivedText;
			fr.readAsText(file);
		}

		function receivedText(e) {
			lines = e.target.result;
			var newArr = JSON.parse(lines); 
			estb = newArr.Establishments;
			//loadTable();
			if(estb.length >= 1) {
				document.getElementById("locations").style.visibility="visible";
				showWholeTable();
			}
			
		}
	}

function openInNewTab(url) {
	var win = window.open(url, '_blank');
	win.focus();
};

function filterBy() {
	
	if(document.getElementById("filterButton").value == "Remove_Filter") {

		document.getElementById("filterButton").value = "Filter";
		document.getElementById("filterButton").innerHTML = "Filter";
		showWholeTable();
		filteredObject = [];
	} else {

		document.getElementById("tableBody").innerHTML = "";
		var filterValue = document.getElementById('filter').value;
		var text = "";

		if(sortedObject.length >= 1) {
			for(var i=0; i<estb.length; i++) {
				if( contains(filterValue, estb[i]) ) {
					text += textToHtml(estb[i]);
					filteredObject.push(estb[i]);
				}
			}
		} else {
			for(var i=0; i<sortedObject.length; i++) {
				if( contains(filterValue, sortedObject[i]) ) {
					text += textToHtml(sortedObject[i]);
					filteredObject.push(sortedObject[i]);
				}
			}
		}

		if(text !== "" && document.getElementById("filterButton").value == "Filter" && sortedObject.length >=1) { //display new table only if the filtering was succesfull
			document.getElementById("tableBody").innerHTML = text;
			document.getElementById("filterButton").innerHTML = "Remove Filter";
			document.getElementById("filterButton").value = "Remove_Filter";
		} else {
			alert("You can only sort by Name, Stars, UserRating and MinCost");
		}
	}
}

function textToHtml(ithObject) {
	var txt ="";
	txt += "<tr class='mix'>";
	txt += "<td>";
		txt += "<a href='"+ithObject.ImageUrl+"' target='_blank' >";
			txt += "<img src='"+ithObject.ThumbnailUrl+"'; alt='image' class='thumbnails' />";
		txt += "</a>";
	txt += "</td>";
	txt += "<td  class='Name'>";
		txt+= "<span>"+ithObject.Name+"</span>";
	txt += "</td>";
	txt += "<td class='Stars'>";
		txt+= "<span>"+ithObject.Stars+"</span>";
	txt += "</td>";
	txt += "<td>";
		txt+= "<span>"+ithObject.Location+"</span>";
	txt += "</td>";
	txt += "<td>";
		txt+= "<span>"+ithObject.Distance+"</span>";
	txt += "</td>";
	txt += "<td>";
		txt+= "<span>"+ithObject.EstablishmentId+"</span>";
	txt += "</td>";
	txt += "<td>";
		txt+= "<span>"+ithObject.EstablishmentType+"</span>";
	txt += "</td>";
	
	txt += "<td class='MinCost'>";
		txt+= "<span>"+ithObject.MinCost+"</span>";
	txt += "</td>";
	txt += "<td class='UserRating'>";
		txt+= "<span>"+ithObject.UserRating+"</span>";
	txt += "</td>";
	txt += "<td>";
		txt+= "<span>"+ithObject.UserRatingTitle+"</span>";
	txt += "</td>";
	txt += "<td>";
		txt+= "<span>"+ithObject.UserRatingCount+"</span>";
	txt += "</td>";
	txt += "</tr>"
	return txt;
}

function contains(filterValue, ithObject) {
	if(ithObject.Name.indexOf(filterValue) != -1 || ithObject.Stars == filterValue || ithObject.UserRating == filterValue || ithObject.MinCost == filterValue)
		return true;
	return false;
}

function showWholeTable() {
	var text = "";
	for(var i=0; i<estb.length; i++){
			text += textToHtml(estb[i]);
	}
	document.getElementById("tableBody").innerHTML = text;
}

function sortBy(sortByElement) {
	
	var sortType = document.getElementById(sortByElement).value;
	if(sortType == "ascending") {
		if(filteredObject.length >=1) {
					
					sortedObject = filteredObject;
					sortedObject.sort(function(a, b){
						console.log(a[sortByElement]);
    						return parseFloat(a[sortByElement]) - parseFloat(b[sortByElement]);
						})
		} else {
					sortedObject = estb;
					sortedObject.sort(function(a, b){
    						return parseFloat(a[sortByElement]) - parseFloat(b[sortByElement]);
					})
	
		}

		document.getElementById(sortByElement).value = "descending";

	} else if(sortType == "descending") {
			if(filteredObject.length >=1 )  {
					sortedObject = filteredObject;
					sortedObject.reverse(function(a, b) {

    						return parseFloat(a[sortByElement]) - parseFloat(b[sortByElement]);
						})
		} else {
					sortedObject = estb;
					sortedObject.reverse(function(a, b){
    						return parseFloat(a[sortByElement]) - parseFloat(b[sortByElement]);
					})
		}
		document.getElementById(sortByElement).value = "ascending";
	}
	console.log(sortedObject);
	if(sortedObject) {
		var text = "";
		for(var i=0; i<sortedObject.length; i++) {
			text += textToHtml(sortedObject[i]);
		}
		document.getElementById("tableBody").innerHTML = text;
	}
	
}