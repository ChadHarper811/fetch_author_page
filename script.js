const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById("load-more-btn");
const loadLessBtn = document.getElementById("load-less-btn");

let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")
    .then((res) => res.json())
    .then((data) => {
        authorDataArr = data;
        displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
        // displayAuthors(authorDataArr);
    })
    .catch((err) => {authorContainer.innerHTML = `<p class="error-msg">There was an error loading the authors</p>`});

const fetchMoreAuthors = () => {
    startingIndex += 8;
    endingIndex += 8;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
    if (authorDataArr.length <= endingIndex) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = "No more data to load";
    };
};

// const loadMoreAuthors = () => {
//     if (endingIndex + 8 >= authorDataArr.length) {
//         endingIndex = authorDataArr.length
//         loadLessBtn.classList.remove("hidden");
//         loadMoreBtn.classList.add("hidden");
//     } else if (8 <= endingIndex <= authorDataArr.length) {
//         endingIndex += 8;
//         loadLessBtn.classList.remove("hidden");
//     }

//     for (let i = 0; i < endingIndex; i++) {
//         let cardToDisplay = document.getElementById(i);
//         cardToDisplay.classList.remove("hidden");
//     }
// };

// const loadLessAuthors = () => {
//     if (endingIndex - 8 <= 8) {
//         endingIndex = 8;
//         loadLessBtn.classList.add("hidden");
//         loadMoreBtn.classList.remove("hidden");
//     } else if (8 <= endingIndex <= authorDataArr.length) {
//         endingIndex -= 8;
//     }

//     for (let i = endingIndex; i < authorDataArr.length; i++) {
//         let cardToHide = document.getElementById(i);
//         cardToHide.classList.add("hidden");
//     }
// };

const displayAuthors = (authors) => {
    authors.forEach(({author, image, url, bio}, index) => {
        authorContainer.innerHTML += `
        <div id="${index}" class="user-card ${index >= endingIndex ? "hidden" : ""}">
            <h2 class="author-name">${author}</h2>
            <img class="user-img" src="${image}" alt="${author} avatar" />
            <div class="purple-divider"></div>
            <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + "..." : bio}</p>
            <a class="author-link" href="${url}" target="_blank">${author}'s author page</a>
        </div>
        `;
    });
};

loadMoreBtn.addEventListener("click", fetchMoreAuthors);

// loadMoreBtn.addEventListener("click", loadMoreAuthors);
// loadLessBtn.addEventListener("click", loadLessAuthors);