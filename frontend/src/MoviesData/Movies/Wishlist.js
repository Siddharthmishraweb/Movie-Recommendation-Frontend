import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeFromWatchlist } from "../../redux/actions";

const Wishlist = () => {
    const watchlist = useSelector((state) => state.watchlist);
    const [movies, setMovies] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviePromises = watchlist.map(async (movieId) => {
                    const response = await axios.get(`https://movie-backend-git.onrender.com/api/movies/${movieId}`);
                    return response.data;
                });

                const movieDetails = await Promise.all(moviePromises);
                setMovies(movieDetails);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovies();
    }, [watchlist]);

    const handleRemoveFromWatchlist = (movieId) => {
        dispatch(removeFromWatchlist(movieId));
        setMovies(movies.filter((movie) => movie._id !== movieId));
    };

    return (
        <div>
            <h2>My Watchlist</h2>
            <div style={{ display: "flex", flexWrap: "wrap",justifyContent: "space-evenly", }}>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div
                            key={movie._id}
                            style={{
                                width: "300px",
                                margin: "10px",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <img
                                src={movie.poster_path}
                                alt={movie.title}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                }}
                            />
                            <div style={{ flexGrow: 1 }}>
                                <h3>{movie.title}</h3>
                                <p>{movie.overview.substring(0, 50)}....</p>
                                <p>Release Date: {movie.release_date}</p>
                                <p>Vote Average: {movie.vote_average}</p>
                            </div>
                            <button
                                onClick={() => handleRemoveFromWatchlist(movie._id)}
                                style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    borderRadius: "5px",
                                    border: "none",
                                    padding: "10px 20px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                Remove from Wishlist
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Your watchlist is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
