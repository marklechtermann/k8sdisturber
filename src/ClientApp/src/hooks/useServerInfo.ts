import { useQuery } from "@tanstack/react-query";
import { IApplicationEnvironmentInfo } from "../models/IApplicationEnvironmentInfo";

import infoService from "../services/InfoService";

const QUERY_KEY = "ENVIRONMENT_VARIABLES";

export default function useServerInfo(): {
  info?: IApplicationEnvironmentInfo;
} {
  const { data } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      return await infoService.getInfo();
    },
  });

  return { info: data };
}
