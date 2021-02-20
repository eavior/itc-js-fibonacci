loadFibonacciResults();

// Fibonacci button
const myButton = document.getElementById('fButton');
myButton.addEventListener('click', getFibonacci);

// "Save calculation" checkbox
let server = false;
let checkbox = document.getElementById('flexCheckDefault');
checkbox.addEventListener('change', e => {
  if (e.target.checked) server = true;
  else server = false;
});


function getFibonacci() {
  cleanOutputs();
  let num = document.getElementById("inputNumber").value;
  if (server) getFibonacciFromServer(num);
  else {
      let outputText = document.createElement("div");
      outputText.innerHTML = getFibonacciLocally(num);
      outputText.setAttribute("id", "outputNumber");
      document.getElementById("result").appendChild(outputText);
    }  
}


function cleanOutputs() {
  document.getElementById("inputNumber").classList.remove("is-invalid");
  document.getElementById("alert").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("checkbox").classList.add("form-check");
  document.getElementById("checkbox").classList.remove("form-check-push-down");
}

function getFibonacciLocally(num) {
  if (num <= 1) {
    return num;
  }
  return getFibonacciLocally(num-2) + getFibonacciLocally(num-1);
}

async function getFibonacciFromServer(num) {
  if (num > 50) {
    document.getElementById("inputNumber").classList.add("is-invalid");
    let alertText = document.createElement("small");
    alertText.innerHTML = "Can't be larger than 50";
    document.getElementById("alert").appendChild(alertText).className = "text-danger p-absolute";
    document.getElementById("checkbox").classList.add("form-check-push-down");
    document.getElementById("checkbox").classList.remove("form-check");
  } else {
    let spinner = document.createElement("div");
    spinner.className = "spinner1 spinner-border p-absolute";
    document.getElementById("result").appendChild(spinner);
    await fetch(`http://localhost:5050/fibonacci/${num}`).then(response => {
      if (!response.ok) {
        response.text().then(text => {
          document.getElementById("result").removeChild(spinner);
          let serverError = document.createElement("div");
          serverError.innerHTML = text;
          serverError.setAttribute("id", "serverError");
          document.getElementById("result").appendChild(serverError);
        })
      } else {
        response.json().then(data => {
          document.getElementById("result").removeChild(spinner);
          let outputNumber = document.createElement("div");
          outputNumber.innerHTML = data.result;
          outputNumber.setAttribute("id", "outputNumber");
          document.getElementById("result").appendChild(outputNumber);
          loadFibonacciResults();
        })
      }
    })
  }

}

let sortChoices = document.getElementsByClassName('dropdown-item');
let sortChoice = "";
Array.from(sortChoices).forEach((element) => {
  element.addEventListener('click', (event) => {
  sortChoice = event.target.innerText;
  loadFibonacciResults(); 
  });
});

function loadFibonacciResults() {
  document.getElementById("resultsSpinner").innerHTML = `<div class="spinner2 spinner-border p-absolute" role="status"><span class="sr-only">Loading...</span></div>`;
  document.getElementById("results").innerHTML = '';
  fetch('http://localhost:5050/getFibonacciResults')
    .then(response => {
      response.json().then(data => {
        let arrayFromHTMLCollection = Array.from(data.results);
        let sortedArray = arrayFromHTMLCollection.slice(0);
        switch (sortChoice) {
          case "Number Asc":
            sortedArray.sort(function (a, b) {
             return a.number - b.number;
            });
            break;
          case "Number Desc":
            sortedArray.sort(function (a, b) {
              return b.number - a.number;
            });
            break;
          case "Date Asc":
            sortedArray.sort(function (a, b) {
              return b.createdDate - a.createdDate;
            });
            break;
          case "Date Desc":
            sortedArray.sort(function (a, b) {
              return b.createdDate - a.createdDate;
            });
              break;
          default:
            sortedArray.sort(function (a, b) {
              return b.createdDate - a.createdDate;
            });
            break;
        }
        for (let fResults of sortedArray) {
          let cDate = new Date(fResults.createdDate);
          document.getElementById("results").innerHTML += `<li>The Fibonnaci of <strong>${fResults.number}</strong> is <strong>${fResults.result}</strong>. Calculated at: ${cDate.toString()}</li>`;
        }
        document.getElementById("resultsSpinner").innerHTML = ``;
        return;
      });
    });
}








