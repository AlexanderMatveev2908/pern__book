/* eslint-disable @typescript-eslint/no-explicit-any */
export const processTeam = (team: any[]) =>
  team?.length
    ? team.map((el: any) => ({ email: el.userEmail, role: el.role }))
    : [];

export const processVideo = (video: any) => video?.url ?? null;

export const processImages = (images: any[]) =>
  images?.map((el: any) => el.url) ?? [];

export const processPrice = (value: any) => {
  const numVal = +(value ?? "0");
  return numVal ? value : null;
};

export const processNumberToString = (value: number) => {
  return value + "";
};
