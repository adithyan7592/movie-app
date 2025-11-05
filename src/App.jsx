import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const OMDB_KEY = "thewdb";

  const searchMovies = async () => {
    if (!search.trim()) return;
    setLoading(true);

    const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${search}`);
    const data = await res.json();
    setMovies(data.Search || []);
    setLoading(false);
  };

  const openMovieDetails = async (id) => {
    setDetailsLoading(true);
    const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${id}&plot=full`);
    const data = await res.json();
    setSelectedMovie(data);
    setDetailsLoading(false);
  };

  const closeModal = () => setSelectedMovie(null);

  return (
    <>
      {/* ✅ NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">🎬 MovieFinder</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-2"><a className="nav-link active" href="#">Home</a></li>
              <li className="nav-item mx-2"><a className="nav-link" href="https://github.com" target="_blank">GitHub ⭐</a></li>
              <li className="nav-item mx-2"><a className="nav-link" href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ MAIN CONTENT */}
      <div className="main-content">
        <div className="container py-5">
          <h2 className="text-center mb-4 fw-bold">Find Your Favorite Movies 🎥</h2>

          {/* Search */}
          <div className="d-flex justify-content-center mb-4">
            <div className="input-group search-box" style={{ maxWidth: "500px" }}>
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Search movies... (Batman, Avengers...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-danger shadow-sm" onClick={searchMovies}>🔍 Search</button>
            </div>
          </div>

          {loading && <h5 className="text-center text-secondary">Loading...</h5>}

          {!loading && movies.length === 0 && (
            <p className="text-center text-muted">Start searching for movies 👇</p>
          )}

          {/* Movies */}
          <div className="row g-4 mt-1">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="col-6 col-md-3">
                <div
                  className="movie-card card border-0 shadow-sm h-100"
                  onClick={() => openMovieDetails(movie.imdbID)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
                    className="card-img-top movie-img"
                    alt={movie.Title}
                  />
                  <div className="card-body text-center">
                    <h6 className="fw-bold">{movie.Title}</h6>
                    <p className="text-secondary small">{movie.Year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ MOVIE DETAILS MODAL */}
      {selectedMovie && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.7)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              {detailsLoading ? (
                <div className="text-center p-4">Loading movie...</div>
              ) : (
                <>
                  <div className="modal-header">
                    <h5 className="modal-title fw-bold">{selectedMovie.Title}</h5>
                    <button className="btn-close" onClick={closeModal}></button>
                  </div>

                  <div className="modal-body d-flex gap-3">
                    <img
                      src={selectedMovie.Poster}
                      alt={selectedMovie.Title}
                      style={{ width: "200px", borderRadius: "5px" }}
                    />
                    <div>
                      <p><strong>Year:</strong> {selectedMovie.Year}</p>
                      <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                      <p><strong>Rating:</strong> ⭐ {selectedMovie.imdbRating}</p>
                      <p><strong>Cast:</strong> {selectedMovie.Actors}</p>
                      <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ✅ FOOTER */}
      <footer className="bg-dark text-light text-center py-3 mt-auto">
        <small>
          Made with ❤️ by <span className="fw-bold">S Adithyan</span> | © {new Date().getFullYear()}
        </small>
      </footer>
    </>
  );
}

export default App;






