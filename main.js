function getApi(){
  var api = document.createElement('script');
  api.src = 'http://www.govtrack.us/api/v2/role?current=true&format=jsonp&callback=process'
  document.head.appendChild(api)
}
function process(){
  document.write(api.objects)
}
getApi();