import * as THREE from '../three.js';

const addLights = (scene) => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight.position.set(100, 80, 200);
  scene.add(directionalLight);
};

export default addLights;
