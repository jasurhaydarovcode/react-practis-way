import axios from 'axios';
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true)
    axios.get(url)
      .then(response => {
        if (response.data.success) {
          setData(response.data.body)
        } else {
          setData([])
          setError('errrrr')
        }
      })
      .catch(error => {
        setError('errrrr');
      }).finally(() => {
        setLoading(false);
      })

  }, [url]);

  return { data, loading, error };
}

export default useFetch;
