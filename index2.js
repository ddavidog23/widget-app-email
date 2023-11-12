import { fetchAttractionData } from "s3 bucket fetching functions file";
import { generateWidgets } from "s3 bucket fetching functions file";
const container = document.getElementById("preview-container");
const widgetContainer = document.getElementById("widget-container");
const mobileBtn = document.getElementById("mobile-btn");
const btnText = document.getElementById("btn-text");
const clearBtn = document.getElementById("clear-btn");
const generateWidgetBtn = document.getElementById("widget-btn");
const scrollBtnsDiv = document.getElementById("scroll-btns-div");
const colorInput = document.getElementById("font-color-picker");
const selectElement = document.getElementById("select-number");

let locationValue, selectedValue, colorValue;

container.style.marginLeft = "80px";
container.style.direction = "ltr";
widgetContainer.style.margin = "auto";
widgetContainer.style.backgroundColor = "#ffffff";
widgetContainer.style.width = "600px";
widgetContainer.style.padding = "0px 80px";

let allAttractionsBtnDiv = document.createElement("div");
allAttractionsBtnDiv.classList.add("all-attractions-btn-div");
allAttractionsBtnDiv.id = "all-attractions-btn-div";
allAttractionsBtnDiv.style.marginRight = "13%";
allAttractionsBtnDiv.style.textAlign = "center";

let anchor = document.createElement("a");
anchor.href = "";
anchor.id = "btnLink";
anchor.target = "_blank";
anchor.style.textDecoration = "none";
let button = document.createElement("button");
button.id = "all-attractions-btn";
button.style.display = "none";
button.setAttribute(
  "style",
  "height: 50px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px; border: none; cursor: pointer; color: #ffffff;"
);
button.innerHTML = "All Attractions";

anchor.appendChild(button);
allAttractionsBtnDiv.appendChild(anchor);

