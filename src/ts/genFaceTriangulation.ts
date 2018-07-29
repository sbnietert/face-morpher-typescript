import { Triangulation } from './triangulation';

import genFacialLandmarks from './genFacialLandmarks';
import { getLandmarkTriangulation } from './triangulation';

function genFaceTriangulation(img: ImageData) {
  return new Promise<Triangulation>((resolve, reject) => {
      genFacialLandmarks(img).then(landmarks => {
        resolve(getLandmarkTriangulation(landmarks, img.width, img.height));
      }).catch(reason => reject(reason));
  });
}
export default genFaceTriangulation;