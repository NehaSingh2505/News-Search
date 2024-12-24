const API_URL = "https://saurav.tech/NewsAPI/everything/cnn.json";
const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

let allArticles = [];

async function fetchNews() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allArticles = data.articles;
    displayNews(allArticles);
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = "<p>Failed to load news articles.</p>";
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = "";
  if (articles.length === 0) {
    newsContainer.innerHTML = "<p>No articles found.</p>";
    return;
  }
  articles.forEach((article) => {
    const newsCard = document.createElement("div");
    newsCard.className = "news-card";

    newsCard.innerHTML = `
      <h2>${article.title}</h2>
      <div class="author-date">
        ${article.author || "Unknown"} / ${new Date(article.publishedAt).toLocaleDateString()}
      </div>
      <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="News Image">
      <p>${article.description || "No description available."}</p>
      <button onclick="window.open('${article.url}', '_blank')">Read More</button>
    `;
    newsContainer.appendChild(newsCard);
  });
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  const filteredArticles = allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query)
  );
  displayNews(filteredArticles);
});

fetchNews();
