for (let v of document.getElementsByClassName("update")) {
  v.addEventListener("click", function(event) {
    //var payload = {key:mykey, id:this.value};
    document.getElementById("itext").value = this.parentElement.parentElement.children[0].children[0].text;
    document.getElementById("myid").value =   this.parentElement.parentElement.children[2].children[0].name;
    document.getElementById("ilink").value = this.parentElement.parentElement.children[0].children[0].href;
    document.getElementById("inputdiv").style = 'display: block';
  });
}

for (let v of document.getElementsByClassName("remove")) {
  v.addEventListener("click", function(event) {
    var req = new XMLHttpRequest();
    var payload = {key: mykey, id:this.value}
    req.open("POST", "/remove", true);
    req.setRequestHeader("Content-Tpye", "application/json");
    req.addEventListener("load", function() {
      if(req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        reconstruct(response);
      }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
  });
}

document.getElementById("add").addEventListener("click", function(event) {
  document.getElementById("inputdiv").style = 'display: block; position: fixed; bottom: 0; right: 0; width: 600px; border: 3px solid #73AD21;'
  event.preventDefault();
});

document.getElementById("bsave").addEventListener("click", function(event) {
  document.getElementById("inputdiv").style = 'display: none';
  var mytext = document.getElementById("itext").value;
  var mykey = document.getElementById("ikey").value;
  var mylink = document.getElementById("ilink").value;
  var myid = document.getElementById("myid").value;
  var req = new XMLHttpRequest();
  var payload = {key:mykey, link:mylink, text:mytext};
  if (myid != '') {
    payload.id = myid;
    req.open("POST", "/update", true);
  } else {
    req.open("POST", "/insert", true);
  }
  req.setRequestHeader("Content-Type", "application/json");
  req.addEventListener("load", function() {
    if(req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      reconstruct(response);
    }
  });
  req.send(JSON.stringify(payload));
  event.preventDefault();
});

function reconstruct(response) {
  iTbody = document.getElementById('rows'); //tbody
  iTbody.innerHTML = '';
  for(x of response) {
    var iTr = document.createElement("tr");
    iTr.innerHTML = '<td><a href="' + x.link + '">' + x.text + '</a></td>' +
      '<td><input type="button" class="remove" value="X" name="' + x.id + '"/></td>'+
      '<td><input class="update" type="button" value="O" name="' + x.id + '"/></td>';
    iTbody.appendChild(iTr);
  }
}
