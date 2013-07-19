function importAPI(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://www.govtrack.us/api/v2/role?current=true", false);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      var respobj = eval(resp)
      document.write(respobj.objects[1].person.firstname);
    }
  }
  xhr.send();
  return createdDate;
}
importAPI();