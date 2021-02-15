// function fibonacci(num) {
//   num = document.getElementById("inputNumber").value;
//   let a = 0, b = 1, c = 0;
//   for (let i = 0; i < num; i++) {
//     a = b;
//     b = c;
//     c = a + b;
//   }
//   document.getElementById("outputNumber").innerText = c;
// }

async function getFibonacci() {
  document.getElementById("inputNumber").classList.remove("is-invalid");
  document.getElementById("alert").innerHTML = `<div></div>`;
  document.getElementById("result").innerHTML = `<div></div>`;

  num = document.getElementById("inputNumber").value;
  if (num > 50) {
    document.getElementById("inputNumber").classList.add("is-invalid");
    document.getElementById("alert").innerHTML = `<div class="col-sm-3"><small class="text-danger">Can't be larger than 50</small></div>`;
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
          document.getElementById("results").innerHTML += `<li>The Fibonnaci of <mark>${fResults.number}</mark> is <mark>${fResults.result}</mark>. Calculated at: ${cDate.toString()}</li>`;
        }
        document.getElementById("resultsSpinner").innerHTML = ``;
        return;
      });
    });
}

loadFibonacciResults();

const myButton = document.getElementById('fButton');
myButton.addEventListener('click', getFibonacci);