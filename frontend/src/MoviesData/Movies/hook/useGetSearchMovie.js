
import axios from "axios";
import { useEffect, useState } from "react";
import useDebounceQuery from "./useDebounceQuery";

const useGetSearchMovie = ({ searchInput }) => {
    const [searchData, setSearchData] = useState([]);
    const [searchDataLoading, setSearchDataLoading] = useState(true);
    const { query = "", debounceQuery } = useDebounceQuery();
    useEffect(() => {
        debounceQuery(searchInput);
    }, [debounceQuery, searchInput]);

    const getSearchData = async () => {
        try {
            const response = await axios.get(`https://movie-backend-git.onrender.com/api/search?query=${query}`);
            setSearchData(response.data);
            setSearchDataLoading(false);
        } catch (error) {
            console.error(error, "Oops Something Went Wrong");
            setSearchDataLoading(false);
        }
    };

    useEffect(() => {
      getSearchData();
    }, [query]);

    return {
        searchData,
        searchDataLoading,
        query,
    };
};
export default useGetSearchMovie;

