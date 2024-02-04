/*
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
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&titles=${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId].extract;

        const parser = new DOMParser();
        const doc = parser.parseFromString(extract, "text/html");

        const headers = doc.querySelectorAll("h2");

        for (let i = 0; i < 5; i++) {
          console.log(headers[i].textContent);
        }

        updateContent(headers);
      });
  }

  function updateContent(headers) {
    let element = document.getElementById("content");

    for (let i = 0; i < 5; i++) {
      const div = document.createElement("div");
      div.className = headers[i].textContent;

      const span = document.createElement("span");
      span.innerHTML = headers[i].textContent;

      div.appendChild(span);

      const p = document.createElement("p");
      p.innerHTML = findNextParagraph(headers[i]);
      div.appendChild(p);

      const image = document.createElement("img");
      let search =
        document.getElementById("player-current-planet").textContent +
        ` ` + headers[i].textContent;

      console.log(search);
      image.src = fetchImages(search);
      fetchImages(search);
      element.appendChild(div);
    }
  }

  function findNextParagraph(element) {
    let currentElement = element.nextElementSibling;
    let savedElement;
    let content = "";

    while (currentElement !== null) {
      if (currentElement.tagName.toLowerCase() === "p") {
        savedElement = currentElement;
        if (savedElement.nextElementSibling.tagName.toLowerCase() !== "p") {
          content += currentElement.textContent;
          return content;
        } else {
          content += currentElement.textContent;
        }
      }
      currentElement = currentElement.nextElementSibling;
    }

    return "No <p> tag found in the next siblings.";
  }

  function fetchDataForCurrentPlanet(planetName) {
    if (planets.includes(planetName)) {
      fetchplanet(planetName);
    } else {
      console.error("Invalid planet name:", planetName);
    }
  }

  function fetchImages(search) {
    fetch(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyC5stymWLly1XZLE2vKTVSQchuijAkRJSk&cx=41aa1b31d82d54b6d&searchType=image&q=%27${search}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result.items);
        console.log(result.items[0].link);
      });
  }

  // Example: Fetch data for the planet "earth"
  fetchDataForCurrentPlanet();

*/

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
  fetch(
    `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&titles=${id}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      /*
      // Extract relevant content
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0]; // Assuming there's only one page in the response
      const extract = pages[pageId].extract;

      // Display the extracted content
      const spansWithIds = extract
        .split("<span ")
        .filter((span) => span.includes('id="'));

      const content = [];

      //console.log(spansWithIds);
      for (let i = 0; i < spansWithIds.length; i++) {
        let matches = spansWithIds[i].match(/<p>[\s\S]*?<\/p>/g);
        if (matches && Array.isArray(matches)) {
          content.push(matches);
        }
      }

      //updateContent(content, spansWithIds);
      updateContent(content, spansWithIds);
      */

      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0]; // Assuming there's only one page in the response
      const extract = pages[pageId].extract;

      const parser = new DOMParser();
      const doc = parser.parseFromString(extract, "text/html");

      const headers = doc.querySelectorAll("h2");
      const paragraphs = doc.querySelectorAll("h3");

      /*
      for (let i = 0; i < etymologySpan.length; i++) {
        console.log(etymologySpan[i].childNodes);
        console.log(etymologySpan[i].nextElementSibling.textContent);
      }
      */

      for (let i = 0; i < 5; i++) {
        //console.log(headers[i].childNodes);
        //console.log(headers[i].textContent);
        //console.log(findNextParagraph(headers[i]));
      }

      //console.log(etymologySpan[0].nextElementSibling.textContent);
      //console.log(headers[1].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent);
      //console.log(findNextParagraph(headers[1]));
      //console.log(etymologySpan[0].childNodes);
      // Loop through each <p> tag and access its content

      updateContent(headers);
    });
}
/*
    .catch((error) => {
      console.error("Fetch error:", error);
    })
    */

function updateContent(headers) {
  /*
  let element = document.getElementById("content");

  for (let i = 0; i < 5; i++) {
    const div = document.createElement("div");
    div.className = spansWithIds[i];

    const span = document.createElement("span");
    span.innerHTML = spansWithIds[i].replace(/id=".*?">/, "");

    div.appendChild(span);

    for (let n = 0; n < content[i].length; n++) {
      const p = document.createElement("p");
      p.innerHTML = content[i][n];
      div.appendChild(p);
    }
    element.appendChild(div);
  }
  */
  let element = document.getElementById("content");

  for (let i = 0; i < 5; i++) {
    const div = document.createElement("div");
    div.className = headers[i].textContent;

    const span = document.createElement("span");
    span.innerHTML = headers[i].textContent;

    div.appendChild(span);

    const p = document.createElement("p");
    p.innerHTML = findNextParagraph(headers[i]);
    div.appendChild(p);

    let search = current_planet + ` ` + headers[i].textContent;
    //const image = document.createElement("img");
    //let search = current_planet + ` ` + headers[i].textContent;

    //console.log(search);
    //image.src = fetchImages(search);

    //div.appendChild(image);

    async function loadImage() {
      try {
        const imageUrl = await fetchImages(search);
        console.log("Image URL:", imageUrl);

        // Set the src attribute after obtaining the image URL
        let src = imageUrl;
        // Append the image to the document or do whatever you need to do with it
        if (src !== null) {
          const image = document.createElement("img");
          image.id = headers[i].textContent + "img";
          image.onload = function () {
            resizeImageWithAspectRatio(image, 300);
            div.appendChild(image);
          };

          // Set the src attribute after obtaining the image URL
          image.src = imageUrl;

          console.log("Image Element:", image.src);

          resizeImageWithAspectRatio(image, 300);
          div.appendChild(image);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    loadImage();

    // Find the next <p> element after the current span
    //const nextParagraph = getNextParagraph(spansWithIds[i], doc);

    // if (nextParagraph) {
    //   const p = document.createElement("p");
    //   p.innerHTML = nextParagraph.innerHTML;
    //   div.appendChild(p);
    // }

    element.appendChild(div);
  }
}

async function fetchImages(search) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyC5stymWLly1XZLE2vKTVSQchuijAkRJSk&cx=0364b018377bd4cf1&searchType=image&q=${search}`
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

    //no images from nasa
    //throw new Error('Image not found');
  } catch (error) {
    throw error;
  }
}

