// import data from external file
import { books, authors, genres } from "./data.js";
// initialize variables
let page = 1;
let range = books.length

// define color schemes for day and night themes
const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
};
const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
}
// create a document fragment to append new elements to
  const fragment = document.createDocumentFragment()

// set initial range of books to display
  let startIndex = 0;
  let endIndex = 36;

  // extract books from the initial range and create previews for each
  const extracted = books.slice(startIndex, endIndex) // Extract a portion of books from the books array
  for (let i = 0; i < extracted.length; i++) { // For each book in the extracted portion of books, create a preview element
      const preview = document.createElement('dl')  // Create a new preview element
      // Set the preview element's class name and data attributes using the current book's properties
      preview.className = 'preview'
      preview.dataset.id = books[i].id
      preview.dataset.title = books[i].title
      preview.dataset.image = books[i].image
      preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
      preview.dataset.description = books[i].description
      preview.dataset.genre = books[i].genres

      // Set the inner HTML of the preview element using the current book's properties
      preview.innerHTML= /*html*/`
      <div>
      <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
      </div>
      <div class='preview__info'>
      <dt class='preview__title'>${books[i].title}<dt>
      <dt class='preview__author'> By ${authors[books[i].author]}</dt>
      </div>`
      fragment.appendChild(preview)
  }

  // append the previews to the DOM
  const booklist1 = document.querySelector('[data-list-items]')
  booklist1.appendChild(fragment)

  //searchbutton
  
  // add event listeners to show/hide search and settings overlays
const searchButton = document.querySelector("[data-header-search]");
const searchOverlay = document.querySelector("[data-search-overlay]");

const handleClick = () => {
  searchOverlay.style.display = "block";
};

searchButton.addEventListener("click", handleClick);


// This code defines two variables, searchCancel and searchOverlayCancel,
// which are assigned to elements in the HTML with data-search-cancel and data-search-overlay attributes, respectively.
// The function searchCancelToggle is defined, which sets the display style property of searchOverlayCancel to "none".
// This function will be used as a callback function later.
// An event listener is added to searchCancel, which listens for a "click" event and executes the searchCancelToggle function when triggered.
const searchCancel = document.querySelector("[data-search-cancel]");
const searchOverlayCancel = document.querySelector("[data-search-overlay]")
const searchCancelToggle = (event) => {
    searchOverlayCancel.style.display = "none";
}
searchCancel.addEventListener('click',searchCancelToggle)


//Settings
const settingbutton = document.querySelector("[data-header-settings]") // Selecting the button element with the attribute data-header-settings and storing it in a constant variable
const settingOverlay = document.querySelector("[data-settings-overlay]") // Selecting the overlay element with the attribute data-settings-overlay and storing it in a constant variable

const settingbtnToggle = (event) => { // Declaring a function that will toggle the display property of the settings overlay to "block"
    settingOverlay.style.display = "block";
}
settingbutton.addEventListener('click',settingbtnToggle)// Adding an event listener to the settings button that will trigger the toggle function when clicked


const settingCancel = document.querySelector('[data-settings-cancel]') // Select the cancel button from the settings overlay
const settingOverlays = document.querySelector("[data-settings-overlay]")// Select the settings overlay
 const settingCancelToggle = (event) => {// Define a function to toggle the visibility of the settings overlay when the cancel button is clicked
settingOverlays.style.display = "none";
}
settingCancel.addEventListener('click',settingCancelToggle)// Add an event listener to the cancel button to trigger the toggle function when clicked



  //code to display book details

  // define a function to display book details
  // This function handles the event when a user clicks on an item in a list, displaying its details
const detailsToggle = (event) => {
    const overlay1 = document.querySelector('[data-list-active]');
    const title = document.querySelector('[data-list-title]')
    const subtitle = document.querySelector('[data-list-subtitle]')
 const description = document.querySelector('[data-list-description]')
    const image1 = document.querySelector('[data-list-image]')
    const imageblur = document.querySelector('[data-list-blur]')
    // If the clicked item has a data-id attribute, display the overlay
    if (event.target.dataset.id) {
        overlay1.style.display = "block";
      }
      
      if (event.target.dataset.description) {
        description.innerHTML = event.target.dataset.description;
      }
      
      if (event.target.dataset.subtitle) {
        subtitle.innerHTML = event.target.dataset.subtitle;
      }
      
      if (event.target.dataset.title) {
        title.innerHTML = event.target.dataset.title;
      }
      
      if (event.target.dataset.image) {
        image1.setAttribute('src', event.target.dataset.image);
        imageblur.setAttribute('src', event.target.dataset.image);
      }
      


};
const detailsClose = document.querySelector('[data-list-close]')
detailsClose.addEventListener('click', (event) => {
document.querySelector("[data-list-active]").style.display = "none";
})
const bookclick = document.querySelector('[data-list-items]')
bookclick.addEventListener('click', detailsToggle)

//Authour dropdown
const authorSelect = document.querySelector("[data-search-authors]");
const allAuthorsOption = document.createElement('option');
allAuthorsOption.value = 'authors';
allAuthorsOption.textContent = 'All Authors';
authorSelect.appendChild(allAuthorsOption);
for (const authorId in authors) {
  const optionElement = document.createElement('option')
  optionElement.value = authorId
  optionElement.textContent = authors[authorId]
  authorSelect.appendChild(optionElement)
}

//Genre dropdown
const genreSelect = document.querySelector("[data-search-genres]");
const allGenresOption = document.createElement('option');
allGenresOption.value = 'all';
allGenresOption.textContent = 'All Genres';
genreSelect.appendChild(allGenresOption);

for (const genreId in genres) {
  const optionElement = document.createElement('option')
  optionElement.value = genreId
  optionElement.textContent = genres[genreId]
  genreSelect.appendChild(optionElement)
}
//change themes
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
 const changeThemeVision = (event) =>{
    event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    appoverlays.settingsOverlay.close()
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    appoverlays.settingsOverlay.close();
      }
} 
saveButton.addEventListener('click',changeThemeVision )


//Show more button
// Selecting the button with the attribute "data-list-button"
const showMoreButton = document.querySelector("[data-list-button]");

// Setting the innerHTML of the button to "Next Page"
showMoreButton.innerHTML = "Next Page"




// Adding an event listener to the button for the "click" event
showMoreButton.addEventListener("click", () => {

  window.scrollTo({ // added smooth scrolling
    top: 0,
    behavior: "smooth"
  });
  // Creating a document fragment to optimize DOM manipulations
  const fragment = document.createDocumentFragment();
  startIndex += 36;
  endIndex += 36;
  const startIndex1 = startIndex;
  const endIndex1 = endIndex;
  console.log(startIndex1);
  console.log(endIndex1);
  const extracted = books.slice(startIndex1, endIndex1);
  for (const {
    author,
    image,
    title,
    id,
    description,
    published,
  } of extracted) {
    const preview = document.createElement("dl");
    preview.className = "preview";
    preview.dataset.id = id;
    preview.dataset.title = title;
    preview.dataset.image = image;
    preview.dataset.subtitle = `${authors[author]} (${new Date(
      published
    ).getFullYear()})`;
    preview.dataset.description = description;
    preview.dataset.genre = genres
    preview.innerHTML = /*html*/ `
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`;
    fragment.appendChild(preview);
  }
  const booklist1 = document.querySelector("[data-list-items]");
  booklist1.appendChild(fragment);
});






























