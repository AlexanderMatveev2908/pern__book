import { makeDelay } from "@/core/lib/lib";
import { useEffect } from "react";

export const useScroll = () => {
  useEffect(() => {
    makeDelay(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
  }, []);
};
