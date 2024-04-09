// movie names an their URL address
let movies_URL={
The_Lord_Of_The_Rings : "https://images.bauerhosting.com/legacy/media/619d/bfe9/5909/d08f/544c/892d/1%20Fellowship.jpeg?auto=format&w=1440&q=80",
Star_Wars : "https://images.bauerhosting.com/legacy/media/619d/bf59/3ebe/4721/a59c/e4be/2%20ESB.jpg?auto=format&w=1440&q=80",
The_Godfather: "https://images.bauerhosting.com/legacy/media/619d/be32/5165/433b/cc3b/7c8f/3%20Godfather.jpg?auto=format&w=1440&q=80",
The_Dark_Knight: "https://images.bauerhosting.com/legacy/media/619d/bd81/3ebe/47b5/fa9c/e4ac/4%20dark%20knight.jpg?auto=format&w=1440&q=80",
The_Shawshank_Redemption: "https://images.bauerhosting.com/legacy/media/619d/bcdd/5165/4383/223b/7c83/5%20Shawshank.jpg?auto=format&w=1440&q=80",
Jaws : "https://images.bauerhosting.com/legacy/media/619d/bc72/3ebe/47f1/829c/e4a1/6%20Jaws.jpg?auto=format&w=1440&q=80"
// This is an array of strings (movie titles)
};
let titles = [
    "The_Lord_Of_The_Rings",
    "Star_Wars",
    "The_Godfather",
    "The_Dark_Knight",
    "The_Shawshank_Redemption",
    "Jaws"
];


// this is informations about each movies
let movieInfo = {
    "The_Lord_Of_The_Rings": {
        "Directors": "Peter Jackson",
        "Main Characters": ["Elijah Wood", "Ian McKellen", "Liv Tyler"],
        "Genre": "Fantasy",
        "Rating": "PG-13"
    },
    "Star_Wars": {
        "Directors": "George Lucas",
        "Main Characters": ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
        "Genre": "Sci-Fi",
        "Rating": "PG"
    },
    "The_Godfather": {
        "Directors": "Francis Ford Coppola",
        "Main Characters": ["Marlon Brando", "Al Pacino", "James Caan"],
        "Genre": "Crime",
        "Rating": "R"
    },
    "The_Dark_Knight": {
        "Directors": "Christopher Nolan",
        "Main Characters": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        "Genre": "Action",
        "Rating": "PG-13"
    },
    "The_Shawshank_Redemption": {
        "Directors": "Frank Darabont",
        "Main Characters": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
        "Genre": "Drama",
        "Rating": "R"
    },
    "Jaws": {
        "Directors": "Steven Spielberg",
        "Main Characters": ["Roy Scheider", "Robert Shaw", "Richard Dreyfuss"],
        "Genre": "Thriller",
        "Rating": "PG"
    }
};
// to dissplay the movie cards 
function showCards() 
{
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    
    for (let i = 0; i < titles.length; i++) {
        let title = titles[i].replace(/_/g, " ");

        // Retrieve movie information from movieInfo object
        let movie = movieInfo[titles[i]];
        let imageURL = movies_URL[titles[i]];
        
        const nextCard = templateCard.cloneNode(true); 
        editCardContent(nextCard,title, imageURL, movie); // Pass movie information to editCardContent
        cardContainer.appendChild(nextCard);
    }
}

function editCardContent(card, newTitle, newImageURL, movie) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newTitle;

    const cardImage = card.querySelector("img");
    cardImage.src = newImageURL;
    cardImage.alt = newTitle + " Poster";

    const cardInfo = card.querySelector(".info");
    cardInfo.innerHTML = ""; // Clear existing content
    
    // Iterate over movie information and add it to the card
    for (const [key, value] of Object.entries(movie)) {
        let infoItem = document.createElement("p");
        if (Array.isArray(value)) {
            infoItem.textContent = `${key}: ${value.join(", ")}`;
        } else {
            infoItem.textContent = `${key}: ${value}`;
        }
        cardInfo.appendChild(infoItem);
    }
}
document.addEventListener("DOMContentLoaded", showCards);
// This calls the addCards() function when the page is first loaded

// use a search buttun to see list of movies
function searchMovies() {
    let searchText = document.getElementById('searchInput').value.trim().toLowerCase();
    let cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear previous search results

    for (let i = 0; i < titles.length; i++) {
        let title = titles[i].replace(/_/g, " ");
        let movieName = title.toLowerCase();

        if (movieName.includes(searchText)) {
            let imageURL = movies_URL[titles[i]];
            const templateCard = document.querySelector(".card");
            const nextCard = templateCard.cloneNode(true); 
            editCardContent(nextCard, title, imageURL, movieInfo[titles[i]]); 
            cardContainer.appendChild(nextCard);
        }
    }
}

function removeLastCard() {
    titles.pop(); // Remove last item in titles array
    showCards(); // Call showCards again to refresh
}
function sortcard() {
    titles.sort();// sort titles alphabetical
    showCards();
}
// reset search result using reset buttun
function resetSearch() {
    document.getElementById('searchInput').value = '';
    showCards();
}
// add movies by adding title, URL and movie information 
function addMovie() {
    // Prompt the user to enter the title of the new movie
    let newMovieTitle = prompt("Enter the title of the new movie:");
    newMovieTitle = newMovieTitle.replace(/ /g, "_");
    let newMovieTitle_URL = prompt("Please enter src");
    // Check if the user entered a movie title
    if (newMovieTitle) {
        // Prompt the user to enter the directors, actors, genre, and rating of the new movie
        let directors = prompt(`Enter Directors for ${newMovieTitle}:`);
        let actors = prompt(`Enter Main actors for ${newMovieTitle} (comma-separated):`);
        let genre = prompt(`Enter Genre for ${newMovieTitle}:`);
        let rating = prompt(`Enter Rating for ${newMovieTitle}:`);

        // Add the new movie title to the titles array
        titles.push(newMovieTitle);
        movies_URL[newMovieTitle] = newMovieTitle_URL;
        
        // Add movie information to the movieInfo object
        movieInfo[newMovieTitle] = {
            "Directors": directors,
            "Actors": actors.split(","),
            "Genre": genre,
            "Rating": rating
        };

        // Call showCards() 
        showCards();
    }
}

