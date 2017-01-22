import * as THREE from '../three.js';

const Cloud = () => {
  const mesh = new THREE.Object3D();

  const geometry = new THREE.SphereGeometry(50, 8, 10);
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

  const numClouds = 4 + Math.round(Math.random());
  for (let i = 0; i < numClouds; i++) {
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = i * 15;
    sphere.position.y = Math.random() * 15;
    sphere.position.z = Math.random() * 3;

    const size = Math.random();
    sphere.scale.set(size, size, size);

    mesh.add(sphere);
  }

  return mesh;
};

export default Cloud;
