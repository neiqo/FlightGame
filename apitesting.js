const submit = document
  .querySelector("#submit")
  .addEventListener("click", function () {
    let planet = document.querySelector("#planet").value.toLowerCase();
    console.log(planet);
    fetchdata(planet);
  });

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

const apiUrl =
  "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&titles=earth";

fetch(apiUrl)
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
    // console.log(pages);
    // console.log(extract);
    // console.log(Object.keys(pages)[0]);

    // Now you can further process or display the content as needed

    const spansWithIds = extract
      .split("<span ")
      .filter((span) => span.includes('id="'));

    for (let i = 0; i < spansWithIds.length; i++) {
      let matches = spansWithIds[i].match(/<p>.*?<\/p>/g);
      console.log(spansWithIds);
      console.log(matches);
    }
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
