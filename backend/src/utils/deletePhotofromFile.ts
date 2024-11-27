import * as fs from 'fs';
export const deletePicture = async (path: string) => {
  await fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return err;
    }
  });
};
