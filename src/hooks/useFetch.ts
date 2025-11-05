import { useEffect, useState } from "react";

export const useFetch = <T = unknown>(url: string) => {
  const [data, setData] = useState<T | null>();
  const [isLoading, setLoading] = useState(false);
  const controller = new AbortController();
//   const apiUrl = `${url}?search=${query}`;

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then((data: T) => {
          if (data) {
            setData(data);
          }
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, isLoading };
};
