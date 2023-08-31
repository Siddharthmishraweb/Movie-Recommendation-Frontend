import axios from "axios";
import { useEffect, useState } from "react";

const useGetSelectedMovie = ({ movieId }) => {
    const [searchResult, setSearchResult] = useState({});
    const [creditData, setCreditData] = useState({});
    const [loadingSearchResult, setLoadingSearchResult] = useState(true);
    const [creditDataLoading, setCreditDataLoading] = useState(true);
    const getSearchResult = async () => {
        try {
            const response = await axios.get(
                `https://movie-backend-git.onrender.com/api/movies/${movieId}`
            );
            setSearchResult(response?.data);
            setLoadingSearchResult(false);
            const creditResponse = await axios.get(
                `https://movie-backend-git.onrender.com/api/movies/${movieId}`
            );
            setCreditData(creditResponse?.data);
            setCreditDataLoading(false);
        } catch (error) {
            console.error(error, "Oops! Somthing went wrong");
            setLoadingSearchResult(false);
        }
    };

    useEffect(() => {
        getSearchResult();
    }, [movieId]);

    return {
        loadingSearchResult,
        searchResult,
        creditData,
        creditDataLoading,
    };
};
export default useGetSelectedMovie;
