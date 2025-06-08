import { cloud } from "../../config/cloud.js";

export const reUploadImg = async ({
  url,
  folder,
}: {
  url: string;
  folder: string;
}) => {
  const res = await cloud.uploader.upload(url, {
    folder: `pern__book_${folder}`,
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  });

  return {
    url: res.secure_url,
    publicID: res.public_id,
  };
};
