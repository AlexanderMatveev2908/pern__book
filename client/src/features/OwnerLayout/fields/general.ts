/* eslint-disable @typescript-eslint/no-explicit-any */
import { replacePoint } from "@/core/lib/lib";

export const genValsRating = <T>(el: T) => [
  {
    label: "Total Reviews",
    val: (el as any)?.ratingStats?.reviewsCount,
  },
  {
    label: "Avg rating",
    val: (el as any)?.ratingStats?.avgRating,
  },

  ...[
    [0, 1],
    [1.1, 2],
    [2.1, 3],
    [3.1, 4],
    [4.1, 5],
  ].map((pair) => ({
    label: `From ${pair[0]} to ${pair[1]}`,
    val: (el as any)?.ratingStats?.[
      `reviews__${replacePoint(pair[0])}__${replacePoint(pair[1])}` as keyof T
    ],
  })),
];
