import { mandatoryKeysStore } from "@/core/config/fieldsData/OwnerLayout/post";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const canSaveStore = (vals: any) => {
  let isValid = true;

  let i = 0;

  do {
    const curr = vals?.[mandatoryKeysStore[i]];

    if (
      (typeof curr === "string" && !curr.trim().length) ||
      (Array.isArray(curr) && !curr.length)
    ) {
      isValid = false;
      break;
    }

    i++;
  } while (i < mandatoryKeysStore.length);

  return isValid;
};
