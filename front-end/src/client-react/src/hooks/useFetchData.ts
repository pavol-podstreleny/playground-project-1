import { useEffect, useState } from "react";
import { http } from "../services/httpService/httpService";
import config from "../config.json";

export const useFetchData = <T>(
  relativePath: string
): [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>,
  boolean,
  boolean
] => {
  const [actualData, setActualData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [containsError, setContainsError] = useState<boolean>(true);

  const fetchData = () => {
    setIsLoading(true);
    http
      .get<T>(`${config.apiEndpoint}${relativePath}`)
      .then((response) => {
        if (response.data) {
          setActualData(response.data);
          setIsLoading(false);
          setContainsError(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setContainsError(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [actualData, setActualData, isLoading, containsError];
};
