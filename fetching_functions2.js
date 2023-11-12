import { createWidgetLoop, createWidget } from "s3 bucket link";

const clientId = "client id";
const clientSecret =
  "client secret";
let apiUrl = "api to fetch";
const tokenUrl = "token url";

const clientApiUrls = {
  "Harel": 'Harel API',
  "Leonardo": 'Leonardo API',
  "Max": 'Max API',
  "Bali": 'Bali API'
};

const clientMarketplaceUrls = {
  "Leonardo" : "dynamic url",
  "Harel" : "https://harel.bridgify.io",
  "Max" : 'https://www.max-adventure.co.il',
  "Bali" : 'https://www.b321.co.il',
};


const leonardoPropertyNames = {
  'Honolulu' : 'Leonardo Honolulu',
  'Amsterdam' : 'Leonardo Hotels Amsterdam',
  'Munich' : 'Leonardo Hotels Munich',
  'Belfast' : 'Leonardo Hotels Belfast',
  'Zurich' : 'Leonardo Hotels Zurich',
  'Tel Aviv' : 'Leonardo Hotels Tel Aviv',
  'Perth' : 'Leonardo Hotels Perth',
  'Bilbao' : 'Leonardo Hotels Bilbao',
  'Oxford' : 'Leonardo Hotels Oxford',
  'Brighton' : 'Leonardo Hotels Brighton',
  'Cardiff' : 'Leonardo Hotels Cardiff',
  'Frankfurt' : 'Leonardo Hotels Frankfurt',
  'Nottingham' : 'Leonardo Hotels Nottingham',
  'Sheffield' : 'Leonardo Hotels Sheffield',
  'Hannover' : 'Leonardo Hotels Hannover',
  'Leeds' : 'Leonardo Hotels Leeds',
  'London' : 'Leonardo Hotels London',
  'Rome' : 'Leonardo Hotels Rome',
  'Manchester' : 'Leonardo Hotels Manchester',
  'Venice' : 'Leonardo Hotels Venice',
  'Dublin' : 'Leonardo Hotels Dublin',
  'Bucharest' : 'Leonardo Hotels Bucharest',
  'Edinburgh' : 'Leonardo Hotels Edinburgh',
  'Vienna' : 'Leonardo Hotels Vienna',
  'Granada' : 'Leonardo Hotels Granada',
  'Warsaw' : 'Leonardo Hotels Warsaw',
  'Verona' : 'Leonardo Hotels Verona',
  'Salzburg' : 'Leonardo Hotels Salzburg',
  'Rhodes' : 'Leonardo Hotels Rhodes',
  'Liverpool' : 'Leonardo Hotels Liverpool',
  'Newcastle' : 'Leonardo Hotels Newcastle',
  'Inverness' : 'Leonardo Hotels Inverness',
  'Paphos' : 'Leonardo Hotels Paphos',
  'Galway' : 'Leonardo Hotels Galway',
  'Dresden' : 'Leonardo Hotels Dresden',
  'Cologne' : 'Leonardo Hotels Cologne',
  'Ibiza' : 'Leonardo Hotels Ibiza',
  'Jerusalem' : 'Leonardo Hotels Jerusalem',
  'Lake Garda' : 'Leonardo Hotels Lake Garda',
  'Abardeen' : 'Leonardo Hotels Aberdeen',
  'Nuremberg' : 'Leonardo Hotels Nuremberg',
  'Southampton' : 'Leonardo Hotels Southampton',
  'The Hague' : 'Leonardo Hotels The Hague',
  'Birmingham' : 'Leonardo Hotels Birmingham',
  'Bristol' : 'Leonardo Hotels Bristol',
  'Dortmund' : 'Leonardo Hotels Dortmund',
  'Eilat' : 'Leonardo Hotels Eilat',
  'Heidelberg' : 'Leonardo Hotels Heidelberg',
  'Berlin' : 'Leonardo Hotels Berlin',
  'Barcelona' : 'Leonardo Hotels Barcelona',
  'Hamburg' : 'Leonardo Hotels Hamburg',
  'Prague' : 'Leonardo Hotels Prague',
  'Madrid' : 'Leonardo Hotels Madrid',
  'Krakow' : 'Leonardo Hotels Krakow',
  'Budapest' : 'Leonardo Hotels Budapest',
  'Glasgow' : 'Leonardo Hotels Glasgow',
  'Milan' : 'Leonardo Hotels Milan',
  'Leonardo' : 'Leonardo',
}

function getClientMarketplaceUrl(clientName) {
  return clientMarketplaceUrls[clientName] || null;
}

// function to recieve the company name
function getClientName(apiUrl) {
  for (const [name, url] of Object.entries(clientApiUrls)) {
    if (apiUrl === url || apiUrl.startsWith(url + '/')) {
      return name;
    }
  }
  return null;
}

let clientMarketplaceUrl;

