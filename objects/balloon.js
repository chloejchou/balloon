import * as THREE from '../three.js';

const balloon = () => {
  const mesh = new THREE.Object3D();

  // sphere
  const geometrySphere = new THREE.SphereGeometry(20, 30, 30);
  const materialSphere = new THREE.MeshPhongMaterial({ color: 0xff1a1a });
  const sphere = new THREE.Mesh(geometrySphere, materialSphere);
  sphere.receiveShadow = true;
  sphere.position.z = 500;
  mesh.add(sphere);

  // triangle
  const geometryTriangle = new THREE.ConeGeometry(3, 4, 15);
  const materialTriangle = new THREE.MeshPhongMaterial({ color: 0xff1a1a });
  const triangle = new THREE.Mesh(geometryTriangle, materialTriangle);
  triangle.receiveShadow = true;
  triangle.position.y = -20;
  triangle.position.z = 500;
  mesh.add(triangle);

  // string
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-5, -10, 0),
    new THREE.Vector3(5, -20, 0),
    new THREE.Vector3(-5, -40, 0)
  ]);

  const geometryString = new THREE.Geometry();
  geometryString.vertices = curve.getPoints(50);
  // const geometryString = new THREE.TubeGeometry(curve, 100, .8, 20, true);
  const materialString = new THREE.LineBasicMaterial({ color: 0x000000 });
  const string = new THREE.Line(geometryString, materialString);
  string.position.y = -22;
  string.position.z = 500;
  mesh.add(string);

  return mesh;
};

const addBalloon = (scene) => {
  const balloonMesh = balloon();
  scene.add(balloonMesh);
};

export default addBalloon;