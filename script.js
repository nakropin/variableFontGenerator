const textContainer = document.getElementById("myCanvas");
textContainer.onclick = null;
let invert = 0;
let adder = 1;
const duration = 150;
let signChangesCount = 0;
let spawnTime = 50;
const minFontSize = 26;
const maxFontSize = 72;
// @font-face variable name
const fontFamily = "'Roboto'";
const string = "work";
// Array with Parameters and their value ranges of Roboto Flex
let parameters = [
  { name: "GRAD", min: 200, max: 150 },
  { name: "XOPQ", min: 30, max: 175 },
  { name: "XTRA", min: 320, max: 600 },
  { name: "YOPQ", min: 25, max: 135 },
  { name: "YTAS", min: 650, max: 850 },
  { name: "YTDE", min: -300, max: -100 },
  { name: "YTFI", min: 760, max: 580 },
  { name: "YTLC", min: -416, max: 570 },
  { name: "YTUC", min: 530, max: 760 },
  { name: "slnt", min: -10, max: 0 },
  { name: "wdth", min: 25, max: 150 },
  { name: "wght", min: 100, max: 1000 },
];

// Loop //////////////////////////////
setInterval(createText, spawnTime);
//////////////////////////////////////

//////////////////////////////////////
// Callback functions ////////////////
//////////////////////////////////////
function randomlyUppercase(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    if (Math.random() < 0.5) {
      char = char.toUpperCase();
    } else {
      char = char.toLowerCase();
    }
    result += char;
  }
  return result;
}

function textGetColor(adder) {
  if (adder > 0) {
    return "black";
  } else {
    return "tan";
  }
}

function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomFontSettings(params) {
  // Go through all parameters
  let fontSettings = "";
  params.forEach(function (param, index) {
    let value = getRandomValue(param.min, param.max);
    fontSettings += `"${param.name}" ${value},`;
  });
  // Remove last Comma
  let lastIndex = fontSettings.lastIndexOf(",");
  fontSettings = replaceCharAtIndex(fontSettings, lastIndex, " ");
  return fontSettings;
}

function replaceCharAtIndex(str, index, replacement) {
  // Index out of Bounds
  if (index < 0 || index >= str.length) {
    return str;
  }
  return str.substring(0, index) + replacement + str.substring(index + 1);
}

function removeOldChildren(container) {
  container.removeChild(container.firstChild);
}

// Main function to generate text
function createText() {
  //Create
  let text = document.createElement("span");
  text.textContent = randomlyUppercase(string);
  textContainer.appendChild(text);
  //Style
  text.style.color = textGetColor(adder);
  text.style.opacity = 1 - invert / duration / 2;
  text.style.fontFamily = fontFamily;
  text.style.fontSize = getRandomValue(minFontSize, maxFontSize) + "px";
  text.style.fontVariationSettings = getRandomFontSettings(parameters);
  text.style.position = "absolute";
  //Position
  text.style.top =
    getRandomValue(0, textContainer.clientHeight - maxFontSize * 1) + "px";
  text.style.left =
    getRandomValue(0, textContainer.clientWidth - text.offsetWidth) + "px";
  // If Invert hits bound, switch sign
  if (invert >= duration || invert < 0) {
    adder *= -1;
    signChangesCount++;
  }
  // Remove Children after adder switching two times
  invert += adder;
  if (signChangesCount >= 2) {
    removeOldChildren(textContainer);
  }
}
