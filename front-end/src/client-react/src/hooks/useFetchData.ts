import { useEffect, useRef, useState } from "react";
import { http } from "../services/httpService/httpService";
import config from "../config.json";

export const useFetchData = <T>(
  relativePath: string
): [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>,
  boolean,
  boolean,
  () => void
] => {
  const [actualData, setActualData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [containsError, setContainsError] = useState<boolean>(true);
  const mountedRef = useRef(true);

  const fetchData = () => {
    setIsLoading(true);
    http
      .get<T>(`${config.apiEndpoint}${relativePath}`)
      .then((response) => {
        if (response.data) {
          if (mountedRef.current) {
            setActualData(response.data);
            setIsLoading(false);
            setContainsError(false);
          }
        }
      })
      .catch((error) => {
        if (mountedRef.current) {
          setIsLoading(false);
          setContainsError(true);
        }
      });
  };

  useEffect(() => {
    fetchData();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return [actualData, setActualData, isLoading, containsError, fetchData];
};
