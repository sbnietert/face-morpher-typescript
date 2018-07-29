import clm from 'clmtrackr';
import { Points } from 'delaunator';
import { resolve } from 'dns';

function genFacialLandmarks(imageData: ImageData): Promise<Points> {
  const ctrack = new clm.tracker({stopOnConvergence: true});
  ctrack.init();

  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(imageData, 0, 0);
  ctrack.start(canvas);

  return new Promise<Points>((resolve, reject) => {
    function removeEventListeners() {
      document.removeEventListener('clmtrackrConverged', onConverged);
      document.removeEventListener('clmtrackrLost', onError);
      document.removeEventListener('clmtrackrNotFound', onError);
    }

    function onConverged() {
      const landmarks = ctrack.getCurrentPosition();
      removeEventListeners();
      if (!landmarks) reject('points not found');
      else resolve(landmarks);
    }
    document.addEventListener('clmtrackrConverged', onConverged);

    function onError() {
      ctrack.stop();
      removeEventListeners();
      reject('points not found');
    }
    document.addEventListener('clmtrackrNotFound', onError);
    document.addEventListener('clmtrackrLost', onError);
  });
}
export default genFacialLandmarks;