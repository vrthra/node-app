for (let v of document.getElementsByClassName("update")) {
  v.addEventListener("click", function(event) {
    var req = new XMLHttpRequest();
    var payload = {name:null, reps:null, weight:null, date:null, lbs:null};
    alert(this.id);
    //req.open("POST", "/insert", true);
    //req.setRequestHeader("Content-Tpye", "application/json");
    //req.send(JSON.stringify(payload));
    event.preventDefault();
  });
}
