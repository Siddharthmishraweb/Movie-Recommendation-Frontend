import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import styles from "./styles.module.css";
import useGetSearchMovie from "../hook/useGetSearchMovie";
import useGetMovieList from "../hook/useGetMovieList";
import { useSelector,useDispatch } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../../../redux/actions";
import { fetchMovies } from "../../../redux/actions";
import MovieCard from "../MovieCard";


const MoviesContainer = ({ searchInput }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.watchlist);
    const sortBy = useSelector((state) => state.sortBy);

    const handleProfile = (id) => {
        navigate("/movieDetails", { state: { id } });
    };


    const {
        data = {},
        movieListLoading = false,
        currentPage,
        setCurrentPage,
    } = useGetMovieList();

    const { results = [], total_results, total_pages } = data;
    
    const ans = searchInput==="" ? "" : searchInput;

    const { searchData, query, searchDataLoading } = useGetSearchMovie({ searchInput: ans });

    const {
        results: searchedMovieData = [],
        total_pages: total_searched_pages,
        total_results: total_searched_results,
    } = searchData || {};

    let filteredData = searchData || results;
    let totalPages = total_pages;
    let totalResults = total_results;
    let loading = movieListLoading;

    const sortedMovies = [...filteredData];
    if (sortBy === "rating") {
        sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === "releaseDate") {
        sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    }

    if(sortedMovies){
        filteredData = [...sortedMovies]
    }

    const handleToggleWatchlist = (movieId) => {
        if (watchlist.includes(movieId)) {
            dispatch(removeFromWatchlist(movieId));
        } else {
            dispatch(addToWatchlist(movieId));
        }
    };

    return (
        <>
            {loading ? (
                <div className={styles.no_data}>
                    <strong>Loading...</strong>
                </div>
            ) : (
                <>
                    {filteredData?.length > 0 ? (
                        <div className={styles.movie_container}>
                            {(filteredData || [])?.map((movie) => {
                                const {
                                    _id:id,
                                    vote_average,
                                    title,
                                    poster_path,
                                    overview,
                                } = movie;
                                const isOnWatchlist = watchlist.includes(id);
                                const isWatchlisted= watchlist.includes(id);
                                console.log("movie",movie)
                                return (
                                    
                                    <div
                                        key={id}
                                        className={styles.movie_card}
                                        onClick={() => handleProfile(id)}
                                    >
                                        <MovieCard
                                            key={movie._id}
                                            movie={movie}
                                            isOnWatchlist={isOnWatchlist}
                                            onToggleWatchlist={() => {
                                                if (isOnWatchlist) {
                                                    dispatch(removeFromWatchlist(movie._id));
                                                } else {
                                                    dispatch(addToWatchlist(movie._id));
                                                }
                                            }}
                                        />
                                        <div>
                                            <img
                                                src={
                                                    poster_path
                                                        ? `${poster_path}`
                                                        : `https://via.placeholder.com/500x750?text=No+Poster+Available`
                                                }
                                                alt={title}
                                                className={styles.image}
                                            />
                                        </div>
                                        <div className={styles.bottom}>
                                            <div className={styles.heading}>
                                                <div>{title}</div>
                                                <div>{vote_average}/10</div>
                                            </div>
                                            <div>
                                                <div className={ styles.desktop_view_description } >
                                                    {`${overview.substring( 0, 70)} ...`}
                                                </div>
                                                <div className={ styles.mobile_view_description } >
                                                    {`${overview.substring(0,40)} ...`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <footer className={styles.pagination}>
                                <Pagination
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    total_results={totalResults}
                                    total_pages={totalPages}
                                />
                            </footer>
                        </div>
                    ) : (
                        <div className={styles.no_data}>
                            <strong>No results found</strong>
                            <span>Please try searching for somthing else!</span>
                        </div>
                    )}
                </>
            )}
        </>
    );
};
export default MoviesContainer;
