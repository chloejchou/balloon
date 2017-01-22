import * as THREE from '../three.js';

const cloud = () => {
  const mesh = new THREE.Object3D();

  const geometry = new THREE.SphereGeometry(40, 8, 10);
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

  const numPuffs = 4 + Math.round(Math.random());
  for (let i = 0; i < numPuffs; i++) {
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = i * 15;
    sphere.position.y = Math.random() * 15;
    sphere.position.z = Math.random() * 10;

    const size = Math.random() + .2;
    sphere.scale.set(size, size, size);
    sphere.receiveShadow = true;

    mesh.add(sphere);
  }

  return mesh;
};

export default cloud;
