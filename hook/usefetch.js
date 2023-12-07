import axios from 'axios';
import { useState, useEffect } from 'react';
// import { RAPID_API_KEY } from '@env';

export default function usefetch(endpoint, query) {
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  // const rapidApiKey = process.env.EXPO_PUBLIC_API_URL

  // console.log("Key", process.env.EXPO_PUBLIC_API_KEY)

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': "02f8ffeaebmshcfecc542acd188ap119b53jsnc586c7821947",
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: { ...query },  
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      console.error("Error in fetchData:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("running")
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, error, isloading, refetch };
}
