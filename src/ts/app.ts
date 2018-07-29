import Delaunator from 'delaunator';
import { Points } from 'delaunator';

import genFaceTriangulation from './genFaceTriangulation';
import genImageData from './genImageData';
import getWarpedImage from './getWarpedImage';
import { drawTriangulation } from './triangulation';

import face1URL from '../img/Asian.png';
import face2URL from '../img/Black.png';

function averagePoints(pts1: Points, pts2: Points) {
  return pts1.map(([x1, y1], i) => {
    const [x2, y2] = pts2[i];
    return [(x1 + x2) / 2, (y1 + y2) / 2];
  });
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = canvas.height = 600;
const ctx = canvas.getContext('2d');

Promise.all([genImageData(face1URL), genImageData(face2URL)]).then(([img1, img2]) => {
  Promise.all([genFaceTriangulation(img1), genFaceTriangulation(img2)]).then(triangulations => {
    
    const { width, height } = triangulations[0];
    const pts1 = triangulations[0].points;
    const pts2 = triangulations[1].points;
    const avgPoints = averagePoints(pts1, pts2);
    const avgTriangles = Delaunator.from(avgPoints).triangles;
    const avgTriangulation = {
      points: avgPoints,
      triangles: avgTriangles,
      width, height
    };
    ctx.putImageData(getWarpedImage(img1, triangulations[0], avgTriangulation), 0, 0);
    drawTriangulation(avgTriangulation, ctx);
  });
});