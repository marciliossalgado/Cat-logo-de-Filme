const apiKey = '77c4e2b070a2e1396500d0b42ebf7cec'; // chave api

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function() {
  const query = searchInput.value.trim();
  if (query.length > 2) { // Começa a pesquisa quando o usuário digitar mais de 2 caracteres
    const searchUrl = `https://api.themoviedb.org/3/movie/popular?api_key=77c4e2b070a2e1396500d0b42ebf7cec&language=pt-BR`;

    fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        displayMovies(data.results);
      })
      .catch(error => console.error('Erro ao buscar filmes:', error));
  }
});

function displayMovies(movies) {
  const movieList = document.getElementById('movie-list');
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
      <button onclick="showMovieDetails(${movie.id})">Detalhes</button>
    `;

    movieList.appendChild(movieItem);
  });
}

// Definição da função showMovieDetails
function showMovieDetails(movieId) {
  console.log(`Mostrar detalhes do filme com ID: ${movieId}`);
  // Aqui você pode adicionar a lógica para exibir detalhes do filme
}
