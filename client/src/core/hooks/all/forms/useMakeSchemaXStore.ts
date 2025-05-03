import { schemaBookStore } from "@/core/lib/all/forms/schemaZ/bookStore";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { useMemo } from "react";
import { z } from "zod";

export const useMakeSchemaXStore = () => {
  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};

  return useMemo(
    () =>
      schemaBookStore.and(z.object({})).superRefine((data, ctx) => {
        if (data.items?.length) {
          let i = 0;

          do {
            const curr = data.items[i];
            if (curr.email === user?.email) {
              ctx.addIssue({
                path: [`items.${i}.email`],
                message: "You can not hire yourself",
                code: "custom",
              });
              break;
            }

            i++;
          } while (i < data.items.length);
        }
      }),
    [user?.email]
  );
};
