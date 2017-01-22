import * as THREE from '../three.js';
import addLights from './light';
import addSky from './sky';
import addBalloon from './balloon';

const setupScene = () => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xccebff);

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  // camera
  const camera = new THREE.PerspectiveCamera (
    75,
    windowWidth/windowHeight, // aspect
    1,
    10000
  );
	camera.position.z = 750;

  // renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(windowWidth, windowHeight);

  // add the scene to the DOM
  const root = document.getElementById("sky");
  root.appendChild(renderer.domElement);

  document.addEventListener('resize', () => {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;

    renderer.setSize(windowWidth, windowHeight);
  	camera.aspect = windowWidth/windowHeight;
  	camera.updateProjectionMatrix();
  });

  addLights(scene);
  addSky(scene);
  addBalloon(scene);

  renderer.render(scene, camera);
};

export default setupScene;
