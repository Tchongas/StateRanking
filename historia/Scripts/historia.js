let pastVersion = ""


let RBSjsonData = null; // Global variable to store JSON data

async function fetchRBSData(variableName) {
    const apiKey = 'AIzaSyAgRJh3hMNn84hWJYnwoXhq3Pw_Ew1yyrw';
    const spreadsheetId = '1wHgbckH2QZwaD_yxUynviNxNGsN0o7H97aN8BKOkIBM';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${variableName}?alt=json&key=${apiKey}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            RBSjsonData = await response.json();
            RBSjsonData.values.shift();
            console.log(RBSjsonData.values); // Log the entire data array
            // Call a function to render data in HTML
            parseAndCreateRBS(0, 10, RBSjsonData)
        } catch (error) {
        
        }
    }

function changeRBSversion(version) {
    document.getElementById("run-container").innerHTML = ""
    fetchRBSData(version)
    if (version == "historicossg") {
        document.getElementById("title").textContent = "RECORDES PASSADOS SSG"
        document.getElementById("descriptionRSG").style.display = "none"
        document.getElementById("descriptionSSG").style.display = "block"

        document.getElementById("version-selector-SSG").classList.add("version-selector-active")
        document.getElementById("version-selector-RSG").classList.add("version-selector-text")
        document.getElementById("version-selector-RSG").classList.remove("version-selector-active")
    } else {
        document.getElementById("title").textContent = "RECORDES PASSADOS RSG"

        document.getElementById("descriptionRSG").style.display = "block"
        document.getElementById("descriptionSSG").style.display = "none"

        document.getElementById("version-selector-SSG").classList.remove("version-selector-active")
        document.getElementById("version-selector-SSG").classList.add("version-selector-text")
        document.getElementById("version-selector-RSG").classList.add("version-selector-active")
    }
}


function toggleSeeMore(button) {
    var container = button.closest('.run-desc-container');

    if (button.innerText === "Ver Menos") {
        button.innerText = "Ver Mais";
    } else {
        button.innerText = "Ver Menos";
    }
    
    if (container) {
        // Find the .see-more-text element within the same container
        var seeMoreText = container.querySelector('.see-more-text');
        
        if (seeMoreText) {
            // Toggle the display style of the .see-more-text element
            var currentDisplay = window.getComputedStyle(seeMoreText).display;
            seeMoreText.style.display = currentDisplay === 'none' ? 'initial' : 'none';
        }
    }
}

function parseAndCreateRBS(slice1, slice2, RBSjsonData) {
  console.log(RBSjsonData.values)
 
  let divContainer = document.getElementById('run-container');

  for (let i = 0; i < RBSjsonData.values.length; i++) {
      let rowData = RBSjsonData.values[i].slice(slice1, slice2);
      console.log("passed",rowData)
      if (rowData[0] == false) {
          return;
      }
      
      createRunsDiv(divContainer, rowData);
  }
}

function createRunsDiv(container, values) {
    let div = document.createElement('div');
    div.id = "rbs-container"
    if (values[2] != pastVersion ) {
      console.log(values[2])
      console.log(pastVersion)
      let versionDiv = document.createElement('div')
      versionDiv.id = "version-division-container"
      versionDiv.innerHTML = 
                    `<div class="version-division">
                        <h1>${values[2]}</h1>
                     </div>`
      container.appendChild(versionDiv);
    }
    div.innerHTML = `<div class="run-container d-flex justify-content-around" id="run-container">
                        <div class="run-circle-indicator">
                                <div class="d-flex justify-content-center">
                                    <p class="test">${values[4]}</p>
                                    <i class="fa-solid fa-circle circle-icon" aria-hidden="true"></i>
                                </div>
                                <div class="vertical-line"></div> 
                            </div>
                            <div class="run">
                                <div class="runinfo-container background-transparent-bright">
                                    <h2 class="run-date"></h2>
                                    <div class="run-info text-1">
                                        <p><span style="color: ${values[7]};"><b>${values[1]}</b></span> conseguiu um novo recorde de <b>${values[3]}</b>!</p>
                                        <div class="run-desc-container">
                                            <p class="text-3 run-desc">O recorde durou <b>${values[5]}</b> dias e melhorou ele em <b>${values[9]}</b> <button class="btn see-more" id="seeMoreBtn" onclick="toggleSeeMore(this)">Ver mais</button></p>
                                            <p class="see-more-text text-3" style="display: none;">${values[6]}</p>
                                        </div>         
                                    </div>
                                </div>   
                            </div>
                            <div class="run-outside-link"><a href="${values[8]}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div>
                      </div>`
    pastVersion = values[2]
    console.log(pastVersion)
    
    container.appendChild(div);
    
  }
  fetchRBSData("historico") 

