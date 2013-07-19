var senatetext = "";
var housetext = "";
var billactions = "";
function getApi(){
  var api = document.createElement('script');
  api.src = 'http://www.govtrack.us/api/v2/bill?congress=112&order_by=-current_status_date&format=jsonp&q=internet'
  document.head.appendChild(api)
}
function callback(contents){
  //contents = eval(contents)
  for(var i = 0; i < contents.objects.length; i++){
    for(var j = 0; j < contents.objects[i].major_actions.length; j++){
      billactions = billactions + "<li>" + contents.objects[i].major_actions[j][2] + "</li>"
    }
    if(contents.objects[i].display_number.substr(0,1) == "S"){
      senatetext = senatetext + "<h3>" + contents.objects[i].display_number + ": " + contents.objects[i].current_status_label + " as of "+ contents.objects[i].current_status_date + ", introduced " + contents.objects[i].introduced_date + ".</h3><h4>" + contents.objects[i].titles[0][2] + "</h4><ul>" + billactions + "</ul>";
    }
    else if(contents.objects[i].display_number.substr(0,1) == "H"){
      housetext = housetext + "<h3>" + contents.objects[i].display_number + ": " + contents.objects[i].current_status_label + " as of "+ contents.objects[i].current_status_date + ", introduced " + contents.objects[i].introduced_date + ".</h3><h4>" + contents.objects[i].titles[0][2] + "</h4><ul>" + billactions + "</ul>";
    }
    billactions = "";
  }
}
function showHouse(){
  document.getElementById("data").innerHTML = housetext;
};
function showSenate(){
  document.getElementById("data").innerHTML = senatetext;
}
getApi();