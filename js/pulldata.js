let current_planet;

const planets = [
  "earth", // level 1
  "venus", // level 2
  "mercury", // level 3
  "mars", // level 4
  "jupiter", // level 5
  "saturn", // level 6
  "uranus", // level 7
  "neptune", // level 8
];

function fetchdata(id) {
  fetch(`https://api.le-systeme-solaire.net/rest/bodies/${id}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }
  );
}

function fetchplanet(id) {
  let link = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&titles=${id}`;

  if (id === "mercury") {
    link = link + "_(planet)";
  }
  fetch(link)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0]; // Assuming there's only one page in the response
      const extract = pages[pageId].extract;

      const parser = new DOMParser();
      const doc = parser.parseFromString(extract, "text/html");

      const headers = doc.querySelectorAll("h2");

      updateContent(headers);
    });
}

const spans = [];
const paragraphs = [];
const images = [];

function updateContent(headers) {
  let element = document.getElementById("content");

  async function processLoop(i) {
    if (i < 5) {
      spans.push(headers[i].textContent);

      let content = "";
      content = findNextParagraph(headers[i]);

      if (content === "\n" || content === "") {
        content = findNextParagraph2(headers[i]);
      }

      async function summarize(content) {
        const url =
          "https://text-summarize-pro.p.rapidapi.com/summarizeFromText";
        const options = {
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key":
              "351bc79efemsh202df290195676ap1303bbjsn8ba9e057b8ee",
            "X-RapidAPI-Host": "text-summarize-pro.p.rapidapi.com",
          },
          body: new URLSearchParams({
            text: content,
            percentage: "40",
          }),
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();

          return result;
        } catch (error) {
          console.error(error);
        }
      }

      //Summarize content (to be uncommented)
      if (content.length > 1400) {
        try {
          const result = await summarize(content);
          content = result.summary;
          if (content.length > 2000) {
            const result2 = await summarize(content);
            content = result2.summary;
          }
        } catch (error) {
          console.error("Error summarizing content:", error);
        }
      }

      let sentences = content.match(/[^\.!\?]+[\.!\?]+/g);

      // Check if the last sentence doesn't end with a full stop
      if (
        sentences.length > 0 &&
        !sentences[sentences.length - 1].trim().endsWith(".")
      ) {
        // Remove the last sentence
        sentences.pop();
      }

      // Join the sentences back into a string
      content = sentences.join("");
      paragraphs.push(content);

      if (i === 0) {
        document.querySelector(".planet-container span").innerHTML =
          headers[i].textContent;
        document.querySelector(".planet-container p").innerHTML = content;
      }

      setTimeout(() => {
        processLoop(i + 1);
      }, 500);
    }
  }

  // Start the loop with the first iteration
  processLoop(0);
}

async function fetchImages(search) {
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=AIzaSyC6UOCo5PaHnSax9USYkN_e6ycE8gHFQlA&cx=0364b018377bd4cf1&searchType=image&q=${search}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();

  const substring = "https://science.nasa.gov";
  for (let i = 0; i < result.items.length; i++) {
    if (result.items[i].image.contextLink.includes(substring)) {
      return result.items[i].link;
    }
  }
  return null;
}

function findNextParagraph2(element) {
  let currentElement = element.nextSibling;
  let savedElement;
  let content = "";

  // Loop until a <p> tag is found or there are no more siblings
  while (currentElement !== null) {
    savedElement = currentElement;
    if (
      currentElement.nodeName.toLowerCase() === "p" &&
      currentElement.textContent.trim() !== ""
    ) {
      // If a <p> tag is found, return its text content
      if (savedElement.nextSibling.nodeName.toLowerCase() !== "p") {
        content += currentElement.textContent;
        return content;
      }
    } else {
      content += currentElement.textContent;
    }

    // Move to the next sibling
    currentElement = currentElement.nextSibling;
  }
  // Move to the next sibling

  currentElement = currentElement.nextSibling;
}

function findNextParagraph(element) {
  let currentElement = element.nextElementSibling;
  let savedElement;
  let content = "";

  // Loop until a <p> tag is found or there are no more siblings
  while (currentElement !== null) {
    if (currentElement.tagName.toLowerCase() === "p") {
      // If a <p> tag is found, return its text content
      savedElement = currentElement;
      if (savedElement.nextElementSibling.tagName.toLowerCase() !== "p") {
        content += currentElement.textContent;
        return content;
      } else {
        content += currentElement.textContent;
      }
    }
    // Move to the next sibling
    currentElement = currentElement.nextElementSibling;
  }

  // If no <p> tag is found, return a message or handle it accordingly
  return "No <p> tag found in the next siblings.";
}

// Fetch data about the player's current planet based on user savedata

function fetchDataForCurrentPlanet(planetName) {
  if (planets.includes(planetName)) {
    current_planet = planetName;
    fetchplanet(planetName);
  } else {
    console.error("Invalid planet name:", planetName);
  }
}

document.getElementById("nextButton").addEventListener("click", nextPara);
document.getElementById("prevButton").addEventListener("click", prevPara);

let i = 0;

function nextPara() {
  i++;
  if (i === 4) {
    document.getElementById("nextButton").style.display = "none";
  }
  document.getElementById("prevButton").style.display = "block";
  document.querySelector(".planet-container span").innerHTML = spans[i];
  document.querySelector(".planet-container p").innerHTML = paragraphs[i];
}

function prevPara() {
  i--;
  if (i === 0) {
    document.getElementById("prevButton").style.display = "none";
  }
  document.getElementById("nextButton").style.display = "block";
  document.querySelector(".planet-container span").innerHTML = spans[i];
  document.querySelector(".planet-container p").innerHTML = paragraphs[i];
}
