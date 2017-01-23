import * as THREE from '../three.js';
import cloud from './cloud';

const sky = () => {
  const skyMesh = new THREE.Object3D();

  for (let i = 0; i < 4; i++) {
    const cloudMesh = cloud();
    cloudMesh.position.x = (window.innerWidth) * Math.random();
    cloudMesh.position.y = (window.innerHeight) * Math.random();

    const size = Math.random() * 2;
    cloudMesh.scale.set(size, size, size);

    skyMesh.add(cloudMesh);
  }

  for (let i = 0; i < 4; i++) {
    const cloudMesh = cloud();
    cloudMesh.position.x = -1 * (window.innerWidth) * Math.random();
    cloudMesh.position.y = (window.innerHeight) * Math.random();

    const size = Math.random() * 2;
    cloudMesh.scale.set(size, size, size);

    skyMesh.add(cloudMesh);
  }

  for (let i = 0; i < 4; i++) {
    const cloudMesh = cloud();
    cloudMesh.position.x = (window.innerWidth) * Math.random();
    cloudMesh.position.y = -1 * (window.innerHeight) * Math.random();

    const size = Math.random() * 2;
    cloudMesh.scale.set(size, size, size);

    skyMesh.add(cloudMesh);
  }

  for (let i = 0; i < 4; i++) {
    const cloudMesh = cloud();
    cloudMesh.position.x = -1 * (window.innerWidth) * Math.random();
    cloudMesh.position.y = -1 * (window.innerHeight) * Math.random();

    const size = Math.random() * 2;
    cloudMesh.scale.set(size, size, size);

    skyMesh.add(cloudMesh);
  }

  return skyMesh;
};

export default sky;
