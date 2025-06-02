import { useGetUserCartQuery } from "@/features/root/rootAPI";
import { useWrapQueryAPI } from "../wrappers/useWrapQueryAPI";

export const useGetCart = () => {
  const resCart = useGetUserCartQuery();
  useWrapQueryAPI({ ...resCart });

  return {};
};
