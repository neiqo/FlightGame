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
      // Extract relevant content
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0]; // Assuming there's only one page in the response
      const extract = pages[pageId].extract;

      // Display the extracted content
      const spansWithIds = extract
        .split("<span ")
        .filter((span) => span.includes('id="'));

      const content = [];

      for (let i = 0; i < spansWithIds.length; i++) {
        let matches = spansWithIds[i].match(/<p>.*?<\/p>/g);
        if (matches && Array.isArray(matches)) {
          if (matches.length > 1) {
            content.push(matches.slice(0, 2));
          } else {
            content.push(matches);
          }
        }
      }

      /*
      for (let i = 0; i < 5; i++) {
        console.log(content[i]);
      }
*/

      updateContent(content, spansWithIds);
    })
    /*
    .catch((error) => {
      console.error("Fetch error:", error);
    })
    */;
}

function updateContent(content, spansWithIds) {
  let element = document.getElementById("content");

  for (let i = 0; i < 5; i++) {
    const div = document.createElement('div');
    div.className = spansWithIds[i];

    for (let n = 0; n < content[i].length; n++) {
      const p = document.createElement('p');
      p.innerHTML = content[i][n];
      div.appendChild(p);
    }

    element.appendChild(div);
  }
}

// Fetch data about the player's current planet based on user savedata
function fetchDataForCurrentPlanet(planetName) {
  if (planets.includes(planetName)) {
    fetchplanet(planetName);
  } else {
    console.error("Invalid planet name:", planetName);
  }
}
