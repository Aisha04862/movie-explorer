export default function MovieCard({ title, poster, releaseDate, rating }) {
  return (
    <div className="movie-card">
      {poster && <img src={poster} alt={title} />}
      <div className="movie-info">
        <h3>{title}</h3>
        <p>Release: {releaseDate}</p>
        <p>Rating: {rating}</p>
      </div>
    </div>
  );
}