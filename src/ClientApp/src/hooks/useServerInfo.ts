import { useQuery } from "@tanstack/react-query";
import { IApplicationEnvironmentInfo } from "../models/IApplicationEnvironmentInfo";

const QUERY_KEY = "ENVIRONMENT_VARIABLES";

export default function useServerInfo(): {
  info?: IApplicationEnvironmentInfo;
} {
  const { data } = useQuery(["QUERY_KEY"], {
    queryFn: async () => {
      const response = await fetch("/api/info");
      const data = (await response.json()) as IApplicationEnvironmentInfo;
      return data;
    },
    refetchInterval: 1000,
  });

  return { info: data };
}
