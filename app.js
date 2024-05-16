document
  .getElementById("search-field")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchBook();
    }
  });

const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // Clear Search Box
  searchField.value = "";

  // Clear Previous Data
  const blankSearchText = document.getElementById("search-warning");
  blankSearchText.textContent = "";
  const itemsFound = document.getElementById("search-item");
  itemsFound.textContent = "";

  if (searchText === "") {
    // Display Search Warning
    const searchWarning = document.getElementById("search-warning");
    const h6 = document.createElement("h6");
    h6.innerText = `Please write any Book's name into the Search box.`;
    searchWarning.appendChild(h6);
  } else {
    // Show Loading Spinner

    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.style.display = "block";
    const image = document.getElementById("image");
    image.style.display = "none";

    // Load Data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        displaySearchResult(data);
        // Hide Loading Spinner
        loadingSpinner.style.display = "none";
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Hide Loading Spinner
        loadingSpinner.style.display = "none";
      });
  }
};

const displaySearchResult = (data) => {
  // Display Items Number
  const itemsFound = document.getElementById("search-item");
  itemsFound.textContent = "";
  const p = document.createElement("p");
  p.innerText = `Total items found : ${data.num_found}`;
  itemsFound.appendChild(p);

  if (data.num_found === 0) {
    // Clear Previous Data
    const searchResult = document.getElementById("serch-result");
    searchResult.textContent = "";
    // Display Search Warning
    const searchWarning = document.getElementById("search-warning");
    const h6 = document.createElement("h6");
    h6.innerText = `Sorry!! No Books Found. Please Try Again.`;
    searchWarning.appendChild(h6);
  } else {
    // Display Search Result
    const books = data.docs;
    const searchResult = document.getElementById("serch-result");
    searchResult.textContent = "";

    books.forEach((book) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
              <div class="card h-100">
                      <img src="https://covers.openlibrary.org/b/id/${
                        book.cover_i
                      }-M.jpg" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <p class="card-text">By ${book.author_name}</p>
                  </div>
                  <div class="card-footer">
                      <p class="card-text">First Published in ${book.publish_year.slice(
                        0,
                        1
                      )}</p>
                  </div>
              </div>
          `;
      searchResult.appendChild(div);
    });
  }
};
