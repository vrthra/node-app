function bindKeys() {
  for (let v of document.getElementsByClassName("update")) {
    v.addEventListener("click", function(event) {
      iTr = this.parentElement.parentElement;
      showInput(iTr.children[2].children[0].name, iTr.children[0].children[0].text, iTr.children[0].children[0].href);
    });
  }

  for (let v of document.getElementsByClassName("remove")) {
    v.addEventListener("click", function(event) {
      var payload = {id:this.name}
      reqJSON("/remove", payload, reconstruct);
      event.preventDefault();
    });
  }

  document.getElementById("add").addEventListener("click", function(event) {
    showInput("", "", "");
    event.preventDefault();
  });

  document.getElementById("bsave").addEventListener("click", function(event) {
    var payload = fetchInput();
    var action = '/insert';
    if (payload.myid != '') {
      action = "/update";
    }
    reqJSON(action, payload, reconstruct);
    event.preventDefault();
  });
}

bindKeys();

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

function showInput(myid, itext, ilink) {
  document.getElementById("myid").value = myid;
  document.getElementById("itext").value = itext;
  document.getElementById("ilink").value = ilink;
  document.getElementById("inputdiv").style.display = 'block';
}

function fetchInput() {
  document.getElementById("inputdiv").style.display = 'none';
  var ret = {}
  ret.text = document.getElementById("itext").value;
  ret.link = document.getElementById("ilink").value;
  ret.myid = document.getElementById("myid").value;
  return ret
}

function reqJSON(action, payload, onresponse) {
  req.open("POST", action, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.addEventListener("load", function() {
    if(req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      onresponse(response);
    }
  });
  req.send(JSON.stringify(payload));
}

