for (let v of document.getElementsByClassName("update")) {
  v.addEventListener("click", function(event) {
    var req = new XMLHttpRequest();
    var payload = {key:mykey, id:this.value};
    alert(this.id);
    req.open("POST", "/update", true);
    req.setRequestHeader("Content-Tpye", "application/json");
    req.send(JSON.stringify(payload));
    event.preventDefault();
  });
}

for (let v of document.getElementsByClassName("remove")) {
  v.addEventListener("click", function(event) {
    var req = new XMLHttpRequest();
    var payload = {key: mykey, id:this.value}
    req.open("POST", "/remove", true);
    req.setRequestHeader("Content-Tpye", "application/json");
    req.send(JSON.stringify(payload));
    event.preventDefault();
  });
}

document.getElementsById("add").addEventListener("click", function(event) {
  document.getElementsById("inputdiv").style = 'display: block; position: fixed; bottom: 0; right: 0; width: 300px; border: 3px solid #73AD21;'
  event.preventDefault();
});

document.getElementsById("bsave").addEventListener("click", function(event) {
  document.getElementsById("inputdiv").style = 'display: none';
  var mytext = document.getElementsById("itext").value;
  var mykey = document.getElementsById("ikey").value;
  var mylink = document.getElementsById("ilink").value;
  var req = new XMLHttpRequest();
  var payload = {key:mykey, link:mylink, text:mytext};
  req.open("POST", "/insert", true);
  req.setRequestHeader("Content-Tpye", "application/json");
  req.addEventListener("load", function() {
    if(req.status >= 200 && req.status < 400) {
      var response = JSON.parse(JSON.parse(req.responseText).data);
      console.log(response);
    }
  });
  req.send(JSON.stringify(payload));
  event.preventDefault();
});
