import * as THREE from '../three.js';
import Cloud from './cloud';

const Sky = () => {
  const skyMesh = new THREE.Object3D();

  for (let i = 0; i < 10; i++) {
    const cloudMesh = Cloud();
    cloudMesh.position.x = window.innerWidth * Math.random();
    cloudMesh.position.y = window.innerHeight * Math.random();

    const size = Math.random() * 2;
    cloudMesh.scale.set(size, size, size);

    skyMesh.add(cloudMesh);
  }

  return skyMesh;
};

const addSky = (scene) => {
  const skyMesh = Sky();
  scene.add(skyMesh);
};

export default addSky;
