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
  var req = new XMLHttpRequest();
  var payload = {key:mykey, link:mylink, text:mytext};
  req.open("POST", "/insert", true);
  req.setRequestHeader("Content-Tpye", "application/json");
  req.send(JSON.stringify(payload));
  event.preventDefault();
});
