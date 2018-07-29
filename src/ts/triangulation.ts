import Delaunator from 'delaunator';
import { Points, Triangles } from 'delaunator';

export interface Triangulation {
  points: Points;
  triangles: Triangles;
  width: number;
  height: number;
}

export function drawTriangulation(triangulation: Triangulation, ctx: CanvasRenderingContext2D) {
  const { points, triangles } = triangulation;
  ctx.beginPath();
  for (let i = 0; i < triangles.length; i += 3) {
    const a = points[triangles[i]];
    const b = points[triangles[i+1]];
    const c = points[triangles[i+2]];
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.lineTo(c[0], c[1]);
    ctx.lineTo(a[0], a[1]);
  }
  ctx.stroke();
}

export function getLandmarkTriangulation(landmarks: Points, width: number, height: number): Triangulation {
  const midX = width / 2;
  const midY = height / 2;
  const boundaryPoints = [
    [0,0], [midX,0], [width, 0], [width, midY],
    [width, height], [midX, height], [0, height], [0, midY]
  ];
  const points = landmarks.concat(boundaryPoints);
  const triangles = Delaunator.from(points).triangles;
  return { points, triangles, width, height };
}