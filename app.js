/*-------------------------------- Constants --------------------------------*/
const display = document.querySelector(".display");

const operators = document.querySelectorAll(".operator");

/*-------------------------------- Variables --------------------------------*/
let currentDisplay = [];
let memoryArr = []; //store numbers to merge on operator click
let numArr = []; //store the merged numbers
let opArray = []; // store the operator
display.innerText = currentDisplay.join("");
/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

document.querySelector("#calculator").addEventListener("click", function (e) {
  if (e.target.classList.contains("button")) {
    console.log(".button", e.target.innerText, e.currentTarget);
    displayElement(e);
  }
  if (e.target.classList.contains("number")) {
    //push numbers into a tempor array
    memoryArr.push(e.target.innerText);
  }
  if (e.target.classList.contains("operator")) {
    mergeNum(e);
  }
  if (e.target.classList.contains("equals")) {
    results();
  }
});

/*-------------------------------- Functions --------------------------------*/

function displayElement(e) {
  if (e.target.innerText !== "=") {
    currentDisplay.push(e.target.innerText);
    display.innerText = currentDisplay.join("");
  }
  if (e.target.innerText === "C") {
    currentDisplay.length = 0;
    display.innerText = currentDisplay.join("");
  }
}

//when operator on click whatever is in the array before gets stored into as one big number

function mergeNum(e) {
  if (e.target.innerText === "C") {
    numArr.length = 0;
    memoryArr.length = 0;
    opArray.length = 0;
  }
  if (e.target.innerText !== "C") {
    numArr.push(Number(memoryArr.join("")));
    memoryArr.length = 0;
    opArray.push(e.target.innerText);
  }
}

function results() {
  numArr.push(Number(memoryArr.join("")));
  memoryArr.length = 0;
  currentDisplay.length = 0;
  //currentDisplay length is 0 alrd

  for (let i = 0; i < opArray.length; i++) {
    let result;
    if (opArray[i] === "*" || opArray[i] === "/") {
      if (opArray[i] === "*") {
        result = numArr[i] * numArr[i + 1];
      } else if (opArray[i] === "/") {
        result = numArr[i] / numArr[i + 1];
      }

      numArr.splice(i, 2, result);
      opArray.splice(i, 1);
      i--;
    }
  }

  for (let i = 0; i < opArray.length; i++) {
    //currentDisplay length is 0 alrd
    let result;
    if (opArray[i] === "+" || opArray[i] === "-") {
      if (opArray[i] === "+") {
        result = numArr[i] + numArr[i + 1];
      } else if (opArray[i] === "-") {
        result = numArr[i] - numArr[i + 1];
      }

      numArr.splice(i, 2, result);
      opArray.splice(i, 1);
      i--;
    }
  }

  const finalResult = numArr[0];
  currentDisplay.push(finalResult);
  memoryArr.push(finalResult);
  numArr.pop();
  display.innerText = currentDisplay.join("");
}
