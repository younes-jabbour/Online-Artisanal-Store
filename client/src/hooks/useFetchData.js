import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url, id = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await axios.get(id ? `${url}/${id}` : url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, id]);

  return { data, loading, error };
};

export default useFetchData;
