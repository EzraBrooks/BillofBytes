var senatetext = "";
var housetext = "";
var billactions = "";
function getApi(topic){ //Retrieve JSONP API file
  var api = document.createElement('script');
  api.src = 'http://www.govtrack.us/api/v2/bill?congress=112&order_by=-current_status_date&format=jsonp&q='+topic
  //console.log(api);
  if(document.head.lastChild != api){
    document.head.appendChild(api);
  };
  senatetext = "";
  housetext = "";
}
function callback(contents){ //API callback
  for(var i = 0; i < contents.objects.length; i++){
    for(var j = 0; j < contents.objects[i].major_actions.length; j++){
      billactions = billactions + "<li>" + contents.objects[i].major_actions[j][2] + "</li>"
    }
    if(contents.objects[i].bill_type == "senate_bill"){
      senatetext = senatetext + "<h3>" + contents.objects[i].display_number + ": " + contents.objects[i].current_status_label + " as of "+ contents.objects[i].current_status_date + ", introduced " + contents.objects[i].introduced_date + ".</h3><h4>" + contents.objects[i].title_without_number + "</h4><ul>" + billactions + "</ul>";
    }
    else if(contents.objects[i].bill_type == "house_bill"){
      housetext = housetext + "<h3>" + contents.objects[i].display_number + ": " + contents.objects[i].current_status_label + " as of "+ contents.objects[i].current_status_date + ", introduced " + contents.objects[i].introduced_date + ".</h3><h4>" + contents.objects[i].title_without_number + "</h4><ul>" + billactions + "</ul>";
    }
    billactions = "";
  }
}
function showBills(branchtext){
  document.getElementById("data").innerHTML = branchtext;
}
getApi("piracy"); //begin script