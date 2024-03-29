/* 
Refazer o jeito que as runs sao armazenadas, porque qualquer mudanca no arquivo que nao foi eu quebra tudo
E refazer o script de getRuns.js e principalmente o getState.js
Tentar usar uma database real, ou so refazer o CSV

*/


setButtons("rsgBtn");
document.getElementById("1.16Btn").style = "background-color: #666494"

selectedCat = "1.16rsg"

document.getElementById("brBtn").addEventListener("click", function(){
  document.getElementById("estado").innerHTML = "Brasil"
  selectedState = "none"
  getState();
});

// Function to parse and create elements
function generateDivWithClasses(container, classes) {
  let div = document.createElement('div');
  div.classList.add('d-flex', 'justify-content-between', 'runner');
  
  let p1 = document.createElement('p');
  p1.textContent = classes[0]; // Use the first value from the array
  
  let p2 = document.createElement('p');
  p2.textContent = classes[1]; // Use the second value from the array
  
  div.appendChild(p1);
  div.appendChild(p2);
  
  container.appendChild(div);
}

function generateDivWithValues(container, values) {
  let div = document.createElement('div');
  div.classList.add('d-flex', 'justify-content-between', 'runner');

  let pIndex = document.createElement('p');
  pIndex.textContent = values[0]; // Display the row index

  let p1 = document.createElement('p');
  p1.textContent = values[1]; // Use the first value from the array
  
  let p2 = document.createElement('p');
  p2.textContent = values[2];

  let iconElement = document.createElement('i');
  iconElement.classList.add('fa-solid', 'fa-arrow-up-right-from-square');

  document.body.appendChild(p2);
  
  div.appendChild(pIndex);
  div.appendChild(p1);
  div.appendChild(p2);
  
  
  container.appendChild(div);
}

function parseAndCreateElements(slice1, slice2) {
  Papa.parse("./Scripts/tabela.csv", {
    download: true,
    header: false,
    complete: function(results) {

      let data = results.data.slice(0, 100); //primeiras 100 linhas

      let divContainer = document.getElementById('tbl-data');
      clearContainer(divContainer); // limpa a div

      generateDivWithClasses(divContainer, data[0].slice(slice1, slice2)); //corta as colunas que quer

      for (let i = 1; i < data.length; i++) {
        let rowData = data[i].slice(slice1, slice2);
        generateDivWithValues(divContainer, rowData);
        if (rowData[0] == false){
          return
        }
      }
    }
  });
}

function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function setButtons(selectedButtonId) {
  var buttons = ["ssgBtn", "rsgBtn", "1.16Btn", "1.14Btn", "1.7Btn"];

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i] === selectedButtonId) {
      document.getElementById(buttons[i]).style.backgroundColor = "#666494";
    } else {
      document.getElementById(buttons[i]).style.backgroundColor = "";
    }
  }

}



document.getElementById("ssgBtn").addEventListener("click", function() {

  setButtons("ssgBtn");

  selectedCat = "1.16ssg";
  if (selectedState != "none"){
    getState();
    document.getElementById("verDiv").style = "visibility: hidden;"
  } 
  else if (selectedState == "none"){
    parseAndCreateElements(13,17);
    document.getElementById("verDiv").style = "visibility: hidden;"
  }
});

document.getElementById("rsgBtn").addEventListener("click", function() {

  setButtons("rsgBtn");
  document.getElementById("1.16Btn").style = "background-color: #666494"

  selectedCat = "1.16rsg"

  if (selectedState != "none"){
    getState();
    document.getElementById("verDiv").style = "visibility: visible;"
  } 
  else if (selectedState == "none"){
    parseAndCreateElements(0,4);
    document.getElementById("verDiv").style = "visibility: visible;"
  }

});

document.getElementById("outrasBtn").addEventListener("click", function() {

});

document.getElementById("1.7Btn").addEventListener("click", function() {

  setButtons("rsgBtn");
  document.getElementById("1.7Btn").style = "background-color: #666494"

  selectedCat = "1.7rsg"
  if (selectedState != "none"){
    getState();
  } 
  else if (selectedState == "none"){
    parseAndCreateElements(9,12);
  }
  
});

document.getElementById("1.14Btn").addEventListener("click", function() {

  setButtons("rsgBtn");
  document.getElementById("1.14Btn").style = "background-color: #666494"


  selectedCat = "1.14rsg"
  if (selectedState != "none"){
    getState();
  } 
  else if (selectedState == "none"){
    parseAndCreateElements(5,8);
  }

});

document.getElementById("1.16Btn").addEventListener("click", function() {
  setButtons("rsgBtn");
  document.getElementById("1.16Btn").style = "background-color: #666494"

  selectedCat = "1.16rsg"

  if (selectedState != "none"){
    getState();
  } 
  else if (selectedState == "none"){
    parseAndCreateElements(0,3);
  }

});

parseAndCreateElements(0,3);
