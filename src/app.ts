import face from 'face1.jpg';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = canvas.height = 500;
const ctx = canvas.getContext('2d');

const faceImg = new Image();
faceImg.src = './face1.jpg';
faceImg.addEventListener('onload', () => {
  ctx.drawImage(faceImg, 0, 0);
});