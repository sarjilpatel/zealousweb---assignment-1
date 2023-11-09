//ON LOAD
var data = document.cookie ? JSON.parse(document.cookie.split("=")[1]) : [];

var stringHTML = data
  .map((item) => {
    return `
          <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
        
            <td><i class="fa fa-edit myicon" onclick="edit(${item.id})"></i></td>
            <td><i class="fa fa-trash myicon" onclick="deleteData(${item.id})"></i></td>
            
          </tr>
  `;
  })
  .join("");

document.getElementById("display_table_rows").innerHTML = stringHTML;

//Function to ADD data
function addData() {
  var data = document.cookie ? JSON.parse(document.cookie.split("=")[1]) : [];
  console.log(data);
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (id === "" || name === "" || email === "") {
    return alert("Please provide all details");
  }

  var foundSameID = false;

  data.forEach((d) => {
    if (d.id === id) {
      foundSameID = true;
    }
  });

  if (foundSameID) {
    return alert("Data with this id already exist");
  }

  var userdata = { id, name, email };

  data = [...data, userdata];

  const d = new Date();
  d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();

  document.cookie = `data= ${JSON.stringify(data)}; ${expires};`;

  window.location.reload();
}

//Function to EDIT data
function editData() {
  var data = document.cookie ? JSON.parse(document.cookie.split("=")[1]) : [];

  const id = document.getElementById("editid").value;
  const name = document.getElementById("editname").value;
  const email = document.getElementById("editemail").value;

  if (id === "" || name === "" || email === "") {
    return alert("Please provide all details");
  }

  objIndex = data.findIndex((obj) => obj.id == id);

  data[objIndex].name = name;
  data[objIndex].email = email;

  const d = new Date();
  d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();

  document.cookie = `data= ${JSON.stringify(data)}; ${expires};`;

  window.location.reload();
}

//Function to call at edit button
function edit(id) {
  document.getElementById("edit_form_container").style.display = "flex";
  var data = JSON.parse(document.cookie.split("=")[1]);
  console.log(data);
  let obj = data.find((o) => o.id == id);
  console.log(obj);
  document.getElementById("editid").value = obj.id;
  document.getElementById("editname").value = obj.name;
  document.getElementById("editemail").value = obj.email;
}

//Function to call at delete button
function deleteData(id) {
  var data = JSON.parse(document.cookie.split("=")[1]);
  var filtered = data.filter((el) => {
    return el.id != id;
  });

  const d = new Date();
  d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();

  document.cookie = `data= ${JSON.stringify(filtered)}; ${expires};`;

  window.location.reload();
}
