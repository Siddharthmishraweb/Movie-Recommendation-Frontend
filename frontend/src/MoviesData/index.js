import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./Movies";
import MovieDetails from "./Movies/MovieDetails";
import Wishlist from './Movies/Wishlist'

const MoviesData = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/movieDetails/*" element={<MovieDetails />} />
                <Route path="/wishlist" element={<Wishlist/> }/>
            </Routes>
        </BrowserRouter>
    );
};
export default MoviesData;
