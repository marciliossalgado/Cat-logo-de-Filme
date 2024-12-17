const apiKey = '77c4e2b070a2e1396500d0b42ebf7cec'; // chave api
let currentPage = 1;
let totalPages = 1;

const searchInput = document.getElementById('search-input');
const movieList = document.getElementById('movie-list');
const previousButton = document.getElementById('previous-btn');
const nextButton = document.getElementById('next-btn');

searchInput.addEventListener('input', function() {
  const query = searchInput.value.trim();
  if (query.length > 2) { // Começa a pesquisa quando o usuário digitar mais de 2 caracteres
    currentPage = 1; // Reseta a página quando uma nova pesquisa é feita
    fetchMovies(query);
  }
});

function fetchMovies(query = '') {
  const searchUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${currentPage}&query=${query}`;

  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      displayMovies(data.results);
      totalPages = data.total_pages;
      updatePagination();
    })
    .catch(error => console.error('Erro ao buscar filmes:', error));
}

function displayMovies(movies) {
  movieList.innerHTML = ''; // Limpa a lista antes de adicionar novos filmes

  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    // Verifica se o poster_path existe antes de usá-lo
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'caminho/para/imagem/default.jpg';
    
    movieItem.innerHTML = `
      <img src="${posterUrl}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.release_date}</p>
      <p>${movie.overview}</p>
    `;

    movieList.appendChild(movieItem);
  });
}

function updatePagination() {
  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

previousButton.addEventListener('click', function() {
  if (currentPage > 1) {
    currentPage--;
    fetchMovies(searchInput.value.trim());
  }
});

nextButton.addEventListener('click', function() {
  if (currentPage < totalPages) {
    currentPage++;
    fetchMovies(searchInput.value.trim());
  }
});

// Inicializa a primeira pesquisa para popular filmes
fetchMovies();
