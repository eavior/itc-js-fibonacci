function fibonacci(num) {
  num = document.getElementById("inputNumber").value;
  let a = 0, b = 1, c = 0;
  console.log(num);
  for (let i = 0; i < num; i++) {
    a = b;
    b = c;
    c = a + b;
  }
  console.log(c);
  document.getElementById("outputNumber").innerText = c;
}

const myButton = document.getElementById('fButton');
myButton.addEventListener('click', fibonacci);
