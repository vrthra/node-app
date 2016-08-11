function bindKeys() {
  for (let v of document.getElementsByClassName("update")) {
    v.addEventListener("click", function(event) {
      iTr = this.parentElement.parentElement;
      showInput(iTr.children[2].children[0].name, iTr.children[0].children[0].text, iTr.children[0].children[0].href);
    });
  }

  for (let v of document.getElementsByClassName("remove")) {
    v.addEventListener("click", function(event) {
      var req = new XMLHttpRequest();
      var payload = {id:this.name}
      req.open("POST", "/remove", true);
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
  }
  document.getElementById("add").addEventListener("click", function(event) {
    showInput("", "", "");
    event.preventDefault();
  });
}

bindKeys();


document.getElementById("bsave").addEventListener("click", function(event) {
  document.getElementById("inputdiv").style = 'display: none';
  var mytext = document.getElementById("itext").value;
  var mylink = document.getElementById("ilink").value;
  var myid = document.getElementById("myid").value;
  var req = new XMLHttpRequest();
  var payload = {link:mylink, text:mytext};
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
  bindKeys();
}

showInput(myid, itext, ilink) {
  document.getElementById("myid").value =   myid
  document.getElementById("itext").value = itext
  document.getElementById("ilink").value = ilink
  document.getElementById("inputdiv").style = 'display: block'
}