export function createWidget(
  uuid,
  heading,
  imageUrl,
  info,
  rating,
  link,
  price,
  city,
  reviewNum
) {
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  const tableTr = document.createElement("tr");
  table.appendChild(tableBody);
  table.style.fontFamily = "sans-serif";
  tableBody.appendChild(tableTr);
  widgetContainer.appendChild(table);

  const anchor = document.createElement("a");
  anchor.href = link;
  anchor.setAttribute("target", "_blank");
  anchor.setAttribute(
    "style",
    "top: 120px; position: absolute; height: 330px; width: 200px; display: block;"
  );

  const widget = document.createElement("td");
  tableTr.appendChild(widget);
  widget.style.display = "inline-block";
  widget.style.width = "200px";
  widget.style.height = "350px";

  table.style.margin = "10px";
  table.style.display = "inline-block";
  table.style.cursor = "pointer";
  table.style.width = "200px";
  table.style.height = "350px";

  const tableContainer = document.createElement("table");
  tableContainer.classList.add("table-container");
  tableContainer.style.width = "100%";
  tableContainer.style.borderSpacing = "0";
  tableContainer.style.position = "relative";
  widget.appendChild(tableContainer);
  const tableContainerBody = document.createElement("tbody");
  tableContainer.appendChild(tableContainerBody);

  const divImageContainer = document.createElement("tr");
  divImageContainer.classList.add("div-img-container");
  divImageContainer.style.display = "inline-block";
  tableContainerBody.appendChild(divImageContainer);

  const imageTd = document.createElement("td");
  divImageContainer.appendChild(imageTd);
  const image = document.createElement("img");
  image.src = imageUrl;
  image.classList.add("img-property");
  image.style.borderRadius = "16px";
  image.style.width = "200px";
  image.style.height = "200px";
  imageTd.appendChild(image);

  let divImageH3 = document.createElement("tr");
  divImageH3.classList.add("header");
  divImageH3.style.display = "inline-block";
  divImageH3.style.fontWeight = "600";
  divImageH3.style.minHeight = "36.8px";
  divImageH3.style.overflow = "hidden";
  const headerTd = document.createElement("td");
  headerTd.style.fontSize = "15px";
  headerTd.style.height = "34.8px";
  headerTd.textContent = heading;
  divImageH3.appendChild(headerTd);

  tableContainerBody.appendChild(divImageH3);

  const attractionLocation = document.createElement("td");
  attractionLocation.classList.add("div-location");
  attractionLocation.style.color = "#ffffff";
  attractionLocation.style.fontSize = "13px";
  attractionLocation.style.textAlign = "left";
  attractionLocation.style.display = "inline-block";
  attractionLocation.style.fontWeight = "bold";
  attractionLocation.style.direction = "rtl";

  const locationTd = document.createElement("td");
  locationTd.style.display = "inline-block";
  locationTd.style.color = "#000000";
  locationTd.style.paddingLeft = "2px";
  locationTd.style.height = "17.2px";
  attractionLocation.appendChild(locationTd);
  divImageH3.appendChild(attractionLocation);
  locationTd.innerText = city;

  const pinSvgTd = document.createElement("td");
  pinSvgTd.style.display = "inline-block";
  attractionLocation.appendChild(pinSvgTd);

  const pinImg = document.createElement("img");
  pinImg.src =
    "./svg/pin1.png";
  pinImg.style.width = "13px";
  pinImg.style.height = "15px";
  pinImg.style.fill = "none";
  pinImg.style.verticalAlign = "middle";

  pinSvgTd.appendChild(pinImg);

  let widgetDescription = document.createElement("tr");
  widgetDescription.id = "widget-desc";
  widgetDescription.classList.add("widget-desc");
  widgetDescription.textContent = info;

  let ratingElement = document.createElement("tr");
  ratingElement.classList.add("div-rating");
  ratingElement.style.direction = "ltr";
  ratingElement.style.fontWeight = "bold";
  ratingElement.style.display = "table";
  const starImg = document.createElement("img");
  starImg.src =
    "./svg/star2.png";
  starImg.classList.add("star-svg");
  starImg.style.height = "18px";
  starImg.style.paddingRight = "4px";
  starImg.style.fill = "none";
  const starSvgTd = document.createElement("td");
  ratingElement.appendChild(starSvgTd);
  starSvgTd.appendChild(starImg);
  let reviewCount = document.createElement("td");
  reviewCount.innerHTML = rating + " ×‘×™×§×•×¨×•×ª" + " (" + reviewNum + ")";
  reviewCount.style.fontSize = "13px";
  reviewCount.style.display = "table-cell";
  reviewCount.style.verticalAlign = "middle";
  ratingElement.appendChild(reviewCount);
  tableContainerBody.appendChild(ratingElement);

  if (reviewNum === "0") {
    ratingElement.style.display = "none";
  }

  const attractionState = document.createElement("tr");
  attractionState.classList.add("attrac-state");
  widget.appendChild(attractionState);

  let priceDiv = document.createElement("tr");
  priceDiv.classList.add("price-div");
  priceDiv.style.display = "inline-block";
  let attractionPrice = document.createElement("td");
  attractionPrice.classList.add("price");
  attractionPrice.style.textAlign = "left";
  attractionPrice.style.display = "inline-block";
  attractionPrice.style.fontWeight = "600";
  attractionPrice.style.fontSize = "14px";
  attractionPrice.style.minWidth = "128.82px";
  const priceTd = document.createElement("td");
  priceTd.innerHTML = "Starting From" + "$" + price;
  attractionPrice.appendChild(priceTd);
  priceDiv.appendChild(attractionPrice);
  tableContainerBody.appendChild(priceDiv);

  let moreInfoDiv = document.createElement("tr");
  moreInfoDiv.classList.add("more-info-div");
  moreInfoDiv.style.borderSpacing = "0";
  moreInfoDiv.style.marginLeft = "28.9px";
  moreInfoDiv.style.display = "inline-block";
  priceDiv.appendChild(moreInfoDiv);
  const moreInfoTd = document.createElement("td");
  let moreInfo = document.createElement("a");
  moreInfo.classList.add("more-info-anchor");
  moreInfo.style.borderRadius = "8px";
  moreInfo.style.verticalAlign = "middle";
  moreInfo.style.textAlign = "center";
  moreInfo.style.display = "table-cell";
  moreInfo.style.width = "40px";
  moreInfo.style.height = "40px";
  moreInfo.href = link;
  moreInfo.target = "_blank";
  moreInfoTd.appendChild(moreInfo);
  moreInfoDiv.appendChild(moreInfoTd);
  let arrowImg = document.createElement("img");
  arrowImg.src =
    "./svg/arrow-white.png";
  arrowImg.setAttribute("style", "height:20px; fill:none;");
  moreInfo.appendChild(arrowImg);
  moreInfo.addEventListener("click", (e) => {
    e.preventDefault();
  });

  if (container.style.direction === "ltr") {
    attractionPrice.classList.add("price");
    attractionPrice.innerHTML = "Starting From " + price + "$";
    attractionPrice.style.textAlign = "left";
    reviewCount.innerHTML = rating + " Reviews" + " (" + reviewNum + ")";
    ratingElement.style.direction = "ltr";
    divImageH3.style.textAlign = "left";
    widgetDescription.style.direction = "ltr";
    // arrowSvg.style.transform = 'scale(-1)';
  } else {
    divImageH3.style.textAlign = "right";
  }

  container.appendChild(widgetContainer);
  container.appendChild(allAttractionsBtnDiv);
}

