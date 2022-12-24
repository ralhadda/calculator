import { invalidOperations } from "./validate.js";
//import { RegexParser } from "./regex-parser";
//var RegexParser = require("regex-parser");

let operationString = document.getElementById("equation");
let results = document.getElementById("results");
let submit = document.querySelector('button[type="submit"]');

submit.addEventListener("click", e => {
  e.preventDefault();
  const st = operationString.value.trim();

  if (invalidOperations(st.trim())) {
    results.textContent = "NaN";
  } else {
    let stringToCalculate = st.split(/([-|+|/|*])/g);
    calculations(stringToCalculate);
  }
});

function calculations(str) {
  let leftOperand = [];
  let rightOperand = [];
  let combinedArray = [];
  let result;
  let indexOfOperation;

  let indexOfDiv =
    str.findIndex(element => element === "/") === -1
      ? Number.MAX_VALUE
      : str.findIndex(element => element === "/");

  let indexOfMult =
    str.findIndex(element => element === "*") === -1
      ? Number.MAX_VALUE
      : str.findIndex(element => element === "*");

  let indexOfAdd =
    str.findIndex(element => element === "+") === -1
      ? Number.MAX_VALUE
      : str.findIndex(element => element === "+");
  let indexOfSub =
    str.findIndex(element => element === "-") === -1
      ? Number.MAX_VALUE
      : str.findIndex(element => element === "-");

  if (str.includes("/") && indexOfDiv < indexOfMult) {
    indexOfOperation = str.findIndex(element => element === "/");
    result =
      parseFloat(str[indexOfOperation - 1]) /
      parseFloat(str[indexOfOperation + 1]);
    leftOperand = str.slice(0, indexOfOperation - 1);

    leftOperand.push(result.toString());
    rightOperand = str.slice(indexOfOperation + 2, str.length);
    combinedArray = leftOperand.concat(rightOperand);
  } else if (str.includes("*") && indexOfMult < indexOfDiv) {
    indexOfOperation = str.findIndex(element => element === "*");
    result =
      parseFloat(str[indexOfOperation - 1]) *
      parseFloat(str[indexOfOperation + 1]);
    leftOperand = str.slice(0, indexOfOperation - 1);
    leftOperand.push(result.toString());
    rightOperand = str.slice(indexOfOperation + 2, str.length);
    combinedArray = leftOperand.concat(rightOperand);
  } else if (str.includes("+") && indexOfAdd < indexOfSub) {
    indexOfOperation = str.findIndex(element => element === "+");
    result =
      parseFloat(str[indexOfOperation - 1]) +
      parseFloat(str[indexOfOperation + 1]);
    leftOperand = str.slice(0, indexOfOperation - 1);
    leftOperand.push(result.toString());
    rightOperand = str.slice(indexOfOperation + 2, str.length);
    combinedArray = leftOperand.concat(rightOperand);
  } else if (str.includes("-") && indexOfSub < indexOfAdd) {
    indexOfOperation = str.findIndex(element => element === "-");
    result =
      parseFloat(str[indexOfOperation - 1]) -
      parseFloat(str[indexOfOperation + 1]);
    leftOperand = str.slice(0, indexOfOperation - 1);
    leftOperand.push(result.toString());
    rightOperand = str.slice(indexOfOperation + 2, str.length);
    combinedArray = leftOperand.concat(rightOperand);
  }

  if (combinedArray.length === 1) {
    results.textContent = combinedArray[0];
    return;
  }
  calculations(combinedArray);
}
