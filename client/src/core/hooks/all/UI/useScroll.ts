import { makeDelay } from "@/core/lib/lib";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScroll = () => {
  const path = useLocation().pathname;

  useEffect(() => {
    makeDelay(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
  }, [path]);
};
