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

document.getElementById("add").addEventListener("click", function(event) {
  document.getElementById("inputdiv").style = 'display: block; position: fixed; bottom: 0; right: 0; width: 300px; border: 3px solid #73AD21;'
  event.preventDefault();
});

document.getElementById("bsave").addEventListener("click", function(event) {
  document.getElementById("inputdiv").style = 'display: none';
  var mytext = document.getElementById("itext").value;
  var mykey = document.getElementById("ikey").value;
  var mylink = document.getElementById("ilink").value;
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
