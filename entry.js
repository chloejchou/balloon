// SCENE
// ------------------------------------------------------------------
let scene, camera, renderer;

const setupScene = () => {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xe6e6ff, 150, 1000);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 200;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const root = document.getElementById("sky");
  root.appendChild(renderer.domElement);
};


// LIGHTS
// ------------------------------------------------------------------
let light;

const setupLights = () => {
  light = new THREE.DirectionalLight(0xffffff, .8);
  light.position.set(150, 200, 300);
  light.castShadow = true;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 400;

  scene.add(light);
};


// ADD MOON
// ------------------------------------------------------------------
let moonMesh;

const moon = () => {
  const geometry = new THREE.SphereGeometry(300, 15, 15);
  const material = new THREE.MeshPhongMaterial({
    color: 0xc0c0c0,
    opacity: .95
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.receiveShadow = true;

  return sphere;
};

const addMoon = () => {
  moonMesh = moon();
  moonMesh.position.y = -350;
  scene.add(moonMesh);
};


// ADD ASTEROIDS IN SPACE
// ------------------------------------------------------------------
let spaceMesh;

const asteroid = () => {
  const geometry = new THREE.SphereGeometry(20, 15, 15);
  const material = new THREE.MeshPhongMaterial({
    color: 0xbda0cb,
    opacity: .95
  });

  const sphere = new THREE.Mesh(geometry, material);
  sphere.castShadow = true;

  return sphere;
};

const space = () => {
  const mesh = new THREE.Object3D();
  // 2PI for a full rotation
  const angleDistance = (Math.PI * 2) / 25;
  for (let i = 0; i < 25; i++) {
    const angle = angleDistance * i;
    const distance = 300 + (Math.random() * 150);
    const newAsteroid = asteroid();
    newAsteroid.position.x = Math.cos(angle) * distance;
    newAsteroid.position.y = Math.sin(angle) * distance;
    newAsteroid.position.z = 0;

    const size = Math.random();
    newAsteroid.scale.set(size, size, size);

    mesh.add(newAsteroid);
  }

  return mesh;
};

const addSpace = () => {
  spaceMesh = space();
  spaceMesh.position.y = -300;
  scene.add(spaceMesh);
};


// ADD ROCKET
// ------------------------------------------------------------------
let rocketMesh;

const rocket = () => {
  const mesh = new THREE.Object3D();

  // TIP
  // radius, height, radial segments
  const tipGeometry = new THREE.ConeGeometry(7, 10, 20);
  const tipMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    opacity: .95
  });
  const tip = new THREE.Mesh(tipGeometry, tipMaterial);
  tip.castShadow = true;
  mesh.add(tip);

  // BODY
  const bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    opacity: .95
  });

  // TOP BODY
  // rad top, rad bottom, height, radial segments
  const topBodyGeometry = new THREE.CylinderGeometry(7, 9, 11, 20);
  const topBody = new THREE.Mesh(topBodyGeometry, bodyMaterial);
  topBody.position.y = -10.5;
  mesh.add(topBody);

  // BOTTOM BODY
  const bottomBodyGeometry = new THREE.CylinderGeometry(9, 7, 11, 20);
  const bottomBody = new THREE.Mesh(bottomBodyGeometry, bodyMaterial);
  bottomBody.position.y = -21.5;
  mesh.add(bottomBody);

  // WINGS
  const wingGeometry = new THREE.BoxGeometry(5, 10, 1);
  const wingMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    opacity: .95
  });

  // TOP WING
  // width, height, depth
  const topWing = new THREE.Mesh(wingGeometry, wingMaterial);
  topWing.position.x = -10;
  topWing.position.y = -25;
  topWing.rotation.z = -Math.PI / 2 - 49.7;
  mesh.add(topWing);

  // BOTTOM WING
  const bottomWing = new THREE.Mesh(wingGeometry, wingMaterial);
  bottomWing.position.x = 10;
  bottomWing.position.y = -25;
  bottomWing.rotation.z = -Math.PI / 2 + 49.7;
  mesh.add(bottomWing);

  // LEFT WING
  const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
  leftWing.position.z = 10;
  leftWing.position.y = -25;
  leftWing.rotation.y = Math.PI / 2;
  leftWing.rotation.x = -Math.PI / 2 - 49.5;
  mesh.add(leftWing);

  // TAIL
  const tailGeometry = new THREE.CylinderGeometry(7, 4, 4, 20);
  const tailMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    opacity: .95
  });
  const tail = new THREE.Mesh(tailGeometry, tailMaterial);
  tail.position.y = -29;
  mesh.add(tail);

  // FIRE
  const fireGeometry = new THREE.BoxGeometry(4, 5, 5);
  const fireMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    opacity: .95
  });
  const fire = new THREE.Mesh(fireGeometry, fireMaterial);
  fire.position.y = -33;
  mesh.add(fire);

  return mesh;
};

const addRocket = () => {
  rocketMesh = rocket();
  rocketMesh.rotation.z = -Math.PI / 2;
  scene.add(rocketMesh);
};

// LOOPS & RENDERING
// ------------------------------------------------------------------
const loop = () => {
  // rotates along z axis
  moonMesh.rotation.z += .007;
  spaceMesh.rotation.z += .007;

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};


const initialize = () => {
  setupScene();
  setupLights();
  addMoon();
  addSpace();
  addRocket();

  loop();
};


document.addEventListener('DOMContentLoaded', () => {
  initialize();
});
