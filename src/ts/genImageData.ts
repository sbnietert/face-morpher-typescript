import { resolve } from "path";

function genImageData(url: string): Promise<ImageData> {
  const img = new Image();
  img.src = url;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  return new Promise<ImageData>((resolve, reject) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, img.width, img.height);
      resolve(data);
    };
    img.onerror = () => {
      reject('image failed to load');
    };
  });
}
export default genImageData;