import * as THREE from '../three';
import addLights from './light';
import sky from './sky';
import { balloon, updateBalloon } from './balloon';

const setupScene = () => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xccebff);

  // camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    1,
    10000
  );
	camera.position.z = 750;

  // renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // add the scene to the DOM
  const root = document.getElementById("sky");
  root.appendChild(renderer.domElement);

  addLights(scene);

  const skyMesh = sky();
  scene.add(skyMesh);

  const balloonMesh = balloon();
  scene.add(balloonMesh);

  renderer.render(scene, camera);

  let mousePos = { x: 0, y: 0 };
  moveMouse(mousePos);

  loop(balloonMesh, mousePos, scene, camera, renderer);
};

const moveMouse = (mousePos) => {
  document.addEventListener('mousemove', e => {
    const xPos = -1 + (e.clientX / window.innerWidth) * 2;
    const yPos = 1 - (e.clientY / window.innerHeight) * 2;

    mousePos = { x: xPos, y: yPos };
  });
};

const loop = (balloonMesh, mousePos, scene, camera, renderer) => {
  updateBalloon(balloonMesh, mousePos);
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

export default setupScene;
