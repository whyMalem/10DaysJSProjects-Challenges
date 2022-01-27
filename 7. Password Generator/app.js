const upperElement = document.getElementById("upper");
const lowerElement = document.getElementById("lower");
const numberElement = document.getElementById("number");
const symbolsElement = document.getElementById("symbols");
const generate = document.getElementById("generate");
const passwordElement = document.getElementById("password");
const len = document.getElementById("len");
const copyElement = document.getElementById("copy");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function getLowerCase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
function getUpperCase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
function getNumbers() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}
function getSymbols() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  const passwordLength = len.value;

  let password = "";

  if (upperElement.checked) {
    password += getUpperCase();
  }
  if (lowerElement.checked) {
    password += getLowerCase();
    console.log(password);
  }
  if (numberElement.checked) {
    password += getNumbers();
  }
  if (symbolsElement.checked) {
    password += getSymbols();
  }

  for (let i = password.length; i < passwordLength; i++) {
    const x = generateX();
    password += x;
    // console.log(password);
  }

  passwordElement.innerText = password;
}

function generateX() {
  const xs = [];
  if (upperElement.checked) {
    xs.push(getUpperCase());
  }
  if (lowerElement.checked) {
    xs.push(getLowerCase());
  }
  if (numberElement.checked) {
    xs.push(getNumbers());
  }
  if (symbolsElement.checked) {
    xs.push(getSymbols());
  }

  if (xs.length === 0) return "";

  return xs[Math.floor(Math.random() * xs.length)];
}

generate.addEventListener("click", () => {
  generatePassword();
});

copyElement.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = passwordElement.innerText;

  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});
