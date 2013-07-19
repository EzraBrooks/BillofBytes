var bodytext = "";
var billactions = "";
function getApi(){
  var api = document.createElement('script');
  api.src = 'http://www.govtrack.us/api/v2/bill?congress=112&order_by=-current_status_date&format=jsonp'
  document.head.appendChild(api)
}
function callback(contents){
  //contents = eval(contents)
  for(var i = 0; i < contents.objects.length; i++){
    for(var j = 0; j < contents.objects[i].major_actions.length; j++){
      billactions = billactions + "<li>" + contents.objects[i].major_actions[j][2] + "</li>"
    }
    bodytext = bodytext + "<p>"+ contents.objects[i].display_number + ": " + contents.objects[i].current_status_label + "</p>" + "<ul>" + billactions + "</ul>";
    if(bodytext){document.getElementById("body").innerHTML = bodytext;}
    billactions = "";
  }
}
getApi();