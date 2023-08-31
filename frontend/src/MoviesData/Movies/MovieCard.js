import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../../redux/actions"; // Update the path accordingly

const MovieCard = ({ movie }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist);

    const isOnWishlist = Array.isArray(wishlist) && wishlist.includes(movie._id);

    const handleWishlistToggle = () => {
        if (isOnWishlist) {
            dispatch(removeFromWatchlist(movie._id));
        } else {
            dispatch(addToWatchlist(movie._id));
        }
    };

    return (
        <div className="movie-card">
            <button
                onClick={handleWishlistToggle}
                style={{
                    width:'100%',
                    padding: "8px 16px",
                    backgroundColor: isOnWishlist ? "rgb(223, 223, 222)" : "rgb(223, 223, 222)",
                    color: "black",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "background-color 0.3s",
                }}
            >
                {isOnWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
        </div>
    );
};

export default MovieCard;
