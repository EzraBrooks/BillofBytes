var senatetext = '';
var housetext = '';
var billactions = "";
var loadcomplete = false;
var alive = '';
function getApi(topic){ //Retrieve JSONP API file
  var api = document.createElement('script');
  api.src = 'http://www.govtrack.us/api/v2/bill?congress=112&order_by=-current_status_date&format=jsonp&q='+topic
  //console.log(api);
  for(i=0;i<document.head.childNodes.length;i++){
    if(document.head.childNodes[i] == api){
      document.head.removeChild(document.head.childNodes[i]);
      break;
    }
  }
  document.head.appendChild(api);
  senatetext = '';
  housetext = '';
}
function callback(contents){ //API callback
  for(var i = 0; i < contents.objects.length; i++){
    var that = contents.objects[i]
    for(var j = 0; j < that.major_actions.length; j++){
      billactions = billactions + '<li>' + that.major_actions[j][2] + '</li>'
    }
    //categorize statuses, store to alive
    //senatetext = senatetext+that.is_current;
    if(that.bill_type == 'senate_bill'){
      if(that.is_alive){
        var life = "alive"
      }else if(that.current_status == "prov_kill_veto" || that.current_status == "fail_second_senate" || that.current_status == "vetoed_override_fail_second_house" || that.current_status == "fail_originating_house" || that.current_status == "fail_second_house"){
        //MORE VALUES NEED TO BE ADDED TO THIS LIST, OR USE A LOGIC TRICK TO COVER EVERYTHING
        var life = "dead"
      }else if(that.current_status == "introduced" || that.current_status == "referred"){
        //Same as above comment
        var life = "limbo"
      }
      senatetext = senatetext +  '<div class="senate bill '+life+'"><h3>' + that.display_number + ': ' + that.current_status_label + ' as of '+ that.current_status_date + ', introduced ' + that.introduced_date + '.</h3><h4>' + that.title_without_number + '</h4><ul>' + billactions + '</ul></div>';
    }
    else if(that.bill_type == 'house_bill'){

      housetext = housetext + '<div class="house bill '+life+'"><h3>' + that.display_number + ': ' + that.current_status_label + ' as of '+ that.current_status_date + ', introduced ' + that.introduced_date + '.</h3><h4>' + that.title_without_number + '</h4><ul>' + billactions + '</ul></div>';
    }
    billactions = '';
  }
  showBills(housetext);
}
function showBills(branchtext){
  document.getElementById('data').innerHTML = branchtext;
}
function init(){ //begin script
  getApi('piracy');
}
init();