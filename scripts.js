document.getElementById("btn-keyword").addEventListener("click", (e) => {
  e.preventDefault();
  makeCard(document.getElementById("text-field").value);
});

function makeCard(word) {
  let outerDiv = document.createElement("div");
  outerDiv.classList.add("card");
  outerDiv.style.width = "18rem";

  let innerDiv = document.createElement("div");
  innerDiv.classList.add("card-body");

  outerDiv.appendChild(innerDiv);

  let hTag = document.createElement("h5");
  hTag.classList.add("card-title");
  hTag.innerHTML = word[0].toUpperCase() + word.slice(1);
  innerDiv.appendChild(hTag);

  let buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "bdiv");
  innerDiv.appendChild(buttonDiv);

  let movies = document.createElement("a");
  movies.setAttribute("href", "#");
  movies.setAttribute("class", "btn btn-primary");
  movies.innerHTML = "Movies";
  movies.addEventListener("click", () => getMovies(word));
  buttonDiv.appendChild(movies);

  let gifs = document.createElement("a");
  gifs.setAttribute("href", "#");
  gifs.setAttribute("class", "btn btn-primary");
  gifs.innerHTML = "GIFS";
  gifs.addEventListener("click", (e) => {
    getGif(word);
  });
  buttonDiv.appendChild(gifs);

  document.querySelector("#cards").appendChild(outerDiv);
}

function getMovies(word) {
  fetch("http://www.omdbapi.com/?apikey=f9a5b5f8&s=" + word)
    .then((response) => response.json())
    .then((data) => arrCreateCard(data.Search));
}

function getGif(word) {
  var url =
    "https://api.giphy.com/v1/gifs/search?api_key=VB6a5K43xm8SbaugVIokI8sh4Fajp7I9&limit=12&q=" +
    word;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => arrCreateCard(data.data));
}

function arrCreateCard(card_data) {
  card_data.forEach((element) => {
    if (element["Poster"]) {
      createCard(element.Poster, element.Title, false);
    } else {
      createCard(element.embed_url, element.title, true);
    }
  });
}

function createCard(url, title, gif) {
  // Use the passed arguments to create a bootstrap card with details
  var card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "15rem";
  card.style.height = "fit-content";
  card.style.margin = "20px;";

  var img =
    gif === true
      ? document.createElement("iframe")
      : document.createElement("img");

  img.setAttribute("src", url);
  img.setAttribute("class", "card-img-top");
  card.appendChild(img);

  var cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  var cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerText = title;
  cardBody.appendChild(cardTitle);

  card.appendChild(cardBody);

  var somethingElse = gif === true ? "gifs" : "movies";

  console.log(somethingElse);

  document.getElementById(somethingElse).appendChild(card);
}

// VB6a5K43xm8SbaugVIokI8sh4Fajp7I9
