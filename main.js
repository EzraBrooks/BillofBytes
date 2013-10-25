var senatetext = '';
var housetext = '';
var billactions = [];
var moreactions = [];
var loadcomplete = false;
var last = "house";
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
  var sencount = 0;
  var housecount=0;
  for(var i = 0; i < contents.objects.length; i++){
    var classes = '';
    var that = contents.objects[i]
    billactions[i] = "";
    for(var j = 0; j < that.major_actions.length && j<5; j++){
      if(billactions[i].match(/li/) == null || billactions[i].match(/li/).length / 2 < 5){
        billactions[i] = billactions[i] + '<li>' + that.major_actions[j][2] + '</li>';
      }else{
        moreactions[i] = moreactions[i] + '<li>' + that.major_actions[j][2] + '</li>';
      }
    }
    //categorize statuses, store to variable classes
    if(['enacted_signed','passed_bill','passed_constamend','enacted_veto_override','passed_concurrentres','passed_simpleres'].indexOf(that.current_status)>-1){
      classes = classes + "alive";
    }else if([ 'prov_kill_veto', 'fail_second_senate', 'vetoed_override_fail_second_house',"fail_originating_house","fail_second_house","vetoed_pocket",'vetoed_override_fail_originating_senate','vetoed_override_fail_second_senate','prov_kill_pingpongfail','prov_kill_suspensionfailed','fail_originating_senate'].indexOf( that.current_status ) > -1 ){
      classes = classes + "dead";
    }else if(['introduced','pass_over_senate','pass_over_house', 'referred','pass_back_senate','pass_back_house','override_pass_over_house','override_pass_over_senate','reported'].indexOf(that.current_status)>-1){
      classes = classes + "limbo";
    }
    if(that.bill_type == 'senate_bill'){
      senatetext = senatetext +  '<div class="bill '+classes+' '+ 'b'+ i +'"><a href="#" onclick="showMore('+i+');" id="expand"><img src="img/expand.png"></a><h3>' + that.display_number + ': ' + that.current_status_label + ' as of '+ that.current_status_date + ', introduced ' + that.introduced_date + '.</h3><h4>' + that.title_without_number + '</h4><ul>' + billactions[i] + '</ul></div>';
    }
    else if(that.bill_type == 'house_bill'){
      housetext = housetext + '<div class="bill '+classes+' '+ 'b' + i +'"><a href="#" onclick=showMore('+i+') id="expand"><img src="img/expand.png"></a><h3>' + that.display_number + ': ' + that.current_status_label + ' as of '+ that.current_status_date + ', introduced ' + that.introduced_date + '.</h3><h4>' + that.title_without_number + '</h4><ul>' + billactions[i] + '</ul></div>';
    }
    //billactions = '';
  }
  showBills(housetext);
}
function showBills(branchtext){
  document.getElementById('data').innerHTML = branchtext;
}
function init(){ //begin script
  getApi('piracy');
}
function search(){
  var input = document.getElementById("searchBox").value;
  getApi(input);
}
function showMore (item) {
  //var className = ' ' + item.parentNode.className + ' ';
  var className = 'b'+item
  document.getElementsByClassName(className)[0].innerHTML += moreactions[item]
  /*if (className.indexOf(' tall ')>-1 ) {
    item.parentNode.className = className.replace(' tall ', ' ');
  } else {
    item.parentNode.className += ' tall';
  }*/
}
init();