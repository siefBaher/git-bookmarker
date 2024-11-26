var SiteName = document.getElementById("SiteName");
var SiteURL = document.getElementById("SiteURL");
var submitBTN = document.querySelector(".btn-brown");
var lightBoxCountaner = document.querySelector(".lightBoxCountaner");
var exit = document.querySelector(".fa-x");
var siteList;
if (localStorage.getItem("storageData") == null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("storageData"));
}
displaySites();
function addSite() {
  if (
    SiteName.classList.contains("is-valid") &&
    SiteURL.classList.contains("is-valid")
  ) {
    var data = {
      sName: SiteName.value,
      sURL: SiteURL.value,
    };
    siteList.push(data);
    localStorage.setItem("storageData", JSON.stringify(siteList));
    clearInputs();
    displaySites();
  } else {
    lightBoxCountaner.classList.remove("d-none");
    exit.addEventListener("click",function(){
    lightBoxCountaner.classList.add("d-none")
    });
    SiteName.nextElementSibling.classList.remove("d-none")   
    SiteURL.nextElementSibling.classList.remove("d-none")   
  }
}
submitBTN.addEventListener("click", function () {
  addSite();
});
function clearInputs() {
  SiteName.value = null;
  SiteURL.value = null;
  SiteName.classList.remove("is-valid");
  SiteURL.classList.remove("is-valid");
}

function displaySites() {
  var bookmark = "";
  for (var i = 0; i < siteList.length; i++) {
    bookmark += `
            <div class="col-2"><p>${i + 1}</p></div>
            <div class="col-6"><p>${siteList[i].sName}</p></div>
            <div class="col-2"><button class="btn btn-limgreen btn-sm p-2">
                <a href="${
                  siteList[i].sURL
                }" class="text-decoration-none text-white">
                    <i class="fa-solid fa-eye fa-sm"></i> <span>Visit</span>
                </a>
            </button></div>
            <div class="col-2"><button onclick="toDeleteItem(${i})" class="btn btn-danger btn-sm p-2 " id="deleteItem" ><i class="fa-solid fa-trash-can"></i> Delete</button></div>
        `;
  }
  document.querySelector("#bookmark").innerHTML = bookmark;
}

function toDeleteItem(deletedIndex) {
  siteList.splice(deletedIndex, 1);
  localStorage.setItem("storageData", JSON.stringify(siteList));
  displaySites();
}

function toValidate(element) {
  var validator = {
    SiteName: /^\w{3,}$/,
    SiteURL:
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/,
  };
  if (validator[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.classList.remove("inputs");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.classList.remove("inputs");
    element.nextElementSibling.classList.remove("d-none");
  }
}

SiteName.addEventListener("input", function () {
  toValidate(this);
;
  
});
SiteURL.addEventListener("input", function () {
  toValidate(this);
});
