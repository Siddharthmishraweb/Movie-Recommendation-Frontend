
import axios from "axios";
import { useEffect, useState } from "react";

const useGetMovieList = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const getMovieList = async () => {
        try {
            const response = await axios.get(`https://movie-backend-git.onrender.com/api/movies`);
            console.log("response:   ",response)
            setData(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err || "Opps Somthing went wrong");
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovieList();
    }, [currentPage]);

    return {
        data,
        movieListLoading: loading,
        currentPage,
        setCurrentPage,
    };
};

export default useGetMovieList;
