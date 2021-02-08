function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
}

function fibonacci(num) {
  let a = 0, b = 1, c = 0;
  for (let i = 0; i < num; i++) {
    a = b;
    b = c;
    c = a + b;
  }
  document.getElementById("input-number").innerText = num;
  document.getElementById("output-number").innerText = c;
}
fibonacci(getRandomInt(1, 20));