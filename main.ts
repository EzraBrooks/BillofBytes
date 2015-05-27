var senateBills: HTMLElement;
var houseBills: HTMLElement;
//please don't steal my API key ;_;
var apiKey: string = "103ecb550e38406382359bdc61a5059d";

//Big thanks to Nicholas Zakas for writing and publishing the original JS version of this function
function createCORSRequest(): XMLHttpRequest{
  	var xhr: XMLHttpRequest = new XMLHttpRequest();
  	if (!("withCredentials" in xhr)) {
    	// Check if the XMLHttpRequest object has a "withCredentials" property.
    	// "withCredentials" only exists on XMLHTTPRequest2 objects, which are necessary for CORS.
		alert("Your browser doesn't support some modern JavaScript functions. Please update to a modern browser!");
    	throw new Error('CORS not supported.');
  	}
  	return xhr;
}

//TODO make EVERYTHING strongly typed. LEAVE NO "ANY" ALIVE
//TODO make most comments JSDoc-compatible
function getApi(topic){
	var apiRequest: XMLHttpRequest = createCORSRequest();
	apiRequest.open('GET', 'https://congress.api.sunlightfoundation.com/bills/search?query=' + topic + '&apikey=' + apiKey);
	apiRequest.onloadend = apiHandler;
	apiRequest.send();
}

function apiHandler(): void{
	if (this.status != 200){
		alert('API retrieval failed.');
		throw new Error('API request failed: ' + this.statusText);
	}else{
		parseBills(JSON.parse(this.responseText));
	}
}
//API callback
function parseBills(contents){
	senateBills = document.createElement('ul');
	contents.results.forEach(function(bill) {
		console.log(bill);
		var billAsListItem: HTMLElement = document.createElement('li');
		//process and add attributes
		if(bill.history.active){
			billAsListItem.setAttribute('class', 'bill alive');
		}else{
			billAsListItem.setAttribute('class', 'bill dead');
		}
		billAsListItem.innerHTML = bill.bill_id;
		senateBills.appendChild(billAsListItem);
	}, this);
	senateBills.setAttribute('id', 'bills');
	document.getElementById('container').appendChild(senateBills);
}

function init(){ //begin script
  	getApi('piracy');
}

function search(){
  	var input = document.getElementById("searchBox").getAttribute('value');
  	getApi(input);
}

init();