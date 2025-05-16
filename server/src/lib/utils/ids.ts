export const getCloudID = (url?: string) =>
  !url
    ? null
    : url?.split("/")?.at(-2) +
      "/" +
      url?.split("/")?.pop()?.split(".")?.shift();
