import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const useApi = <T>(key: string, url: string) => {
  const { isLoading, refetch, data } = useQuery<T>({
    queryKey: [key],
    queryFn: () => api.get(url).then((res) => res.data),
  });

  return { data, isLoading, refetch };
};
