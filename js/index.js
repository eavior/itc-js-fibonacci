function getFibonacciLocally(num) {
  let a = 0,
    b = 1,
    c = 0;
  for (let i = 0; i < num; i++) {
    a = b;
    b = c;
    c = a + b;
  }
  document.getElementById("result").innerHTML = `<div id="outputNumber">${c}</div>`;
}

async function getFibonacciFromServer(num) {
  if (num > 50) {
    document.getElementById("inputNumber").classList.add("is-invalid");
    // document.getElementById("alert").innerHTML = `<small class="text-danger">Can't be larger than 50</small>`;
    var alertText = document.createElement("small");   // Create a <button> element
    alertText.innerHTML = "Can't be larger than 50";                   // Insert text
    document.getElementById("alert").appendChild(alertText).className = "text-danger"; 
    document.getElementById("checkbox").classList.add("form-check-push-down");  
    document.getElementById("checkbox").classList.remove("form-check");              // Append <button> to <body>
  } else {
    document.getElementById("result").innerHTML = `<div class="spinner1 spinner-border" role="status"><span class="sr-only">Loading...</span></div>`;
    await fetch(`http://localhost:5050/fibonacci/${num}`).then(response => {
      if (!response.ok) {
        response.text().then(text => {
          document.getElementById("result").innerHTML = `<div id="serverError">Server Error: ${text}</div>`;
        })
      } else {
        response.json().then(data => {
          document.getElementById("result").innerHTML = `<div id="outputNumber">${data.result}</div>`;
        })
      }
    })
  }
  loadFibonacciResults()
}

function loadFibonacciResults() {
  document.getElementById("resultsSpinner").innerHTML = `<div class="spinner2 spinner-border" role="status"><span class="sr-only">Loading...</span></div>`;
  fetch('http://localhost:5050/getFibonacciResults')
    .then(response => {
      response.json().then(data => {
        for (let fResults of data.results) {
          let cDate = new Date(fResults.createdDate);
          document.getElementById("results").innerHTML += `<li>The Fibonnaci of <strong>${fResults.number}</strong> is <strong>${fResults.result}</strong>. Calculated at: ${cDate.toString()}</li>`;
        }
        document.getElementById("resultsSpinner").innerHTML = ``;
        return;
      });
    });
}

function cleanOutputs() {
  document.getElementById("inputNumber").classList.remove("is-invalid");
  document.getElementById("alert").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("checkbox").classList.add("form-check");
  document.getElementById("checkbox").classList.remove("form-check-push-down");
}

loadFibonacciResults();

let server = false;
let checkbox = document.getElementById('flexCheckDefault');
checkbox.addEventListener('change', e => {
  if (e.target.checked) server = true;
  else server = false;
});

const myButton = document.getElementById('fButton');
myButton.addEventListener('click', getFibonacci);

function getFibonacci() {
  cleanOutputs();
  let num = document.getElementById("inputNumber").value;
  if (server) getFibonacciFromServer(num);
  else getFibonacciLocally(num);
}

// const myCheckbox = document.getElementById('flexCheckDefault');
// myCheckbox.addEventListener('checked', alert("hello"));







// FEEDBACK RAZ:

// const getResultsUrl = ('http://localhost:5050/getFibonacciResults')

// async function getResultsUrl();
//   const response = await fetch(getResultsUrl);
//   console.log(response.json());
//   const data = await response.json();
//   console.log(data.results);
// }
// getResults();

// async function getResultsUrl();
//   const response = await fetch(getResultsUrl);
//   let data;
//   //if (response.ok) {
//   data = await response.json();
//   console.log(data.results);
//   } else {
//     data = response.text();
//   }
// }