const currentApiUrl = apiUrl;
const clientName = getClientName(currentApiUrl);

if (clientName === 'Leonardo') {
  console.log(`Client name is: ${clientName}`);
  console.log(`Client's Marketplace URL is ${clientMarketplaceUrl}`);
} else if (clientName) {
  
  console.log(`Client name is: ${clientName}`);
  console.log(`Client's Marketplace URL is ${clientMarketplaceUrl}`);
} else {
  console.log('Client not found or invalid API URL');
}


//getting a token function
export const getToken = async () => {
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data.access_token;
};

//fetching function
export const fetchApi = async () => {
  const token = await getToken();

  if (clientName === 'Leonardo') {
    document.getElementById('preview-container').style.direction = 'ltr';
  }

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const apiData = await response.json();
};

fetchApi()

const cachedData = {};
const generatedAttractions = {};

// fetching api to receive attractions
export async function fetchAttractionData(url, token) {
  if (cachedData[url]) {
    return cachedData[url];
  }
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response was not OK. Status: ${response.status}`);
    }
    const data = await response.json();
    cachedData[url] = data;
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
}

const selectElement = document.getElementById("select-number");
const colorInput = document.getElementById("font-color-picker");
const searchInput = document.getElementById("location");
const suggestions = document.getElementById("suggestions");




function toTitleCase(str) {
  const words = str.split(' ');
  const titleCasedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    const titleCasedStr = titleCasedWords.join(' ');

    return titleCasedStr;
};

//display autocomplete suggestions
function showSuggestions(query) {
  fetch('json s3 bucket url here')
    .then((response) => response.json())
    .then((data) => {
      const cityData = data; 

      // Filter cities that match the query.
      const matchingCities = cityData.filter((city) =>
        city.city_name.toLowerCase().includes(query.toLowerCase())
      );

      const limitedCities = matchingCities.slice(0, 5);

      const suggestionsHTML = limitedCities
        .map((city) => `<li>${city.city_name}</li>`)
        .join("");

      suggestions.innerHTML = suggestionsHTML;
      suggestions.classList.add("show");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// listener for input changes
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query.length >= 2) {
    showSuggestions(query);
  } else {
    suggestions.classList.remove("show");
  }
});

// making suggestions disappear when a user presses TAB, i.e when he wants to move to the next input
searchInput.addEventListener('keydown', (e) => {
  if (e.key === "Tab") {
    suggestions.style.display = 'none';
  } else if (searchInput.focus()) {
    suggestions.style.display = 'block';
  }
})

searchInput.addEventListener("click", () => {
  suggestions.style.display = "block";
});

//listener to handle suggestions selection
suggestions.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    searchInput.value = e.target.textContent;
    suggestions.style.display = "none";
  }
});

document.addEventListener("click", (e) => {
  if (!suggestions.contains(e.target) && e.target !== searchInput) {
    suggestions.style.display = "none";
  }
});

let uniqueLocationsArr = [];

// generate wanted widgets to display
export async function generateWidgets(locationValue, widgetCount, colorValue) {
  try {
    await fetchApi();
    const token = await getToken();
    const formattedLocationValue = toTitleCase(locationValue);
    const apiUrlWithCityName = `${apiUrl}&city_name=${formattedLocationValue}`
    const fullAttractionsData = await fetchAttractionData(apiUrlWithCityName, token);
    const locationData = fullAttractionsData.attractions.filter(
      (attraction) => {
        return attraction.external_city_name === formattedLocationValue;
      }
    );

    //displaying the number of widgets available for the user if he exceeds the count.
    const availableWidgetCount = locationData.length;
    if (availableWidgetCount < widgetCount) {
      alert(`Only ${availableWidgetCount} widget available for ${formattedLocationValue}`);

    } else if (availableWidgetCount === 0) {
      alert(`No widgets available for ${formattedLocationValue}`);
      return;
    }

    const selectedPropertyName = leonardoPropertyNames[formattedLocationValue];

    const widgetDataArr = locationData
      .slice(0, widgetCount)
      .map((fetchedData) => {
        if (!generatedAttractions[fetchedData.uuid]) {
          generatedAttractions[fetchedData.uuid] = true;
          const locationName = fetchedData.external_city_name;

          if (!uniqueLocationsArr.includes(locationName)) {
            uniqueLocationsArr.push(locationName);
          }

          // specific way to get into the right link, hyphens needed instead of spaces.
          const attractionPageUrl = `${clientMarketplaceUrls[clientName]}/attraction/${fetchedData.uuid}`;
          const leonardoAttractionPageUrl = `https://leonardo domain here/attraction/${fetchedData.uuid}/${replaceSpacesWithHyphens(fetchedData.title)}/?property=${selectedPropertyName}`;

          const maxCharacters = 40;
          const modifiedTitle = fetchedData.title.slice(0, maxCharacters) + '...';

          if (clientName === 'Leonardo') {
            clientMarketplaceUrls["Leonardo"] = `https://leonardo domain here/?property=${leonardoPropertyNames[formattedLocationValue]}`;
            return {
              uuid: fetchedData.uuid,
              heading: modifiedTitle,
              imageUrl: fetchedData.main_photo_url,
              info: fetchedData.description,
              rating: fetchedData.rating,
              link: leonardoAttractionPageUrl,
              price: Math.floor(fetchedData.price),
              city: fetchedData.external_city_name,
              reviewNum: fetchedData.number_of_reviews,
            };
          } else {
            return {
              uuid: fetchedData.uuid,
              heading: modifiedTitle,
              imageUrl: fetchedData.main_photo_url,
              info: fetchedData.description,
              rating: fetchedData.rating,
              link: attractionPageUrl,
              price: Math.floor(fetchedData.price),
              city: fetchedData.external_city_name,
              reviewNum: fetchedData.number_of_reviews,
            };
          }
        }
        return null;
      })
      .filter((widget) => widget !== null);
    createWidgetLoop(widgetDataArr);
    clientMarketplaceUrl = getClientMarketplaceUrl(clientName);
    let allAttractionsBtn = document.getElementById('btnLink');

    //checking if there is only one city, if yes then the the all attractions link is to the white label of the city, if not its the leonardo one.
    if(uniqueLocationsArr.length >= 2) {
      allAttractionsBtn.href = `https://leonardo domain here/?property=Leonardo`;
    } else {
      allAttractionsBtn.href = clientMarketplaceUrl;
    }
    return widgetDataArr;
    
  } catch (err) {
    console.error("Error:", err);
  }
}