function findNextParagraph(element) {
  // Start from the next sibling of the provided element
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

function resizeImageWithAspectRatio(image, newWidth) {
  const originalWidth = image.width;
  const originalHeight = image.height;

  // Calculate the aspect ratio
  const aspectRatio = originalWidth / originalHeight;

  // Calculate the new height based on the desired width and original aspect ratio
  const newHeight = newWidth / aspectRatio;

  // Set the new dimensions
  image.width = newWidth;
  image.height = newHeight;
}

/*
async function fetchImages(search) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyC6UOCo5PaHnSax9USYkN_e6ycE8gHFQlA&cx=41aa1b31d82d54b6d&searchType=image&q=%27${search}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (result.items && result.items.length > 0) {
      console.log(result.items[0].link);
      return result.items[0].link;
    } else {
      console.error('No images found for the search:', search);
      return ''; // Return an empty string or a placeholder URL
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    return ''; // Return an empty string or a placeholder URL
  }
}
*/

/*
function fetchImages(search) {
  fetch(
    `https://www.googleapis.com/customsearch/v1?key=AIzaSyA8EMirlnHr71Wi2v96HH7lEKWNyZZV6LQ&cx=0364b018377bd4cf1&searchType=image&q=${search}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      const substring = "https://science.nasa.gov";
      for (let i = 0; i < result.items.length; i++) {
        if (result.items[i].image.contextLink.includes(substring)) {
          console.log(search);
          console.log(result.items[i].link);
          return result.items[i].link;
        }
      }
    });
}
*/

//fetchImages(`earth`);
