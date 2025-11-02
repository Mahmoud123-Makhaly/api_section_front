 
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";

interface IUseAuthenticatedQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}
const useAuthenticatedQuery = ({
  queryKey,
  url,
  config,
}: IUseAuthenticatedQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => await axiosInstance.get(url, config),
  });
};
export default useAuthenticatedQuery;
