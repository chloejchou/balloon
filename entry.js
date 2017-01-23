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
  sphere.receiveShadow = true;
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

  loop();
};


document.addEventListener('DOMContentLoaded', () => {
  initialize();
});
