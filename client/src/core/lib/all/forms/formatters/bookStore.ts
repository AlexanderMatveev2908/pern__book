import { FormBookStoreType } from "@/pages/OwnerLayout/CreateBooksStore/CreateBooksStorePage";

export const makeFormDataStore = (
  formDataHook: FormBookStoreType
): FormData => {
  const formData = new FormData();

  const pairs = Object.entries(formDataHook);

  let i = 0;

  do {
    const [key, val] = pairs[i];

    if (typeof val === "string") {
      if (!val.trim().length) {
        i++;
        continue;
      }
      formData.append(key, val);
    } else if (Array.isArray(val) && val.length) {
      let j = 0;

      do {
        const curr = val[j];
        console.log(curr);
        if (typeof curr === "string") {
          formData.append(key, curr);
        } else if (
          typeof curr === "object" &&
          curr !== null &&
          Object.keys(curr).length &&
          Object.values(curr).every((val) => !!val)
        ) {
          const pairs = Object.entries(curr);

          let y = 0;

          do {
            formData.append(`${key}[${j}][${pairs[y][0]}]`, pairs[y][1]);

            y++;
          } while (y < pairs.length);
        }

        j++;
      } while (j < val.length);
    }

    i++;
  } while (i < pairs.length);

  return formData;
};
