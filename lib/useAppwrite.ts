import { useEffect, useState } from "react";
import useStore from "../context/store";

type AsyncFunction<T> = () => Promise<T>;

export const useAppwrite =  <T>(fn: AsyncFunction<T>) => {
  const { setIsLoading, isLoading } = useStore();
  const [data, setdata] = useState<any>([]);
  const getData = async () => {
    setIsLoading(true);

    try {
      const d = await fn();
      setdata(d);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const refresh = () => getData();

  return { data, refresh, isLoading };
};