document
  .getElementById("builder-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const locationValue = document.getElementById("location").value;
    const selectedValue = selectElement.value;
    const colorValue = colorInput.value;

    const widgetDataArray = await generateWidgets(
      locationValue,
      selectedValue,
      colorValue
    );

    const anchors = document.querySelectorAll('.more-info-anchor');
    anchors.forEach((anchorTag) => {
      if (colorValue === '#000000' || colorValue === 'black') {
        anchorTag.style.backgroundColor = '#DAF0FF';
      } else {
        anchorTag.style.backgroundColor = rgbToHex(colorValue);
      }
    })
    const allAttractionsBtnElem = document.getElementById('btnLink');
    allAttractionsBtnElem.style.backgroundColor = colorValue;
    if (colorValue === '#000000' || colorValue === 'black') {
      document.getElementById('btnLink').style.backgroundColor = '#DAF0FF';
    }

    const allAttractionsBtn = document.getElementById('all-attractions-btn');
    if (colorValue === '#000000' || colorValue === 'black') {
      document.getElementById('all-attractions-btn').style.backgroundColor = '#DAF0FF';
    } else {
      allAttractionsBtn.style.backgroundColor = colorValue;
    }

    let copyCode = document.getElementById('copy-code-btn');
    copyCode.style.display = 'block';
    copyCode.style.marginTop = '5px';

    // html code generated for the user to copy and paste inside his code
    function generateHTMLCode() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const allAttractionsBtnDiv = document.getElementById('all-attractions-btn-div');
          const attractionBtnContent = allAttractionsBtnDiv.innerHTML;
          const container = document.getElementById('widget-container');
          const containerContent = container.innerHTML;
      
          const htmlCode = `
              <div id="widget-container" style="width: 600px; padding: 0px 80px margin: auto; background-color: #ffffff;">
                ${containerContent}
              </div>
              <div class="all-attractions-btn-div" style="width: 600px; padding-bottom: 10px; text-align: center; margin-right: 13%;">
                ${attractionBtnContent}
              </div>
          `;
  
          resolve(htmlCode);
        }, 0);
      });
    }

    const htmlCode = await generateHTMLCode();
    document.getElementById('widget-code').textContent = htmlCode;
  });

document.getElementById('clear-btn').addEventListener('click', () => {
  uniqueLocationsArr = [];
  for (const key in cachedData) {
    delete cachedData[key];
  }
  for (const key in generatedAttractions) {
    delete generatedAttractions[key];
  }
})

document.getElementById("copy-code-btn").addEventListener("click", () => {
  const codeElement = document.getElementById("widget-code");
  const codeToCopy = codeElement.textContent;

  const textarea = document.createElement("textarea");
  textarea.value = codeToCopy;
  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand("copy");

  document.body.removeChild(textarea);
  alert("Code coped to clipboard!");
});

function replaceSpacesWithHyphens(inputString) {
  return inputString.replace(/\s+/g, '-');
}

function rgbToHex(rgb) {
  // Split the RGB value into an array of individual components
  const rgbArray = rgb.match(/\d+/g);
  
  if (rgbArray && rgbArray.length === 3) {
    // Convert each component to its hexadecimal representation
    const hexArray = rgbArray.map(component => {
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