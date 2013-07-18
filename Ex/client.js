
var listTodo = document.getElementById('list');
var delBtn = document.getElementById('btn');	
var selAllBtn = document.getElementById('btn1');
var inputTodo = document.getElementById('newTodo');
var bottomListItem = document.getElementById('bottomListItem');
var remainingTxt = document.getElementById('remainingTxt');
var body = document.getElementsByTagName("body")[0];

var selectState = false;
//creates a new list item <li>
function createListItem ( content ){
	var newListItem = document.createElement('LI');
	var newListCheckBox = document.createElement('INPUT');
	newListCheckBox.type = 'checkbox';
	newListCheckBox.id = 'listCB';
	var newTextNode = document.createTextNode(content);
	newListItem.appendChild(newListCheckBox);
	newListItem.appendChild(newTextNode);
	return newListItem;
}

//creates the DIV that contains the list item
function createDiv ( content ){
	var newDiv = document.createElement('DIV');			
	var newListItem = createListItem(content);	
	newDiv.id = 'listDiv';
	newDiv.appendChild(newListItem);
	return newDiv;
}

//returns an ARRAY with selected objects from TODO list
function getSelectedItemsList () {
	var selectedItems = new Array();
	for (var i = 0; i < listTodo.children.length; i++) {
		if (listTodo.children[i].children[0].children[0].checked){
			selectedItems.push(listTodo.children[i]);
		}		
	}
	return selectedItems;		
}

//sets the state for the checkboxes from TODO list
function toggleBotoomLI ( state ){
	bottomListItem.style.visibility = state;
}

//returns the item number from TODO list
function getRemainingItems (){
	var remainingItems = listTodo.children.length;
	return remainingItems;
}

function loadRequest ( reqMethod, url, data, cfunc ) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	// code for IE6, IE5
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}	
	xmlhttp.onreadystatechange = cfunc;
	xmlhttp.open(reqMethod, url, true);
	xmlhttp.send(data);
}

//adds a new TODO item in <ul>
var addHandler = function ( e ){
	if (inputTodo.value){
		var data = inputTodo.value;
		if (e.keyCode == 13){				
			loadRequest("POST", null, data, function (){
				if (xmlhttp.readyState==4 && xmlhttp.status==200) {
					var newDiv = createDiv(data);
					listTodo.appendChild(newDiv);
					remainingItemsHandler();
				}
			});			
			newTodo.value = "";
			toggleBotoomLI('visible');
		}				
	}	
}

//deletes the selected items from list <ul>
var deleteHandler = function ( e ){
	var i;
	var contentSelItems = Array();
	var selectedItems = getSelectedItemsList();
	
	for (i = 0; i < selectedItems.length; ++i){
		var textNode = selectedItems[i].children[0].children[0].nextSibling.nodeValue;
	 	contentSelItems.push(textNode);
	 	//console.log(textNode);
	}

	var jselectedItems = JSON.stringify(contentSelItems);

	loadRequest("DELETE", null, jselectedItems, function () {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			console.log(selectedItems);
			for (i = 0; i < selectedItems.length; ++i){
				listTodo.removeChild(selectedItems[i]);
			}
			if (!listTodo.children.length){
				toggleBotoomLI('hidden');
				newTodo.value = "";
			}
			remainingItemsHandler();
		}
	});

	
}

//sets the state of checkboxes from TODO list <ul>
var selectAllHandler = function ( e ) {
	if (selectState){
		selectState = false;
	}else{
		selectState = true;
	}
	for (var i = 0; i < listTodo.children.length; i++) {
		listTodo.children[i].children[0].children[0].checked = selectState;				
	}
}


var remainingItemsHandler = function ( e ) {
	remainingTxt.innerHTML = 'remaining: ' + getRemainingItems();
}

var initHandler = function ( e ) {	
	loadRequest("GET", "null", null, function () {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			var list = JSON.parse(xmlhttp.responseText);			
			if (list.length){
				for ( var i = 0; i < list.length; i++ ) {
					var newDiv = createDiv(list[i]);
					listTodo.appendChild(newDiv);
				}
				remainingItemsHandler();
				newTodo.value = "";
				toggleBotoomLI('visible');
			}
		}
	});
}

//adding listeners to elements from DOM	
body.addEventListener("load", initHandler(), false);
inputTodo.addEventListener('keypress', addHandler, false);
delBtn.addEventListener('click', deleteHandler, false);
selAllBtn.addEventListener('click', selectAllHandler, false);
