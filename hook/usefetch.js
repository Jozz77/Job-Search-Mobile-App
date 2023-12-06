import axios from 'axios';
import { useState, useEffect } from 'react';

export default function usefetch(endpoint, query) {
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': '675396d5a1msh0283f142bd8e729p1aca55jsndfe96a02fb35',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: { ...query },
    // params: {
    //   query: 'Python developer in Texas, USA',
    //   page: 1, // OPTIONAL: Add your desired page number
    //   num_pages: 1, // OPTIONAL: Add your desired number of pages
    //   // date_posted: 'all', // OPTIONAL: Add your desired date filter
    //   // remote_jobs_only: false, // OPTIONAL: Add your desired filter for remote jobs
    //   // employment_types: 'FULLTIME,CONTRACTOR,PARTTIME,INTERN', // OPTIONAL: Add your desired employment types
    //   // // Add other optional parameters as needed
    // },
  
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
