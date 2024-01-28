const planets = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
];

function fetchdata(id) {
  fetch(`https://api.le-systeme-solaire.net/rest/bodies/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the data here
      console.log(data);
    });
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
      // Extract relevant content
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0]; // Assuming there's only one page in the response
      const extract = pages[pageId].extract;

      // Display the extracted content
      const spansWithIds = extract
        .split("<span ")
        .filter((span) => span.includes('id="'));

      for (let i = 0; i < spansWithIds.length; i++) {
        let matches = spansWithIds[i].match(/<p>.*?<\/p>/g);
        console.log(spansWithIds[i]);
        console.log(matches);
      }
      updateContent(extract);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function updateContent(content) {
  document.getElementById("content").innerHTML = content;
}

// Fetch data about the player's current planet based on user savedata
function fetchDataForCurrentPlanet(planetName) {
  if (planets.includes(planetName)) {
    fetchplanet(planetName);
  } else {
    console.error("Invalid planet name:", planetName);
  }
}