export function createWidgetLoop(widgetDataArray) {
  widgetDataArray.forEach((widgetData) => {
    createWidget(
      widgetData.uuid,
      widgetData.heading,
      widgetData.imageUrl,
      widgetData.info,
      widgetData.rating,
      widgetData.link,
      widgetData.price,
      widgetData.city,
      widgetData.reviewNum
    );
  });
}

document
  .getElementById("builder-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    locationValue = document.getElementById("location").value;
    selectedValue = selectElement.value;
    colorValue = colorInput.value;
    console.log(colorValue);

    const widgetDataArray = await generateWidgets(
      locationValue,
      selectedValue,
      colorValue
    );
    const anchors = document.querySelectorAll(".more-info-anchor");
    anchors.forEach((anchorTag) => {
      if (colorValue === "#000000" || colorValue === "black") {
        anchorTag.style.backgroundColor = "#DAF0FF";
      } else {
        anchorTag.style.backgroundColor = rgbToHex(colorValue);
      }
    });

    const allAttractionsBtnElem = document.getElementById(
      "all-attractions-btn"
    );
    if (colorValue === "#000000" || colorValue === "black") {
      document.getElementById("all-attractions-btn").style.backgroundColor =
        "#DAF0FF";
    } else {
      allAttractionsBtnElem.style.backgroundColor = colorValue;
    }
  });

clearBtn.addEventListener("click", () => {
  const locationInput = document.getElementById("location");
  locationInput.value = "";

  const selectElement = document.getElementById("select-number");
  selectElement.value = 1;

  const fontColorPicker = document.getElementById("font-color-picker");
  fontColorPicker.value = "#000000";

  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  const container = document.getElementById("preview-container");
  container.innerHTML = "";

  const widgetCode = document.getElementById("widget-code");
  widgetCode.innerHTML = "";

  widgetContainer.innerHTML = "";

  document.getElementById("copy-code-btn").style.display = "none";
});

export function rgbToHex(rgb) {
  // Split the RGB value into an array of individual components
  const rgbArray = rgb.match(/\d+/g);

  if (rgbArray && rgbArray.length === 3) {
    // Convert each component to its hexadecimal representation
    const hexArray = rgbArray.map((component) => {
      const hex = parseInt(component).toString(16);
      return hex.length === 1 ? "0" + hex : hex; // Ensure two digits
    });

    // Construct the hexadecimal color code
    const hexColor = "#" + hexArray.join("");
    return hexColor;
  } else {
    // If the input is not in the expected format, return it as is
    return rgb;
  }
}
