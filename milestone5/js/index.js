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
    document.getElementById("result").innerHTML = `<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`;
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
}

const myButton = document.getElementById('fButton');
myButton.addEventListener('click', getFibonacci);